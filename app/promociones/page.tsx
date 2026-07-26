import type { Metadata } from "next"
import { SiteShell } from "@/components/site-shell"
import { PromotionsBody } from "@/components/pages/promotions-body"
import { getPromotions, getSettings } from "@/lib/data"
import { BreadcrumbJsonLd } from "@/components/seo/json-ld"

export const revalidate = 60

const SITE_URL = "https://oromielmakeup.com"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Promociones",
    description:
      "Descubre las promociones y ofertas especiales de Oromiel Makeup en El Carmen de Chucurí, Santander.",
    alternates: {
      canonical: `${SITE_URL}/promociones`,
    },
    openGraph: {
      type: "website",
      locale: "es_CO",
      url: `${SITE_URL}/promociones`,
      siteName: "Oromiel Makeup",
      title: "Promociones | Oromiel Makeup",
      description:
        "Descubre las promociones y ofertas especiales de Oromiel Makeup.",
    },
    twitter: {
      card: "summary",
      title: "Promociones | Oromiel Makeup",
      description:
        "Descubre las promociones y ofertas especiales de Oromiel Makeup.",
    },
  }
}

export default async function PromotionsPage() {
  const [promotions, settings] = await Promise.all([
    getPromotions(),
    getSettings(),
  ])

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: SITE_URL },
          { name: "Promociones", url: `${SITE_URL}/promociones` },
        ]}
      />
      <SiteShell settings={settings}>
        <PromotionsBody promotions={promotions} />
      </SiteShell>
    </>
  )
}
