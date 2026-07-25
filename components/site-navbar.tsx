"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu, Search, ArrowUpRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { BrandLogo } from "@/components/brand-logo"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const links = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/promociones", label: "Promociones" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
]

const announcements = [
  "Entregas locales en El Carmen de Chucurí",
  "Asesoría de belleza personalizada",
  "Pedidos fáciles por WhatsApp",
  "Nuevos ingresos cada semana",
]

function AnnouncementBar() {
  return (
    <div className="relative overflow-hidden bg-espresso text-espresso-foreground">
      <div className="flex w-max animate-marquee-slow whitespace-nowrap py-2.5 will-change-transform">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex items-center" aria-hidden={dup === 1}>
            {announcements.map((a) => (
              <span key={a} className="flex items-center">
                <span className="px-6 text-[0.62rem] font-light tracking-[0.28em] uppercase text-espresso-foreground/80">
                  {a}
                </span>
                <span className="text-gold/70">&#10022;</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function SiteNavbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <AnnouncementBar />
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-border/70 bg-background/85 backdrop-blur-2xl"
            : "border-b border-border/30 bg-background/60 backdrop-blur-md",
        )}
      >
        <div
          className={cn(
            "mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-5 transition-[height] duration-500 sm:px-8 lg:px-14",
            scrolled ? "h-16 sm:h-[4.5rem]" : "h-[4.5rem] sm:h-24",
          )}
        >
          <Link href="/" aria-label="Oromiel Makeup - Inicio" className="shrink-0">
            <BrandLogo size={scrolled ? 34 : 40} />
          </Link>

          <nav className="hidden items-center gap-10 lg:flex" aria-label="Navegación principal">
            {links.map((link, i) => {
              const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "group relative flex items-center gap-1.5 py-1 text-[0.72rem] font-light tracking-[0.2em] uppercase transition-colors duration-300",
                    active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <span className="text-[0.58rem] tabular-nums text-gold/70">{String(i + 1).padStart(2, "0")}</span>
                  <span className="link-underline">{link.label}</span>
                  {active && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute -bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-gold"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="icon"
              className="hidden text-muted-foreground hover:bg-transparent hover:text-foreground sm:inline-flex"
              render={<Link href="/catalogo" aria-label="Buscar productos" />}
            >
              <Search className="size-[18px]" strokeWidth={1.25} />
            </Button>
            <Button
              className="group hidden items-center gap-2 rounded-none border border-foreground bg-transparent px-6 py-2 text-[0.68rem] font-light tracking-[0.22em] uppercase text-foreground transition-colors duration-500 hover:bg-foreground hover:text-background lg:inline-flex"
              render={<Link href="/catalogo" />}
            >
              Tienda
              <ArrowUpRight className="size-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
            </Button>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                render={
                  <Button variant="ghost" size="icon" className="text-foreground lg:hidden" aria-label="Abrir menú" />
                }
              >
                <Menu className="size-5" strokeWidth={1.5} />
              </SheetTrigger>
              <SheetContent
                side="right"
                className="grain w-[88%] max-w-md border-l-border/40 bg-background/97 px-0 backdrop-blur-2xl"
              >
                <SheetTitle className="sr-only">Menú</SheetTitle>
                <div className="relative z-10 flex h-full flex-col px-7 py-8">
                  <div className="mb-12">
                    <BrandLogo size={34} />
                  </div>
                  <nav className="flex flex-col" aria-label="Navegación móvil">
                    {links.map((link, i) => {
                      const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)
                      return (
                        <motion.div
                          key={link.href}
                          initial={{ opacity: 0, x: 16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.06 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <Link
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className={cn(
                              "group flex items-baseline gap-4 border-b border-border/40 py-5 transition-colors",
                              active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                            )}
                          >
                            <span className="text-[0.6rem] font-light tracking-[0.2em] text-gold tabular-nums">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="font-serif text-[1.75rem] font-light leading-none">{link.label}</span>
                            <ArrowUpRight
                              className="ml-auto size-4 translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                              strokeWidth={1.25}
                            />
                          </Link>
                        </motion.div>
                      )
                    })}
                  </nav>
                  <Button
                    render={<Link href="/catalogo" />}
                    className="mt-auto w-full rounded-none border border-foreground bg-foreground py-3.5 text-[0.7rem] font-light tracking-[0.22em] uppercase text-background hover:bg-transparent hover:text-foreground"
                    onClick={() => setOpen(false)}
                  >
                    Ver catálogo
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  )
}
