import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { PromotionForm } from "@/components/admin/promotion-form"
import type { Promotion } from "@/lib/types"

export const revalidate = 0

type Props = { params: Promise<{ id: string }> }

export default async function EditPromotionPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data } = await supabase
    .from("promotions")
    .select("*")
    .eq("id", id)
    .single()

  if (!data) notFound()

  const promotion = data as Promotion

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-light text-foreground">Editar promoción</h1>
        <p className="mt-1.5 text-[0.82rem] font-light text-muted-foreground">
          {promotion.title}
        </p>
      </div>

      <PromotionForm mode="edit" promotion={promotion} />
    </div>
  )
}
