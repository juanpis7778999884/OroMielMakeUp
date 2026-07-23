import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { ProductForm } from "@/components/admin/product-form"

export const revalidate = 0

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const [{ data: product }, { data: images }, { data: categories }] = await Promise.all([
    supabase.from("products").select("*").eq("id", id).single(),
    supabase.from("product_images").select("*").eq("product_id", id).order("sort_order"),
    supabase.from("categories").select("*").eq("is_active", true).order("sort_order"),
  ])

  if (!product) notFound()

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-light text-foreground">Editar producto</h1>
        <p className="mt-1.5 text-[0.82rem] font-light text-muted-foreground">
          Modifica los datos de <span className="font-normal text-foreground">{product.name}</span>
        </p>
      </div>

      <ProductForm
        mode="edit"
        product={product}
        images={images ?? []}
        categories={categories ?? []}
      />
    </div>
  )
}
