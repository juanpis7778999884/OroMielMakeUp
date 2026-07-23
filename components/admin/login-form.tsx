"use client"

import { useActionState, useState } from "react"
import Link from "next/link"
import { Loader2, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { BrandLogo } from "@/components/brand-logo"
import type { AuthResult } from "@/lib/actions/auth"
import { login } from "@/lib/actions/auth"

export function LoginForm() {
  const [result, action, pending] = useActionState<AuthResult | null, FormData>(
    login,
    null,
  )

  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-10">
        {/* Brand */}
        <div className="flex flex-col items-center gap-4">
          <Link href="/">
            <BrandLogo size={44} />
          </Link>
          <div className="text-center">
            <h1 className="font-serif text-2xl font-light text-foreground">
              Panel administrativo
            </h1>
            <p className="mt-2 text-[0.82rem] font-light text-muted-foreground">
              Ingresa para gestionar tu tienda
            </p>
          </div>
        </div>

        {/* Error */}
        {result && !result.ok && (
          <div className="rounded-sm border border-destructive/20 bg-destructive/5 px-4 py-3 text-[0.82rem] font-light text-destructive">
            {result.error}
          </div>
        )}

        {/* Form */}
        <form action={action} className="space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <Label className="text-[0.72rem] font-light tracking-[0.15em] uppercase text-muted-foreground">
              Email
            </Label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              autoFocus
              className="flex h-11 w-full rounded-sm border border-border/50 bg-background px-3.5 text-[0.85rem] font-light outline-none transition-all duration-300 focus:border-foreground/30 focus:shadow-[0_0_0_3px_oklch(0.55_0.07_65/0.06)]"
              placeholder="admin@oromiel.com"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label className="text-[0.72rem] font-light tracking-[0.15em] uppercase text-muted-foreground">
              Contraseña
            </Label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                className="flex h-11 w-full rounded-sm border border-border/50 bg-background px-3.5 pr-10 text-[0.85rem] font-light outline-none transition-all duration-300 focus:border-foreground/30 focus:shadow-[0_0_0_3px_oklch(0.55_0.07_65/0.06)]"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground/50 transition-colors hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="size-4" strokeWidth={1.5} />
                ) : (
                  <Eye className="size-4" strokeWidth={1.5} />
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <Button type="submit" disabled={pending} className="h-11 w-full rounded-full bg-foreground text-[0.78rem] font-light tracking-[0.14em] uppercase text-background hover:bg-foreground/90">
            {pending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Ingresando...
              </>
            ) : (
              "Ingresar"
            )}
          </Button>
        </form>

        {/* Back to store */}
        <p className="text-center text-[0.82rem] font-light text-muted-foreground">
          <Link
            href="/"
            className="border-b border-foreground/30 pb-0.5 text-foreground transition-colors hover:border-foreground/60"
          >
            &larr; Volver a la tienda
          </Link>
        </p>
      </div>
    </div>
  )
}
