import { notFound } from "next/navigation"
import { getSettings } from "@/lib/data"
import { SettingsForm } from "@/components/admin/settings-form"

export const revalidate = 0

export default async function AdminSettingsPage() {
  const settings = await getSettings()
  if (!settings) notFound()

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-2xl font-light text-foreground">Configuración</h1>
        <p className="mt-1.5 text-[0.82rem] font-light text-muted-foreground">
          Administra los datos de tu tienda: contacto, redes sociales, banner y más.
        </p>
      </div>

      <SettingsForm settings={settings} />
    </div>
  )
}
