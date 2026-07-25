import Link from "next/link"
import { MapPin, Clock, ArrowUpRight } from "lucide-react"
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa"
import { BrandLogo } from "@/components/brand-logo"
import { instagramUrl, facebookUrl, whatsappUrl } from "@/lib/whatsapp"
import type { Settings } from "@/lib/types"

export function SiteFooter({ settings }: { settings?: Settings | null }) {
  const igHandle = settings?.instagram
    ? settings.instagram.startsWith("http") || settings.instagram.includes(".")
      ? settings.instagram
      : `@${settings.instagram.replace("@", "")}`
    : null

  return (
    <footer className="grain relative overflow-hidden bg-espresso text-espresso-foreground">
      {/* Warm decorative wash */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_60%_50%_at_15%_0%,oklch(0.63_0.112_72/0.16),transparent)]" />

      {/* Statement band */}
      <div className="relative z-10 mx-auto max-w-[1600px] border-b border-espresso-foreground/12 px-5 py-20 sm:px-8 sm:py-28 lg:px-14">
        <div className="flex flex-col gap-3">
          <span className="flex items-center gap-3 text-[0.66rem] font-light tracking-[0.3em] uppercase text-espresso-foreground/55">
            <span className="h-px w-8 bg-gold/70" />
            Oromiel Makeup
          </span>
          <h2 className="max-w-4xl text-balance font-serif text-[2.4rem] font-light leading-[1.05] tracking-[-0.01em] text-espresso-foreground sm:text-5xl lg:text-[4rem]">
            {settings?.hero_title ?? "Belleza que te hace brillar"}
          </h2>
          {settings?.whatsapp && (
            <a
              href={whatsappUrl(settings.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex w-fit items-center gap-3 rounded-none bg-gold px-8 py-3.5 text-[0.7rem] font-light tracking-[0.22em] uppercase text-gold-foreground transition-colors duration-500 hover:bg-champagne hover:text-espresso"
            >
              <FaWhatsapp className="size-4" />
              Hacer un pedido
              <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
            </a>
          )}
        </div>
      </div>

      {/* Columns */}
      <div className="relative z-10 mx-auto grid max-w-[1600px] gap-12 px-5 pt-16 pb-14 sm:px-8 md:grid-cols-2 lg:grid-cols-12 lg:px-14">
        <div className="lg:col-span-4">
          <BrandLogo size={34} className="[&_span]:text-espresso-foreground" />
          <p className="mt-6 max-w-xs text-[0.82rem] font-light leading-[1.85] text-espresso-foreground/60">
            Tu nuevo lugar favorito para realzar tu belleza y cuidar tu piel en El Carmen de Chucurí, Santander.
          </p>
        </div>

        <div className="lg:col-span-2 lg:col-start-6">
          <h3 className="mb-5 text-[0.66rem] font-medium tracking-[0.26em] uppercase text-espresso-foreground/45">
            Explorar
          </h3>
          <ul className="space-y-3.5 text-[0.82rem] font-light text-espresso-foreground/70">
            {[
              { href: "/catalogo", label: "Catálogo" },
              { href: "/promociones", label: "Promociones" },
              { href: "/nosotros", label: "Nosotros" },
              { href: "/contacto", label: "Contacto" },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="link-underline transition-colors duration-300 hover:text-espresso-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="mb-5 text-[0.66rem] font-medium tracking-[0.26em] uppercase text-espresso-foreground/45">
            Visítanos
          </h3>
          <ul className="space-y-4 text-[0.82rem] font-light text-espresso-foreground/70">
            {settings?.address && (
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-3.5 shrink-0 text-gold/70" strokeWidth={1.5} />
                <span className="leading-relaxed">{settings.address}</span>
              </li>
            )}
            {settings?.hours && (
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 size-3.5 shrink-0 text-gold/70" strokeWidth={1.5} />
                <span className="leading-relaxed">{settings.hours}</span>
              </li>
            )}
            {!settings?.address && !settings?.hours && (
              <li className="leading-relaxed">El Carmen de Chucurí, Santander, Colombia</li>
            )}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h3 className="mb-5 text-[0.66rem] font-medium tracking-[0.26em] uppercase text-espresso-foreground/45">
            Síguenos
          </h3>
          {igHandle && <p className="mb-4 text-[0.78rem] font-light text-espresso-foreground/70">{igHandle}</p>}
          <div className="flex gap-3">
            {settings?.instagram && (
              <a
                href={instagramUrl(settings.instagram)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex size-10 items-center justify-center border border-espresso-foreground/20 text-espresso-foreground/75 transition-all duration-500 hover:border-gold hover:bg-gold hover:text-gold-foreground"
              >
                <FaInstagram className="size-4" />
              </a>
            )}
            {settings?.facebook && (
              <a
                href={facebookUrl(settings.facebook)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex size-10 items-center justify-center border border-espresso-foreground/20 text-espresso-foreground/75 transition-all duration-500 hover:border-gold hover:bg-gold hover:text-gold-foreground"
              >
                <FaFacebook className="size-4" />
              </a>
            )}
            {settings?.whatsapp && (
              <a
                href={whatsappUrl(settings.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex size-10 items-center justify-center border border-espresso-foreground/20 text-espresso-foreground/75 transition-all duration-500 hover:border-gold hover:bg-gold hover:text-gold-foreground"
              >
                <FaWhatsapp className="size-4" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Oversized brand wordmark */}
      <div className="relative z-10 overflow-hidden border-t border-espresso-foreground/12 px-5 pt-10 sm:px-8 lg:px-14">
        <p className="select-none text-center font-serif text-[19vw] font-light leading-[0.85] tracking-[-0.02em] text-espresso-foreground/[0.06] lg:text-[15rem]">
          Oromiel
        </p>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-espresso-foreground/12">
        <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-3 px-5 py-7 text-[0.66rem] font-light tracking-[0.08em] text-espresso-foreground/45 sm:flex-row sm:px-8 lg:px-14">
          <p>&copy; {new Date().getFullYear()} Oromiel Makeup. Todos los derechos reservados.</p>
          <p>El Carmen de Chucurí, Santander</p>
        </div>
      </div>
    </footer>
  )
}
