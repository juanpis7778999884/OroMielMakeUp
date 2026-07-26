"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { formatPrice, discountPercent } from "@/lib/format"
import { buildProductWhatsAppUrl } from "@/lib/whatsapp"
import type { Product } from "@/lib/types"
import {
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Package,
  Tag,
  Star,
  Share2,
} from "lucide-react"
import { cn } from "@/lib/utils"

const PLACEHOLDER = "/assorted-cosmetics.png"

function statusInfo(product: Product) {
  if (product.status === "agotado" || product.stock <= 0)
    return { label: "Agotado", className: "bg-muted text-muted-foreground" }
  if (product.status === "oferta" || (product.compare_at_price && product.compare_at_price > product.price))
    return { label: "Oferta", className: "bg-foreground text-background" }
  if (product.status === "nuevo")
    return { label: "Nuevo", className: "bg-background text-foreground border border-border/60" }
  return { label: "Disponible", className: "bg-foreground/10 text-foreground" }
}

type Props = {
  product: Product
  related: Product[]
  whatsapp?: string | null
}

export function ProductDetail({ product, related, whatsapp }: Props) {
  const images = useMemo(
    () =>
      (product.product_images ?? [])
        .slice()
        .sort((a, b) => a.sort_order - b.sort_order),
    [product.product_images],
  )

  const allImages = useMemo(() => {
    if (images.length > 0) return images
    return []
  }, [images])

  const [activeIdx, setActiveIdx] = useState(0)
  const activeImage = allImages[activeIdx]?.url ?? PLACEHOLDER

  const discount = discountPercent(product.price, product.compare_at_price)
  const status = statusInfo(product)
  const soldOut = product.status === "agotado" || product.stock <= 0

  const waUrl = buildProductWhatsAppUrl(whatsapp, product.name, product.price)

  useEffect(() => {
    navigator.sendBeacon("/api/track", JSON.stringify({ productId: product.id, type: "view" }))
  }, [product.id])

  const prev = useCallback(() => {
    setActiveIdx((i) => (i === 0 ? allImages.length - 1 : i - 1))
  }, [allImages.length])

  const next = useCallback(() => {
    setActiveIdx((i) => (i === allImages.length - 1 ? 0 : i + 1))
  }, [allImages.length])

  function handleShare() {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description?.slice(0, 120) ?? product.name,
        url: window.location.href,
      })
    } else {
      navigator.clipboard?.writeText(window.location.href)
    }
  }

  return (
    <div className="mx-auto max-w-[1600px] px-5 py-8 sm:px-8 sm:py-12 lg:px-14">
      {/* Breadcrumb */}
      <nav className="mb-10 flex items-center gap-1.5 text-[0.7rem] font-light tracking-[0.12em] uppercase text-muted-foreground/60">
        <Link href="/" className="transition-colors duration-300 hover:text-foreground">
          Inicio
        </Link>
        <span className="text-muted-foreground/30">/</span>
        <Link href="/catalogo" className="transition-colors duration-300 hover:text-foreground">
          Catálogo
        </Link>
        {product.category && (
          <>
            <span className="text-muted-foreground/30">/</span>
            <Link
              href={`/catalogo?categoria=${product.category.slug}`}
              className="transition-colors duration-300 hover:text-foreground"
            >
              {product.category.name}
            </Link>
          </>
        )}
        <span className="text-muted-foreground/30">/</span>
        <span className="truncate text-foreground/80">{product.name}</span>
      </nav>

      {/* Main grid */}
      <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr]">
        {/* Gallery */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-3"
        >
          <div className="relative aspect-square overflow-hidden bg-secondary/40 shadow-luxe">
            <Image
              src={activeImage}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            <div className="pointer-events-none absolute inset-3 border border-background/20" />

            <div className="absolute left-4 top-4 z-10 flex flex-col gap-1.5">
              <Badge className={`rounded-none px-2.5 py-1 text-[0.58rem] uppercase tracking-[0.16em] ${status.className}`}>{status.label}</Badge>
              {discount > 0 && !soldOut && (
                <Badge className="rounded-none bg-gold px-2.5 py-1 text-[0.58rem] uppercase tracking-[0.16em] text-gold-foreground">{`-${discount}% OFF`}</Badge>
              )}
            </div>

            {allImages.length > 1 && (
              <>
                <button
                  onClick={prev}
                  aria-label="Imagen anterior"
                  className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-background/30 bg-background/60 p-2 text-foreground backdrop-blur-md transition-all duration-300 hover:bg-background/80"
                >
                  <ChevronLeft className="size-4" strokeWidth={1.5} />
                </button>
                <button
                  onClick={next}
                  aria-label="Siguiente imagen"
                  className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-background/30 bg-background/60 p-2 text-foreground backdrop-blur-md transition-all duration-300 hover:bg-background/80"
                >
                  <ChevronRight className="size-4" strokeWidth={1.5} />
                </button>
              </>
            )}

            {allImages.length > 1 && (
              <span className="absolute bottom-3 right-3 z-10 rounded-full border border-background/20 bg-background/60 px-3 py-1 text-[0.68rem] font-light tracking-wider text-foreground backdrop-blur-md">
                {activeIdx + 1} / {allImages.length}
              </span>
            )}
          </div>

          {allImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {allImages.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setActiveIdx(i)}
                  className={cn(
                    "relative size-16 flex-shrink-0 overflow-hidden transition-all duration-300 sm:size-20",
                    i === activeIdx
                      ? "ring-2 ring-foreground/40 opacity-100"
                      : "ring-1 ring-border/50 opacity-50 hover:opacity-80",
                  )}
                >
                  <Image
                    src={img.url}
                    alt={`${product.name} ${i + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Info panel */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-5"
        >
          {product.category && (
            <Link
              href={`/catalogo?categoria=${product.category.slug}`}
              className="inline-flex w-fit items-center gap-1.5 rounded-none border border-border/60 bg-background px-3 py-1.5 text-[0.62rem] font-light tracking-[0.18em] uppercase text-muted-foreground transition-colors duration-500 hover:border-foreground hover:text-foreground"
            >
              <Tag className="size-3" strokeWidth={1.5} />
              {product.category.name}
            </Link>
          )}

          <h1 className="font-serif text-[2.25rem] font-light leading-[1.08] tracking-[-0.01em] text-foreground md:text-[3rem]">
            {product.name}
          </h1>

          <div className="flex items-baseline gap-3">
            <span className="text-[1.75rem] font-light tracking-tight text-foreground tabular-nums">
              {formatPrice(product.price)}
            </span>
            {product.compare_at_price && product.compare_at_price > product.price && (
              <span className="text-[1rem] font-light text-muted-foreground/50 line-through tabular-nums">
                {formatPrice(product.compare_at_price)}
              </span>
            )}
            {discount > 0 && !soldOut && (
              <span className="rounded-none border border-gold/40 bg-gold/10 px-2.5 py-0.5 text-[0.68rem] font-light tracking-[0.12em] text-foreground">
                -{discount}%
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-[0.8rem] font-light text-muted-foreground">
            <Package className="size-3.5" strokeWidth={1.5} />
            {soldOut ? (
              <span className="text-destructive font-medium">Agotado</span>
            ) : (
              <span>
                {product.stock} {product.stock === 1 ? "unidad disponible" : "unidades disponibles"}
              </span>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <div className="border-t border-border/30 pt-5">
              <h3 className="mb-2.5 text-[0.7rem] font-medium tracking-[0.2em] uppercase text-foreground">
                Descripción
              </h3>
              <p className="whitespace-pre-line text-[0.85rem] font-light leading-[1.85] text-muted-foreground">
                {product.description}
              </p>
            </div>
          )}

          {/* Ingredients */}
          {product.ingredients && (
            <div className="border-t border-border/30 pt-5">
              <h3 className="mb-2.5 text-[0.7rem] font-medium tracking-[0.2em] uppercase text-foreground">
                Ingredientes
              </h3>
              <p className="whitespace-pre-line text-[0.85rem] font-light leading-[1.85] text-muted-foreground">
                {product.ingredients}
              </p>
            </div>
          )}

          {product.brand && (
            <p className="text-[0.82rem] font-light text-muted-foreground">
              Marca: <span className="font-normal text-foreground">{product.brand}</span>
            </p>
          )}

          {/* CTA buttons */}
          <div className="flex flex-col gap-3 border-t border-border/30 pt-5 sm:flex-row">
            {!soldOut ? (
              <Button
                size="lg"
                className="flex-1 gap-2 rounded-none bg-foreground px-8 py-3 text-[0.7rem] font-light tracking-[0.2em] uppercase text-background transition-colors duration-500 hover:bg-foreground/85"
                render={
                  <a href={waUrl} target="_blank" rel="noopener noreferrer" />
                }
              >
                <MessageCircle className="size-4" strokeWidth={1.5} />
                Consultar por WhatsApp
              </Button>
            ) : (
              <Button size="lg" disabled className="flex-1 gap-2 rounded-none px-8 py-3 text-[0.7rem] font-light tracking-[0.2em] uppercase">
                <Package className="size-4" strokeWidth={1.5} />
                Producto agotado
              </Button>
            )}
            <Button
              size="lg"
              variant="outline"
              onClick={handleShare}
              className="gap-2 rounded-none border-foreground/50 px-6 py-3 text-[0.7rem] font-light tracking-[0.18em] uppercase transition-colors duration-500 hover:bg-foreground hover:text-background"
            >
              <Share2 className="size-3.5" strokeWidth={1.5} />
              Compartir
            </Button>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 pt-1">
            {product.is_bestseller && (
              <Badge variant="secondary" className="gap-1 rounded-none border border-border/60 bg-background px-3 py-1 text-[0.6rem] font-light uppercase tracking-[0.14em]">
                <Star className="size-3 text-gold" strokeWidth={1.5} />
                Más vendido
              </Badge>
            )}
            {product.is_featured && (
              <Badge variant="secondary" className="gap-1 rounded-none border border-border/60 bg-background px-3 py-1 text-[0.6rem] font-light uppercase tracking-[0.14em]">
                <Star className="size-3 text-gold" strokeWidth={1.5} />
                Destacado
              </Badge>
            )}
          </div>
        </motion.div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="mt-20 border-t border-border/30 pt-16">
          <div className="mb-10 flex flex-col items-center gap-3 text-center">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold/60" />
              <span className="eyebrow">También te puede gustar</span>
              <span className="h-px w-8 bg-gold/60" />
            </div>
            <h2 className="font-serif text-2xl font-light text-foreground">
              Productos relacionados
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-4 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} whatsapp={whatsapp} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
