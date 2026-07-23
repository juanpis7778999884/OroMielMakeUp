import { SiteShell } from "@/components/site-shell"
import { CatalogSkeleton } from "@/components/skeletons-catalog"

export default function CatalogLoading() {
  return (
    <SiteShell>
      <CatalogSkeleton />
    </SiteShell>
  )
}
