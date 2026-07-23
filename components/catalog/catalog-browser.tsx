"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Search, SlidersHorizontal, X, Loader2, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { loadMoreProducts } from "@/lib/actions/catalog"
import type { Category, Product } from "@/lib/types"
import { cn } from "@/lib/utils"

const PAGE_SIZE = 12

const SORT_OPTIONS = [
  { value: "recientes", label: "Más recientes" },
  { value: "precio-asc", label: "Menor precio" },
  { value: "precio-desc", label: "Mayor precio" },
  { value: "nombre", label: "A - Z" },
]

type Props = {
  initialProducts: Product[]
  categories: Category[]
  initialTotal: number
  initialCategory?: string
  initialSearch?: string
  initialSort?: string
  whatsapp?: string | null
}

export function CatalogBrowser({
  initialProducts,
  categories,
  initialTotal,
  initialCategory,
  initialSearch,
  initialSort,
  whatsapp,
}: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [total, setTotal] = useState(initialTotal)
  const [loading, setLoading] = useState(false)
  const [offset, setOffset] = useState(initialProducts.length)

  const activeCategory = initialCategory ?? "todos"
  const activeSort = initialSort ?? "recientes"
  const activeSearch = initialSearch ?? ""

  const hasMore = offset < total

  const updateParams = useCallback(
    (key: string, value: string | null) => {
      const sp = new URLSearchParams(searchParams.toString())
      if (value && value !== "todos" && value !== "recientes") {
        sp.set(key, value)
      } else {
        sp.delete(key)
      }
      router.push(`/catalogo?${sp.toString()}`, { scroll: false })
    },
    [router, searchParams],
  )

  const [searchInput, setSearchInput] = useState(activeSearch)
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null)

  function handleSearchInput(value: string) {
    setSearchInput(value)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      updateParams("q", value.trim() || null)
    }, 400)
  }

  function clearSearch() {
    setSearchInput("")
    updateParams("q", null)
  }

  function handleCategoryClick(slug: string) {
    updateParams("categoria", slug === "todos" ? null : slug)
  }

  function handleSortChange(value: string) {
    updateParams("orden", value === "recientes" ? null : value)
  }

  async function handleLoadMore() {
    if (loading) return
    setLoading(true)
    try {
      const result = await loadMoreProducts(
        { category: initialCategory, search: initialSearch, sort: initialSort },
        offset,
        PAGE_SIZE,
      )
      setProducts((prev) => [...prev, ...result.products])
      setTotal(result.total)
      setOffset((prev) => prev + result.products.length)
    } catch {
      // silently fail
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setProducts(initialProducts)
    setTotal(initialTotal)
    setOffset(initialProducts.length)
  }, [initialProducts, initialTotal])

  const hasActiveFilters =
    activeCategory !== "todos" || activeSearch || activeSort !== "recientes"

  return (
    <div className="mx-auto max-w-[1500px] px-5 py-12 sm:px-8 sm:py-16 lg:px-14">
      {/* Editorial header */}
      <div className="mb-10 flex flex-col justify-between gap-6 border-b border-border/50 pb-8 md:flex-row md:items-end">
        <div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-4 flex items-center gap-3"
          >
            <span className="h-px w-8 bg-gold/60" />
            <span className="eyebrow">Catálogo</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-serif text-4xl font-light leading-[1.05] tracking-[-0.01em] text-foreground md:text-5xl"
          >
            Nuestros Productos
          </motion.h1>
        </div>
        <p className="text-[0.72rem] font-light tracking-[0.16em] uppercase text-muted-foreground">
          {total} {total === 1 ? "producto" : "productos"}
        </p>
      </div>

      {/* Search + Sort */}
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <label htmlFor="catalog-search" className="sr-only">
            Buscar productos
          </label>
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/50" strokeWidth={1.5} aria-hidden="true" />
          <input
            id="catalog-search"
            value={searchInput}
            onChange={(e) => handleSearchInput(e.target.value)}
            className="flex h-12 w-full rounded-none border border-border/60 bg-background pl-10 pr-9 text-[0.82rem] font-light outline-none transition-all duration-300 focus:border-foreground/40"
            placeholder="Buscar productos..."
          />
          {searchInput && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-muted-foreground/50 transition-colors hover:text-foreground"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <SlidersHorizontal className="size-4 text-muted-foreground/50" strokeWidth={1.5} />
          <select
            value={activeSort}
            onChange={(e) => handleSortChange(e.target.value)}
            className="h-12 rounded-none border border-border/60 bg-background px-4 text-[0.82rem] font-light outline-none transition-all duration-300 focus:border-foreground/40"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category pills */}
      {categories.length > 0 && (
        <div className="mb-10 flex flex-wrap gap-2">
          <button
            onClick={() => handleCategoryClick("todos")}
            className={cn(
              "rounded-none border px-6 py-2.5 text-[0.68rem] font-light tracking-[0.18em] uppercase transition-colors duration-500",
              activeCategory === "todos"
                ? "border-foreground bg-foreground text-background"
                : "border-border/60 bg-transparent text-muted-foreground hover:border-foreground hover:text-foreground",
            )}
          >
            Todos
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.slug)}
              className={cn(
                "rounded-none border px-6 py-2.5 text-[0.68rem] font-light tracking-[0.18em] uppercase transition-colors duration-500",
                activeCategory === cat.slug
                  ? "border-foreground bg-foreground text-background"
                  : "border-border/60 bg-transparent text-muted-foreground hover:border-foreground hover:text-foreground",
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}

      {/* Active filters */}
      <AnimatePresence>
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 flex flex-wrap items-center gap-2 text-[0.78rem] font-light text-muted-foreground"
          >
            <span>Filtros activos:</span>
            {activeCategory !== "todos" && (
              <span className="inline-flex items-center gap-1 rounded-none border border-border/60 bg-background px-3 py-1 text-[0.7rem] font-light text-foreground">
                {categories.find((c) => c.slug === activeCategory)?.name ?? activeCategory}
                <button onClick={() => handleCategoryClick("todos")} className="ml-0.5 text-muted-foreground/60 hover:text-foreground">
                  <X className="size-3" />
                </button>
              </span>
            )}
            {activeSearch && (
              <span className="inline-flex items-center gap-1 rounded-none border border-border/60 bg-background px-3 py-1 text-[0.7rem] font-light text-foreground">
                &ldquo;{activeSearch}&rdquo;
                <button onClick={clearSearch} className="ml-0.5 text-muted-foreground/60 hover:text-foreground">
                  <X className="size-3" />
                </button>
              </span>
            )}
            <button
              onClick={() => {
                setSearchInput("")
                router.push("/catalogo", { scroll: false })
              }}
              className="border-b border-foreground/30 text-[0.72rem] font-light tracking-[0.08em] uppercase text-foreground transition-colors hover:border-foreground/60"
            >
              Limpiar todo
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} whatsapp={whatsapp} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center border border-border/50 bg-secondary/20 py-24">
          <Package className="size-10 text-muted-foreground/30" strokeWidth={1} />
          <h3 className="mt-5 text-[0.9rem] font-light text-foreground">
            No se encontraron productos
          </h3>
          <p className="mt-1.5 text-[0.8rem] font-light text-muted-foreground">
            {hasActiveFilters
              ? "Prueba cambiando los filtros o la búsqueda."
              : "Aún no hay productos en el catálogo."}
          </p>
          {hasActiveFilters && (
            <button
              onClick={() => {
                setSearchInput("")
                router.push("/catalogo", { scroll: false })
              }}
              className="mt-6 border-b border-foreground/30 pb-0.5 text-[0.78rem] font-light tracking-[0.08em] uppercase text-foreground transition-colors hover:border-foreground/60"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      )}

      {/* Load more */}
      {hasMore && (
        <div className="mt-14 flex justify-center">
          <Button
            variant="outline"
            size="lg"
            onClick={handleLoadMore}
            disabled={loading}
            className="min-w-[240px] rounded-none border-foreground/60 px-8 py-3 text-[0.7rem] font-light tracking-[0.2em] uppercase transition-colors duration-500 hover:bg-foreground hover:text-background"
          >
            {loading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Cargando...
              </>
            ) : (
              `Cargar más (${products.length} de ${total})`
            )}
          </Button>
        </div>
      )}

      {/* End marker */}
      {!hasMore && products.length > 0 && (
        <p className="mt-14 text-center text-[0.72rem] font-light tracking-[0.1em] uppercase text-muted-foreground/50">
          Has visto todos los {total} productos
        </p>
      )}
    </div>
  )
}
