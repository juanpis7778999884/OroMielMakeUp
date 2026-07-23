"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import type { Testimonial } from "@/lib/types"

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  if (!testimonials.length) return null
  return (
    <section className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 sm:py-28 lg:px-14">
      {/* Editorial header */}
      <div className="mb-12 flex flex-col justify-between gap-6 border-b border-border/50 pb-8 md:flex-row md:items-end">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="text-[0.62rem] font-light tracking-[0.24em] text-gold tabular-nums">02</span>
            <span className="h-px w-8 bg-gold/60" />
            <span className="eyebrow">Testimonios</span>
          </div>
          <h2 className="max-w-xl text-balance font-serif text-4xl font-light leading-[1.05] tracking-[-0.01em] text-foreground md:text-5xl">
            Lo que dicen nuestras clientas
          </h2>
        </div>
      </div>

      <div className="grid gap-px overflow-hidden border border-border/50 bg-border/50 sm:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((t, i) => (
          <motion.figure
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            className="flex flex-col gap-6 bg-background p-8 transition-colors duration-500 hover:bg-secondary/40 sm:p-9"
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-1 text-gold" aria-label={`${t.rating} de 5 estrellas`}>
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Star key={s} className="size-3 fill-current" />
                ))}
              </div>
              <span className="font-serif text-3xl font-light leading-none text-border">&rdquo;</span>
            </div>
            <blockquote className="flex-1 font-serif text-[1.15rem] font-light italic leading-[1.6] text-foreground/85">
              {t.content}
            </blockquote>
            <figcaption className="border-t border-border/40 pt-5">
              <span className="block text-[0.78rem] font-medium tracking-wide text-foreground">{t.author}</span>
              {t.role && <span className="mt-1 block text-[0.7rem] font-light tracking-[0.1em] uppercase text-muted-foreground">{t.role}</span>}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  )
}
