import type { Settings } from "@/lib/types"

const SITE_URL = "https://oromielmakeup.com"

export function OrganizationJsonLd({ settings }: { settings?: Settings | null }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BeautyStore",
    name: "Oromiel Makeup",
    description:
      settings?.hero_title ||
      "Tu nuevo lugar favorito para realzar tu belleza y cuidar tu piel en El Carmen de Chucurí, Santander.",
    url: SITE_URL,
    logo: settings?.logo_url || `${SITE_URL}/images/oromiel-logo.png`,
    image: settings?.hero_image_url || `${SITE_URL}/images/hero-makeup.png`,
    address: settings?.address
      ? {
          "@type": "PostalAddress",
          streetAddress: settings.address,
          addressLocality: "El Carmen de Chucurí",
          addressRegion: "Santander",
          addressCountry: "CO",
        }
      : undefined,
    geo: {
      "@type": "GeoCoordinates",
      latitude: 6.6977,
      longitude: -73.4417,
    },
    openingHoursSpecification: settings?.hours
      ? {
          "@type": "OpeningHoursSpecification",
          description: settings.hours,
        }
      : undefined,
    contactPoint: settings?.whatsapp
      ? {
          "@type": "ContactPoint",
          telephone: `+${settings.whatsapp}`,
          contactType: "customer service",
          availableLanguage: ["Spanish"],
        }
      : undefined,
    sameAs: [
      settings?.instagram
        ? `https://instagram.com/${settings.instagram.replace("@", "")}`
        : null,
      settings?.facebook
        ? `https://facebook.com/${settings.facebook}`
        : null,
    ].filter(Boolean),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function WebsiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Oromiel Makeup",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/catalogo?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function ProductJsonLd({
  product,
  whatsapp,
}: {
  product: {
    name: string
    description: string | null
    price: number
    slug: string
    image?: string
    category?: string | null
    stock: number
    status: string
    updated_at: string
  }
  whatsapp?: string | null
}) {
  const image = product.image || `${SITE_URL}/assorted-cosmetics.png`
  const availability =
    product.stock > 0 && product.status !== "agotado"
      ? "https://schema.org/InStock"
      : "https://schema.org/OutOfStock"

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description || product.name,
    image,
    url: `${SITE_URL}/producto/${product.slug}`,
    brand: {
      "@type": "Brand",
      name: "Oromiel Makeup",
    },
    category: product.category || "Maquillaje",
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/producto/${product.slug}`,
      priceCurrency: "COP",
      price: product.price,
      priceValidUntil: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000,
      ).toISOString().split("T")[0],
      availability,
      seller: {
        "@type": "Organization",
        name: "Oromiel Makeup",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 5,
      reviewCount: 1,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[]
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function LocalBusinessJsonLd({
  settings,
}: {
  settings?: Settings | null
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Oromiel Makeup",
    image: settings?.logo_url || `${SITE_URL}/images/oromiel-logo.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings?.address || "El Carmen de Chucurí",
      addressLocality: "El Carmen de Chucurí",
      addressRegion: "Santander",
      addressCountry: "CO",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 6.6977,
      longitude: -73.4417,
    },
    telephone: settings?.whatsapp ? `+${settings.whatsapp}` : undefined,
    openingHours: settings?.hours || undefined,
    priceRange: "$$",
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
