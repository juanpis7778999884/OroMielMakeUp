"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { slugify } from "@/lib/format"

export type ActionResult =
  | { ok: true; redirect?: string }
  | { ok: false; error: string }

// ── Helpers ─────────────────────────────────────────────────

async function uniqueSlug(base: string, excludeId?: string): Promise<string> {
  const supabase = await createClient()
  let candidate = slugify(base)
  let n = 0

  while (n < 100) {
    let q = supabase
      .from("categories")
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

// ── Create ──────────────────────────────────────────────────

export async function createCategory(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const name = String(formData.get("name") || "").trim()
  const image_url = String(formData.get("image_url") || "").trim() || null
  const sort_order = parseInt(String(formData.get("sort_order") || "0"), 10)
  const is_active = formData.get("is_active") === "on"

  if (!name) return { ok: false, error: "El nombre es obligatorio." }

  const slug = await uniqueSlug(name)
  const supabase = await createClient()

  const { error } = await supabase.from("categories").insert({
    name,
    slug,
    image_url,
    sort_order,
    is_active,
  })

  if (error) return { ok: false, error: error.message }

  revalidatePath("/admin/categorias")
  revalidatePath("/catalogo")
  revalidatePath("/")
  redirect("/admin/categorias")
}

// ── Update ──────────────────────────────────────────────────

export async function updateCategory(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const id = String(formData.get("id") || "")
  if (!id) return { ok: false, error: "ID de categoría faltante." }

  const name = String(formData.get("name") || "").trim()
  const image_url = String(formData.get("image_url") || "").trim() || null
  const sort_order = parseInt(String(formData.get("sort_order") || "0"), 10)
  const is_active = formData.get("is_active") === "on"

  if (!name) return { ok: false, error: "El nombre es obligatorio." }

  const supabase = await createClient()

  const { data: existing } = await supabase
    .from("categories")
    .select("slug")
    .eq("id", id)
    .single()

  const slug = existing?.slug || (await uniqueSlug(name))

  const { error } = await supabase
    .from("categories")
    .update({ name, slug, image_url, sort_order, is_active })
    .eq("id", id)

  if (error) return { ok: false, error: error.message }

  revalidatePath("/admin/categorias")
  revalidatePath("/catalogo")
  revalidatePath("/")
  return { ok: true }
}

// ── Delete ──────────────────────────────────────────────────

export async function deleteCategory(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const id = String(formData.get("id") || "")
  if (!id) return { ok: false, error: "ID de categoría faltante." }

  const supabase = await createClient()

  // Check if category has products
  const { count } = await supabase
    .from("products")
    .select("id", { count: "exact", head: true })
    .eq("category_id", id)

  if (count && count > 0) {
    return {
      ok: false,
      error: `No se puede eliminar: la categoría tiene ${count} producto(s) asociado(s). Reasigna o elimina los productos primero.`,
    }
  }

  const { error } = await supabase.from("categories").delete().eq("id", id)

  if (error) return { ok: false, error: error.message }

  revalidatePath("/admin/categorias")
  revalidatePath("/catalogo")
  revalidatePath("/")
  redirect("/admin/categorias")
}
