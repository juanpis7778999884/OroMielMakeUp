import { CategoryForm } from "@/components/admin/category-form"

export const revalidate = 0

export default function NewCategoryPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-light text-foreground">Nueva categoría</h1>
        <p className="mt-1.5 text-[0.82rem] font-light text-muted-foreground">
          Crea una categoría para organizar tus productos.
        </p>
      </div>

      <CategoryForm mode="create" />
    </div>
  )
}
