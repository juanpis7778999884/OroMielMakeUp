"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { ease } from "@/lib/animation"

const points = [
  { k: "Curaduría", v: "Cada producto elegido a mano por su calidad." },
  { k: "Cercanía", v: "Atención humana y asesoría real, no un catálogo frío." },
]

export function PhilosophySection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"])

  return (
    <section ref={ref} className="grain relative overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_50%_50%_at_90%_20%,oklch(0.83_0.066_80/0.14),transparent)]" />

      <div className="relative z-10 mx-auto grid max-w-[1600px] items-center gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-2 lg:gap-20 lg:px-14">
        {/* Image side with parallax */}
        <div className="relative order-2 lg:order-1">
          <span className="pointer-events-none absolute -top-12 left-0 z-0 font-serif text-[6rem] font-light leading-none text-outline sm:text-[8rem]" aria-hidden="true">
            Oromiel
          </span>
          <div className="relative z-10 aspect-[4/5] w-full max-w-md overflow-hidden shadow-luxe-lg lg:aspect-[5/6]">
            <motion.div style={{ y }} className="absolute inset-0 h-[116%] -top-[8%]">
              <Image
                src="/images/about-store.png"
                alt="Atelier Oromiel Makeup"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </motion.div>
            <div className="pointer-events-none absolute inset-3 z-10 border border-background/25" />
          </div>
          {/* Floating script chip */}
          <div className="absolute -bottom-6 right-2 z-20 border border-border/60 bg-background/92 px-6 py-4 shadow-luxe backdrop-blur-md sm:right-6">
            <p className="font-script text-3xl text-gold">con amor</p>
          </div>
        </div>

        {/* Text side */}
        <div className="order-1 flex flex-col items-start gap-7 lg:order-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease }}
            className="flex items-center gap-3"
          >
            <span className="text-[0.62rem] font-light tracking-[0.24em] text-gold tabular-nums" aria-hidden="true">✦</span>
            <span className="h-px w-8 bg-gold/60" />
            <span className="eyebrow">Nuestra filosofía</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.75, delay: 0.05, ease }}
            className="max-w-xl text-balance font-serif text-[2.4rem] font-light leading-[1.08] tracking-[-0.015em] text-foreground sm:text-5xl lg:text-[3.5rem]"
          >
            Belleza pensada para <span className="italic text-gold">ti</span>, no para el molde.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="max-w-lg text-pretty text-[0.95rem] font-light leading-[1.95] text-muted-foreground"
          >
            En Oromiel creemos que realzar tu belleza empieza por cuidarte. Seleccionamos cada producto con
            cariño y te acompañamos en cada paso, desde el primer mensaje hasta que tu pedido llega a tus manos.
          </motion.p>

          <motion.dl
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            className="grid w-full max-w-lg gap-px overflow-hidden border border-border/60 bg-border/60 sm:grid-cols-2"
          >
            {points.map((p) => (
              <div key={p.k} className="flex flex-col gap-2 bg-background p-6">
                <dt className="text-[0.66rem] font-medium tracking-[0.22em] uppercase text-gold">{p.k}</dt>
                <dd className="text-[0.82rem] font-light leading-[1.7] text-muted-foreground">{p.v}</dd>
              </div>
            ))}
          </motion.dl>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.32, ease }}
          >
            <Link
              href="/nosotros"
              className="group inline-flex items-center gap-2.5 border-b border-foreground/30 pb-1 text-[0.72rem] font-light tracking-[0.2em] uppercase text-foreground transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              Conoce nuestra historia
              <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
