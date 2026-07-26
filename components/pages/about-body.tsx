"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Sparkles, Heart, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/reveal"
import type { Settings } from "@/lib/types"
import { ease } from "@/lib/animation"

const VALUES = [
  {
    icon: Sparkles,
    title: "Calidad",
    description:
      "Seleccionamos cada producto con cuidado para ofrecerte lo mejor en maquillaje y cuidado personal.",
  },
  {
    icon: Heart,
    title: "Cercanía",
    description:
      "Te acompañamos con asesoría personalizada para que encuentres justo lo que necesitas.",
  },
  {
    icon: MapPin,
    title: "Local",
    description:
      "Orgullosamente en El Carmen de Chucurí, Santander, realzando la belleza de nuestra comunidad.",
  },
]

export function AboutBody({ settings }: { settings?: Settings | null }) {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 sm:py-24 lg:px-14">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <span className="text-[0.66rem] font-light tracking-[0.3em] uppercase text-gold">
                Nuestra historia
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-3 font-serif text-3xl font-light leading-[1.1] tracking-[-0.01em] text-foreground sm:text-5xl">
                {settings?.hero_title ?? "Belleza que te hace brillar"}
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-6 space-y-4 text-[0.88rem] font-light leading-[1.85] text-muted-foreground">
                <p>
                  En Oromiel Makeup creemos que el maquillaje es una forma de expresión y
                  cuidado personal. Nacimos con la misión de acercar productos de belleza de
                  calidad a El Carmen de Chucurí y sus alrededores.
                </p>
                <p>
                  Cada producto de nuestro catálogo está pensado para ayudarte a realzar tu
                  belleza natural y cuidar tu piel, con la asesoría cercana que nos caracteriza.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-9 flex flex-wrap gap-4">
                <Button
                  render={<Link href="/catalogo" />}
                  className="rounded-none bg-foreground px-9 py-2.5 text-[0.7rem] font-light tracking-[0.22em] uppercase text-background transition-colors duration-500 hover:bg-foreground/85"
                >
                  Ver catálogo
                </Button>
                <Button
                  render={<Link href="/contacto" />}
                  variant="ghost"
                  className="rounded-none border border-border px-9 py-2.5 text-[0.7rem] font-light tracking-[0.22em] uppercase text-foreground transition-colors duration-500 hover:border-foreground hover:bg-transparent"
                >
                  Contáctanos
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-secondary/40 shadow-luxe">
              <Image
                src={settings?.hero_image_url ?? "/images/hero-makeup.png"}
                alt="Oromiel Makeup"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                unoptimized
              />
              <div className="pointer-events-none absolute inset-3 border border-background/20" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="border-t border-border/40 bg-background">
        <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 sm:py-24 lg:px-14">
          <Reveal>
            <div className="mb-14 max-w-2xl">
              <span className="text-[0.66rem] font-light tracking-[0.3em] uppercase text-gold">
                Lo que nos mueve
              </span>
              <h2 className="mt-3 font-serif text-2xl font-light tracking-[-0.01em] text-foreground sm:text-4xl">
                Nuestros valores
              </h2>
            </div>
          </Reveal>
          <div className="grid gap-8 sm:grid-cols-3">
            {VALUES.map((value, i) => (
              <Reveal key={value.title} delay={0.08 * i}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.4, ease }}
                  className="border border-border/30 bg-background p-8 transition-colors duration-500 hover:border-gold/40"
                >
                  <value.icon className="size-7 text-gold" strokeWidth={1.25} />
                  <h3 className="mt-5 font-serif text-lg font-light text-foreground">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-[0.82rem] font-light leading-[1.8] text-muted-foreground">
                    {value.description}
                  </p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
