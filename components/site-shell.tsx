import type { ReactNode } from "react"
import { SiteNavbar } from "@/components/site-navbar"
import { SiteFooter } from "@/components/site-footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import type { Settings } from "@/lib/types"

export function SiteShell({
  children,
  settings,
}: {
  children: ReactNode
  settings?: Settings | null
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:m-2 focus:rounded-md focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
      >
        Saltar al contenido
      </a>
      <SiteNavbar />
      <main id="main-content" className="flex-1">{children}</main>
      <SiteFooter settings={settings} />
      <WhatsAppFloat settings={settings} />
    </div>
  )
}
