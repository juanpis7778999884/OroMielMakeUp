import { createClient } from "@/lib/supabase/server"
import { ProductForm } from "@/components/admin/product-form"

export const revalidate = 0

export default async function NewProductPage() {
  const supabase = await createClient()

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-light text-foreground">Nuevo producto</h1>
        <p className="mt-1.5 text-[0.82rem] font-light text-muted-foreground">
          Completa los datos para crear un nuevo producto.
        </p>
      </div>

      <ProductForm
        mode="create"
        categories={categories ?? []}
      />
    </div>
  )
}
