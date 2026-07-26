import { SiteShell } from "@/components/site-shell"
import { HeroSection } from "@/components/home/hero-section"
import { ValuesStrip } from "@/components/home/values-strip"
import { CategoriesSection } from "@/components/home/categories-section"
import { PhilosophySection } from "@/components/home/philosophy-section"
import { FeaturedSection } from "@/components/home/featured-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { CtaSection } from "@/components/home/cta-section"
import {
  OrganizationJsonLd,
  WebsiteJsonLd,
  LocalBusinessJsonLd,
} from "@/components/seo/json-ld"
import {
  getSettings,
  getCategories,
  getFeaturedProducts,
  getBestsellers,
  getTestimonials,
} from "@/lib/data"

export const revalidate = 60

export default async function HomePage() {
  const [settings, categories, featured, bestsellers, testimonials] = await Promise.all([
    getSettings(),
    getCategories(),
    getFeaturedProducts(8),
    getBestsellers(8),
    getTestimonials(),
  ])

  return (
    <>
      <OrganizationJsonLd settings={settings} />
      <WebsiteJsonLd />
      <LocalBusinessJsonLd settings={settings} />
      <SiteShell settings={settings}>
        <HeroSection title={settings?.hero_title} subtitle={settings?.hero_subtitle} />
        <ValuesStrip />
        <CategoriesSection categories={categories} />
        <PhilosophySection />
        <FeaturedSection
          title="Destacados"
          subtitle="Selección especial"
          products={featured}
          whatsapp={settings?.whatsapp}
        />
        {bestsellers.length > 0 && (
          <FeaturedSection
            title="Los más vendidos"
            subtitle="Favoritos de nuestras clientas"
            products={bestsellers}
            whatsapp={settings?.whatsapp}
          />
        )}
        <TestimonialsSection testimonials={testimonials} />
        <CtaSection whatsapp={settings?.whatsapp} instagram={settings?.instagram} />
      </SiteShell>
    </>
  )
}
