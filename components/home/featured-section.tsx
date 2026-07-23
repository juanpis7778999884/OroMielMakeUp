"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import type { Product } from "@/lib/types"

const ease = [0.22, 1, 0.36, 1] as const

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
      <div className="mx-auto max-w-[1500px] px-5 py-20 sm:px-8 sm:py-28 lg:px-14">
        {/* Editorial header */}
        <div className="mb-12 flex flex-col justify-between gap-6 border-b border-border/50 pb-8 sm:flex-row sm:items-end">
          <div>
            {subtitle && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-4 flex items-center gap-3"
              >
                <span className="h-px w-8 bg-gold/60" />
                <span className="eyebrow">{subtitle}</span>
              </motion.div>
            )}
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="font-serif text-4xl font-light leading-[1.05] tracking-[-0.01em] text-foreground md:text-5xl"
            >
              {title}
            </motion.h2>
          </div>
          <Link
            href={viewAllHref}
            className="group inline-flex items-center gap-2 pb-1 text-[0.72rem] font-light tracking-[0.18em] uppercase text-foreground"
          >
            <span className="link-underline">Ver todo</span>
            <ArrowRight className="size-3.5 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.5} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
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
      </div>
    </section>
  )
}
