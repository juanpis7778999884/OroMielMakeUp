"use client"

import { motion } from "framer-motion"
import { Droplet, Sparkles, Heart, Truck } from "lucide-react"

const values = [
  { icon: Sparkles, title: "Calidad Premium", desc: "Productos seleccionados para resaltar tu belleza natural." },
  { icon: Droplet, title: "Cuidado de la Piel", desc: "Skincare para mantener tu piel sana y radiante." },
  { icon: Heart, title: "Asesoría Personalizada", desc: "Te guiamos para encontrar lo que necesitas." },
  { icon: Truck, title: "Entregas Locales", desc: "Coordina tu pedido fácilmente por WhatsApp." },
]

export function ValuesStrip() {
  return (
    <section className="border-y border-border/50 bg-secondary/40">
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="group flex flex-col gap-5 border-b border-border/50 px-6 py-12 transition-colors duration-500 last:border-b-0 hover:bg-background sm:px-8 sm:py-14 lg:border-b-0 lg:border-l lg:first:border-l-0"
          >
            <div className="flex items-center justify-between">
              <span className="text-[0.62rem] font-light tracking-[0.24em] text-gold tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <v.icon className="size-5 text-muted-foreground/50 transition-colors duration-500 group-hover:text-foreground" strokeWidth={1.1} />
            </div>
            <div>
              <h3 className="font-serif text-[1.3rem] font-light text-foreground">{v.title}</h3>
              <p className="mt-2 text-[0.8rem] font-light leading-[1.75] text-muted-foreground">{v.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
