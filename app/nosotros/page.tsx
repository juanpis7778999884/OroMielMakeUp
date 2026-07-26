import type { Metadata } from "next"
import { SiteShell } from "@/components/site-shell"
import { AboutBody } from "@/components/pages/about-body"
import { getSettings } from "@/lib/data"
import { BreadcrumbJsonLd, LocalBusinessJsonLd } from "@/components/seo/json-ld"

export const revalidate = 60

const SITE_URL = "https://oromielmakeup.com"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Nosotros",
    description:
      "Conoce la historia de Oromiel Makeup, tu tienda de maquillaje y cuidado personal en El Carmen de Chucurí, Santander.",
    alternates: {
      canonical: `${SITE_URL}/nosotros`,
    },
    openGraph: {
      type: "website",
      locale: "es_CO",
      url: `${SITE_URL}/nosotros`,
      siteName: "Oromiel Makeup",
      title: "Nosotros | Oromiel Makeup",
      description:
        "Conoce la historia de Oromiel Makeup, tu tienda de maquillaje y cuidado personal.",
    },
    twitter: {
      card: "summary",
      title: "Nosotros | Oromiel Makeup",
      description:
        "Conoce la historia de Oromiel Makeup, tu tienda de maquillaje y cuidado personal.",
    },
  }
}

export default async function AboutPage() {
  const settings = await getSettings()

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: SITE_URL },
          { name: "Nosotros", url: `${SITE_URL}/nosotros` },
        ]}
      />
      <LocalBusinessJsonLd settings={settings} />
      <SiteShell settings={settings}>
        <AboutBody settings={settings} />
      </SiteShell>
    </>
  )
}
