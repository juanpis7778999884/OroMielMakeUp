"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu, Search } from "lucide-react"
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

export function SiteNavbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-border/40 bg-background/90 shadow-[0_1px_0_oklch(0_0_0/0.03)] backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-6 px-5 sm:h-20 sm:px-8 lg:px-12">
        <Link href="/" aria-label="Oromiel Makeup - Inicio">
          <BrandLogo size={36} />
        </Link>

        <nav className="hidden items-center gap-10 md:flex" aria-label="Navegación principal">
          {links.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative py-1 text-[0.8rem] font-light tracking-[0.14em] uppercase transition-colors duration-300",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-0.5 left-0 h-px w-full bg-foreground/60"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-1">
          <Button asChild variant="ghost" size="icon" className="hidden text-muted-foreground hover:text-foreground md:inline-flex">
            <Link href="/catalogo" aria-label="Buscar productos">
              <Search className="size-[18px]" strokeWidth={1.5} />
            </Link>
          </Button>
          <Button
            asChild
            className="hidden rounded-full bg-foreground px-6 py-2 text-[0.75rem] font-light tracking-[0.16em] uppercase text-background hover:bg-foreground/90 md:inline-flex"
          >
            <Link href="/catalogo">Tienda</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground md:hidden" aria-label="Abrir menú">
                <Menu className="size-5" strokeWidth={1.5} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 border-l-border/40 bg-background/95 backdrop-blur-xl">
              <SheetTitle className="sr-only">Menú</SheetTitle>
              <div className="mb-12 mt-2">
                <BrandLogo size={32} />
              </div>
              <nav className="flex flex-col gap-0" aria-label="Navegación móvil">
                {links.map((link, i) => {
                  const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "block border-b border-border/30 py-4 text-[0.8rem] font-light tracking-[0.18em] uppercase transition-colors",
                          active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  )
                })}
              </nav>
              <Button
                asChild
                className="mt-8 w-full rounded-full bg-foreground py-2.5 text-[0.75rem] font-light tracking-[0.16em] uppercase text-background hover:bg-foreground/90"
                onClick={() => setOpen(false)}
              >
                <Link href="/catalogo">Ver catálogo</Link>
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
