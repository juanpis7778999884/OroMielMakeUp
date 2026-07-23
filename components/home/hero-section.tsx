"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

const ease = [0.22, 1, 0.36, 1] as const

export function HeroSection({ title, subtitle }: { title?: string | null; subtitle?: string | null }) {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Subtle decorative wash */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_78%_35%,oklch(0.66_0.105_74/0.06),transparent)]" />

      <div className="relative mx-auto grid max-w-[1500px] items-center gap-10 px-5 pt-20 pb-16 sm:px-8 md:grid-cols-[1.05fr_1fr] md:gap-12 md:pt-28 md:pb-24 lg:px-14 lg:pt-32 lg:pb-28">
        {/* Left: editorial text content */}
        <div className="flex flex-col items-start gap-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="flex items-center gap-3"
          >
            <span className="h-px w-8 bg-gold/60" />
            <span className="text-[0.66rem] font-light tracking-[0.28em] uppercase text-muted-foreground">
              El Carmen de Chucurí · Santander
            </span>
          </motion.div>

          <div>
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.1, ease }}
              className="max-w-xl text-balance font-serif text-[2.75rem] font-light leading-[1.02] tracking-[-0.015em] text-foreground sm:text-6xl lg:text-[4.25rem]"
            >
              {title || "Belleza que te hace brillar"}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.35, ease }}
              className="mt-3 font-script text-3xl text-gold sm:text-4xl"
            >
              belleza auténtica
            </motion.p>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            className="max-w-md text-pretty text-[0.95rem] font-light leading-[1.9] text-muted-foreground"
          >
            {subtitle || "Tu nuevo lugar favorito para realzar tu belleza y cuidar tu piel."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease }}
            className="flex flex-col gap-3 pt-1 sm:flex-row"
          >
            <Button
              asChild
              className="rounded-none bg-foreground px-9 py-2.5 text-[0.7rem] font-light tracking-[0.22em] uppercase text-background transition-colors duration-500 hover:bg-foreground/85"
            >
              <Link href="/catalogo">Descubrir</Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="rounded-none border border-border px-9 py-2.5 text-[0.7rem] font-light tracking-[0.22em] uppercase text-foreground transition-colors duration-500 hover:border-foreground hover:bg-transparent"
            >
              <Link href="/promociones">Promociones</Link>
            </Button>
          </motion.div>
        </div>

        {/* Right: asymmetric image composition */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.15, ease }}
          className="relative"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-lg overflow-hidden">
            <Image
              src="/images/hero-makeup.png"
              alt="Productos de maquillaje Oromiel"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="animate-slow-drift object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/25 to-transparent" />
            {/* Thin frame */}
            <div className="pointer-events-none absolute inset-3 border border-background/25" />
          </div>

          {/* Corner index label */}
          <div className="absolute -left-1 top-6 hidden -rotate-90 origin-left text-[0.6rem] font-light tracking-[0.3em] uppercase text-muted-foreground/70 md:block">
            Colección · MMXXVI
          </div>

          {/* Floating meta chip */}
          <div className="absolute -bottom-4 left-6 flex items-center gap-3 border border-border/60 bg-background/90 px-5 py-3 backdrop-blur-md sm:left-10">
            <span className="font-serif text-2xl font-light leading-none text-foreground">100%</span>
            <span className="text-[0.6rem] font-light leading-tight tracking-[0.16em] uppercase text-muted-foreground">
              Belleza
              <br />
              seleccionada
            </span>
          </div>
        </motion.div>
      </div>

      {/* Baseline meta row */}
      <div className="relative mx-auto flex max-w-[1500px] items-center justify-between gap-6 border-t border-border/50 px-5 py-5 text-[0.62rem] font-light tracking-[0.22em] uppercase text-muted-foreground/70 sm:px-8 lg:px-14">
        <span>Maquillaje</span>
        <span className="hidden sm:inline">Cuidado de la piel</span>
        <span className="hidden md:inline">Asesoría personalizada</span>
        <span>Entregas locales</span>
      </div>
    </section>
  )
}
