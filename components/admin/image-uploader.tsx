"use client"

import { useCallback, useRef, useState } from "react"
import Image from "next/image"
import { Upload, X, GripVertical, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export type ManagedImage = {
  id: string
  url: string
  file?: File
  sort_order: number
}

type ImageUploaderProps = {
  images: ManagedImage[]
  onChange: (images: ManagedImage[]) => void
  maxImages?: number
}

export function ImageUploader({
  images,
  onChange,
  maxImages = 10,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)

  const addFiles = useCallback(
    (files: FileList | File[]) => {
      const MAX_SIZE_MB = 10
      const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024

      const accepted = Array.from(files).filter((f) => {
        if (!f.type.startsWith("image/")) return false
        if (f.size > MAX_SIZE_BYTES) {
          alert(`"${f.name}" superpa los ${MAX_SIZE_MB} MB y no se ha agregado.`)
          return false
        }
        return true
      })
      if (!accepted.length) return

      const remaining = maxImages - images.length
      const toAdd = accepted.slice(0, remaining)

      const newImages: ManagedImage[] = toAdd.map((file, i) => ({
        id: `new-${Date.now()}-${i}`,
        url: URL.createObjectURL(file),
        file,
        sort_order: images.length + i,
      }))

      onChange([...images, ...newImages])
    },
    [images, maxImages, onChange],
  )

  function removeImage(index: number) {
    const img = images[index]
    if (!img.file) URL.revokeObjectURL(img.url)
    onChange(images.filter((_, i) => i !== index).map((img, i) => ({ ...img, sort_order: i })))
  }

  const [dragIdx, setDragIdx] = useState<number | null>(null)
  const [overIdx, setOverIdx] = useState<number | null>(null)

  function handleDragStart(e: React.DragEvent, index: number) {
    setDragIdx(index)
    e.dataTransfer.effectAllowed = "move"
    if (e.currentTarget instanceof HTMLElement) {
      e.dataTransfer.setDragImage(e.currentTarget, 50, 50)
    }
  }

  function handleDragOver(e: React.DragEvent, index: number) {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
    if (index !== overIdx) setOverIdx(index)
  }

  function handleDrop(e: React.DragEvent, dropIndex: number) {
    e.preventDefault()
    if (dragIdx === null || dragIdx === dropIndex) {
      setDragIdx(null)
      setOverIdx(null)
      return
    }
    const reordered = [...images]
    const [moved] = reordered.splice(dragIdx, 1)
    reordered.splice(dropIndex, 0, moved)
    onChange(reordered.map((img, i) => ({ ...img, sort_order: i })))
    setDragIdx(null)
    setOverIdx(null)
  }

  function handleDragEnd() {
    setDragIdx(null)
    setOverIdx(null)
  }

  function handleZoneDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(false)
    if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files)
  }

  return (
    <div className="space-y-3">
      <Label className="text-[0.72rem] font-light tracking-[0.15em] uppercase text-muted-foreground">
        Imágenes ({images.length}/{maxImages})
      </Label>

      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {images.map((img, i) => (
            <div
              key={img.id}
              draggable
              onDragStart={(e) => handleDragStart(e, i)}
              onDragOver={(e) => handleDragOver(e, i)}
              onDrop={(e) => handleDrop(e, i)}
              onDragEnd={handleDragEnd}
              className={cn(
                "group relative aspect-square cursor-grab overflow-hidden border border-border/30 bg-secondary/60 transition-all duration-300 active:cursor-grabbing",
                dragIdx === i && "opacity-40 scale-95",
                overIdx === i && dragIdx !== null && dragIdx !== i && "border-foreground/40 shadow-lg scale-105",
              )}
            >
              <Image
                src={img.url}
                alt={`Imagen ${i + 1}`}
                fill
                sizes="200px"
                className="object-cover"
                unoptimized={!!img.file}
              />

              <span className="absolute left-1.5 top-1.5 flex size-6 items-center justify-center bg-foreground/70 text-[10px] font-medium text-background backdrop-blur-sm">
                {i + 1}
              </span>

              <div className="absolute left-1.5 bottom-1.5 flex size-6 items-center justify-center bg-foreground/40 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 backdrop-blur-sm">
                <GripVertical className="size-3" />
              </div>

              {img.file && (
                <span className="absolute right-1.5 top-1.5 bg-foreground px-1.5 py-0.5 text-[10px] font-light tracking-wider text-background">
                  Nuevo
                </span>
              )}

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  removeImage(i)
                }}
                className="absolute right-1.5 bottom-1.5 flex size-7 items-center justify-center bg-black/50 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:bg-destructive backdrop-blur-sm"
              >
                <X className="size-3.5" strokeWidth={1.5} />
              </button>
            </div>
          ))}
        </div>
      )}

      {images.length < maxImages && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleZoneDrop}
          onClick={() => inputRef.current?.click()}
          className={cn(
            "flex cursor-pointer flex-col items-center gap-3 border border-dashed p-8 text-center transition-all duration-300",
            dragOver
              ? "border-foreground/40 bg-foreground/[0.02]"
              : "border-border/40 hover:border-foreground/20 hover:bg-foreground/[0.01]",
          )}
        >
          <Upload className="size-7 text-muted-foreground/30" strokeWidth={1} />
          <div>
            <p className="text-[0.85rem] font-light text-foreground">
              Arrastra imágenes aquí o haz clic para seleccionar
            </p>
            <p className="mt-1 text-[0.72rem] font-light text-muted-foreground/60">
              JPG, PNG, WebP — Máximo 10 MB por imagen
            </p>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files) addFiles(e.target.files)
          e.target.value = ""
        }}
      />
    </div>
  )
}
