"use client"

import { useActionState, useEffect, useRef, useState, type ChangeEvent } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Trash2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { slugify } from "@/lib/format"
import { cn } from "@/lib/utils"
import type { Category, Product, ProductImage } from "@/lib/types"
import type { ActionResult } from "@/lib/actions/products"
import { createProduct, updateProduct, deleteProduct } from "@/lib/actions/products"
import { ImageUploader, type ManagedImage } from "@/components/admin/image-uploader"
import { uploadProductImages, deleteProductImages } from "@/lib/supabase/storage"

type ProductFormProps = {
  mode: "create" | "edit"
  product?: Product
  images?: ProductImage[]
  categories: Category[]
}

const inputClass = "flex h-11 w-full rounded-sm border border-border/50 bg-background px-3.5 text-[0.85rem] font-light outline-none transition-all duration-300 focus:border-foreground/30 focus:shadow-[0_0_0_3px_oklch(0.55_0.07_65/0.06)]"
const textareaClass = "flex min-h-[80px] w-full rounded-sm border border-border/50 bg-background px-3.5 py-2.5 text-[0.85rem] font-light outline-none transition-all duration-300 focus:border-foreground/30 focus:shadow-[0_0_0_3px_oklch(0.55_0.07_65/0.06)]"
const selectClass = "flex h-11 w-full rounded-sm border border-border/50 bg-background px-3.5 text-[0.85rem] font-light outline-none transition-all duration-300 focus:border-foreground/30 focus:shadow-[0_0_0_3px_oklch(0.55_0.07_65/0.06)]"
const fieldLabel = "text-[0.72rem] font-light tracking-[0.15em] uppercase text-muted-foreground"
const fieldHint = "text-[0.72rem] font-light text-muted-foreground/60"

export function ProductForm({ mode, product, images = [], categories }: ProductFormProps) {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)

  const [serverResult, formAction, isPending] = useActionState(
    mode === "create" ? createProduct : updateProduct,
    null,
  )

  const [name, setName] = useState(product?.name ?? "")
  const [slug, setSlug] = useState(product?.slug ?? "")
  const [slugEdited, setSlugEdited] = useState(false)
  const [isFeatured, setIsFeatured] = useState(product?.is_featured ?? false)
  const [isBestseller, setIsBestseller] = useState(product?.is_bestseller ?? false)
  const [error, setError] = useState<string | null>(null)

  const [managedImages, setManagedImages] = useState<ManagedImage[]>(() =>
    images.map((img, i) => ({
      id: img.id,
      url: img.url,
      sort_order: i,
    })),
  )

  const originalImageIds = useRef<Set<string>>(new Set(images.map((img) => img.id)))
  const removedStorageUrls = useRef<string[]>([])

  function handleNameChange(e: ChangeEvent<HTMLInputElement>) {
    const val = e.target.value
    setName(val)
    if (!slugEdited) setSlug(slugify(val))
  }

  function handleSlugChange(e: ChangeEvent<HTMLInputElement>) {
    setSlugEdited(true)
    setSlug(e.target.value)
  }

  function handleImagesChange(newImages: ManagedImage[]) {
    const newIds = new Set(newImages.map((img) => img.id))
    for (const origId of originalImageIds.current) {
      if (!newIds.has(origId)) {
        const prev = managedImages.find((img) => img.id === origId)
        if (prev && !prev.file) {
          removedStorageUrls.current.push(prev.url)
        }
      }
    }
    setManagedImages(newImages)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    try {
      const newFiles = managedImages.filter((img) => img.file)
      if (newFiles.length > 0) {
        const productId = product?.id ?? "temp"
        const files = newFiles.map((img) => img.file!)
        const uploadedUrls = await uploadProductImages(files, productId)

        let uploadIdx = 0
        const finalImages = managedImages.map((img) => {
          if (img.file) {
            return { ...img, url: uploadedUrls[uploadIdx++], file: undefined }
          }
          return img
        })
        setManagedImages(finalImages)

        const fd = new FormData(e.currentTarget)
        fd.set("is_featured", isFeatured ? "on" : "off")
        fd.set("is_bestseller", isBestseller ? "on" : "off")
        fd.set("images", JSON.stringify(finalImages.map((img) => ({ url: img.url }))))
        formAction(fd)
      } else {
        const fd = new FormData(e.currentTarget)
        fd.set("is_featured", isFeatured ? "on" : "off")
        fd.set("is_bestseller", isBestseller ? "on" : "off")
        fd.set("images", JSON.stringify(managedImages.map((img) => ({ url: img.url }))))
        formAction(fd)
      }

      if (removedStorageUrls.current.length > 0) {
        deleteProductImages(removedStorageUrls.current).catch(console.error)
        removedStorageUrls.current = []
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al subir imágenes.")
    }
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
  const [deleteResult, deleteAction, deletePending] = useActionState(deleteProduct, null)

  useEffect(() => {
    if (deleteResult?.ok) {
      router.push("/admin/productos")
    } else if (deleteResult && !deleteResult.ok) {
      setError(deleteResult.error)
      setShowDeleteConfirm(false)
    }
  }, [deleteResult, router])

  const [uploading, setUploading] = useState(false)
  const hasNewFiles = managedImages.some((img) => img.file)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (hasNewFiles) setUploading(true)
    await handleSubmit(e)
    setUploading(false)
  }

  const saving = isPending || uploading

  return (
    <>
      {error && (
        <div className="mb-6 border border-destructive/20 bg-destructive/5 px-4 py-3 text-[0.82rem] font-light text-destructive">
          {error}
        </div>
      )}

      <form ref={formRef} onSubmit={onSubmit} className="space-y-8">
        {mode === "edit" && product && (
          <input type="hidden" name="id" value={product.id} />
        )}

        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          {/* Left column */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className={fieldLabel}>Nombre del producto *</Label>
              <input id="name" name="name" value={name} onChange={handleNameChange} required className={inputClass} placeholder="Ej: Base de Maquillaje HD" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug" className={fieldLabel}>Slug (URL)</Label>
              <input id="slug" name="slug" value={slug} onChange={handleSlugChange} className={inputClass} placeholder="base-de-maquillaje-hd" />
              <p className={fieldHint}>Se genera automáticamente. Editar solo si necesitas un slug personalizado.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className={fieldLabel}>Descripción</Label>
              <textarea id="description" name="description" rows={4} defaultValue={product?.description ?? ""} className={textareaClass} placeholder="Describe el producto, sus beneficios, uso recomendado..." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ingredients" className={fieldLabel}>Ingredientes</Label>
              <textarea id="ingredients" name="ingredients" rows={3} defaultValue={product?.ingredients ?? ""} className={textareaClass} placeholder="Lista de ingredientes..." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="brand" className={fieldLabel}>Marca</Label>
              <input id="brand" name="brand" defaultValue={product?.brand ?? ""} className={inputClass} placeholder="Ej: Oromiel" />
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="price" className={fieldLabel}>Precio (COP) *</Label>
              <input id="price" name="price" type="number" min="0" step="100" required defaultValue={product?.price ?? ""} className={inputClass} placeholder="25000" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="compare_at_price" className={fieldLabel}>Precio anterior</Label>
              <input id="compare_at_price" name="compare_at_price" type="number" min="0" step="100" defaultValue={product?.compare_at_price ?? ""} className={inputClass} placeholder="35000" />
              <p className={fieldHint}>Si es mayor al precio actual, se muestra como oferta con descuento.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock" className={fieldLabel}>Stock</Label>
              <input id="stock" name="stock" type="number" min="0" defaultValue={product?.stock ?? 0} className={inputClass} placeholder="50" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category_id" className={fieldLabel}>Categoría</Label>
              <select id="category_id" name="category_id" defaultValue={product?.category_id ?? ""} className={selectClass}>
                <option value="">Sin categoría</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status" className={fieldLabel}>Estado</Label>
              <select id="status" name="status" defaultValue={product?.status ?? "activo"} className={selectClass}>
                <option value="activo">Disponible</option>
                <option value="nuevo">Nuevo</option>
                <option value="oferta">Oferta</option>
                <option value="agotado">Agotado</option>
              </select>
            </div>

            <div className="space-y-4 border border-border/30 p-4">
              <div className="flex items-center justify-between gap-4">
                <Label htmlFor="is_featured" className="text-[0.82rem] font-light text-foreground">Destacado</Label>
                <Switch id="is_featured" checked={isFeatured} onCheckedChange={setIsFeatured} />
              </div>
              <div className="flex items-center justify-between gap-4">
                <Label htmlFor="is_bestseller" className="text-[0.82rem] font-light text-foreground">Más vendido</Label>
                <Switch id="is_bestseller" checked={isBestseller} onCheckedChange={setIsBestseller} />
              </div>
            </div>
          </div>
        </div>

        <ImageUploader images={managedImages} onChange={handleImagesChange} maxImages={10} />

        {/* Actions */}
        <div className="flex flex-col gap-3 border-t border-border/30 pt-6 sm:flex-row sm:justify-between">
          {mode === "edit" && product ? (
            <Button type="button" variant="destructive" onClick={() => setShowDeleteConfirm(true)}>
              Eliminar producto
            </Button>
          ) : <div />}

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={() => router.back()} className="rounded-full border-border/50 px-6 text-[0.78rem] font-light tracking-[0.1em] uppercase">
              Cancelar
            </Button>
            <Button type="submit" disabled={saving} className="rounded-full bg-foreground px-6 text-[0.78rem] font-light tracking-[0.1em] uppercase text-background hover:bg-foreground/90">
              {saving ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  {uploading ? "Subiendo imágenes..." : "Guardando..."}
                </>
              ) : mode === "create" ? "Crear producto" : "Guardar cambios"}
            </Button>
          </div>
        </div>
      </form>

      {/* Delete confirmation dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div role="dialog" aria-modal="true" className="mx-4 w-full max-w-sm bg-popover p-6 shadow-lg" aria-labelledby="delete-product-title" aria-describedby="delete-product-desc">
            <h3 id="delete-product-title" className="font-serif text-base font-normal text-foreground">
              ¿Eliminar producto?
            </h3>
            <p id="delete-product-desc" className="mt-3 text-[0.82rem] font-light leading-relaxed text-muted-foreground">
              Esta acción no se puede deshacer. El producto &ldquo;{product?.name}&rdquo; será eliminado permanentemente.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowDeleteConfirm(false)} className="rounded-full border-border/50 px-5 text-[0.78rem] font-light tracking-[0.1em] uppercase">
                Cancelar
              </Button>
              <form action={deleteAction}>
                <input type="hidden" name="id" value={product?.id ?? ""} />
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
