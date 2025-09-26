import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import WhyUsSection from "@/components/WhyUsSection";
import TechnologiesSection from "@/components/TechnologiesSection";
import SecondSuccessSection from "@/components/SecondSuccessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-deep-space">
      <Navigation />
      <main>
        <HeroSection />
        <ServicesSection />
        <WhyUsSection />
        <SecondSuccessSection />
        <TechnologiesSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
