"use client"

import { motion } from "framer-motion"
import { Droplet, Sparkles, Heart, Truck } from "lucide-react"

const values = [
  { icon: Sparkles, title: "Calidad Premium", desc: "Productos seleccionados para resaltar tu belleza natural." },
  { icon: Droplet, title: "Cuidado de la Piel", desc: "Skincare para mantener tu piel sana y radiante." },
  { icon: Heart, title: "Asesoría Personalizada", desc: "Te guiamos para encontrar lo que necesitas." },
  { icon: Truck, title: "Entregas Locales", desc: "Coordina tu pedido fácilmente por WhatsApp." },
]

const ribbon = [
  "Maquillaje",
  "Cuidado de la piel",
  "Asesoría personalizada",
  "Entregas locales",
  "Belleza auténtica",
  "Skincare",
]

export function ValuesStrip() {
  return (
    <>
      {/* Bronze marquee ribbon */}
      <div className="grain relative overflow-hidden bg-gold text-gold-foreground">
        <div className="flex w-max animate-marquee whitespace-nowrap py-4 will-change-transform">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center" aria-hidden={dup === 1}>
              {ribbon.map((word) => (
                <span key={word} className="flex items-center">
                  <span className="px-8 font-serif text-2xl font-light italic sm:text-3xl">{word}</span>
                  <span className="text-gold-foreground/60">&#10022;</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Values */}
      <section className="border-b border-border/50 bg-secondary/40">
        <div className="mx-auto grid max-w-[1600px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex flex-col gap-6 border-b border-border/50 px-7 py-12 transition-colors duration-500 last:border-b-0 hover:bg-background sm:px-8 sm:py-16 lg:border-b-0 lg:border-l lg:first:border-l-0"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-3xl font-light leading-none text-gold/80 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex size-11 items-center justify-center rounded-full border border-border/70 transition-colors duration-500 group-hover:border-gold group-hover:bg-gold/10">
                  <v.icon className="size-5 text-muted-foreground/70 transition-colors duration-500 group-hover:text-gold" strokeWidth={1.1} />
                </span>
              </div>
              <div>
                <h3 className="font-serif text-[1.4rem] font-light text-foreground">{v.title}</h3>
                <p className="mt-2.5 text-[0.82rem] font-light leading-[1.8] text-muted-foreground">{v.desc}</p>
              </div>
              <span className="absolute bottom-0 left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full lg:block" />
            </motion.div>
          ))}
        </div>
      </section>
    </>
  )
}
