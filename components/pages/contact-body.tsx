"use client"

import { motion } from "framer-motion"
import { MapPin, Clock, MessageCircle } from "lucide-react"
import { FaInstagram, FaFacebook } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/reveal"
import { whatsappUrl, instagramUrl, facebookUrl } from "@/lib/whatsapp"
import type { Settings } from "@/lib/types"
import { ease } from "@/lib/animation"

export function ContactBody({ settings }: { settings?: Settings | null }) {
  return (
    <section className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 sm:py-24 lg:px-14">
      <Reveal>
        <div className="mb-14 max-w-2xl">
          <span className="text-[0.66rem] font-light tracking-[0.3em] uppercase text-gold">
            Estamos para ayudarte
          </span>
          <h1 className="mt-3 font-serif text-3xl font-light tracking-[-0.01em] text-foreground sm:text-5xl">
            Contacto
          </h1>
          <p className="mt-4 max-w-lg text-[0.88rem] font-light leading-[1.85] text-muted-foreground">
            ¿Tienes una pregunta sobre nuestros productos? Escríbenos por WhatsApp o
            visítanos en nuestra tienda. Con gusto te asesoramos.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
        {/* Contact details */}
        <div className="flex flex-col gap-6">
          {settings?.address && (
            <Reveal delay={0.05}>
              <div className="flex items-start gap-4 border border-border/30 bg-background p-6 transition-colors duration-500 hover:border-gold/30">
                <MapPin className="mt-0.5 size-5 shrink-0 text-gold" strokeWidth={1.5} />
                <div>
                  <h2 className="text-[0.7rem] font-medium tracking-[0.22em] uppercase text-foreground">
                    Dirección
                  </h2>
                  <p className="mt-2 text-[0.85rem] font-light leading-relaxed text-muted-foreground">
                    {settings.address}
                  </p>
                </div>
              </div>
            </Reveal>
          )}

          {settings?.hours && (
            <Reveal delay={0.1}>
              <div className="flex items-start gap-4 border border-border/30 bg-background p-6 transition-colors duration-500 hover:border-gold/30">
                <Clock className="mt-0.5 size-5 shrink-0 text-gold" strokeWidth={1.5} />
                <div>
                  <h2 className="text-[0.7rem] font-medium tracking-[0.22em] uppercase text-foreground">
                    Horario
                  </h2>
                  <p className="mt-2 text-[0.85rem] font-light leading-relaxed text-muted-foreground">
                    {settings.hours}
                  </p>
                </div>
              </div>
            </Reveal>
          )}

          <Reveal delay={0.15}>
            <div className="flex flex-col gap-5 border border-border/30 bg-background p-6">
              {settings?.whatsapp && (
                <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.3, ease }}>
                  <Button
                    render={
                      <a
                        href={whatsappUrl(settings.whatsapp)}
                        target="_blank"
                        rel="noopener noreferrer"
                      />
                    }
                    className="w-full gap-2 rounded-none bg-foreground py-3 text-[0.7rem] font-light tracking-[0.22em] uppercase text-background transition-colors duration-500 hover:bg-foreground/85"
                  >
                    <MessageCircle className="size-4" strokeWidth={1.5} />
                    Escríbenos por WhatsApp
                  </Button>
                </motion.div>
              )}

              {(settings?.instagram || settings?.facebook) && (
                <div>
                  <h2 className="mb-3 text-[0.7rem] font-medium tracking-[0.22em] uppercase text-foreground">
                    Síguenos
                  </h2>
                  <div className="flex gap-3">
                    {settings?.instagram && (
                      <motion.a
                        href={instagramUrl(settings.instagram)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.3, ease }}
                        className="flex size-10 items-center justify-center border border-border/60 text-muted-foreground transition-all duration-500 hover:border-foreground hover:bg-foreground hover:text-background"
                      >
                        <FaInstagram className="size-4" />
                      </motion.a>
                    )}
                    {settings?.facebook && (
                      <motion.a
                        href={facebookUrl(settings.facebook)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                        whileHover={{ y: -2 }}
                        transition={{ duration: 0.3, ease }}
                        className="flex size-10 items-center justify-center border border-border/60 text-muted-foreground transition-all duration-500 hover:border-foreground hover:bg-foreground hover:text-background"
                      >
                        <FaFacebook className="size-4" />
                      </motion.a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </Reveal>
        </div>

        {/* Map */}
        <Reveal delay={0.1}>
          <div className="min-h-[320px] overflow-hidden border border-border/30 bg-secondary/40">
            {settings?.map_embed ? (
              settings.map_embed.startsWith("http") ? (
                <iframe
                  src={settings.map_embed}
                  title="Ubicación de Oromiel Makeup"
                  className="h-full min-h-[320px] w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              ) : (
                <div
                  className="h-full min-h-[320px] w-full [&_iframe]:h-full [&_iframe]:min-h-[320px] [&_iframe]:w-full"
                  dangerouslySetInnerHTML={{ __html: settings.map_embed }}
                />
              )
            ) : (
              <div className="flex h-full min-h-[320px] flex-col items-center justify-center gap-3 p-10 text-center">
                <MapPin className="size-8 text-muted-foreground/30" strokeWidth={1} />
                <p className="text-[0.82rem] font-light text-muted-foreground">
                  El Carmen de Chucurí, Santander
                </p>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
