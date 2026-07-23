"use client"

import { useActionState, useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import type { Promotion } from "@/lib/types"
import type { ActionResult } from "@/lib/actions/promotions"
import { createPromotion, updatePromotion, deletePromotion } from "@/lib/actions/promotions"

type PromotionFormProps = {
  mode: "create" | "edit"
  promotion?: Promotion
}

const inputClass = "flex h-11 w-full rounded-sm border border-border/50 bg-background px-3.5 text-[0.85rem] font-light outline-none transition-all duration-300 focus:border-foreground/30 focus:shadow-[0_0_0_3px_oklch(0.55_0.07_65/0.06)]"
const textareaClass = "flex w-full rounded-sm border border-border/50 bg-background px-3.5 py-2.5 text-[0.85rem] font-light outline-none transition-all duration-300 focus:border-foreground/30 focus:shadow-[0_0_0_3px_oklch(0.55_0.07_65/0.06)]"
const fieldLabel = "text-[0.72rem] font-light tracking-[0.15em] uppercase text-muted-foreground"
const fieldHint = "text-[0.72rem] font-light text-muted-foreground/60"

export function PromotionForm({ mode, promotion }: PromotionFormProps) {
  const router = useRouter()

  const [serverResult, formAction, isPending] = useActionState(
    mode === "create" ? createPromotion : updatePromotion,
    null,
  )

  const [title, setTitle] = useState(promotion?.title ?? "")
  const [subtitle, setSubtitle] = useState(promotion?.subtitle ?? "")
  const [description, setDescription] = useState(promotion?.description ?? "")
  const [bannerUrl, setBannerUrl] = useState(promotion?.banner_url ?? "")
  const [discountLabel, setDiscountLabel] = useState(promotion?.discount_label ?? "")
  const [startsAt, setStartsAt] = useState(promotion?.starts_at?.slice(0, 10) ?? "")
  const [endsAt, setEndsAt] = useState(promotion?.ends_at?.slice(0, 10) ?? "")
  const [isActive, setIsActive] = useState(promotion?.is_active ?? true)
  const [error, setError] = useState<string | null>(null)

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
  const [deleteResult, deleteAction, deletePending] = useActionState(deletePromotion, null)

  useEffect(() => {
    if (deleteResult?.ok) {
      router.push("/admin/promociones")
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
        {mode === "edit" && promotion && (
          <input type="hidden" name="id" value={promotion.id} />
        )}

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
              <Label htmlFor="banner_url" className={fieldLabel}>URL del banner</Label>
              <input id="banner_url" name="banner_url" value={bannerUrl} onChange={(e) => setBannerUrl(e.target.value)} className={inputClass} placeholder="https://..." />
              {bannerUrl && (
                <div className="relative mt-2 aspect-video w-full overflow-hidden border border-border/30 bg-secondary/60">
                  <Image src={bannerUrl} alt="Banner preview" fill sizes="300px" className="object-cover" unoptimized />
                </div>
              )}
            </div>

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
            <Button type="submit" disabled={isPending} className="rounded-full bg-foreground px-6 text-[0.78rem] font-light tracking-[0.1em] uppercase text-background hover:bg-foreground/90">
              {isPending ? "Guardando..." : mode === "create" ? "Crear promoción" : "Guardar cambios"}
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
