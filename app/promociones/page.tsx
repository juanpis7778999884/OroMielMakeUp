import type { Metadata } from "next"
import Image from "next/image"
import { Megaphone } from "lucide-react"
import { SiteShell } from "@/components/site-shell"
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

function formatDate(dateStr: string | null) {
  if (!dateStr) return null
  return new Date(dateStr).toLocaleDateString("es-CO", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
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
        <section className="mx-auto max-w-[1500px] px-5 py-16 sm:px-8 sm:py-24 lg:px-14">
          <div className="mb-14 max-w-2xl">
            <span className="text-[0.66rem] font-light tracking-[0.3em] uppercase text-gold">
              Ofertas especiales
            </span>
            <h1 className="mt-3 font-serif text-3xl font-light tracking-[-0.01em] text-foreground sm:text-5xl">
              Promociones
            </h1>
            <p className="mt-4 max-w-lg text-[0.88rem] font-light leading-[1.85] text-muted-foreground">
              Aprovecha nuestras ofertas y descuentos especiales en productos de maquillaje y cuidado personal.
            </p>
          </div>

          {promotions.length === 0 ? (
            <div className="border border-border/30 bg-background p-16 text-center">
              <Megaphone
                className="mx-auto size-10 text-muted-foreground/30"
                strokeWidth={1}
              />
              <h3 className="mt-5 text-[0.92rem] font-light text-foreground">
                No hay promociones disponibles
              </h3>
              <p className="mt-1.5 text-[0.82rem] font-light text-muted-foreground">
                Pronto tendremos ofertas especiales para ti.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {promotions.map((promo) => {
                const startFormatted = formatDate(promo.starts_at)
                const endFormatted = formatDate(promo.ends_at)

                return (
                  <div
                    key={promo.id}
                    className="group flex flex-col border border-border/30 bg-background transition-colors duration-300 hover:border-border/60"
                  >
                    {promo.banner_url && (
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-secondary/40">
                        <Image
                          src={promo.banner_url}
                          alt={promo.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          unoptimized
                        />
                      </div>
                    )}

                    <div className="flex flex-1 flex-col gap-3 p-6 sm:p-8">
                      {promo.discount_label && (
                        <span className="w-fit bg-foreground px-3 py-1 text-[0.62rem] font-light tracking-[0.2em] uppercase text-background">
                          {promo.discount_label}
                        </span>
                      )}

                      <h2 className="font-serif text-xl font-light text-foreground">
                        {promo.title}
                      </h2>

                      {promo.subtitle && (
                        <p className="text-[0.82rem] font-light text-muted-foreground">
                          {promo.subtitle}
                        </p>
                      )}

                      {promo.description && (
                        <p className="text-[0.82rem] font-light leading-[1.8] text-muted-foreground/80">
                          {promo.description}
                        </p>
                      )}

                      {startFormatted && endFormatted && (
                        <p className="mt-auto pt-3 text-[0.72rem] font-light tracking-wide text-muted-foreground/60">
                          {startFormatted} — {endFormatted}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </section>
      </SiteShell>
    </>
  )
}
