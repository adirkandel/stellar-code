import { ArrowRight, Sparkles } from 'lucide-react';
import heroStarfield from '@/assets/hero-starfield.jpg';

const HeroSection = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${heroStarfield})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-space/80 via-deep-space/60 to-deep-space/80" />
      
      {/* Animated nebula overlay */}
      <div className="absolute inset-0 bg-gradient-nebula animate-pulse-slow" />

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-10 gap-8 items-center min-h-screen py-20">
          {/* Left side - Text content (60% on mobile, 70% on large) */}
          <div className="md:col-span-6 lg:col-span-7 text-center md:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-2 mb-8 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-stellar-white">
                Trusted by 50+ SaaS startups
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-bold font-space mb-6 leading-tight">
              <span className="text-stellar-white">Building</span>
              <br />
              <span className="text-primary glow-stellar">Stellar</span>
              <span className="text-stellar-white"> Web Products,</span>
              <br />
              <span className="text-neon-teal">Together</span>
            </h1>

            {/* Subheading */}
            <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-muted-foreground mb-12 leading-relaxed">
              We partner with SaaS startups, entrepreneurs, and tech leaders to create 
              <span className="text-stellar-white font-medium"> top-tier web applications</span>, 
              scalable cloud infrastructure, and high-performing development teams.
            </p>

            {/* CTA Button */}
            <button
              onClick={scrollToContact}
              className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold transition-stellar hover-glow hover:-translate-y-1 shadow-cosmic mb-12 md:mb-16"
            >
              Let's Talk
              <ArrowRight className="w-5 h-5 transition-stellar group-hover:translate-x-1" />
            </button>

            {/* Stats */}
            <div className="flex justify-center md:justify-start items-center gap-4 md:gap-8 pt-8 border-t border-nebula-blue/30">
              <div className="text-center md:text-left">
                <div className="text-2xl md:text-3xl font-bold font-space text-primary">50+</div>
                <div className="text-xs md:text-sm text-muted-foreground">Projects Delivered</div>
              </div>
              <div className="w-px h-8 md:h-12 bg-nebula-blue/30" />
              <div className="text-center md:text-left">
                <div className="text-2xl md:text-3xl font-bold font-space text-neon-teal">98%</div>
                <div className="text-xs md:text-sm text-muted-foreground">Client Satisfaction</div>
              </div>
              <div className="w-px h-8 md:h-12 bg-nebula-blue/30" />
              <div className="text-center md:text-left">
                <div className="text-2xl md:text-3xl font-bold font-space text-primary">24/7</div>
                <div className="text-xs md:text-sm text-muted-foreground">Support Available</div>
              </div>
            </div>
          </div>

          {/* Right side - Image space (40% on mobile, 30% on large) */}
          <div className="md:col-span-4 lg:col-span-3 flex justify-center md:justify-end">
            <div className="w-full max-w-sm md:max-w-md h-64 md:h-96 bg-gradient-card backdrop-blur-sm border border-primary/20 rounded-xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 bg-primary/20 border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <p className="text-muted-foreground">Image placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;