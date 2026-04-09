import { createFileRoute } from '@tanstack/react-router'
import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import SolutionsSection from '@/components/SolutionsSection'
import ServicesSection from '@/components/ServicesSection'
import TechnologiesSection from '@/components/TechnologiesSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import WhyUsSection from '@/components/WhyUsSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="min-h-screen bg-deep-space">
      <Navigation />
      <main>
        <HeroSection />
        <SolutionsSection />
        <ServicesSection />
        <TechnologiesSection />
        <TestimonialsSection />
        <WhyUsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
