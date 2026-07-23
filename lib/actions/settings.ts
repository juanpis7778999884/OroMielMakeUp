"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"

export type ActionResult =
  | { ok: true; message: string }
  | { ok: false; error: string }

export async function updateSettings(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  const whatsapp = String(formData.get("whatsapp") || "").trim() || null
  const instagram = String(formData.get("instagram") || "").trim() || null
  const facebook = String(formData.get("facebook") || "").trim() || null
  const address = String(formData.get("address") || "").trim() || null
  const hours = String(formData.get("hours") || "").trim() || null
  const logo_url = String(formData.get("logo_url") || "").trim() || null
  const hero_title = String(formData.get("hero_title") || "").trim() || null
  const hero_subtitle = String(formData.get("hero_subtitle") || "").trim() || null
  const hero_image_url = String(formData.get("hero_image_url") || "").trim() || null
  const map_embed = String(formData.get("map_embed") || "").trim() || null
  const primary_color = String(formData.get("primary_color") || "").trim() || null

  const supabase = await createClient()

  const { error } = await supabase
    .from("settings")
    .upsert(
      {
        id: 1,
        whatsapp,
        instagram,
        facebook,
        address,
        hours,
        logo_url,
        hero_title,
        hero_subtitle,
        hero_image_url,
        map_embed,
        primary_color,
      },
      { onConflict: "id" },
    )

  if (error) return { ok: false, error: error.message }

  revalidatePath("/admin/configuracion")
  revalidatePath("/")
  revalidatePath("/catalogo")
  revalidatePath("/producto")
  return { ok: true, message: "Configuración guardada correctamente." }
}
