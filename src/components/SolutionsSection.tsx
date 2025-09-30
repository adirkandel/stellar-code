import { Users, Rocket, ShieldCheck, Puzzle, Sparkles, Gauge } from "lucide-react";
import { useState, useRef } from "react";

const solutions = [
  {
    icon: Users,
    title: "Mission-Scale Crew Expansion",
    description: "Flexible team augmentation lets your product scale engineering force instantly - whether you need to ramp up for a new mission or orbit down for efficiency, adapt on a project-by-project basis as your trajectory evolves."
  },
  {
    icon: Rocket,
    title: "Faster time-to-market",
    description: "Rapid access to top-tier specialists propels your product through the development lifecycle and helps you reach launch windows faster, giving you a competitive advantage in the innovation cosmos."
  },
  {
    icon: ShieldCheck,
    title: "Ready-to-Deploy Mission Crew",
    description: "Our augmentation approach assembles a unified squad of technical experts, docked alongside your existing crew, enabling efficient collaboration and focused thrust towards mission milestones."
  },
  {
    icon: Puzzle,
    title: "Seamless Tech Docking",
    description: "Our engineers synchronize with your technology ecosystem, mastering your tools, frameworks, and methodologies for frictionless integration and perfect alignment on every mission."
  },
  {
    icon: Sparkles,
    title: "Resource-Efficient Orbit",
    description: "No need for extra infrastructure or licenses - expand your crew without additional overhead or losing velocity to costly recruitment wormholes."
  },
  {
    icon: Gauge,
    title: "Immediate Crew Launch",
    description: "Access battle-tested, pre-vetted professionals instantly - no getting stuck in the recruitment gravity well, so development lifts off without delays."
  }
];

const SolutionsSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;

    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    setHoveredIndex(null);
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Solutions Engineered for Scale
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Mission-critical capabilities that propel your development velocity to new frontiers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <div
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
                className="group relative bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 transition-all duration-300 md:hover:shadow-lg md:hover:shadow-primary/20"
                style={{
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.1s ease-out',
                }}
                onMouseMove={(e) => {
                  if (window.innerWidth >= 768) {
                    handleMouseMove(e, index);
                    setHoveredIndex(index);
                  }
                }}
                onMouseLeave={() => {
                  if (window.innerWidth >= 768) {
                    handleMouseLeave(index);
                  }
                }}
              >
                <div 
                  className="space-y-4"
                  style={{
                    transform: hoveredIndex === index && window.innerWidth >= 768 
                      ? 'translateZ(40px)' 
                      : 'translateZ(0px)',
                    transition: 'transform 0.3s ease-out'
                  }}
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground">
                    {solution.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {solution.description}
                  </p>
                </div>

                <div 
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at center, hsl(var(--primary) / 0.1), transparent 70%)',
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;