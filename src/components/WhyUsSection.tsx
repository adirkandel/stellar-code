import { Rocket, Handshake, Layers, Crown, Heart } from 'lucide-react';

const WhyUsSection = () => {
  const reasons = [
    {
      icon: Rocket,
      title: 'Startup DNA',
      description: 'We\'ve been in your shoes. Our team has built and scaled startups, so we understand the urgency, constraints, and vision.'
    },
    {
      icon: Handshake,
      title: 'Partnership Over Projects',
      description: 'We don\'t just deliver code and disappear. We become invested in your success and grow alongside your business.'
    },
    {
      icon: Layers,
      title: 'Full-Stack & Cloud Expertise',
      description: 'From frontend to backend to infrastructure, we handle the complete technical stack with modern best practices.'
    },
    {
      icon: Crown,
      title: 'Leaders, Not Just Developers',
      description: 'Our team includes technical leaders who can mentor your developers and establish engineering best practices.'
    },
    {
      icon: Heart,
      title: 'Human Approach',
      description: 'Technology is built by humans for humans. We prioritize clear communication, empathy, and genuine relationships.'
    }
  ];

  return (
    <section id="why-us" className="py-24 bg-deep-space relative overflow-hidden">
      {/* Constellation background */}
      <div className="absolute inset-0 opacity-20">
        <svg viewBox="0 0 1200 800" className="w-full h-full">
          {/* Constellation lines */}
          <g stroke="currentColor" strokeWidth="1" fill="none" className="text-primary">
            <line x1="200" y1="150" x2="300" y2="200" />
            <line x1="300" y1="200" x2="450" y2="180" />
            <line x1="450" y1="180" x2="600" y2="220" />
            <line x1="600" y1="220" x2="750" y2="160" />
            <line x1="300" y1="200" x2="400" y2="350" />
            <line x1="450" y1="180" x2="500" y2="320" />
            <line x1="600" y1="220" x2="650" y2="380" />
          </g>
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-space mb-6">
            <span className="text-stellar-white">Why</span>
            <span className="text-primary glow-stellar"> Stellar Code?</span>
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-muted-foreground mb-8">
              <span className="text-primary font-semibold">Stellar Code</span> isn't just another dev shop. 
              We're engineers, architects, and mentors who have lived the challenges of startups.
            </p>
            <p className="text-lg text-stellar-white">
              Our mission is simple: to help you build <span className="text-neon-teal font-medium">stellar software</span> and 
              <span className="text-neon-teal font-medium"> stellar teams</span> that can grow with your vision.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reasons.map((reason, index) => {
            const IconComponent = reason.icon;
            return (
              <div
                key={index}
                className="group text-center"
              >
                {/* Constellation node */}
                <div className="relative inline-flex items-center justify-center mb-6">
                  <div className="absolute w-20 h-20 bg-primary/10 rounded-full animate-pulse-slow" />
                  <div className="relative p-4 bg-primary/20 border-2 border-primary/40 rounded-full group-hover:border-primary/80 transition-stellar group-hover:scale-110">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                </div>

                <h3 className="text-xl font-bold font-space text-stellar-white mb-4 group-hover:text-primary transition-stellar">
                  {reason.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;