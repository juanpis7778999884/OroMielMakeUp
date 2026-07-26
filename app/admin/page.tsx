import Link from "next/link"
import Image from "next/image"
import {
  Package,
  Tag,
  Star,
  TrendingUp,
  Eye,
  MessageCircle,
  ArrowRight,
  Plus,
  ShoppingBag,
  BarChart3,
  Layers,
  Percent,
} from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { formatPrice } from "@/lib/format"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const revalidate = 0

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  const [
    { count: totalProducts },
    { count: totalCategories },
    { count: totalTestimonials },
    { count: activePromos },
    { count: featuredCount },
    { count: bestsellerCount },
    { count: outOfStock },
    { data: recentProducts },
    { data: topViewed },
    { data: topClicked },
  ] = await Promise.all([
    supabase.from("products").select("id", { count: "exact", head: true }),
    supabase.from("categories").select("id", { count: "exact", head: true }),
    supabase.from("testimonials").select("id", { count: "exact", head: true }),
    supabase.from("promotions").select("id", { count: "exact", head: true }).eq("is_active", true),
    supabase.from("products").select("id", { count: "exact", head: true }).eq("is_featured", true),
    supabase.from("products").select("id", { count: "exact", head: true }).eq("is_bestseller", true),
    supabase.from("products").select("id", { count: "exact", head: true }).or("status.eq.agotado,stock.eq.0"),
    supabase
      .from("products")
      .select("id, name, slug, price, stock, status, is_featured, created_at, product_images(url, sort_order), category:categories(name)")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("products")
      .select("id, name, slug, views, product_images(url, sort_order)")
      .order("views", { ascending: false })
      .limit(5),
    supabase
      .from("products")
      .select("id, name, slug, whatsapp_clicks, product_images(url, sort_order)")
      .order("whatsapp_clicks", { ascending: false })
      .limit(5),
  ])

  const products = totalProducts ?? 0
  const categories = totalCategories ?? 0
  const testimonials = totalTestimonials ?? 0
  const promos = activePromos ?? 0
  const featured = featuredCount ?? 0
  const bestsellers = bestsellerCount ?? 0
  const oos = outOfStock ?? 0

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-light text-foreground">Dashboard</h1>
          <p className="mt-1.5 text-[0.82rem] font-light text-muted-foreground">
            Resumen de tu tienda Oromiel Makeup
          </p>
        </div>
        <Button render={<Link href="/admin/productos/nuevo" />}>
          <Plus className="size-4" strokeWidth={1.5} />
          Nuevo producto
        </Button>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Productos"
          value={products}
          icon={Package}
          href="/admin/productos"
          description={`${featured} destacados · ${bestsellers} bestsellers`}
        />
        <StatCard
          title="Categorías"
          value={categories}
          icon={Layers}
          href="/admin/categorias"
          description="Organizando tu catálogo"
        />
        <StatCard
          title="Promociones"
          value={promos}
          icon={Percent}
          href="/admin/promociones"
          description="Campañas activas"
        />
        <StatCard
          title="Testimonios"
          value={testimonials}
          icon={Star}
          href="/admin"
          description="Reseñas de clientas"
        />
      </div>

      {/* Quick insights */}
      <div className="grid gap-4 sm:grid-cols-3">
        <InsightCard
          title="Agotados"
          value={oos}
          icon={ShoppingBag}
          color="text-destructive"
          bgColor="bg-destructive/10"
          href="/admin/productos"
        />
        <InsightCard
          title="Más vistos"
          value={topViewed?.[0]?.views ?? 0}
          icon={Eye}
          color="text-primary"
          bgColor="bg-primary/10"
          label={topViewed?.[0]?.name}
        />
        <InsightCard
          title="Más consultados"
          value={topClicked?.[0]?.whatsapp_clicks ?? 0}
          icon={MessageCircle}
          color="text-primary"
          bgColor="bg-primary/10"
          label={topClicked?.[0]?.name}
        />
      </div>

      {/* Two-column: Recent + Top products */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent products */}
        <Card>
          <CardHeader className="border-b border-border/20 px-5 py-4">
            <div className="flex items-center justify-between">
              <CardTitle className="font-serif text-base font-normal">Productos recientes</CardTitle>
              <Button variant="ghost" size="sm" render={<Link href="/admin/productos" />}>
                Ver todos
                <ArrowRight className="size-3.5" strokeWidth={1.5} />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {recentProducts && recentProducts.length > 0 ? (
              <div className="divide-y divide-border/20">
                {recentProducts.map((p) => {
                  const img = p.product_images?.[0]?.url
                  const cat = (p.category as { name?: string } | null)?.name
                  return (
                    <Link
                      key={p.id}
                      href={`/admin/productos/${p.id}/editar`}
                      className="flex items-center gap-3 px-5 py-3 transition-colors duration-300 hover:bg-foreground/[0.02]"
                    >
                      <div className="relative size-10 shrink-0 overflow-hidden bg-secondary/60">
                        {img ? (
                          <Image src={img} alt={p.name} fill sizes="40px" className="object-cover" unoptimized />
                        ) : (
                          <div className="flex size-full items-center justify-center text-[10px] text-muted-foreground/40">--</div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[0.82rem] font-light text-foreground">{p.name}</p>
                        <p className="text-[0.72rem] font-light text-muted-foreground/70">{cat ?? "Sin categoría"}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[0.82rem] font-light text-foreground">{formatPrice(p.price)}</p>
                        <Badge
                          className={
                            p.status === "agotado"
                              ? "bg-muted text-muted-foreground"
                              : p.status === "oferta"
                                ? "bg-foreground text-background"
                                : p.status === "nuevo"
                                  ? "bg-background text-foreground border border-border/60"
                                  : "bg-secondary text-secondary-foreground"
                          }
                        >
                          {p.status === "activo" ? "Disponible" : p.status === "nuevo" ? "Nuevo" : p.status === "oferta" ? "Oferta" : "Agotado"}
                        </Badge>
                      </div>
                    </Link>
                  )
                })}
              </div>
            ) : (
              <div className="px-5 py-10 text-center text-[0.82rem] font-light text-muted-foreground">
                No hay productos aún.{" "}
                <Link href="/admin/productos/nuevo" className="text-foreground underline">
                  Crea el primero
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Top viewed products */}
        <Card>
          <CardHeader className="border-b border-border/20 px-5 py-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 font-serif text-base font-normal">
                <BarChart3 className="size-4 text-primary" strokeWidth={1.5} />
                Más populares
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {topViewed && topViewed.length > 0 ? (
              <div className="divide-y divide-border/20">
                {topViewed.map((p, i) => {
                  const img = p.product_images?.[0]?.url
                  return (
                    <Link
                      key={p.id}
                      href={`/admin/productos/${p.id}/editar`}
                      className="flex items-center gap-3 px-5 py-3 transition-colors duration-300 hover:bg-foreground/[0.02]"
                    >
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-foreground/5 text-[0.68rem] font-medium text-foreground">
                        {i + 1}
                      </span>
                      <div className="relative size-10 shrink-0 overflow-hidden bg-secondary/60">
                        {img ? (
                          <Image src={img} alt={p.name} fill sizes="40px" className="object-cover" unoptimized />
                        ) : (
                          <div className="flex size-full items-center justify-center text-[10px] text-muted-foreground/40">--</div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[0.82rem] font-light text-foreground">{p.name}</p>
                      </div>
                      <div className="flex items-center gap-1 text-[0.82rem] font-light text-muted-foreground">
                        <Eye className="size-3.5" strokeWidth={1.5} />
                        {p.views}
                      </div>
                    </Link>
                  )
                })}
              </div>
            ) : (
              <div className="px-5 py-10 text-center text-[0.82rem] font-light text-muted-foreground">
                Sin datos de visitas aún.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick actions */}
      <Card>
        <CardHeader className="border-b border-border/20 px-5 py-4">
          <CardTitle className="font-serif text-base font-normal">Accesos rápidos</CardTitle>
        </CardHeader>
        <CardContent className="p-5">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <QuickAction href="/admin/productos/nuevo" icon={Package} label="Crear producto" />
            <QuickAction href="/admin/categorias/nuevo" icon={Tag} label="Crear categoría" />
            <QuickAction href="/admin/promociones" icon={Percent} label="Ver promociones" />
            <QuickAction href="/admin/configuracion" icon={Star} label="Configuración" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Sub-components

function StatCard({
  title,
  value,
  icon: Icon,
  href,
  description,
}: {
  title: string
  value: number
  icon: React.ComponentType<{ className?: string }>
  href: string
  description: string
}) {
  return (
    <Link href={href} className="group block">
      <Card className="transition-all duration-300 group-hover:border-foreground/20">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[0.78rem] font-light text-muted-foreground">{title}</p>
              <p className="mt-1 text-3xl font-light tracking-tight text-foreground">{value}</p>
              <p className="mt-1 text-[0.72rem] font-light text-muted-foreground/70">{description}</p>
            </div>
            <div className="flex size-10 shrink-0 items-center justify-center bg-foreground/5 text-muted-foreground">
              <Icon className="size-5" strokeWidth={1.2} />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

function InsightCard({
  title,
  value,
  icon: Icon,
  color,
  bgColor,
  href,
  label,
}: {
  title: string
  value: number
  icon: React.ComponentType<{ className?: string }>
  color: string
  bgColor: string
  href?: string
  label?: string | null
}) {
  const content = (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className={`flex size-9 shrink-0 items-center justify-center ${bgColor}`}>
            <Icon className={`size-4 ${color}`} strokeWidth={1.5} />
          </div>
          <div className="min-w-0">
            <p className="text-[0.72rem] font-light text-muted-foreground">{title}</p>
            <p className="text-xl font-light text-foreground">{value}</p>
            {label && (
              <p className="truncate text-[0.72rem] font-light text-muted-foreground/70">{label}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  if (href) {
    return <Link href={href} className="group block transition-all duration-300 hover:shadow-[0_4px_20px_oklch(0_0_0/0.03)]">{content}</Link>
  }
  return content
}

function QuickAction({
  href,
  icon: Icon,
  label,
}: {
  href: string
  icon: React.ComponentType<{ className?: string }>
  label: string
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-sm border border-border/30 p-3 text-[0.82rem] font-light text-foreground transition-all duration-300 hover:border-foreground/20 hover:bg-foreground/[0.02]"
    >
      <Icon className="size-4 shrink-0 text-muted-foreground" strokeWidth={1.5} />
      {label}
      <ArrowRight className="ml-auto size-3.5 text-muted-foreground/40" strokeWidth={1.5} />
    </Link>
  )
}
