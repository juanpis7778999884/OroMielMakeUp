import { SiteShell } from "@/components/site-shell"
import { HomepageSkeleton } from "@/components/skeletons-homepage"

export default function HomepageLoading() {
  return (
    <SiteShell>
      <HomepageSkeleton />
    </SiteShell>
  )
}
