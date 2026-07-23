"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { slugify } from "@/lib/format"

const STORAGE_BUCKET = "product-images"

export type ActionResult =
  | { ok: true; redirect?: string }
  | { ok: false; error: string }

type ProductStatus = "nuevo" | "oferta" | "agotado" | "activo"
const VALID_STATUSES: ProductStatus[] = ["nuevo", "oferta", "agotado", "activo"]

function parseStatus(raw: string): ProductStatus {
  return VALID_STATUSES.includes(raw as ProductStatus) ? (raw as ProductStatus) : "activo"
}

// ── Helpers ─────────────────────────────────────────────────

async function uniqueSlug(base: string, excludeId?: string): Promise<string> {
  const supabase = await createClient()
  let candidate = slugify(base)
  let n = 0

  while (n < 100) {
    let q = supabase
      .from("products")
      .select("id", { count: "exact", head: true })
      .eq("slug", candidate)

    if (excludeId) q = q.neq("id", excludeId)

    const { count } = await q
    if (!count) return candidate
    n++
    candidate = `${slugify(base)}-${n}`
  }
  return candidate
}

function parseImages(raw: unknown): { url: string; sort_order: number }[] {
  try {
    const arr = typeof raw === "string" ? JSON.parse(raw) : raw
    if (!Array.isArray(arr)) return []
    return arr
      .filter((img: unknown): img is { url: string } =>
        typeof img === "object" && img !== null && "url" in img && typeof (img as { url: unknown }).url === "string"
      )
      .map((img, i) => ({ url: img.url, sort_order: i }))
  } catch {
    return []
  }
}

// ── Create ──────────────────────────────────────────────────

export async function createProduct(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const name = String(formData.get("name") || "").trim()
  const description = String(formData.get("description") || "").trim() || null
  const ingredients = String(formData.get("ingredients") || "").trim() || null
  const brand = String(formData.get("brand") || "").trim() || null
  const price = parseFloat(String(formData.get("price") || "0"))
  const compareAt = parseFloat(String(formData.get("compare_at_price") || "0")) || null
  const stock = parseInt(String(formData.get("stock") || "0"), 10)
  const categoryId = String(formData.get("category_id") || "") || null
  const status = parseStatus(String(formData.get("status") || "activo"))
  const isFeatured = formData.get("is_featured") === "on"
  const isBestseller = formData.get("is_bestseller") === "on"
  const imagesRaw = formData.get("images")

  if (!name) return { ok: false, error: "El nombre es obligatorio." }
  if (isNaN(price) || price < 0) return { ok: false, error: "Precio inválido." }

  const slug = await uniqueSlug(name)
  const supabase = await createClient()

  const { data: product, error: prodErr } = await supabase
    .from("products")
    .insert({
      name,
      slug,
      description,
      ingredients,
      brand,
      price,
      compare_at_price: compareAt,
      stock,
      category_id: categoryId,
      status,
      is_featured: isFeatured,
      is_bestseller: isBestseller,
    })
    .select("id")
    .single()

  if (prodErr || !product) {
    return { ok: false, error: prodErr?.message || "Error al crear el producto." }
  }

  const images = parseImages(imagesRaw)
  if (images.length > 0) {
    await supabase.from("product_images").insert(
      images.map((img) => ({ ...img, product_id: product.id })),
    )
  }

  revalidatePath("/admin/productos")
  revalidatePath("/catalogo")
  redirect(`/admin/productos/${product.id}/editar`)
}

// ── Update ──────────────────────────────────────────────────

export async function updateProduct(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const id = String(formData.get("id") || "")
  if (!id) return { ok: false, error: "ID de producto faltante." }

  const name = String(formData.get("name") || "").trim()
  const description = String(formData.get("description") || "").trim() || null
  const ingredients = String(formData.get("ingredients") || "").trim() || null
  const brand = String(formData.get("brand") || "").trim() || null
  const price = parseFloat(String(formData.get("price") || "0"))
  const compareAt = parseFloat(String(formData.get("compare_at_price") || "0")) || null
  const stock = parseInt(String(formData.get("stock") || "0"), 10)
  const categoryId = String(formData.get("category_id") || "") || null
  const status = parseStatus(String(formData.get("status") || "activo"))
  const isFeatured = formData.get("is_featured") === "on"
  const isBestseller = formData.get("is_bestseller") === "on"
  const imagesRaw = formData.get("images")

  if (!name) return { ok: false, error: "El nombre es obligatorio." }
  if (isNaN(price) || price < 0) return { ok: false, error: "Precio inválido." }

  const supabase = await createClient()

  const { data: existing } = await supabase
    .from("products")
    .select("slug")
    .eq("id", id)
    .single()

  const slug = existing?.slug || await uniqueSlug(name)

  const { error: updErr } = await supabase
    .from("products")
    .update({
      name,
      slug,
      description,
      ingredients,
      brand,
      price,
      compare_at_price: compareAt,
      stock,
      category_id: categoryId,
      status,
      is_featured: isFeatured,
      is_bestseller: isBestseller,
    })
    .eq("id", id)

  if (updErr) return { ok: false, error: updErr.message }

  const images = parseImages(imagesRaw)
  await supabase.from("product_images").delete().eq("product_id", id)
  if (images.length > 0) {
    await supabase.from("product_images").insert(
      images.map((img) => ({ ...img, product_id: id })),
    )
  }

  revalidatePath("/admin/productos")
  revalidatePath(`/admin/productos/${id}/editar`)
  revalidatePath("/catalogo")
  revalidatePath(`/producto/${slug}`)
  return { ok: true }
}

// ── Delete ──────────────────────────────────────────────────

export async function deleteProduct(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const id = String(formData.get("id") || "")
  if (!id) return { ok: false, error: "ID de producto faltante." }

  const supabase = await createClient()

  // Fetch image URLs before deleting (to clean up storage)
  const { data: imgs } = await supabase
    .from("product_images")
    .select("url")
    .eq("product_id", id)

  const { error } = await supabase.from("products").delete().eq("id", id)
  if (error) return { ok: false, error: error.message }

  // Best-effort: delete storage files for this product
  if (imgs && imgs.length > 0) {
    const paths = imgs
      .map((img) => {
        try {
          const u = new URL(img.url)
          const marker = `/object/public/${STORAGE_BUCKET}/`
          const idx = u.pathname.indexOf(marker)
          if (idx === -1) return null
          return decodeURIComponent(u.pathname.slice(idx + marker.length))
        } catch {
          return null
        }
      })
      .filter((p): p is string => p !== null)

    if (paths.length > 0) {
      await supabase.storage.from(STORAGE_BUCKET).remove(paths).catch(() => {})
    }
  }

  revalidatePath("/admin/productos")
  revalidatePath("/catalogo")
  redirect("/admin/productos")
}
