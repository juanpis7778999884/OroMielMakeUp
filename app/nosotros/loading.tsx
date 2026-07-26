import { SiteShell } from "@/components/site-shell"

export default function AboutLoading() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-[1500px] px-5 py-12 sm:px-8 sm:py-16 lg:px-14">
        <div className="mb-10 border-b border-border/50 pb-8">
          <div className="mb-4 h-3 w-16 bg-foreground/5" />
          <div className="h-10 w-64 bg-foreground/5" />
        </div>
        <div className="mx-auto max-w-2xl space-y-4">
          <div className="h-4 w-full bg-foreground/5" />
          <div className="h-4 w-5/6 bg-foreground/5" />
          <div className="h-4 w-4/6 bg-foreground/5" />
        </div>
      </div>
    </SiteShell>
  )
}
