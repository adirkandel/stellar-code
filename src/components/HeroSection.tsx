import { ArrowRight, Sparkles } from 'lucide-react';
import heroStarfield from '@/assets/space-full-of-stars-min.jpg';
import astronaut from '@/assets/astronaut.png';
const HeroSection = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{
    backgroundImage: `url(${heroStarfield})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }}>
      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-space/40 via-deep-space/20 to-deep-space/40" />
      
      {/* Animated nebula overlay */}
      <div className="absolute inset-0 bg-gradient-nebula animate-pulse-slow" />

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => <div key={i} className="absolute w-1 h-1 bg-primary rounded-full animate-twinkle" style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`
      }} />)}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center min-h-screen py-20">
          {/* Left side - Text content (60% on mobile, 70% on large) */}
          <div className="md:col-span-7 text-center md:text-left">
            {/* Badge */}
            

            {/* Headline */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-space mb-6 leading-tight">
              <span className="text-stellar-white">Building</span>
              <br />
              <span className="text-primary glow-stellar">Stellar</span>
              <span className="text-stellar-white"> Web Products,</span>
              <br />
              <span className="text-neon-teal">Together</span>
            </h1>

            {/* Subheading */}
            <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-muted-foreground mb-12 leading-relaxed">
              We partner with entrepreneurs and tech leaders to create 
              <span className="text-stellar-white font-medium"> top-tier web applications</span>, 
              scalable cloud infrastructure, and high-performing development teams.
            </p>

            {/* CTA Button */}
            <button onClick={scrollToContact} className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold transition-stellar hover-glow hover:-translate-y-1 shadow-cosmic mb-12 md:mb-16">
              Let's Talk
              <ArrowRight className="w-5 h-5 transition-stellar group-hover:translate-x-1" />
            </button>

            {/* Stats */}
            
          </div>

          {/* Right side - Image space (40% on mobile, 30% on large) */}
          <div className="md:col-span-5 flex justify-center md:justify-end">
            <div className="w-full max-w-sm md:max-w-md h-64 md:h-96">
              <img 
                src={astronaut} 
                alt="Astronaut with laptop representing stellar web development" 
                className="relative z-10 w-full h-full object-contain animate-float p-4"
              />
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;