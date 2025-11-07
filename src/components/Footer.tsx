import { Mail, Linkedin, Twitter, Github } from 'lucide-react';
import stellarcodeLogo from '../assets/stellarcode-logo.svg';

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-void-black border-t border-nebula-blue/20 py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <img 
              src={stellarcodeLogo} 
              alt="Stellar Code" 
              className="h-10 w-auto mb-4"
            />
            <p className="text-muted-foreground mb-6 max-w-md">
              Building stellar web products together. We partner with SaaS startups to create 
              top-tier applications and high-performing development teams.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="p-2 bg-nebula-blue/20 border border-nebula-blue/30 rounded-lg text-muted-foreground hover:text-primary hover:border-primary/30 transition-stellar hover-glow"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-nebula-blue/20 border border-nebula-blue/30 rounded-lg text-muted-foreground hover:text-primary hover:border-primary/30 transition-stellar hover-glow"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-nebula-blue/20 border border-nebula-blue/30 rounded-lg text-muted-foreground hover:text-primary hover:border-primary/30 transition-stellar hover-glow"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 bg-nebula-blue/20 border border-nebula-blue/30 rounded-lg text-muted-foreground hover:text-primary hover:border-primary/30 transition-stellar hover-glow"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-stellar-white mb-4">Services</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="hover:text-primary transition-stellar"
                >
                  Full-Stack Development
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="hover:text-primary transition-stellar"
                >
                  Cloud Infrastructure
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="hover:text-primary transition-stellar"
                >
                  Dedicated Developers
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="hover:text-primary transition-stellar"
                >
                  Team Training
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-stellar-white mb-4">Company</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <button 
                  onClick={() => scrollToSection('why-us')}
                  className="hover:text-primary transition-stellar"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('case-studies')}
                  className="hover:text-primary transition-stellar"
                >
                  Case Studies
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('testimonials')}
                  className="hover:text-primary transition-stellar"
                >
                  Testimonials
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="hover:text-primary transition-stellar"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-nebula-blue/20 mt-12 pt-8 text-center">
          <p className="text-muted-foreground">
            © 2024 Stellar Code. All rights reserved. Building the future, one stellar project at a time.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;