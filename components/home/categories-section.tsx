"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import type { Category } from "@/lib/types"
import { ease } from "@/lib/animation"

const categoryImages: Record<string, string> = {
  maquillaje: "/images/cat-maquillaje.png",
  "cuidado-piel": "/images/cat-skincare.png",
}

const categoryBlurbs: Record<string, string> = {
  maquillaje: "Tonos, texturas y acabados para expresar tu estilo.",
  "cuidado-piel": "Rutinas y fórmulas para una piel sana y luminosa.",
}

export function CategoriesSection({ categories }: { categories: Category[] }) {
  if (!categories.length) return null
  return (
    <section className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 sm:py-28 lg:px-14">
      {/* Editorial header */}
      <div className="mb-14 flex flex-col justify-between gap-6 border-b border-border/50 pb-8 md:flex-row md:items-end">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="text-[0.62rem] font-light tracking-[0.24em] text-gold tabular-nums">01</span>
            <span className="h-px w-8 bg-gold/60" />
            <span className="eyebrow">Explora</span>
          </div>
          <h2 className="max-w-xl text-balance font-serif text-[2.5rem] font-light leading-[1.02] tracking-[-0.015em] text-foreground md:text-6xl">
            Nuestras <span className="italic text-gold">categorías</span>
          </h2>
        </div>
        <p className="max-w-xs text-[0.85rem] font-light leading-[1.8] text-muted-foreground md:text-right">
          Selecciones cuidadas de maquillaje y skincare pensadas para realzar tu belleza natural.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: i * 0.1, ease }}
          >
            <Link
              href={`/catalogo?categoria=${cat.slug}`}
              className="group relative block aspect-[4/5] overflow-hidden bg-secondary/60 shadow-luxe sm:aspect-[3/4]"
            >
              <Image
                src={cat.image_url || categoryImages[cat.slug] || "/assorted-cosmetics.png"}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/20 to-transparent transition-opacity duration-500 group-hover:from-espresso/85" />
              <div className="pointer-events-none absolute inset-4 border border-background/20 transition-colors duration-500 group-hover:border-gold/50" />

              {/* Big index numeral */}
              <span className="absolute left-7 top-6 font-serif text-5xl font-light leading-none text-background/40 tabular-nums transition-colors duration-500 group-hover:text-gold sm:left-9 sm:top-8" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-7 sm:p-9">
                <div className="min-w-0">
                  <h3 className="font-serif text-3xl font-light leading-none text-background sm:text-[2.75rem]">
                    {cat.name}
                  </h3>
                  <p className="mt-3 max-w-xs translate-y-1 text-[0.8rem] font-light leading-relaxed text-background/70 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {categoryBlurbs[cat.slug] || "Descubre nuestra selección."}
                  </p>
                </div>
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-background/40 text-background transition-all duration-500 group-hover:rotate-45 group-hover:border-gold group-hover:bg-gold group-hover:text-gold-foreground">
                  <ArrowUpRight className="size-5" strokeWidth={1.25} />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
