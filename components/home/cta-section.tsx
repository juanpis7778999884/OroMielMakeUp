"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { FaInstagram, FaWhatsapp } from "react-icons/fa"
import { buildWhatsAppUrl } from "@/lib/whatsapp"

const ease = [0.22, 1, 0.36, 1] as const

export function CtaSection({ whatsapp, instagram }: { whatsapp?: string | null; instagram?: string | null }) {
  const igHandle = instagram || "oromiel_make.up"
  const igUrl = `https://instagram.com/${igHandle.replace("@", "")}`

  return (
    <section className="grain relative overflow-hidden bg-espresso text-espresso-foreground">
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_65%_65%_at_50%_15%,oklch(0.63_0.112_72/0.2),transparent)]" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_45%_45%_at_85%_90%,oklch(0.83_0.066_80/0.1),transparent)]" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-5 py-24 sm:px-8 sm:py-36 lg:px-14">
        <div className="pointer-events-none absolute inset-x-5 inset-y-12 z-0 border border-espresso-foreground/10 sm:inset-x-8 lg:inset-x-14" />

        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="flex items-center gap-3 text-[0.66rem] font-light tracking-[0.3em] uppercase text-espresso-foreground/55"
          >
            <span className="h-px w-8 bg-gold/70" />
            Hagamos tu pedido
            <span className="h-px w-8 bg-gold/70" />
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.08, ease }}
            className="text-balance font-serif text-[2.75rem] font-light leading-[1.02] tracking-[-0.02em] text-espresso-foreground sm:text-6xl lg:text-7xl"
          >
            Belleza que te hace
            <br className="hidden sm:block" /> <span className="italic text-gold">brillar</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="font-script text-4xl text-champagne sm:text-5xl"
          >
            escríbenos hoy
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.28, ease }}
            className="max-w-md text-pretty text-[0.9rem] font-light leading-[1.9] text-espresso-foreground/60"
          >
            Síguenos para más novedades y escríbenos por WhatsApp para hacer tu pedido. Te esperamos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.36, ease }}
            className="flex flex-col gap-3 pt-2 sm:flex-row"
          >
            <a
              href={buildWhatsAppUrl(whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 rounded-none bg-gold px-9 py-3.5 text-[0.7rem] font-light tracking-[0.2em] uppercase text-gold-foreground transition-colors duration-500 hover:bg-champagne hover:text-espresso"
            >
              <FaWhatsapp className="size-4" />
              Escríbenos
              <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
            </a>
            <a
              href={igUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-none border border-espresso-foreground/25 px-9 py-3.5 text-[0.7rem] font-light tracking-[0.2em] uppercase text-espresso-foreground/80 transition-colors duration-500 hover:border-gold hover:text-espresso-foreground"
            >
              <FaInstagram className="size-4" />
              {`@${igHandle.replace("@", "")}`}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
