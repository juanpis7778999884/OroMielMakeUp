import { Skeleton } from "@/components/ui/skeleton"

export function HomepageSkeleton() {
  return (
    <div>
      {/* Hero skeleton */}
      <section className="bg-background">
        <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 pt-24 pb-20 sm:px-8 md:grid-cols-[1fr_1.1fr] md:pt-32 md:pb-28 lg:px-12">
          <div className="flex flex-col gap-6">
            <Skeleton className="h-7 w-44 rounded-full" />
            <Skeleton className="h-14 w-full max-w-md" />
            <Skeleton className="h-5 w-80" />
            <div className="flex gap-3">
              <Skeleton className="h-10 w-32 rounded-full" />
              <Skeleton className="h-10 w-32 rounded-full" />
            </div>
          </div>
          <div className="flex justify-center">
            <Skeleton className="aspect-[4/5] w-full max-w-lg" />
          </div>
        </div>
      </section>

      {/* Values strip skeleton */}
      <section className="border-y border-border/30 py-14">
        <div className="mx-auto flex max-w-[1400px] justify-center gap-12 px-5">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-5 w-28" />
          ))}
        </div>
      </section>

      {/* Grid skeletons */}
      {[1, 2].map((section) => (
        <section key={section} className="bg-secondary/30">
          <div className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 sm:py-28">
            <div className="mb-14 flex flex-col items-center gap-3 text-center">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-8 w-48" />
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex flex-col overflow-hidden bg-background">
                  <Skeleton className="aspect-square w-full rounded-none" />
                  <div className="flex flex-col gap-2 p-1 pt-4">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}
