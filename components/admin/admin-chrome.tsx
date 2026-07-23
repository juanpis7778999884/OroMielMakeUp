"use client"

import { usePathname } from "next/navigation"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

const FULL_WIDTH_ROUTES = ["/admin/login"]

export function AdminChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isFullScreen = FULL_WIDTH_ROUTES.includes(pathname)

  if (isFullScreen) {
    return <>{children}</>
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-6xl px-8 py-10">{children}</div>
      </main>
    </div>
  )
}
