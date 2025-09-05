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

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-2 mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-stellar-white">
              Trusted by 50+ SaaS startups
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-bold font-space mb-6 leading-tight">
            <span className="text-stellar-white">Building</span>
            <br />
            <span className="text-primary glow-stellar">Stellar</span>
            <span className="text-stellar-white"> Web Products,</span>
            <br />
            <span className="text-neon-teal">Together</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            We partner with SaaS startups, entrepreneurs, and tech leaders to create 
            <span className="text-stellar-white font-medium"> top-tier web applications</span>, 
            scalable cloud infrastructure, and high-performing development teams.
          </p>

          {/* CTA Button */}
          <button
            onClick={scrollToContact}
            className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold transition-stellar hover-glow hover:-translate-y-1 shadow-cosmic"
          >
            Let's Talk
            <ArrowRight className="w-5 h-5 transition-stellar group-hover:translate-x-1" />
          </button>

          {/* Stats */}
          <div className="flex justify-center items-center gap-8 mt-16 pt-8 border-t border-nebula-blue/30">
            <div className="text-center">
              <div className="text-3xl font-bold font-space text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Projects Delivered</div>
            </div>
            <div className="w-px h-12 bg-nebula-blue/30" />
            <div className="text-center">
              <div className="text-3xl font-bold font-space text-neon-teal">98%</div>
              <div className="text-sm text-muted-foreground">Client Satisfaction</div>
            </div>
            <div className="w-px h-12 bg-nebula-blue/30" />
            <div className="text-center">
              <div className="text-3xl font-bold font-space text-primary">24/7</div>
              <div className="text-sm text-muted-foreground">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;