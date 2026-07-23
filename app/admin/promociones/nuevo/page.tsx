import { PromotionForm } from "@/components/admin/promotion-form"

export const revalidate = 0

export default function NewPromotionPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-light text-foreground">Nueva promoción</h1>
        <p className="mt-1.5 text-[0.82rem] font-light text-muted-foreground">
          Crea una promoción para atraer más clientes a tu tienda.
        </p>
      </div>

      <PromotionForm mode="create" />
    </div>
  )
}
