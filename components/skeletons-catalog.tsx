import { Skeleton } from "@/components/ui/skeleton"

export function CatalogSkeleton() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8 sm:py-16">
      {/* Header */}
      <div className="mb-12 text-center">
        <Skeleton className="mx-auto h-3 w-20" />
        <Skeleton className="mx-auto mt-3 h-10 w-48" />
        <Skeleton className="mx-auto mt-3 h-4 w-32" />
      </div>

      {/* Search + sort bar */}
      <div className="mb-8 flex gap-3">
        <Skeleton className="h-11 flex-1 rounded-full" />
        <Skeleton className="h-11 w-36 rounded-full" />
      </div>

      {/* Category pills */}
      <div className="mb-10 flex gap-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-10 w-20 rounded-full" />
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="flex flex-col overflow-hidden bg-background">
            <Skeleton className="aspect-square w-full rounded-none" />
            <div className="flex flex-col gap-2 p-1 pt-4">
              <Skeleton className="h-2.5 w-14" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/3 mt-auto" />
              <Skeleton className="h-9 w-full mt-2 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
