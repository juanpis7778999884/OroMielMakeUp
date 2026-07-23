"use client"

import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { formatPrice, discountPercent } from "@/lib/format"
import { buildProductWhatsAppUrl } from "@/lib/whatsapp"
import { WhatsAppButton } from "@/components/whatsapp-button"
import type { Product } from "@/lib/types"

const PLACEHOLDER = "/assorted-cosmetics.png"

function statusBadge(product: Product) {
  if (product.status === "agotado" || product.stock <= 0) {
    return { label: "Agotado", className: "bg-muted text-muted-foreground" }
  }
  if (product.status === "oferta" || (product.compare_at_price && product.compare_at_price > product.price)) {
    return { label: "Oferta", className: "bg-foreground text-background" }
  }
  if (product.status === "nuevo") {
    return { label: "Nuevo", className: "bg-background text-foreground border border-border/60" }
  }
  return null
}

export function ProductCard({ product, whatsapp }: { product: Product; whatsapp?: string | null }) {
  const image = product.product_images?.[0]?.url ?? PLACEHOLDER
  const badge = statusBadge(product)
  const soldOut = product.status === "agotado" || product.stock <= 0
  const discount = discountPercent(product.price, product.compare_at_price)
  const waUrl = buildProductWhatsAppUrl(whatsapp, product.name, product.price)

  return (
    <div className="group flex flex-col overflow-hidden bg-background transition-all duration-500">
      <Link href={`/producto/${product.slug}`} className="relative block aspect-square overflow-hidden bg-secondary/50">
        <Image
          src={image || "/placeholder.svg"}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        {/* Subtle hover overlay */}
        <div className="absolute inset-0 bg-foreground/0 transition-colors duration-500 group-hover:bg-foreground/[0.02]" />

        <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
          {badge && <Badge className={badge.className}>{badge.label}</Badge>}
          {discount > 0 && !soldOut && (
            <Badge className="bg-foreground text-background">{`-${discount}%`}</Badge>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-1.5 px-1 pt-4 pb-1">
        {product.category?.name && (
          <span className="text-[0.65rem] font-light tracking-[0.18em] uppercase text-muted-foreground/70">
            {product.category.name}
          </span>
        )}
        <Link
          href={`/producto/${product.slug}`}
          className="font-serif text-[1.05rem] font-normal leading-snug text-foreground transition-colors duration-300 hover:text-muted-foreground line-clamp-2"
        >
          {product.name}
        </Link>

        <div className="mt-auto flex items-baseline gap-2.5 pt-3">
          <span className="text-[0.95rem] font-medium tracking-tight text-foreground">{formatPrice(product.price)}</span>
          {product.compare_at_price && product.compare_at_price > product.price && (
            <span className="text-[0.8rem] font-light text-muted-foreground/60 line-through">{formatPrice(product.compare_at_price)}</span>
          )}
        </div>

        <div className="pt-2">
          <WhatsAppButton
            url={waUrl}
            productId={product.id}
            productName={product.name}
            price={product.price}
            whatsapp={whatsapp}
            soldOut={soldOut}
          />
        </div>
      </div>
    </div>
  )
}
