"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import type { Category } from "@/lib/types"

const categoryImages: Record<string, string> = {
  maquillaje: "/images/cat-maquillaje.png",
  "cuidado-piel": "/images/cat-skincare.png",
}

export function CategoriesSection({ categories }: { categories: Category[] }) {
  if (!categories.length) return null
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
          Explora
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-3 font-serif text-3xl font-light text-foreground md:text-4xl"
        >
          Nuestras Categorías
        </motion.h2>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
          >
            <Link
              href={`/catalogo?categoria=${cat.slug}`}
              className="group flex flex-col items-center gap-3 overflow-hidden rounded-sm bg-background p-3 text-center transition-all duration-500"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-sm bg-secondary/60">
                <Image
                  src={cat.image_url || categoryImages[cat.slug] || "/assorted-cosmetics.png"}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 16vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>
              <span className="pb-1 text-[0.78rem] font-light tracking-[0.08em] text-foreground transition-colors duration-300 group-hover:text-muted-foreground">
                {cat.name}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
