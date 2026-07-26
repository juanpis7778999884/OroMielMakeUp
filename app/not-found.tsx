import Link from "next/link"
import { SiteShell } from "@/components/site-shell"
import { getSettings } from "@/lib/data"

export default async function NotFound() {
  const settings = await getSettings()

  return (
    <SiteShell settings={settings}>
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
        <p className="eyebrow mb-4">Error 404</p>
        <h1 className="font-serif text-4xl font-light text-foreground md:text-5xl">
          Página no encontrada
        </h1>
        <p className="mt-4 max-w-md text-[0.85rem] font-light leading-relaxed text-muted-foreground">
          Lo sentimos, la página que buscas no existe o fue movida.
        </p>
        <Link
          href="/"
          className="mt-8 border-b border-foreground/30 pb-0.5 text-[0.78rem] font-light tracking-[0.12em] uppercase text-foreground transition-colors duration-300 hover:border-foreground/60"
        >
          Volver al inicio
        </Link>
      </div>
    </SiteShell>
  )
}
