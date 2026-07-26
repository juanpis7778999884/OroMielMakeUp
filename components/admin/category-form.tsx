"use client"

import { useActionState, useEffect, useState, type ChangeEvent } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { slugify } from "@/lib/format"
import type { Category } from "@/lib/types"
import { createCategory, updateCategory, deleteCategory } from "@/lib/actions/categories"
import { inputClass, fieldLabel, fieldHint } from "@/lib/admin-styles"

type CategoryFormProps = {
  mode: "create" | "edit"
  category?: Category
}


export function CategoryForm({ mode, category }: CategoryFormProps) {
  const router = useRouter()

  const [serverResult, formAction, isPending] = useActionState(
    mode === "create" ? createCategory : updateCategory,
    null,
  )

  const [name, setName] = useState(category?.name ?? "")
  const [slug, setSlug] = useState(category?.slug ?? "")
  const [slugEdited, setSlugEdited] = useState(false)
  const [isActive, setIsActive] = useState(category?.is_active ?? true)
  const [imageUrl, setImageUrl] = useState(category?.image_url ?? "")
  const [error, setError] = useState<string | null>(null)

  function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    setName(val)
    if (!slugEdited) setSlug(slugify(val))
  }

  function handleSlugChange(e: ChangeEvent<HTMLInputElement>) {
    setSlugEdited(true)
    setSlug(e.target.value)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const fd = new FormData(e.currentTarget)
    fd.set("is_active", isActive ? "on" : "off")
    formAction(fd)
  }

  useEffect(() => {
    if (!serverResult) return
    if (serverResult.ok) {
      if (mode === "create") {
        // redirect() already handled
      } else {
        router.refresh()
      }
    } else {
      setError(serverResult.error)
    }
  }, [serverResult, mode, router])

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteResult, deleteAction, deletePending] = useActionState(deleteCategory, null)

  useEffect(() => {
    if (deleteResult?.ok) {
      router.push("/admin/categorias")
    } else if (deleteResult && !deleteResult.ok) {
      setError(deleteResult.error)
      setShowDeleteConfirm(false)
    }
  }, [deleteResult, router])

  return (
    <>
      {error && (
        <div className="mb-6 border border-destructive/20 bg-destructive/5 px-4 py-3 text-[0.82rem] font-light text-destructive">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {mode === "edit" && category && (
          <input type="hidden" name="id" value={category.id} />
        )}

        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className={fieldLabel}>Nombre *</Label>
              <input id="name" name="name" value={name} onChange={handleNameChange} required className={inputClass} placeholder="Ej: Maquillaje" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug" className={fieldLabel}>Slug (URL)</Label>
              <input id="slug" name="slug" value={slug} onChange={handleSlugChange} className={inputClass} placeholder="maquillaje" />
              <p className={fieldHint}>
                Se genera automáticamente del nombre. Se usa en la URL: <code className="text-foreground/70">/catalogo?categoria={slug || "..."}</code>
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="image_url" className={fieldLabel}>URL de imagen</Label>
              <input id="image_url" name="image_url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className={inputClass} placeholder="https://..." />
              {imageUrl && (
                <div className="relative mt-2 aspect-square w-full overflow-hidden border border-border/30 bg-secondary/60">
                  <Image src={imageUrl} alt="Preview" fill sizes="300px" className="object-cover" unoptimized />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="sort_order" className={fieldLabel}>Orden</Label>
              <input id="sort_order" name="sort_order" type="number" min="0" defaultValue={category?.sort_order ?? 0} className={inputClass} />
              <p className={fieldHint}>Menor = aparece primero en el catálogo.</p>
            </div>

            <div className="border border-border/30 p-4">
              <div className="flex items-center justify-between gap-4">
                <Label htmlFor="is_active" className="text-[0.82rem] font-light text-foreground">Activa</Label>
                <Switch id="is_active" checked={isActive} onCheckedChange={setIsActive} />
              </div>
              <p className="mt-2 text-[0.72rem] font-light text-muted-foreground/60">Solo las categorías activas aparecen en el catálogo público.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-border/30 pt-6 sm:flex-row sm:justify-between">
          {mode === "edit" && category ? (
            <Button type="button" variant="destructive" onClick={() => setShowDeleteConfirm(true)}>
              Eliminar categoría
            </Button>
          ) : <div />}

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={() => router.back()} className="rounded-full border-border/50 px-6 text-[0.78rem] font-light tracking-[0.1em] uppercase">
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending} className="rounded-full bg-foreground px-6 text-[0.78rem] font-light tracking-[0.1em] uppercase text-background hover:bg-foreground/90">
              {isPending ? "Guardando..." : mode === "create" ? "Crear categoría" : "Guardar cambios"}
            </Button>
          </div>
        </div>
      </form>

      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div role="dialog" aria-modal="true" className="mx-4 w-full max-w-sm bg-popover p-6 shadow-lg" aria-labelledby="delete-category-title" aria-describedby="delete-category-desc">
            <h3 id="delete-category-title" className="font-serif text-base font-normal text-foreground">
              ¿Eliminar categoría?
            </h3>
            <p id="delete-category-desc" className="mt-3 text-[0.82rem] font-light leading-relaxed text-muted-foreground">
              Esta acción no se puede deshacer. La categoría &ldquo;{category?.name}&rdquo; será eliminada permanentemente.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowDeleteConfirm(false)} className="rounded-full border-border/50 px-5 text-[0.78rem] font-light tracking-[0.1em] uppercase">
                Cancelar
              </Button>
              <form action={deleteAction}>
                <input type="hidden" name="id" value={category?.id ?? ""} />
                <Button type="submit" variant="destructive" disabled={deletePending} className="rounded-full px-5 text-[0.78rem] font-light tracking-[0.1em] uppercase">
                  {deletePending ? "Eliminando..." : "Eliminar"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
