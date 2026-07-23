"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import type { Category } from "@/lib/types"

const categoryImages: Record<string, string> = {
  maquillaje: "/images/cat-maquillaje.png",
  "cuidado-piel": "/images/cat-skincare.png",
}

const ease = [0.22, 1, 0.36, 1] as const

export function CategoriesSection({ categories }: { categories: Category[] }) {
  if (!categories.length) return null
  return (
    <section className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 sm:py-28 lg:px-14">
      {/* Editorial header */}
      <div className="mb-12 flex flex-col justify-between gap-6 border-b border-border/50 pb-8 md:flex-row md:items-end">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="text-[0.62rem] font-light tracking-[0.24em] text-gold tabular-nums">01</span>
            <span className="h-px w-8 bg-gold/60" />
            <span className="eyebrow">Explora</span>
          </div>
          <h2 className="max-w-lg text-balance font-serif text-4xl font-light leading-[1.05] tracking-[-0.01em] text-foreground md:text-5xl">
            Nuestras Categorías
          </h2>
        </div>
        <p className="max-w-xs text-[0.85rem] font-light leading-[1.8] text-muted-foreground md:text-right">
          Descubre selecciones cuidadas de maquillaje y skincare pensadas para realzar tu belleza natural.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease }}
          >
            <Link
              href={`/catalogo?categoria=${cat.slug}`}
              className="group relative block aspect-[4/5] overflow-hidden bg-secondary/60 sm:aspect-[3/4]"
            >
              <Image
                src={cat.image_url || categoryImages[cat.slug] || "/assorted-cosmetics.png"}
                alt={cat.name}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
              <div className="pointer-events-none absolute inset-4 border border-background/20 transition-colors duration-500 group-hover:border-background/40" />

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-7 sm:p-9">
                <div>
                  <span className="text-[0.6rem] font-light tracking-[0.24em] uppercase text-background/70 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-serif text-3xl font-light leading-none text-background sm:text-4xl">
                    {cat.name}
                  </h3>
                </div>
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-background/40 text-background transition-all duration-500 group-hover:bg-background group-hover:text-foreground">
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
