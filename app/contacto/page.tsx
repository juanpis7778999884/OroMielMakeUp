import type { Metadata } from "next"
import { SiteShell } from "@/components/site-shell"
import { ContactBody } from "@/components/pages/contact-body"
import { getSettings } from "@/lib/data"
import { BreadcrumbJsonLd, LocalBusinessJsonLd } from "@/components/seo/json-ld"

export const revalidate = 60

const SITE_URL = "https://oromielmakeup.com"

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Contacto",
    description:
      "Ponte en contacto con Oromiel Makeup en El Carmen de Chucurí, Santander. Escríbenos por WhatsApp o síguenos en redes sociales.",
    alternates: {
      canonical: `${SITE_URL}/contacto`,
    },
    openGraph: {
      type: "website",
      locale: "es_CO",
      url: `${SITE_URL}/contacto`,
      siteName: "Oromiel Makeup",
      title: "Contacto | Oromiel Makeup",
      description:
        "Ponte en contacto con Oromiel Makeup. Escríbenos por WhatsApp o síguenos en redes sociales.",
    },
    twitter: {
      card: "summary",
      title: "Contacto | Oromiel Makeup",
      description:
        "Ponte en contacto con Oromiel Makeup. Escríbenos por WhatsApp o síguenos en redes sociales.",
    },
  }
}

export default async function ContactPage() {
  const settings = await getSettings()

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: SITE_URL },
          { name: "Contacto", url: `${SITE_URL}/contacto` },
        ]}
      />
      <LocalBusinessJsonLd settings={settings} />
      <SiteShell settings={settings}>
        <ContactBody settings={settings} />
      </SiteShell>
    </>
  )
}
