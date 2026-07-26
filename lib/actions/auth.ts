"use server"

import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export type AuthResult =
  | { ok: true }
  | { ok: false; error: string }

export async function login(
  
  _prev: AuthResult | null,
  formData: FormData,
): Promise<AuthResult> {
  const email = String(formData.get("email") || "").trim()
  const password = String(formData.get("password") || "")

  if (!email || !password) {
    return { ok: false, error: "Ingresa email y contraseña." }
  }

 const supabase = await createClient()

const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
})

  if (error) {
    return {
      ok: false,
      error:
        error.message === "Invalid login credentials"
          ? "Email o contraseña incorrectos."
          : error.message,
    }
  }

  redirect("/admin")
}

export async function logout(): Promise<void> {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/admin/login")
}
