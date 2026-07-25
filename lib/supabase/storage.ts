import { createClient } from "@/lib/supabase/client"

const BUCKET = "product-images"

function extFromMime(mime: string): string {
  if (mime.includes("png")) return "png"
  if (mime.includes("webp")) return "webp"
  if (mime.includes("gif")) return "gif"
  return "jpg"
}

function fileName(productId: string, index: number, mime: string): string {
  const ts = Date.now()
  const rand = Math.random().toString(36).slice(2, 8)
  return `${productId}/${ts}-${index}-${rand}.${extFromMime(mime)}`
}

/**
 * Upload a single file to Supabase Storage and return its public URL.
 */
export async function uploadProductImage(
  file: File,
  productId: string,
  index: number,
): Promise<string> {
  const supabase = createClient()
  const path = fileName(productId, index, file.type)

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false })

  if (error) throw new Error(error.message)

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return data.publicUrl
}

/**
 * Upload multiple files sequentially (to respect storage rate limits).
 * Returns an array of public URLs in the same order.
 */
export async function uploadProductImages(
  files: File[],
  productId: string,
  onProgress?: (done: number, total: number) => void,
): Promise<string[]> {
  const urls: string[] = []
  for (let i = 0; i < files.length; i++) {
    const url = await uploadProductImage(files[i], productId, i)
    urls.push(url)
    onProgress?.(i + 1, files.length)
  }
  return urls
}

/**
 * Delete images from Supabase Storage by their full public URLs.
 * Extracts the storage path from the URL and removes each file.
 */
export async function deleteProductImages(urls: string[]): Promise<void> {
  const supabase = createClient()

  const paths = urls
    .map((url) => {
      try {
        const u = new URL(url)
        // Public URL format: .../storage/v1/object/public/product-images/<path>
        const marker = `/object/public/${BUCKET}/`
        const idx = u.pathname.indexOf(marker)
        if (idx === -1) return null
        return decodeURIComponent(u.pathname.slice(idx + marker.length))
      } catch {
        return null
      }
    })
    .filter((p): p is string => p !== null)

  if (paths.length === 0) return

  await supabase.storage.from(BUCKET).remove(paths)
}

// ── Promotion banners ────────────────────────────────────────

const PROMO_BUCKET = "promotion-images"

/**
 * Upload a single promotion banner to Supabase Storage and return its public URL.
 */
export async function uploadPromotionBanner(
  file: File,
  promotionId: string,
): Promise<string> {
  const supabase = createClient()
  const ts = Date.now()
  const rand = Math.random().toString(36).slice(2, 8)
  const ext = extFromMime(file.type)
  const path = `banners/${promotionId}/${ts}-${rand}.${ext}`

  const { error } = await supabase.storage
    .from(PROMO_BUCKET)
    .upload(path, file, { contentType: file.type, upsert: false })

  if (error) throw new Error(error.message)

  const { data } = supabase.storage.from(PROMO_BUCKET).getPublicUrl(path)
  return data.publicUrl
}

/**
 * Delete a promotion banner from Supabase Storage by its full public URL.
 */
export async function deletePromotionBanner(url: string): Promise<void> {
  const supabase = createClient()

  try {
    const u = new URL(url)
    const marker = `/object/public/${PROMO_BUCKET}/`
    const idx = u.pathname.indexOf(marker)
    if (idx === -1) return
    const path = decodeURIComponent(u.pathname.slice(idx + marker.length))
    await supabase.storage.from(PROMO_BUCKET).remove([path])
  } catch {
    // ignore malformed URLs
  }
}
