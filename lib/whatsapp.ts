import type { Product } from "./types"
import { formatPrice } from "./format"

const DEFAULT_MESSAGE = "Hola Oromiel Makeup! Quiero mas informacion sobre sus productos."

function clean(phone: string | null | undefined): string {
  return (phone ?? "").replace(/[^0-9]/g, "")
}

/** Build a wa.me link from a phone and an optional message. */
export function whatsappUrl(phone: string | null | undefined, message?: string): string {
  const number = clean(phone)
  const base = number ? `https://wa.me/${number}` : "https://wa.me/"
  const text = message ?? DEFAULT_MESSAGE
  return `${base}?text=${encodeURIComponent(text)}`
}

/** Build a product-specific WhatsApp inquiry link. */
export function buildProductWhatsAppUrl(
  phone: string | null | undefined,
  productName: string,
  price?: number | null,
): string {
  const priceLine = typeof price === "number" ? `\nPrecio: ${formatPrice(price)}` : ""
  const message = `Hola Oromiel Makeup! Me interesa este producto:\n\n*${productName}*${priceLine}\n\nEsta disponible?`
  return whatsappUrl(phone, message)
}

/** Build a general inquiry WhatsApp link. */
export function buildGeneralWhatsAppUrl(phone: string | null | undefined, message?: string): string {
  return whatsappUrl(phone, message)
}

/** Alias used across the marketing components. */
export function buildWhatsAppUrl(phone: string | null | undefined, message?: string): string {
  return whatsappUrl(phone, message)
}

/** Instagram profile url from a handle or full url. */
export function instagramUrl(handle: string | null | undefined): string {
  if (!handle) return "https://instagram.com"
  if (handle.startsWith("http")) return handle
  return `https://instagram.com/${handle.replace(/^@/, "")}`
}

/** Facebook page url from a handle or full url. */
export function facebookUrl(handle: string | null | undefined): string {
  if (!handle) return "https://facebook.com"
  if (handle.startsWith("http")) return handle
  return `https://facebook.com/${handle.replace(/^@/, "")}`
}

/* ----- backwards-compatible helpers ----- */

export function buildWhatsappLink(phone: string | null | undefined, message: string): string {
  return whatsappUrl(phone, message)
}

export function productInquiryMessage(product: Product): string {
  return `Hola Oromiel Makeup! Me interesa este producto:\n\n*${product.name}*\nPrecio: ${formatPrice(
    product.price,
  )}\n\nEsta disponible?`
}

export function generalInquiryMessage(): string {
  return DEFAULT_MESSAGE
}
