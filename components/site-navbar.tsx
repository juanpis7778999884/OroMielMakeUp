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
          ? "border-b border-border/60 bg-background/85 backdrop-blur-2xl"
          : "border-b border-transparent bg-background/40 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between gap-6 px-5 sm:h-20 sm:px-8 lg:px-14">
        <Link href="/" aria-label="Oromiel Makeup - Inicio" className="shrink-0">
          <BrandLogo size={36} />
        </Link>

        <nav className="hidden items-center gap-11 md:flex" aria-label="Navegación principal">
          {links.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "link-underline relative py-1 text-[0.72rem] font-light tracking-[0.22em] uppercase transition-colors duration-300",
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

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="hidden text-muted-foreground hover:bg-transparent hover:text-foreground md:inline-flex"
            render={<Link href="/catalogo" aria-label="Buscar productos" />}
          >
            <Search className="size-[18px]" strokeWidth={1.25} />
          </Button>
          <Button
            className="group hidden rounded-none border border-foreground bg-transparent px-7 py-2 text-[0.7rem] font-light tracking-[0.22em] uppercase text-foreground transition-colors duration-500 hover:bg-foreground hover:text-background md:inline-flex"
            render={<Link href="/catalogo" />}
          >
            Tienda
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" className="text-foreground md:hidden" aria-label="Abrir menú" />
              }
            >
              <Menu className="size-5" strokeWidth={1.5} />
            </SheetTrigger>
            <SheetContent side="right" className="w-[85%] max-w-sm border-l-border/40 bg-background/97 px-7 backdrop-blur-2xl">
              <SheetTitle className="sr-only">Menú</SheetTitle>
              <div className="mb-14 mt-2">
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
                          "flex items-baseline gap-4 border-b border-border/30 py-5 transition-colors",
                          active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                        )}
                      >
                        <span className="text-[0.6rem] font-light tracking-[0.2em] text-gold tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-serif text-2xl font-light">{link.label}</span>
                      </Link>
                    </motion.div>
                  )
                })}
              </nav>
              <Button
                render={<Link href="/catalogo" />}
                className="mt-10 w-full rounded-none border border-foreground bg-foreground py-3 text-[0.7rem] font-light tracking-[0.22em] uppercase text-background hover:bg-transparent hover:text-foreground"
                onClick={() => setOpen(false)}
              >
                Ver catálogo
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
