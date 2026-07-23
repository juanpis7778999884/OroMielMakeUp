import Link from "next/link"
import Image from "next/image"
import { Plus, Pencil, Megaphone } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export const revalidate = 0

function formatDate(dateStr: string | null) {
  if (!dateStr) return "\u2014"
  return new Date(dateStr).toLocaleDateString("es-CO", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export default async function AdminPromotionsPage() {
  const supabase = await createClient()

  const { data: promotions } = await supabase
    .from("promotions")
    .select("*")
    .order("sort_order", { ascending: true })

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-light text-foreground">Promociones</h1>
          <p className="mt-1.5 text-[0.82rem] font-light text-muted-foreground">
            {promotions?.length ?? 0} promociones en total
          </p>
        </div>
        <Button render={<Link href="/admin/promociones/nuevo" />}>
          <Plus className="size-4" strokeWidth={1.5} />
          Nueva promoción
        </Button>
      </div>

      {!promotions?.length ? (
        <div className="border border-border/30 bg-background p-16 text-center">
          <Megaphone className="mx-auto size-10 text-muted-foreground/30" strokeWidth={1} />
          <h3 className="mt-5 text-[0.92rem] font-light text-foreground">
            No hay promociones
          </h3>
          <p className="mt-1.5 text-[0.82rem] font-light text-muted-foreground">
            Crea tu primera promoción para atraer más clientes.
          </p>
          <Button className="mt-5" render={<Link href="/admin/promociones/nuevo" />}>
            Crear promoción
          </Button>
        </div>
      ) : (
        <div className="border border-border/30">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12" />
                <TableHead>Título</TableHead>
                <TableHead>Subtítulo</TableHead>
                <TableHead>Descuento</TableHead>
                <TableHead>Inicio</TableHead>
                <TableHead>Fin</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {promotions.map((promo) => (
                <TableRow key={promo.id}>
                  <TableCell>
                    <div className="relative size-10 overflow-hidden bg-secondary/60">
                      {promo.banner_url ? (
                        <Image
                          src={promo.banner_url}
                          alt={promo.title}
                          fill
                          sizes="40px"
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="flex size-full items-center justify-center text-xs text-muted-foreground/30">
                          --
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-[0.82rem] font-light text-foreground">{promo.title}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-[0.82rem] font-light text-muted-foreground">
                      {promo.subtitle ?? "\u2014"}
                    </span>
                  </TableCell>
                  <TableCell>
                    {promo.discount_label ? (
                      <Badge className="bg-foreground text-background">
                        {promo.discount_label}
                      </Badge>
                    ) : (
                      <span className="text-[0.82rem] font-light text-muted-foreground">\u2014</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="text-[0.82rem] font-light text-muted-foreground">
                      {formatDate(promo.starts_at)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-[0.82rem] font-light text-muted-foreground">
                      {formatDate(promo.ends_at)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        promo.is_active
                          ? "bg-foreground/10 text-foreground"
                          : "bg-muted text-muted-foreground"
                      }
                    >
                      {promo.is_active ? "Activa" : "Inactiva"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      render={<Link href={`/admin/promociones/${promo.id}/editar`} />}
                    >
                      <Pencil className="size-3.5" strokeWidth={1.5} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
