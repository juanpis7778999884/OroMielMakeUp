import { SiteShell } from "@/components/site-shell"
import { ProductDetailSkeleton } from "@/components/skeletons-product"

export default function ProductLoading() {
  return (
    <SiteShell>
      <ProductDetailSkeleton />
    </SiteShell>
  )
}
