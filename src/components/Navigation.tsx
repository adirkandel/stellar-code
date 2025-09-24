import { useState, useEffect } from 'react';
import logoSvg from '../assets/logo.svg';

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
            className="flex items-center gap-3 cursor-pointer transition-stellar hover-glow"
            onClick={() => scrollToSection('hero')}
          >
            <svg 
              className="w-8 h-8 fill-primary" 
              viewBox="0 0 334 307" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <g transform="translate(0.000000,307.000000) scale(0.100000,-0.100000)">
                <path d="M2212 3035 c-7 -14 -24 -28 -44 -33 -32 -9 -31 -11 15 -26 10 -3 25 -23 34 -43 l16 -38 10 34 c8 24 20 38 46 49 l36 15 -34 10 c-18 6 -38 21 -44 34 -13 29 -21 29 -35 -2z"/>
                <path d="M3225 2953 c-91 -110 -400 -413 -538 -528 -140 -116 -364 -283 -441 -329 -83 -49 -140 -70 -171 -62 -21 5 -25 12 -25 46 0 51 12 77 83 182 123 182 351 411 713 716 55 46 29 32 -124 -70 -176 -117 -570 -407 -1014 -745 -86 -66 -174 -128 -195 -138 -92 -44 -188 -24 -254 53 -66 78 -245 254 -271 268 -15 8 -51 14 -81 14 -64 0 -110 -26 -139 -80 -18 -32 -19 -55 -16 -305 3 -261 2 -271 -19 -310 -24 -46 -65 -86 -108 -108 -16 -8 -129 -45 -250 -81 -121 -37 -237 -74 -257 -83 -127 -54 -147 -222 -34 -288 22 -13 128 -62 235 -109 211 -93 253 -120 288 -186 33 -62 30 -112 -23 -387 -42 -214 -46 -246 -36 -281 32 -105 128 -149 227 -103 22 10 125 78 228 150 213 150 252 171 322 171 69 0 104 -19 305 -164 96 -69 195 -136 220 -148 87 -43 178 -22 218 51 36 64 35 94 -7 331 -46 252 -49 316 -22 375 34 73 75 101 272 184 290 122 307 133 327 214 24 92 -23 158 -142 203 -210 79 -226 86 -250 115 -46 55 -43 126 9 209 37 58 132 174 324 395 252 289 400 465 526 630 114 147 201 273 194 279 -2 2 -35 -35 -74 -81z m-1687 -1408 c2 -2 -55 -165 -126 -362 l-131 -358 -50 -3 -51 -3 51 143 c28 79 61 172 74 208 21 60 108 296 134 364 11 27 14 28 53 22 23 -4 44 -9 46 -11z m-408 -144 l0 -60 -113 -70 c-63 -39 -121 -73 -130 -77 -10 -3 -17 -9 -17 -13 0 -4 59 -42 130 -86 l130 -79 0 -58 c0 -32 -4 -58 -10 -58 -8 0 -243 141 -367 220 -18 12 -23 24 -23 56 l0 42 133 83 c72 46 159 100 191 121 33 21 63 38 68 38 4 0 8 -27 8 -59z m661 -51 c90 -57 174 -109 187 -116 17 -11 22 -23 22 -57 l-1 -42 -92 -56 c-51 -31 -140 -86 -199 -122 l-108 -67 0 63 0 62 130 80 c71 44 129 82 129 85 0 3 -58 40 -129 83 l-130 79 0 60 c0 47 3 59 14 55 7 -3 87 -51 177 -107z"/>
                <path d="M1581 2795 c-26 -97 -33 -104 -136 -125 -79 -17 -87 -26 -34 -40 67 -17 126 -40 138 -54 6 -6 21 -45 33 -86 13 -40 28 -75 35 -77 6 -2 16 19 23 49 26 108 37 125 94 147 29 11 69 23 89 26 53 10 46 22 -20 35 -122 23 -125 25 -157 123 -16 48 -32 87 -36 87 -4 0 -17 -38 -29 -85z"/>
                <path d="M3046 2220 c-9 -38 -25 -79 -34 -89 -10 -12 -47 -28 -90 -38 -39 -10 -72 -22 -71 -28 1 -5 25 -16 55 -22 94 -22 108 -33 134 -115 14 -40 28 -77 32 -82 8 -10 7 -12 37 91 l21 72 53 20 c30 11 70 23 90 26 60 12 49 25 -33 40 -101 19 -124 41 -151 149 -6 25 -14 46 -18 46 -4 0 -15 -31 -25 -70z"/>
                <path d="M2674 1744 c-10 -41 -32 -63 -70 -70 -49 -9 -50 -20 -4 -28 42 -7 63 -29 76 -79 8 -33 17 -26 34 26 10 33 17 39 56 49 24 7 44 15 44 18 0 3 -21 12 -48 20 -39 12 -49 21 -57 47 -15 45 -23 50 -31 17z"/>
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