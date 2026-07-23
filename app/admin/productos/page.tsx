import Link from "next/link"
import Image from "next/image"
import { Plus, Pencil, Package } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { formatPrice } from "@/lib/format"
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

export default async function AdminProductsPage() {
  const supabase = await createClient()

  const { data: products } = await supabase
    .from("products")
    .select("*, category:categories(name), product_images(url, sort_order)")
    .order("created_at", { ascending: false })

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-light text-foreground">Productos</h1>
          <p className="mt-1.5 text-[0.82rem] font-light text-muted-foreground">
            {products?.length ?? 0} productos en total
          </p>
        </div>
        <Button render={<Link href="/admin/productos/nuevo" />}>
          <Plus className="size-4" strokeWidth={1.5} />
          Nuevo producto
        </Button>
      </div>

      {!products?.length ? (
        <div className="border border-border/30 bg-background p-16 text-center">
          <Package className="mx-auto size-10 text-muted-foreground/30" strokeWidth={1} />
          <h3 className="mt-5 text-[0.92rem] font-light text-foreground">
            No hay productos
          </h3>
          <p className="mt-1.5 text-[0.82rem] font-light text-muted-foreground">
            Crea tu primer producto para comenzar.
          </p>
          <Button className="mt-5" render={<Link href="/admin/productos/nuevo" />}>
            Crear producto
          </Button>
        </div>
      ) : (
        <div className="border border-border/30">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12" />
                <TableHead>Nombre</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead className="text-right">Precio</TableHead>
                <TableHead className="text-right">Stock</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => {
                const image = product.product_images?.[0]?.url
                return (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="relative size-10 overflow-hidden bg-secondary/60">
                        {image ? (
                          <Image
                            src={image}
                            alt={product.name}
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
                      <div className="flex flex-col">
                        <span className="text-[0.82rem] font-light text-foreground">
                          {product.name}
                        </span>
                        <span className="text-[0.72rem] font-light text-muted-foreground/60">
                          /{product.slug}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-[0.82rem] font-light text-muted-foreground">
                        {(product.category as { name?: string } | null)?.name ?? "\u2014"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="text-[0.82rem] font-light text-foreground">
                        {formatPrice(product.price)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <span
                        className={
                          product.stock <= 0
                            ? "text-[0.82rem] font-light text-destructive"
                            : "text-[0.82rem] font-light text-foreground"
                        }
                      >
                        {product.stock}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1.5">
                        <Badge
                          className={
                            product.status === "agotado"
                              ? "bg-muted text-muted-foreground"
                              : product.status === "oferta"
                                ? "bg-foreground text-background"
                                : product.status === "nuevo"
                                  ? "bg-background text-foreground border border-border/60"
                                  : "bg-secondary text-secondary-foreground"
                          }
                        >
                          {product.status === "activo"
                            ? "Disponible"
                            : product.status === "nuevo"
                              ? "Nuevo"
                              : product.status === "oferta"
                                ? "Oferta"
                                : "Agotado"}
                        </Badge>
                        {product.is_featured && (
                          <Badge variant="outline" className="border-foreground/30 text-foreground">
                            Dest.
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        render={
                          <Link href={`/admin/productos/${product.id}/editar`} />
                        }
                      >
                        <Pencil className="size-3.5" strokeWidth={1.5} />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
