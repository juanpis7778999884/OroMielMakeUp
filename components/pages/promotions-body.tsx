"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Megaphone } from "lucide-react"
import { Reveal } from "@/components/reveal"
import type { Promotion } from "@/lib/types"
import { ease } from "@/lib/animation"

function formatDate(dateStr: string | null) {
  if (!dateStr) return null
  return new Date(dateStr).toLocaleDateString("es-CO", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export function PromotionsBody({ promotions }: { promotions: Promotion[] }) {
  return (
    <section className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 sm:py-24 lg:px-14">
      <Reveal>
        <div className="mb-14 max-w-2xl">
          <span className="text-[0.66rem] font-light tracking-[0.3em] uppercase text-gold">
            Ofertas especiales
          </span>
          <h1 className="mt-3 font-serif text-3xl font-light tracking-[-0.01em] text-foreground sm:text-5xl">
            Promociones
          </h1>
          <p className="mt-4 max-w-lg text-[0.88rem] font-light leading-[1.85] text-muted-foreground">
            Aprovecha nuestras ofertas y descuentos especiales en productos de maquillaje y cuidado personal.
          </p>
        </div>
      </Reveal>

      {promotions.length === 0 ? (
        <Reveal delay={0.1}>
          <div className="border border-border/30 bg-background p-16 text-center">
            <Megaphone
              className="mx-auto size-10 text-muted-foreground/30"
              strokeWidth={1}
            />
            <h3 className="mt-5 text-[0.92rem] font-light text-foreground">
              No hay promociones disponibles
            </h3>
            <p className="mt-1.5 text-[0.82rem] font-light text-muted-foreground">
              Pronto tendremos ofertas especiales para ti.
            </p>
          </div>
        </Reveal>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {promotions.map((promo, i) => {
            const startFormatted = formatDate(promo.starts_at)
            const endFormatted = formatDate(promo.ends_at)

            return (
              <Reveal key={promo.id} delay={0.06 * i}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.4, ease }}
                  className="group flex h-full flex-col border border-border/30 bg-background transition-colors duration-500 hover:border-gold/30 hover:shadow-luxe"
                >
                  {promo.banner_url && (
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-secondary/40">
                      <Image
                        src={promo.banner_url}
                        alt={promo.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        unoptimized
                      />
                    </div>
                  )}

                  <div className="flex flex-1 flex-col gap-3 p-6 sm:p-8">
                    {promo.discount_label && (
                      <span className="w-fit bg-foreground px-3 py-1 text-[0.62rem] font-light tracking-[0.2em] uppercase text-background">
                        {promo.discount_label}
                      </span>
                    )}

                    <h2 className="font-serif text-xl font-light text-foreground">
                      {promo.title}
                    </h2>

                    {promo.subtitle && (
                      <p className="text-[0.82rem] font-light text-muted-foreground">
                        {promo.subtitle}
                      </p>
                    )}

                    {promo.description && (
                      <p className="text-[0.82rem] font-light leading-[1.8] text-muted-foreground/80">
                        {promo.description}
                      </p>
                    )}

                    {startFormatted && endFormatted && (
                      <p className="mt-auto pt-3 text-[0.72rem] font-light tracking-wide text-muted-foreground/60">
                        {startFormatted} — {endFormatted}
                      </p>
                    )}
                  </div>
                </motion.div>
              </Reveal>
            )
          })}
        </div>
      )}
    </section>
  )
}
