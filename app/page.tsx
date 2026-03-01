import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { CourtBooking } from "@/components/court-booking"
import { FeaturesSection } from "@/components/features-section"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <CourtBooking />
      <FeaturesSection />
    </main>
  )
}