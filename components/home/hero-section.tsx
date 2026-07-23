"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { BrandMark } from "@/components/brand-logo"

export function HeroSection({ title, subtitle }: { title?: string | null; subtitle?: string | null }) {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Subtle decorative gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_40%,oklch(0.55_0.07_65/0.04),transparent)]" />

      <div className="relative mx-auto grid max-w-[1400px] items-center gap-12 px-5 pt-24 pb-20 sm:px-8 md:grid-cols-[1fr_1.1fr] md:pt-32 md:pb-28 lg:px-12 lg:pt-40 lg:pb-32">
        {/* Left: editorial text content */}
        <div className="flex flex-col items-start gap-8 text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/60 px-4 py-1.5 text-[0.68rem] font-light tracking-[0.2em] uppercase text-muted-foreground backdrop-blur-sm">
              El Carmen de Chucurí, Santander
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-lg text-balance font-serif text-[2.5rem] font-light leading-[1.1] tracking-[-0.01em] text-foreground sm:text-5xl lg:text-[3.5rem]"
          >
            {title || "Belleza que te hace brillar"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-md text-pretty text-[0.95rem] font-light leading-[1.85] text-muted-foreground"
          >
            {subtitle || "Tu nuevo lugar favorito para realzar tu belleza y cuidar tu piel."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <Button
              asChild
              className="rounded-full bg-foreground px-8 py-2.5 text-[0.75rem] font-light tracking-[0.16em] uppercase text-background hover:bg-foreground/90"
            >
              <Link href="/catalogo">Descubrir</Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="rounded-full border border-border/60 px-8 py-2.5 text-[0.75rem] font-light tracking-[0.16em] uppercase text-foreground hover:bg-foreground/5"
            >
              <Link href="/promociones">Promociones</Link>
            </Button>
          </motion.div>
        </div>

        {/* Right: asymmetric image composition */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-lg overflow-hidden">
            <Image
              src="/images/hero-makeup.png"
              alt="Productos de maquillaje Oromiel"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            {/* Subtle overlay gradient at bottom */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/20 to-transparent" />
          </div>

          {/* Floating brand mark */}
          <div className="absolute -bottom-3 left-8 flex items-center gap-2.5 rounded-full border border-border/40 bg-background/80 px-4 py-2 shadow-[0_2px_20px_oklch(0_0_0/0.04)] backdrop-blur-md sm:left-12">
            <BrandMark className="size-5" />
            <span className="font-serif text-sm font-light tracking-wide text-foreground">Oromiel</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
