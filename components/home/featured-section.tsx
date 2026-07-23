"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ProductCard } from "@/components/product-card"
import type { Product } from "@/lib/types"

export function FeaturedSection({
  title,
  subtitle,
  products,
  whatsapp,
  viewAllHref = "/catalogo",
}: {
  title: string
  subtitle?: string
  products: Product[]
  whatsapp?: string | null
  viewAllHref?: string
}) {
  if (!products.length) return null
  return (
    <section className="bg-secondary/30">
      <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="mb-14 flex flex-col items-center gap-3 text-center">
          {subtitle && (
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[0.7rem] font-light tracking-[0.3em] uppercase text-muted-foreground"
            >
              {subtitle}
            </motion.span>
          )}
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-serif text-3xl font-light text-foreground md:text-4xl"
          >
            {title}
          </motion.h2>
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <ProductCard product={p} whatsapp={whatsapp} />
            </motion.div>
          ))}
        </div>
        <div className="mt-14 text-center">
          <Link
            href={viewAllHref}
            className="inline-block border-b border-foreground/30 pb-1 text-[0.78rem] font-light tracking-[0.12em] uppercase text-foreground transition-all duration-300 hover:border-foreground/70"
          >
            Ver todo el catálogo
          </Link>
        </div>
      </div>
    </section>
  )
}
