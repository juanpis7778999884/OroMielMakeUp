"use client"

import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"
import { FaInstagram } from "react-icons/fa"
import { buildWhatsAppUrl } from "@/lib/whatsapp"

const ease = [0.22, 1, 0.36, 1] as const

export function CtaSection({ whatsapp, instagram }: { whatsapp?: string | null; instagram?: string | null }) {
  const igHandle = instagram || "oromiel_make.up"
  const igUrl = `https://instagram.com/${igHandle.replace("@", "")}`
  return (
    <section className="relative overflow-hidden bg-foreground text-background">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_20%,oklch(0.66_0.105_74/0.14),transparent)]" />

      <div className="relative mx-auto max-w-[1500px] px-5 py-24 sm:px-8 sm:py-32 lg:px-14">
        <div className="pointer-events-none absolute inset-x-5 inset-y-10 border border-background/10 sm:inset-x-8 lg:inset-x-14" />

        <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="flex flex-col items-center gap-6"
          >
            <span className="text-[0.66rem] font-light tracking-[0.3em] uppercase text-background/50">
              Hagamos tu pedido
            </span>
            <h2 className="text-balance font-serif text-4xl font-light leading-[1.05] tracking-[-0.01em] text-background md:text-6xl">
              Belleza que te hace
              <br className="hidden sm:block" /> <span className="italic">brillar</span>
            </h2>
            <p className="font-script text-3xl text-gold sm:text-4xl">escríbenos hoy</p>
            <p className="max-w-md text-pretty text-[0.88rem] font-light leading-[1.85] text-background/60">
              Síguenos para más novedades y escríbenos por WhatsApp para hacer tu pedido. ¡Te esperamos!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col gap-3 pt-2 sm:flex-row"
          >
            <a
              href={buildWhatsAppUrl(whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-none bg-background px-9 py-3 text-[0.7rem] font-light tracking-[0.2em] uppercase text-foreground transition-colors duration-500 hover:bg-background/90"
            >
              <MessageCircle className="size-4" strokeWidth={1.5} />
              Escríbenos
            </a>
            <a
              href={igUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-none border border-background/25 px-9 py-3 text-[0.7rem] font-light tracking-[0.2em] uppercase text-background/80 transition-colors duration-500 hover:border-background hover:text-background"
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
