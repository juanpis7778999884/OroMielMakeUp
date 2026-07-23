"use client"

import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"
import { FaInstagram } from "react-icons/fa"
import { buildWhatsAppUrl } from "@/lib/whatsapp"

export function CtaSection({ whatsapp, instagram }: { whatsapp?: string | null; instagram?: string | null }) {
  const igHandle = instagram || "oromiel_make.up"
  const igUrl = `https://instagram.com/${igHandle.replace("@", "")}`
  return (
    <section className="relative overflow-hidden bg-foreground">
      {/* Subtle texture */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,oklch(1_0_0/0.03),transparent)]" />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-8 px-5 py-24 text-center sm:px-8 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-6"
        >
          <h2 className="text-balance font-serif text-3xl font-light leading-[1.2] text-background md:text-4xl">
            Belleza que te hace brillar
          </h2>
          <p className="max-w-md text-pretty text-[0.88rem] font-light leading-[1.85] text-background/60">
            Síguenos para más novedades y escríbenos por WhatsApp para hacer tu pedido. ¡Te esperamos!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <a
            href={buildWhatsAppUrl(whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 rounded-full border border-background/20 bg-background/10 px-7 py-2.5 text-[0.75rem] font-light tracking-[0.14em] uppercase text-background backdrop-blur-sm transition-all duration-300 hover:bg-background/20"
          >
            <MessageCircle className="size-4" strokeWidth={1.5} />
            Escríbenos
          </a>
          <a
            href={igUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 rounded-full border border-background/20 px-7 py-2.5 text-[0.75rem] font-light tracking-[0.14em] uppercase text-background/70 transition-all duration-300 hover:border-background/40 hover:text-background"
          >
            <FaInstagram className="size-4" />
            {`@${igHandle.replace("@", "")}`}
          </a>
        </motion.div>
      </div>
    </section>
  )
}
