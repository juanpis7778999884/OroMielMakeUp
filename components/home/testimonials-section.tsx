"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import type { Testimonial } from "@/lib/types"

const ease = [0.22, 1, 0.36, 1] as const

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  if (!testimonials.length) return null
  const [lead, ...rest] = testimonials

  return (
    <section className="grain relative overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_0%,oklch(0.83_0.066_80/0.12),transparent)]" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-28 lg:px-14">
        {/* Header */}
        <div className="mb-14 flex flex-col justify-between gap-6 border-b border-border/50 pb-8 md:flex-row md:items-end">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="text-[0.62rem] font-light tracking-[0.24em] text-gold tabular-nums">02</span>
              <span className="h-px w-8 bg-gold/60" />
              <span className="eyebrow">Testimonios</span>
            </div>
            <h2 className="max-w-xl text-balance font-serif text-[2.5rem] font-light leading-[1.02] tracking-[-0.015em] text-foreground md:text-6xl">
              Lo que dicen nuestras <span className="italic text-gold">clientas</span>
            </h2>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          {/* Lead testimonial */}
          <motion.figure
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease }}
            className="relative flex flex-col justify-between gap-10 overflow-hidden bg-espresso p-9 text-espresso-foreground shadow-luxe-lg sm:p-12"
          >
            <span className="pointer-events-none absolute -right-2 -top-8 font-serif text-[12rem] font-light leading-none text-gold/20">
              &rdquo;
            </span>
            <div className="relative z-10 flex flex-col gap-6">
              <div className="flex gap-1 text-gold" aria-label={`${lead.rating} de 5 estrellas`}>
                {Array.from({ length: lead.rating }).map((_, s) => (
                  <Star key={s} className="size-3.5 fill-current" />
                ))}
              </div>
              <blockquote className="max-w-xl font-serif text-[1.6rem] font-light italic leading-[1.45] text-espresso-foreground sm:text-[2rem]">
                {lead.content}
              </blockquote>
            </div>
            <figcaption className="relative z-10 border-t border-espresso-foreground/15 pt-6">
              <span className="block text-[0.82rem] font-medium tracking-wide text-espresso-foreground">{lead.author}</span>
              {lead.role && (
                <span className="mt-1 block text-[0.68rem] font-light tracking-[0.14em] uppercase text-espresso-foreground/55">
                  {lead.role}
                </span>
              )}
            </figcaption>
          </motion.figure>

          {/* Supporting testimonials */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            {rest.slice(0, 3).map((t, i) => (
              <motion.figure
                key={t.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease }}
                className="flex flex-col gap-4 border border-border/60 bg-card p-7 transition-colors duration-500 hover:border-gold/40"
              >
                <div className="flex items-center justify-between">
                  <div className="flex gap-1 text-gold" aria-label={`${t.rating} de 5 estrellas`}>
                    {Array.from({ length: t.rating }).map((_, s) => (
                      <Star key={s} className="size-3 fill-current" />
                    ))}
                  </div>
                  <span className="font-serif text-2xl font-light leading-none text-gold/40">&rdquo;</span>
                </div>
                <blockquote className="line-clamp-4 flex-1 font-serif text-[1.05rem] font-light italic leading-[1.55] text-foreground/85">
                  {t.content}
                </blockquote>
                <figcaption className="border-t border-border/40 pt-4">
                  <span className="block text-[0.76rem] font-medium tracking-wide text-foreground">{t.author}</span>
                  {t.role && (
                    <span className="mt-0.5 block text-[0.66rem] font-light tracking-[0.12em] uppercase text-muted-foreground">
                      {t.role}
                    </span>
                  )}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
