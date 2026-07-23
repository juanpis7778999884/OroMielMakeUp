import { Suspense } from "react"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { SiteShell } from "@/components/site-shell"
import { ProductDetail } from "@/components/product/product-detail"
import { ProductJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld"
import { getProductBySlug, getRelatedProducts, getSettings } from "@/lib/data"
import { ProductDetailSkeleton } from "@/components/skeletons-product"

export const revalidate = 60

const SITE_URL = "https://oromielmakeup.com"

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return { title: "Producto no encontrado" }

  const description =
    product.description?.slice(0, 155) ?? `Compra ${product.name} en Oromiel Makeup`
  const imageUrl = product.product_images?.[0]?.url
  const productUrl = `${SITE_URL}/producto/${product.slug}`

  return {
    title: product.name,
    description,
    keywords: [
      product.name,
      product.category?.name ?? "maquillaje",
      "Oromiel Makeup",
      "belleza",
      "El Carmen de Chucurí",
    ].filter(Boolean),
    alternates: {
      canonical: productUrl,
    },
    openGraph: {
      type: "website",
      locale: "es_CO",
      url: productUrl,
      siteName: "Oromiel Makeup",
      title: product.name,
      description,
      images: imageUrl
        ? [{ url: imageUrl, width: 800, height: 800, alt: product.name }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  const [settings, related] = await Promise.all([
    getSettings(),
    getRelatedProducts(product, 4),
  ])

  const breadcrumbItems = [
    { name: "Inicio", url: SITE_URL },
    { name: "Catálogo", url: `${SITE_URL}/catalogo` },
    ...(product.category
      ? [
          {
            name: product.category.name,
            url: `${SITE_URL}/catalogo?categoria=${product.category.slug}`,
          },
        ]
      : []),
    { name: product.name, url: `${SITE_URL}/producto/${product.slug}` },
  ]

  return (
    <>
      <ProductJsonLd
        product={{
          name: product.name,
          description: product.description,
          price: product.price,
          slug: product.slug,
          image: product.product_images?.[0]?.url,
          category: product.category?.name,
          stock: product.stock,
          status: product.status,
          updated_at: product.updated_at,
        }}
        whatsapp={settings?.whatsapp}
      />
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <SiteShell settings={settings}>
        <Suspense fallback={<ProductDetailSkeleton />}>
          <ProductDetail
            product={product}
            related={related}
            whatsapp={settings?.whatsapp}
          />
        </Suspense>
      </SiteShell>
    </>
  )
}
