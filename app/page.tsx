import { SiteHeader } from "@/components/landing/site-header"
import { HeroSection } from "@/components/landing/hero-section"
import { StatsSection } from "@/components/landing/stats-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { HowItWorks } from "@/components/landing/how-it-works"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { FaqSection } from "@/components/landing/faq-section"
import { FinalCta } from "@/components/landing/final-cta"
import { SiteFooter } from "@/components/landing/site-footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <HowItWorks />
        <TestimonialsSection />
        <FaqSection />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  )
}
