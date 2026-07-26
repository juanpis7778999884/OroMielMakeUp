import { SiteShell } from "@/components/site-shell"

export default function PromotionsLoading() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-[1500px] px-5 py-12 sm:px-8 sm:py-16 lg:px-14">
        <div className="mb-10 border-b border-border/50 pb-8">
          <div className="mb-4 h-3 w-16 bg-foreground/5" />
          <div className="h-10 w-64 bg-foreground/5" />
          <div className="mt-3 h-4 w-96 max-w-full bg-foreground/5" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="border border-border/30 p-8">
              <div className="mb-4 h-3 w-20 bg-foreground/5" />
              <div className="mb-3 h-6 w-48 bg-foreground/5" />
              <div className="mb-2 h-4 w-full bg-foreground/5" />
              <div className="h-4 w-32 bg-foreground/5" />
            </div>
          ))}
        </div>
      </div>
    </SiteShell>
  )
}
