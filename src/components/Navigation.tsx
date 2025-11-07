import { useState, useEffect } from 'react';
import stellarcodeLogo from '../assets/stellarcode-logo.svg';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {    
    // Handle initial hash on page load
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && document.getElementById(hash)) {
        setActiveSection(hash);
      }
    };
    
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    window.location.hash = sectionId;
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'solutions', label: 'Solutions' },
    { id: 'services', label: 'Expertise' },
    { id: 'technologies', label: 'Technologies' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'why-us', label: 'Why Us' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-deep-space/30 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-primary/5">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => scrollToSection('hero')}
          >
            <img 
              src={stellarcodeLogo} 
              alt="Stellar Code" 
              className="h-8 w-auto logo-hover"
            />
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                // onClick={() => scrollToSection(item.id)}
                href={`#${item.id}`}
                className={`
                  font-medium transition-stellar hover:text-primary
                  ${activeSection === item.id 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-stellar-white'
                  }
                `}
              >
                {item.label}
              </a>
            ))}
          </div>

          <button
            onClick={() => scrollToSection('contact')}
            className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium transition-stellar hover-glow hover:-translate-y-0.5"
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;