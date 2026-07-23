import Link from "next/link"
import { MapPin, Clock, Phone } from "lucide-react"
import { FaInstagram, FaFacebook } from "react-icons/fa"
import { BrandLogo } from "@/components/brand-logo"
import { instagramUrl, facebookUrl, whatsappUrl } from "@/lib/whatsapp"
import type { Settings } from "@/lib/types"

export function SiteFooter({ settings }: { settings?: Settings | null }) {
  return (
    <footer className="mt-0 border-t border-border/60 bg-background">
      {/* Editorial statement band */}
      <div className="mx-auto max-w-[1500px] border-b border-border/40 px-5 py-20 sm:px-8 sm:py-24 lg:px-14">
        <p className="eyebrow mb-6">Oromiel Makeup</p>
        <h2 className="max-w-3xl text-balance font-serif text-[2rem] font-light leading-[1.1] tracking-[-0.01em] text-foreground sm:text-4xl lg:text-5xl">
          {settings?.hero_title ?? "Belleza que te hace brillar"}
        </h2>
      </div>

      <div className="mx-auto grid max-w-[1500px] gap-12 px-5 pt-16 pb-12 sm:px-8 md:grid-cols-2 lg:grid-cols-12 lg:px-14">
        {/* Brand column */}
        <div className="lg:col-span-4">
          <BrandLogo size={32} />
          <p className="mt-6 max-w-xs text-[0.8rem] font-light leading-[1.8] text-muted-foreground">
            Tu nuevo lugar favorito para realzar tu belleza y cuidar tu piel en El Carmen de Chucurí.
          </p>
          {settings?.instagram && (
            <p className="mt-6 text-[0.7rem] font-light tracking-[0.15em] uppercase text-muted-foreground">
              {settings.instagram.startsWith("http") || settings.instagram.includes(".")
                ? settings.instagram
                : `@${settings.instagram}`}
            </p>
          )}
        </div>

        {/* Navigation */}
        <div className="lg:col-span-2 lg:col-start-6">
          <h3 className="mb-5 text-[0.7rem] font-medium tracking-[0.25em] uppercase text-foreground">
            Explorar
          </h3>
          <ul className="space-y-3 text-[0.8rem] font-light text-muted-foreground">
            <li>
              <Link href="/catalogo" className="transition-colors duration-300 hover:text-foreground">
                Catálogo
              </Link>
            </li>
            <li>
              <Link href="/promociones" className="transition-colors duration-300 hover:text-foreground">
                Promociones
              </Link>
            </li>
            <li>
              <Link href="/nosotros" className="transition-colors duration-300 hover:text-foreground">
                Nosotros
              </Link>
            </li>
            <li>
              <Link href="/contacto" className="transition-colors duration-300 hover:text-foreground">
                Contacto
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="lg:col-span-3">
          <h3 className="mb-5 text-[0.7rem] font-medium tracking-[0.25em] uppercase text-foreground">
            Contacto
          </h3>
          <ul className="space-y-4 text-[0.8rem] font-light text-muted-foreground">
            {settings?.address && (
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-3.5 shrink-0 text-muted-foreground/60" strokeWidth={1.5} />
                <span className="leading-relaxed">{settings.address}</span>
              </li>
            )}
            {settings?.hours && (
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 size-3.5 shrink-0 text-muted-foreground/60" strokeWidth={1.5} />
                <span className="leading-relaxed">{settings.hours}</span>
              </li>
            )}
            {settings?.whatsapp && (
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 size-3.5 shrink-0 text-muted-foreground/60" strokeWidth={1.5} />
                <a
                  href={whatsappUrl(settings.whatsapp)}
                  className="transition-colors duration-300 hover:text-foreground"
                >
                  WhatsApp
                </a>
              </li>
            )}
          </ul>
        </div>

        {/* Social */}
        <div className="lg:col-span-2">
          <h3 className="mb-5 text-[0.7rem] font-medium tracking-[0.25em] uppercase text-foreground">
            Síguenos
          </h3>
          <div className="flex gap-3">
            {settings?.instagram && (
              <a
                href={instagramUrl(settings.instagram)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex size-10 items-center justify-center border border-border/60 text-muted-foreground transition-all duration-500 hover:border-foreground hover:bg-foreground hover:text-background"
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
                className="flex size-10 items-center justify-center border border-border/60 text-muted-foreground transition-all duration-500 hover:border-foreground hover:bg-foreground hover:text-background"
              >
                <FaFacebook className="size-4" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/40">
        <div className="mx-auto flex max-w-[1500px] flex-col items-center justify-between gap-3 px-5 py-7 text-[0.68rem] font-light tracking-[0.08em] text-muted-foreground/60 sm:flex-row sm:px-8 lg:px-14">
          <p>&copy; {new Date().getFullYear()} Oromiel Makeup. Todos los derechos reservados.</p>
          <p>El Carmen de Chucurí, Santander</p>
        </div>
      </div>
    </footer>
  )
}
