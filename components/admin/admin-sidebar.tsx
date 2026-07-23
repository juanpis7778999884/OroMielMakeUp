"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  Tag,
  ImageIcon,
  Settings,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { BrandLogo } from "@/components/brand-logo"
import { logout } from "@/lib/actions/auth"

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/productos", label: "Productos", icon: Package },
  { href: "/admin/categorias", label: "Categorías", icon: Tag },
  { href: "/admin/promociones", label: "Promociones", icon: ImageIcon },
  { href: "/admin/configuracion", label: "Configuración", icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex h-full w-60 flex-col border-r border-border/30 bg-background">
      <div className="border-b border-border/20 px-5 py-5">
        <Link href="/admin">
          <BrandLogo size={28} />
        </Link>
      </div>

      <nav className="flex-1 space-y-0.5 px-3 py-4">
        {links.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-sm px-3 py-2.5 text-[0.8rem] font-light tracking-wide transition-all duration-300",
                active
                  ? "bg-foreground/5 text-foreground"
                  : "text-muted-foreground hover:bg-foreground/[0.03] hover:text-foreground",
              )}
            >
              <Icon className="size-4 shrink-0" strokeWidth={1.5} />
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-border/20 px-3 py-3 space-y-0.5">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-sm px-3 py-2.5 text-[0.8rem] font-light tracking-wide text-muted-foreground transition-all duration-300 hover:bg-foreground/[0.03] hover:text-foreground"
        >
          <LogOut className="size-4 shrink-0" strokeWidth={1.5} />
          Ver tienda
        </Link>
        <form action={logout}>
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-[0.8rem] font-light tracking-wide text-muted-foreground transition-all duration-300 hover:bg-destructive/5 hover:text-destructive"
          >
            <LogOut className="size-4 shrink-0" strokeWidth={1.5} />
            Cerrar sesión
          </button>
        </form>
      </div>
    </aside>
  )
}
