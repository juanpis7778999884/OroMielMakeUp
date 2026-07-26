"use client"

import { useActionState, useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import type { Settings } from "@/lib/types"
import type { ActionResult } from "@/lib/actions/settings"
import { updateSettings } from "@/lib/actions/settings"
import { inputClass, textareaClass, fieldLabel, fieldHint } from "@/lib/admin-styles"

type SettingsFormProps = {
  settings: Settings
}

const sectionTitle = "font-serif text-base font-normal text-foreground"

function Field({
  id,
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  hint,
}: {
  id: string
  label: string
  name: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  hint?: string
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className={fieldLabel}>{label}</Label>
      <input id={id} name={name} type={type} value={value} onChange={(e) => onChange(e.target.value)} className={inputClass} placeholder={placeholder} />
      {hint && <p className={fieldHint}>{hint}</p>}
    </div>
  )
}

export function SettingsForm({ settings }: SettingsFormProps) {
  const [serverResult, formAction, isPending] = useActionState(updateSettings, null)

  const [whatsapp, setWhatsapp] = useState(settings.whatsapp ?? "")
  const [instagram, setInstagram] = useState(settings.instagram ?? "")
  const [facebook, setFacebook] = useState(settings.facebook ?? "")
  const [address, setAddress] = useState(settings.address ?? "")
  const [hours, setHours] = useState(settings.hours ?? "")
  const [logoUrl, setLogoUrl] = useState(settings.logo_url ?? "")
  const [heroTitle, setHeroTitle] = useState(settings.hero_title ?? "")
  const [heroSubtitle, setHeroSubtitle] = useState(settings.hero_subtitle ?? "")
  const [heroImageUrl, setHeroImageUrl] = useState(settings.hero_image_url ?? "")
  const [mapEmbed, setMapEmbed] = useState(settings.map_embed ?? "")
  const [primaryColor, setPrimaryColor] = useState(settings.primary_color ?? "")

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    formAction(new FormData(e.currentTarget))
  }

  return (
    <>
      {serverResult && (
        <div className={`mb-6 border px-4 py-3 text-[0.82rem] font-light ${
          serverResult.ok
            ? "border-foreground/20 bg-foreground/5 text-foreground"
            : "border-destructive/20 bg-destructive/5 text-destructive"
        }`}>
          {serverResult.ok ? serverResult.message : serverResult.error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Contact / Social */}
        <section>
          <h2 className={sectionTitle}>Contacto y redes sociales</h2>
          <div className="mt-5 grid gap-6 sm:grid-cols-2">
            <Field id="whatsapp" name="whatsapp" label="Número de WhatsApp" value={whatsapp} onChange={setWhatsapp} placeholder="573001234567" hint="Solo números, con código de país. Ej: 573001234567" />
            <Field id="instagram" name="instagram" label="Instagram" value={instagram} onChange={setInstagram} placeholder="instagram.com/tuusuario o @usuario" />
            <Field id="facebook" name="facebook" label="Facebook" value={facebook} onChange={setFacebook} placeholder="facebook.com/tupagina o usuario" />
            <Field id="address" name="address" label="Dirección" value={address} onChange={setAddress} placeholder="Ej: El Carmen de Chucurí, Santander" />
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="hours" className={fieldLabel}>Horario de atención</Label>
              <textarea id="hours" name="hours" value={hours} onChange={(e) => setHours(e.target.value)} rows={2} className={textareaClass} placeholder="Ej: Lun-Vie: 8am-6pm, Sáb: 9am-2pm" />
            </div>
          </div>
        </section>

        {/* Branding */}
        <section>
          <h2 className={sectionTitle}>Marca y apariencia</h2>
          <div className="mt-5 grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="logo_url" className={fieldLabel}>URL del logo</Label>
              <input id="logo_url" name="logo_url" value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} className={inputClass} placeholder="https://..." />
              {logoUrl && (
                <div className="relative mt-2 h-20 w-40 overflow-hidden border border-border/30 bg-secondary/60">
                  <Image src={logoUrl} alt="Logo preview" fill sizes="160px" className="object-contain p-2" unoptimized />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="primary_color" className={fieldLabel}>Color principal</Label>
              <div className="flex gap-2">
                <input id="primary_color" name="primary_color" type="color" value={primaryColor || "#c9a55a"} onChange={(e) => setPrimaryColor(e.target.value)} className="size-11 shrink-0 cursor-pointer border border-border/50 bg-transparent p-0.5" />
                <input type="text" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className={inputClass} placeholder="#c9a55a" />
              </div>
              <p className={fieldHint}>Color de acento dorado. Ej: #c9a55a</p>
            </div>
          </div>
        </section>

        {/* Hero / Banner */}
        <section>
          <h2 className={sectionTitle}>Banner principal (Hero)</h2>
          <div className="mt-5 grid gap-6 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="hero_title" className={fieldLabel}>Título del hero</Label>
              <input id="hero_title" name="hero_title" value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} className={inputClass} placeholder="Ej: Tu belleza, nuestra pasión" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="hero_subtitle" className={fieldLabel}>Subtítulo del hero</Label>
              <textarea id="hero_subtitle" name="hero_subtitle" value={heroSubtitle} onChange={(e) => setHeroSubtitle(e.target.value)} rows={2} className={textareaClass} placeholder="Descubre los mejores productos de maquillaje..." />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="hero_image_url" className={fieldLabel}>URL de imagen del hero</Label>
              <input id="hero_image_url" name="hero_image_url" value={heroImageUrl} onChange={(e) => setHeroImageUrl(e.target.value)} className={inputClass} placeholder="https://..." />
              {heroImageUrl && (
                <div className="relative mt-2 aspect-video w-full overflow-hidden border border-border/30 bg-secondary/60">
                  <Image src={heroImageUrl} alt="Hero preview" fill sizes="600px" className="object-cover" unoptimized />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Map */}
        <section>
          <h2 className={sectionTitle}>Ubicación en el mapa</h2>
          <div className="mt-5 space-y-2">
            <Label htmlFor="map_embed" className={fieldLabel}>URL de Google Maps</Label>
            <textarea id="map_embed" name="map_embed" value={mapEmbed} onChange={(e) => setMapEmbed(e.target.value)} rows={3} className={textareaClass} placeholder="https://www.google.com/maps/embed?..." />
            <p className={fieldHint}>Pega la URL de incrustación de Google Maps (la que empieza con https://www.google.com/maps/embed). Se muestra en la página de contacto.</p>
            {mapEmbed && (
              <div className="mt-2 overflow-hidden border border-border/30" dangerouslySetInnerHTML={{ __html: mapEmbed }} />
            )}
          </div>
        </section>

        {/* Actions */}
        <div className="flex justify-end border-t border-border/30 pt-6">
          <Button type="submit" disabled={isPending} className="min-w-[180px] rounded-full bg-foreground px-6 py-2.5 text-[0.78rem] font-light tracking-[0.1em] uppercase text-background hover:bg-foreground/90">
            {isPending ? "Guardando..." : "Guardar configuración"}
          </Button>
        </div>
      </form>
    </>
  )
}
