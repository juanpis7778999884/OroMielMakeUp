"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import type { Testimonial } from "@/lib/types"

export function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  if (!testimonials.length) return null
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
      <div className="mb-14 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[0.7rem] font-light tracking-[0.3em] uppercase text-muted-foreground"
        >
          Testimonios
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-3 font-serif text-3xl font-light text-foreground md:text-4xl"
        >
          Lo que dicen nuestras clientas
        </motion.h2>
      </div>
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
        {testimonials.map((t, i) => (
          <motion.figure
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            className="flex flex-col gap-5 border border-border/40 bg-background p-7 transition-all duration-500 hover:border-border/70 hover:shadow-[0_4px_30px_oklch(0_0_0/0.03)]"
          >
            <div className="flex gap-0.5 text-foreground/30" aria-label={`${t.rating} de 5 estrellas`}>
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="size-3.5 fill-current" />
              ))}
            </div>
            <blockquote className="flex-1 font-serif text-[1.05rem] font-light italic leading-[1.7] text-foreground/80">
              {`"${t.content}"`}
            </blockquote>
            <figcaption className="border-t border-border/30 pt-4">
              <span className="block text-[0.8rem] font-medium text-foreground">{t.author}</span>
              {t.role && <span className="mt-0.5 block text-[0.72rem] font-light text-muted-foreground">{t.role}</span>}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  )
}
