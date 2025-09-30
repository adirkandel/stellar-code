import { useState, useEffect } from 'react';
import logoSvg from '../assets/logo.svg';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['services', 'technologies', 'testimonials', 'why-us', 'contact'];
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
      window.removeEventListener('scroll', handleScroll);
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
            <svg 
              className="w-12 h-12 fill-primary logo-hover" 
              viewBox="0 0 321 259" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <g transform="translate(0.000000,259.000000) scale(0.100000,-0.100000)">
                <path d="M2865 2494 c-136 -75 -165 -98 -165 -130 0 -23 33 -54 58 -54 26 0 282 155 289 175 9 27 5 48 -15 63 -26 20 -42 15 -167 -54z" opacity="0.5"/>
                <path d="M2090 2229 c-409 -208 -712 -370 -742 -397 -33 -28 -13 -92 29 -92 8 0 113 56 232 124 119 68 356 201 526 296 171 95 329 183 353 197 23 13 42 30 42 36 0 16 -20 37 -34 37 -6 0 -189 -91 -406 -201z" opacity="0.6"/>
                <path d="M2467 2165 c-42 -24 -185 -103 -318 -176 -248 -135 -272 -155 -204 -169 67 -14 96 -50 115 -142 14 -69 14 -68 -63 -231 -33 -70 -57 -131 -53 -135 10 -10 74 25 1123 620 68 38 125 74 129 79 10 17 -5 57 -24 63 -11 4 -151 -47 -348 -125 -181 -72 -343 -136 -361 -141 -67 -19 -135 42 -119 106 3 14 59 71 131 136 69 61 125 117 125 123 0 18 -21 37 -39 37 -9 0 -51 -20 -94 -45z" opacity="0.8"/>
                <path d="M702 2014 c-41 -28 -50 -66 -77 -314 -31 -289 -36 -311 -78 -355 -18 -18 -129 -95 -247 -171 -118 -75 -225 -146 -237 -157 -34 -30 -31 -86 4 -119 16 -13 141 -73 279 -132 138 -59 261 -114 273 -122 33 -23 43 -50 125 -319 49 -157 85 -258 98 -272 25 -27 66 -37 100 -24 14 5 96 93 182 195 179 212 220 254 255 263 14 3 129 0 255 -8 334 -20 343 -20 372 14 43 50 43 49 -165 376 -94 148 -111 180 -111 215 0 30 28 101 117 291 75 161 117 262 117 284 0 39 -32 71 -73 71 -14 0 -162 -21 -328 -47 -287 -45 -304 -46 -335 -31 -18 9 -112 87 -208 175 -97 87 -189 168 -204 181 -33 26 -82 29 -114 6z m540 -659 c6 -7 -190 -615 -205 -632 -11 -15 -51 -17 -76 -4 -16 9 -9 35 81 313 55 167 101 309 103 316 4 12 86 18 97 7z m-322 -157 l0 -53 -90 -50 c-49 -27 -90 -53 -90 -57 0 -3 39 -27 86 -53 47 -26 88 -53 90 -60 3 -7 4 -31 2 -54 l-3 -40 -152 85 -153 86 0 36 0 37 153 87 c83 48 153 88 155 88 1 0 2 -24 2 -52z m595 -83 c64 -37 70 -44 73 -76 l3 -36 -123 -70 c-68 -39 -140 -80 -160 -93 l-38 -22 0 54 0 53 95 53 c52 30 95 57 95 60 0 4 -42 30 -93 57 l-92 50 -3 54 -3 53 88 -48 c48 -26 120 -66 158 -89z"/>
                <path d="M2812 1604 c-84 -50 -93 -58 -90 -82 5 -43 36 -38 138 22 103 61 113 71 99 98 -16 30 -49 21 -147 -38z" opacity="0.6"/>
                <path d="M2415 1389 c-277 -149 -460 -251 -477 -267 -31 -27 -17 -82 21 -82 21 0 631 351 651 375 17 21 3 55 -23 55 -12 0 -89 -37 -172 -81z" opacity="0.7"/>
              </g>
            </svg>
            <span className="text-2xl font-bold font-space text-stellar-white">STELLAR CODE</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
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