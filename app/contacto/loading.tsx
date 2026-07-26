import { SiteShell } from "@/components/site-shell"

export default function ContactLoading() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-[1500px] px-5 py-12 sm:px-8 sm:py-16 lg:px-14">
        <div className="mb-10 border-b border-border/50 pb-8">
          <div className="mb-4 h-3 w-16 bg-foreground/5" />
          <div className="h-10 w-64 bg-foreground/5" />
          <div className="mt-3 h-4 w-96 max-w-full bg-foreground/5" />
        </div>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-4">
            <div className="h-4 w-48 bg-foreground/5" />
            <div className="h-4 w-64 bg-foreground/5" />
            <div className="h-4 w-40 bg-foreground/5" />
          </div>
          <div className="h-64 w-full bg-foreground/5" />
        </div>
      </div>
    </SiteShell>
  )
}
