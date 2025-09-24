import { useState, useEffect } from 'react';
import { SidebarTrigger } from "@/components/ui/sidebar";

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['services', 'why-us', 'case-studies', 'technologies', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'services', label: 'Services' },
    { id: 'why-us', label: 'Why Us' },
    { id: 'case-studies', label: 'Case Studies' },
    { id: 'technologies', label: 'Technologies' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-deep-space/30 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-primary/5">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="text-2xl font-bold font-space cursor-pointer transition-stellar hover-glow"
            onClick={() => scrollToSection('hero')}
          >
            <span className="text-primary">Stellar</span>
            <span className="text-stellar-white">Code</span>
          </div>

          {/* Mobile/Tablet Hamburger Menu */}
          <div className="flex lg:hidden items-center">
            <SidebarTrigger className="text-stellar-white hover:text-primary transition-stellar" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`
                  font-medium transition-stellar hover:text-primary
                  ${activeSection === item.id 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-stellar-white'
                  }
                `}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Desktop Get Started Button */}
          <button
            onClick={() => scrollToSection('contact')}
            className="hidden lg:block bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium transition-stellar hover-glow hover:-translate-y-0.5"
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;