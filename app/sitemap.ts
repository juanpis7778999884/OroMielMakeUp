import type { MetadataRoute } from "next"
import { createClient } from "@/lib/supabase/server"

const SITE_URL = "https://oromielmakeup.com"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient()

  const [productsRes, categoriesRes, promotionsRes] = await Promise.all([
    supabase
      .from("products")
      .select("slug, updated_at, status, stock")
      .neq("status", "agotado")
      .gt("stock", 0)
      .order("updated_at", { ascending: false }),
    supabase
      .from("categories")
      .select("slug, created_at, is_active")
      .eq("is_active", true)
      .order("created_at", { ascending: false }),
    supabase
      .from("promotions")
      .select("id, created_at, is_active")
      .eq("is_active", true)
      .order("created_at", { ascending: false }),
  ])

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/catalogo`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/promociones`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/nosotros`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/contacto`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ]

  const productPages: MetadataRoute.Sitemap = (productsRes.data ?? []).map(
    (p) => ({
      url: `${SITE_URL}/producto/${p.slug}`,
      lastModified: new Date(p.updated_at),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }),
  )

  const categoryPages: MetadataRoute.Sitemap = (categoriesRes.data ?? []).map(
    (c) => ({
      url: `${SITE_URL}/catalogo?categoria=${c.slug}`,
      lastModified: new Date(c.created_at),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }),
  )

  const promotionPages: MetadataRoute.Sitemap = (promotionsRes.data ?? []).map(
    (promo) => ({
      url: `${SITE_URL}/promociones#${promo.id}`,
      lastModified: new Date(promo.created_at),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }),
  )

  return [...staticPages, ...productPages, ...categoryPages, ...promotionPages]
}
