import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

// Increments product engagement counters. Uses SECURITY DEFINER RPC-free
// approach via service-safe increment through public read + admin? No —
// counters are public metrics, so we allow anonymous increments through an RPC.
export async function POST(request: Request) {
  try {
    const { productId, type } = await request.json()
    if (!productId || !["view", "whatsapp"].includes(type)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
    }

    const supabase = await createClient()
    const column: "views" | "whatsapp_clicks" = type === "view" ? "views" : "whatsapp_clicks"
    // @supabase/ssr v0.12 doesn't propagate Database Functions generics to rpc()
    await supabase.rpc("increment_product_metric", { p_id: String(productId), p_column: column } as never)

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 })
  }
}
