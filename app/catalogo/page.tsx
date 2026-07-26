import type { Metadata } from "next"
import { SiteShell } from "@/components/site-shell"
import { getCatalogProducts, getSettings } from "@/lib/data"
import { CatalogBrowser } from "@/components/catalog/catalog-browser"
import { BreadcrumbJsonLd } from "@/components/seo/json-ld"

export const revalidate = 60

const SITE_URL = "https://oromielmakeup.com"

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}): Promise<Metadata> {
  const params = await searchParams
  const category = typeof params.categoria === "string" ? params.categoria : undefined
  const search = typeof params.q === "string" ? params.q : undefined

  let title = "Catálogo de Productos"
  let description =
    "Explora todo el catálogo de productos de Oromiel Makeup. Maquillaje, cuidado de la piel y más en El Carmen de Chucurí, Santander."

  if (category) {
    const formatted = category
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase())
    title = `${formatted} | Catálogo`
    description = `Explora productos de ${formatted} en Oromiel Makeup.`
  }

  if (search) {
    title = `Resultados para "${search}"`
    description = `Resultados de búsqueda para "${search}" en Oromiel Makeup.`
  }

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/catalogo`,
    },
    openGraph: {
      type: "website",
      locale: "es_CO",
      url: `${SITE_URL}/catalogo`,
      siteName: "Oromiel Makeup",
      title: `${title} | Oromiel Makeup`,
      description,
    },
    twitter: {
      card: "summary",
      title: `${title} | Oromiel Makeup`,
      description,
    },
  }
}

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const category = typeof params.categoria === "string" ? params.categoria : undefined
  const search = typeof params.q === "string" ? params.q : undefined
  const sort = typeof params.orden === "string" ? params.orden : undefined

  const [catalog, settings] = await Promise.all([
    getCatalogProducts({ category, search, sort }, { offset: 0, limit: 12 }),
    getSettings(),
  ])

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: SITE_URL },
          { name: "Catálogo", url: `${SITE_URL}/catalogo` },
        ]}
      />
      <SiteShell settings={settings}>
        <CatalogBrowser
          initialProducts={catalog.products}
          categories={catalog.categories}
          initialTotal={catalog.total}
          initialCategory={category}
          initialSearch={search}
          initialSort={sort}
          whatsapp={settings?.whatsapp}
        />
      </SiteShell>
    </>
  )
}
