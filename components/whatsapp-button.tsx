"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { buildProductWhatsAppUrl } from "@/lib/whatsapp"

type Props = {
  url: string
  productId: string
  productName: string
  price: number
  whatsapp: string | null | undefined
  soldOut: boolean
}

export function WhatsAppButton({ url, productId, productName, price, whatsapp, soldOut }: Props) {
  function handleClick() {
    const blob = new Blob(
      [JSON.stringify({ productId, type: "whatsapp" })],
      { type: "application/json" },
    )
    navigator.sendBeacon?.("/api/track", blob)
  }

  if (soldOut) {
    return (
      <Button disabled className="mt-1 w-full gap-2 rounded-full border border-border/40 bg-background py-2 text-[0.75rem] font-light tracking-[0.1em] uppercase text-muted-foreground/60">
        <span>Agotado</span>
      </Button>
    )
  }

  return (
    <Button
      className="mt-1 w-full gap-2 rounded-full border border-foreground/20 bg-background py-2 text-[0.75rem] font-light tracking-[0.1em] uppercase text-foreground transition-all duration-300 hover:bg-foreground hover:text-background"
      render={
        <a href={url} target="_blank" rel="noopener noreferrer" onClick={handleClick} />
      }
    >
      <MessageCircle className="size-3.5" strokeWidth={1.5} />
      Consultar
    </Button>
  )
}
