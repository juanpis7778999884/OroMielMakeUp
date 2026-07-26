"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import type { Promotion } from "@/lib/types"
import { createPromotion, updatePromotion, deletePromotion } from "@/lib/actions/promotions"
import { ImageUploader, type ManagedImage } from "@/components/admin/image-uploader"
import { uploadPromotionBanner, deletePromotionBanner } from "@/lib/supabase/storage"
import { inputClass, textareaClass, fieldLabel, fieldHint } from "@/lib/admin-styles"

type PromotionFormProps = {
  mode: "create" | "edit"
  promotion?: Promotion
}

export function PromotionForm({ mode, promotion }: PromotionFormProps) {
  const router = useRouter()

  const [serverResult, formAction, isPending] = useActionState(
    mode === "create" ? createPromotion : updatePromotion,
    null,
  )

  const [promotionId] = useState(() => promotion?.id ?? crypto.randomUUID())

  const [title, setTitle] = useState(promotion?.title ?? "")
  const [subtitle, setSubtitle] = useState(promotion?.subtitle ?? "")
  const [description, setDescription] = useState(promotion?.description ?? "")
  const [discountLabel, setDiscountLabel] = useState(promotion?.discount_label ?? "")
  const [startsAt, setStartsAt] = useState(promotion?.starts_at?.slice(0, 10) ?? "")
  const [endsAt, setEndsAt] = useState(promotion?.ends_at?.slice(0, 10) ?? "")
  const [isActive, setIsActive] = useState(promotion?.is_active ?? true)
  const [error, setError] = useState<string | null>(null)

  const [managedImages, setManagedImages] = useState<ManagedImage[]>(() =>
    promotion?.banner_url
      ? [{ id: promotion.id, url: promotion.banner_url, sort_order: 0 }]
      : [],
  )
  const originalImageIds = useRef<Set<string>>(
    new Set(promotion?.banner_url ? [promotion.id] : []),
  )
  const removedStorageUrl = useRef<string | null>(null)

  function handleImagesChange(newImages: ManagedImage[]) {
    const newIds = new Set(newImages.map((img) => img.id))
    for (const origId of originalImageIds.current) {
      if (!newIds.has(origId)) {
        const prev = managedImages.find((img) => img.id === origId)
        if (prev && !prev.file) {
          removedStorageUrl.current = prev.url
        }
      }
    }
    setManagedImages(newImages)
  }

 async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault()
  setError(null)

  const form = e.currentTarget // capturar la referencia ANTES del await

  try {
    const newFile = managedImages.find((img) => img.file)
    let finalBannerUrl = managedImages.length > 0 ? managedImages[0].url : ""

    if (newFile) {
      finalBannerUrl = await uploadPromotionBanner(newFile.file!, promotionId)
    }

    const fd = new FormData(form)
    fd.set("is_active", isActive ? "on" : "off")
    fd.set("banner_url", finalBannerUrl)
    formAction(fd)

    if (removedStorageUrl.current) {
      deletePromotionBanner(removedStorageUrl.current).catch(console.error)
      removedStorageUrl.current = null
    }
  } catch (err) {
    console.error("Error al guardar promoción:", err)
    setError(err instanceof Error ? err.message : "Error al subir la imagen.")
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
  const [deleteResult, deleteAction, deletePending] = useActionState(deletePromotion, null)

  useEffect(() => {
    if (deleteResult?.ok) {
      router.push("/admin/promociones")
    } else if (deleteResult && !deleteResult.ok) {
      setError(deleteResult.error)
      setShowDeleteConfirm(false)
    }
  }, [deleteResult, router])

  const [uploading, setUploading] = useState(false)
  const hasNewFile = managedImages.some((img) => img.file)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (hasNewFile) setUploading(true)
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

      <form onSubmit={onSubmit} className="space-y-8">
        <input type="hidden" name="id" value={promotionId} />

        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className={fieldLabel}>Título *</Label>
              <input id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required className={inputClass} placeholder="Ej: Summer Sale 2026" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitle" className={fieldLabel}>Subtítulo</Label>
              <input id="subtitle" name="subtitle" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} className={inputClass} placeholder="Ej: Hasta 50% de descuento" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className={fieldLabel}>Descripción</Label>
              <textarea id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className={textareaClass} placeholder="Describe la promoción..." />
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="discount_label" className={fieldLabel}>Etiqueta de descuento</Label>
              <input id="discount_label" name="discount_label" value={discountLabel} onChange={(e) => setDiscountLabel(e.target.value)} className={inputClass} placeholder="Ej: -30%, 2x1" />
              <p className={fieldHint}>Se muestra como badge sobre el banner.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="starts_at" className={fieldLabel}>Fecha de inicio</Label>
              <input id="starts_at" name="starts_at" type="date" value={startsAt} onChange={(e) => setStartsAt(e.target.value)} className={inputClass} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ends_at" className={fieldLabel}>Fecha de fin</Label>
              <input id="ends_at" name="ends_at" type="date" value={endsAt} onChange={(e) => setEndsAt(e.target.value)} className={inputClass} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sort_order" className={fieldLabel}>Orden</Label>
              <input id="sort_order" name="sort_order" type="number" min="0" defaultValue={promotion?.sort_order ?? 0} className={inputClass} />
              <p className={fieldHint}>Menor = aparece primero.</p>
            </div>

            <div className="border border-border/30 p-4">
              <div className="flex items-center justify-between gap-4">
                <Label htmlFor="is_active" className="text-[0.82rem] font-light text-foreground">Activa</Label>
                <Switch id="is_active" checked={isActive} onCheckedChange={setIsActive} />
              </div>
              <p className="mt-2 text-[0.72rem] font-light text-muted-foreground/60">Solo las promociones activas aparecen en la tienda.</p>
            </div>
          </div>
        </div>

        <ImageUploader images={managedImages} onChange={handleImagesChange} maxImages={1} />

        <div className="flex flex-col gap-3 border-t border-border/30 pt-6 sm:flex-row sm:justify-between">
          {mode === "edit" && promotion ? (
            <Button type="button" variant="destructive" onClick={() => setShowDeleteConfirm(true)}>
              Eliminar promoción
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
                  {uploading ? "Subiendo imagen..." : "Guardando..."}
                </>
              ) : mode === "create" ? "Crear promoción" : "Guardar cambios"}
            </Button>
          </div>
        </div>
      </form>

      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div role="dialog" aria-modal="true" className="mx-4 w-full max-w-sm bg-popover p-6 shadow-lg" aria-labelledby="delete-promotion-title" aria-describedby="delete-promotion-desc">
            <h3 id="delete-promotion-title" className="font-serif text-base font-normal text-foreground">
              ¿Eliminar promoción?
            </h3>
            <p id="delete-promotion-desc" className="mt-3 text-[0.82rem] font-light leading-relaxed text-muted-foreground">
              Esta acción no se puede deshacer. La promoción &ldquo;{promotion?.title}&rdquo; será eliminada permanentemente.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowDeleteConfirm(false)} className="rounded-full border-border/50 px-5 text-[0.78rem] font-light tracking-[0.1em] uppercase">
                Cancelar
              </Button>
              <form action={deleteAction}>
                <input type="hidden" name="id" value={promotion?.id ?? ""} />
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
