import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import SolutionsSection from "@/components/SolutionsSection";
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
        <SolutionsSection />
        <ServicesSection />
        <TechnologiesSection />
        <WhyUsSection />
        <TestimonialsSection />
        <SecondSuccessSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
