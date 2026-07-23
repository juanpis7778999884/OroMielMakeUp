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
    <section className="border-y border-border/30 bg-background">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-x-8 gap-y-10 px-5 py-14 sm:px-8 lg:grid-cols-4 lg:py-16">
        {values.map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-4 text-center"
          >
            <span className="flex size-10 items-center justify-center text-muted-foreground/50">
              <v.icon className="size-5" strokeWidth={1.2} />
            </span>
            <div>
              <h3 className="font-serif text-[1.05rem] font-normal text-foreground">{v.title}</h3>
              <p className="mt-1.5 text-[0.78rem] font-light leading-[1.7] text-muted-foreground">{v.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
