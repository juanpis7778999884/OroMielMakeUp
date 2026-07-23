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
      <Button disabled className="mt-1 w-full gap-2 rounded-none border border-border/50 bg-transparent py-2 text-[0.66rem] font-light tracking-[0.18em] uppercase text-muted-foreground/60">
        <span>Agotado</span>
      </Button>
    )
  }

  return (
    <Button
      className="mt-1 w-full gap-2 rounded-none border border-foreground/25 bg-transparent py-2 text-[0.66rem] font-light tracking-[0.18em] uppercase text-foreground transition-colors duration-500 hover:bg-foreground hover:text-background"
      render={
        <a href={url} target="_blank" rel="noopener noreferrer" onClick={handleClick} />
      }
    >
      <MessageCircle className="size-3.5" strokeWidth={1.5} />
      Consultar
    </Button>
  )
}
