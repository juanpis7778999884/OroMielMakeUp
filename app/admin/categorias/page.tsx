import Link from "next/link"
import Image from "next/image"
import { Plus, Pencil, Tag } from "lucide-react"
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

export default async function AdminCategoriesPage() {
  const supabase = await createClient()

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true })

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-light text-foreground">Categorías</h1>
          <p className="mt-1.5 text-[0.82rem] font-light text-muted-foreground">
            {categories?.length ?? 0} categorías en total
          </p>
        </div>
        <Button render={<Link href="/admin/categorias/nuevo" />}>
          <Plus className="size-4" strokeWidth={1.5} />
          Nueva categoría
        </Button>
      </div>

      {!categories?.length ? (
        <div className="border border-border/30 bg-background p-16 text-center">
          <Tag className="mx-auto size-10 text-muted-foreground/30" strokeWidth={1} />
          <h3 className="mt-5 text-[0.92rem] font-light text-foreground">
            No hay categorías
          </h3>
          <p className="mt-1.5 text-[0.82rem] font-light text-muted-foreground">
            Crea tu primera categoría para organizar los productos.
          </p>
          <Button className="mt-5" render={<Link href="/admin/categorias/nuevo" />}>
            Crear categoría
          </Button>
        </div>
      ) : (
        <div className="border border-border/30">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12" />
                <TableHead>Nombre</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead className="text-center">Orden</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((cat) => (
                <TableRow key={cat.id}>
                  <TableCell>
                    <div className="relative size-10 overflow-hidden bg-secondary/60">
                      {cat.image_url ? (
                        <Image
                          src={cat.image_url}
                          alt={cat.name}
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
                    <span className="text-[0.82rem] font-light text-foreground">{cat.name}</span>
                  </TableCell>
                  <TableCell>
                    <code className="text-[0.72rem] font-light text-muted-foreground/60">/{cat.slug}</code>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-[0.82rem] font-light text-muted-foreground">{cat.sort_order}</span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        cat.is_active
                          ? "bg-foreground/10 text-foreground"
                          : "bg-muted text-muted-foreground"
                      }
                    >
                      {cat.is_active ? "Activa" : "Inactiva"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      render={<Link href={`/admin/categorias/${cat.id}/editar`} />}
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
