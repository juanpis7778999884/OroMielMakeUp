"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowDown, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const ease = [0.22, 1, 0.36, 1] as const

const stats = [
  { value: "100%", label: "Belleza\nseleccionada" },
  { value: "24/7", label: "Asesoría por\nWhatsApp" },
  { value: "El Carmen", label: "de Chucurí,\nSantander" },
]

export function HeroSection({ title, subtitle }: { title?: string | null; subtitle?: string | null }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const yMain = useTransform(scrollYProgress, [0, 1], [0, -70])
  const ySecondary = useTransform(scrollYProgress, [0, 1], [0, 60])
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0])

  const words = (title || "Belleza que te hace brillar").split(" ")

  return (
    <section ref={ref} className="grain relative overflow-hidden bg-background">
      {/* Decorative washes */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_60%_55%_at_82%_28%,oklch(0.63_0.112_72/0.1),transparent)]" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_50%_50%_at_8%_90%,oklch(0.83_0.066_80/0.14),transparent)]" />

      <div className="relative z-10 mx-auto grid max-w-[1600px] items-center gap-10 px-5 pt-14 pb-10 sm:px-8 md:grid-cols-[1.08fr_1fr] md:gap-14 md:pt-20 md:pb-16 lg:px-14 lg:pt-24">
        {/* Left: editorial text */}
        <div className="flex flex-col items-start gap-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="flex items-center gap-3"
          >
            <span className="h-px w-10 bg-gold" />
            <span className="text-[0.64rem] font-light tracking-[0.3em] uppercase text-muted-foreground">
              Atelier de Belleza · MMXXVI
            </span>
          </motion.div>

          <div>
            <h1 className="max-w-2xl text-balance font-serif text-[3rem] font-light leading-[0.98] tracking-[-0.02em] text-foreground sm:text-[4.25rem] lg:text-[5.25rem]">
              {words.map((word, i) => (
                <span key={`${word}-${i}`} className="mr-[0.22em] inline-block overflow-hidden align-bottom">
                  <motion.span
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, delay: 0.15 + i * 0.09, ease }}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.15 + words.length * 0.09, ease }}
              className="mt-2 font-script text-4xl text-gold sm:text-5xl"
            >
              belleza auténtica
            </motion.p>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
            className="max-w-md text-pretty text-[0.98rem] font-light leading-[1.9] text-muted-foreground"
          >
            {subtitle || "Tu nuevo lugar favorito para realzar tu belleza y cuidar tu piel."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.42, ease }}
            className="flex flex-col gap-3 pt-1 sm:flex-row"
          >
            <Button
              render={<Link href="/catalogo" />}
              className="group flex items-center gap-2.5 rounded-none bg-foreground px-9 py-3 text-[0.7rem] font-light tracking-[0.22em] uppercase text-background transition-colors duration-500 hover:bg-espresso"
            >
              Descubrir la colección
              <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
            </Button>
            <Button
              render={<Link href="/promociones" />}
              variant="ghost"
              className="rounded-none border border-border px-9 py-3 text-[0.7rem] font-light tracking-[0.22em] uppercase text-foreground transition-colors duration-500 hover:border-foreground hover:bg-transparent"
            >
              Promociones
            </Button>
          </motion.div>

          {/* Stats row */}
          <motion.dl
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease }}
            className="mt-4 grid w-full max-w-md grid-cols-3 gap-4 border-t border-border/60 pt-6"
          >
            {stats.map((s) => (
              <div key={s.value} className="flex flex-col gap-1">
                <dt className="font-serif text-2xl font-light leading-none text-foreground">{s.value}</dt>
                <dd className="whitespace-pre-line text-[0.58rem] font-light leading-tight tracking-[0.16em] uppercase text-muted-foreground/80">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* Right: layered image composition */}
        <motion.div style={{ opacity }} className="relative mx-auto w-full max-w-lg">
          {/* Decorative outlined numeral */}
          <span className="pointer-events-none absolute -left-6 -top-10 z-0 font-serif text-[7rem] font-light leading-none text-outline sm:-left-10 sm:text-[9rem]">
            01
          </span>

          <motion.div
            style={{ y: yMain }}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.2, ease }}
            className="relative z-10 aspect-[4/5] w-full overflow-hidden shadow-luxe-lg"
          >
            <Image
              src="/images/hero-makeup.png"
              alt="Productos de maquillaje Oromiel"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 45vw"
              className="animate-slow-drift object-cover"
            />
            <div className="pointer-events-none absolute inset-3 border border-background/25" />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-espresso/30 to-transparent" />
          </motion.div>

          {/* Floating secondary image */}
          <motion.div
            style={{ y: ySecondary }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease }}
            className="absolute -bottom-10 -right-3 z-20 hidden aspect-[3/4] w-36 overflow-hidden shadow-luxe sm:block lg:w-44"
          >
            <Image
              src="/images/cat-skincare.png"
              alt="Cuidado de la piel Oromiel"
              fill
              sizes="180px"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-2 border border-background/30" />
          </motion.div>

          {/* Vertical side label */}
          <span className="vertical-rl absolute -left-3 top-1/2 z-20 hidden -translate-y-1/2 text-[0.6rem] font-light tracking-[0.35em] uppercase text-muted-foreground/70 lg:block">
            Maquillaje · Skincare
          </span>

          {/* Floating meta chip */}
          <div className="absolute -bottom-5 left-4 z-30 flex items-center gap-3 border border-border/60 bg-background/90 px-5 py-3 shadow-luxe backdrop-blur-md">
            <span className="font-serif text-3xl font-light leading-none text-gold">✦</span>
            <span className="text-[0.58rem] font-light leading-tight tracking-[0.16em] uppercase text-muted-foreground">
              Hecho con
              <br />
              amor local
            </span>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="relative z-10 mx-auto flex max-w-[1600px] items-center gap-3 px-5 pb-6 text-[0.6rem] font-light tracking-[0.28em] uppercase text-muted-foreground/70 sm:px-8 lg:px-14">
        <ArrowDown className="size-3.5 animate-bounce text-gold" strokeWidth={1.5} />
        Desliza para explorar
      </div>
    </section>
  )
}
