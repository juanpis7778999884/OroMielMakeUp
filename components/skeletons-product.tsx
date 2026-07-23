import { Skeleton } from "@/components/ui/skeleton"

export function ProductDetailSkeleton() {
  return (
    <div className="mx-auto max-w-[1400px] px-5 py-8 sm:px-8 sm:py-12">
      {/* Breadcrumb skeleton */}
      <div className="mb-8 flex gap-2">
        <Skeleton className="h-3.5 w-12" />
        <Skeleton className="h-3.5 w-3" />
        <Skeleton className="h-3.5 w-16" />
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr]">
        {/* Gallery skeleton */}
        <div className="flex flex-col gap-3">
          <Skeleton className="aspect-square w-full" />
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="size-16" />
            ))}
          </div>
        </div>

        {/* Info skeleton */}
        <div className="flex flex-col gap-5">
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-40" />
          <div className="border-t border-border/30 pt-5 space-y-3">
            <Skeleton className="h-28 w-full" />
          </div>
          <div className="border-t border-border/30 pt-5 flex gap-3">
            <Skeleton className="h-11 flex-1 rounded-full" />
            <Skeleton className="h-11 w-28 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function RelatedSkeleton() {
  return (
    <section className="mt-20 border-t border-border/30 pt-16">
      <Skeleton className="mx-auto mb-10 h-8 w-56" />
      <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-4 md:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex flex-col overflow-hidden bg-background">
            <Skeleton className="aspect-square w-full rounded-none" />
            <div className="flex flex-col gap-2 p-1 pt-4">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/3" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
