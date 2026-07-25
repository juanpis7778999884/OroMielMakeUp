"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export type ActionResult =
  | { ok: true; redirect?: string }
  | { ok: false; error: string }

// ── Create ──────────────────────────────────────────────────

export async function createPromotion(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const title = String(formData.get("title") || "").trim()
  const subtitle = String(formData.get("subtitle") || "").trim() || null
  const description = String(formData.get("description") || "").trim() || null
  const banner_url = String(formData.get("banner_url") || "").trim() || null
  const discount_label = String(formData.get("discount_label") || "").trim() || null
  const starts_at = String(formData.get("starts_at") || "").trim() || null
  const ends_at = String(formData.get("ends_at") || "").trim() || null
  const is_active = formData.get("is_active") === "on"
  const sort_order = parseInt(String(formData.get("sort_order") || "0"), 10)

  if (!title) return { ok: false, error: "El título es obligatorio." }

  const supabase = await createClient()

  const { error } = await supabase.from("promotions").insert({
    title,
    subtitle,
    description,
    banner_url,
    discount_label,
    starts_at: starts_at || null,
    ends_at: ends_at || null,
    is_active,
    sort_order,
  })

  if (error) return { ok: false, error: error.message }

  revalidatePath("/admin/promociones")
  revalidatePath("/promociones")
  revalidatePath("/")
  redirect("/admin/promociones")
}

// ── Update ──────────────────────────────────────────────────

export async function updatePromotion(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const id = String(formData.get("id") || "")
  if (!id) return { ok: false, error: "ID de promoción faltante." }

  const title = String(formData.get("title") || "").trim()
  const subtitle = String(formData.get("subtitle") || "").trim() || null
  const description = String(formData.get("description") || "").trim() || null
  const banner_url = String(formData.get("banner_url") || "").trim() || null
  const discount_label = String(formData.get("discount_label") || "").trim() || null
  const starts_at = String(formData.get("starts_at") || "").trim() || null
  const ends_at = String(formData.get("ends_at") || "").trim() || null
  const is_active = formData.get("is_active") === "on"
  const sort_order = parseInt(String(formData.get("sort_order") || "0"), 10)

  if (!title) return { ok: false, error: "El título es obligatorio." }

  const supabase = await createClient()

  const { error } = await supabase
    .from("promotions")
    .update({
      title,
      subtitle,
      description,
      banner_url,
      discount_label,
      starts_at: starts_at || null,
      ends_at: ends_at || null,
      is_active,
      sort_order,
    })
    .eq("id", id)

  if (error) return { ok: false, error: error.message }

  revalidatePath("/admin/promociones")
  revalidatePath("/promociones")
  revalidatePath("/")
  return { ok: true }
}

// ── Delete ──────────────────────────────────────────────────

export async function deletePromotion(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const id = String(formData.get("id") || "")
  if (!id) return { ok: false, error: "ID de promoción faltante." }

  const supabase = await createClient()

  // Fetch the promotion to get the banner URL before deleting
  const { data: promo } = await supabase
    .from("promotions")
    .select("banner_url")
    .eq("id", id)
    .single()

  const { error } = await supabase.from("promotions").delete().eq("id", id)

  if (error) return { ok: false, error: error.message }

  // Delete the banner from storage if it exists
  if (promo?.banner_url) {
    try {
      const u = new URL(promo.banner_url)
      const marker = "/object/public/promotion-images/"
      const idx = u.pathname.indexOf(marker)
      if (idx !== -1) {
        const path = decodeURIComponent(u.pathname.slice(idx + marker.length))
        await supabase.storage.from("promotion-images").remove([path])
      }
    } catch {
      // ignore storage cleanup errors
    }
  }

  revalidatePath("/admin/promociones")
  revalidatePath("/promociones")
  revalidatePath("/")
  redirect("/admin/promociones")
}
