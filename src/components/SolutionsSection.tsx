import { Users, Rocket, ShieldCheck, Puzzle, Sparkles, Gauge } from "lucide-react";
import { useState, useRef } from "react";
import missionScaleCrewExpansion from "@/assets/mission-scale-crew-expansion.jpg";
import fasterTimeToMarket from "@/assets/faster-time-to-market.jpg";
import readyToDeployMissionCrew from "@/assets/ready-to-deploy-mission-crew.jpg";
import seamlessTechDocking from "@/assets/seamless-tech-docking.jpg";
import resourceEfficientOrbit from "@/assets/resource-efficient-orbit.jpg";
import noTimeCrewAssembling from "@/assets/no-time-crew-assembling.jpg";

const solutions = [{
  icon: Users,
  title: "Crew Expansion",
  description: "Flexible team augmentation lets your product scale engineering force instantly - whether you need to ramp up for a new mission or orbit down for efficiency, adapt on a project-by-project basis as your trajectory evolves.",
  image: missionScaleCrewExpansion
}, {
  icon: Rocket,
  title: "Faster time-to-market",
  description: "Rapid access to top-tier specialists propels your product through the development lifecycle and helps you reach launch windows faster, giving you a competitive advantage in the innovation cosmos.",
  image: fasterTimeToMarket
}, {
  icon: ShieldCheck,
  title: "Ready-to-Deploy Mission Crew",
  description: "Our augmentation approach assembles a unified squad of technical experts, working alongside your existing crew, enabling efficient collaboration and focused thrust towards mission milestones.",
  image: readyToDeployMissionCrew
}, {
  icon: Puzzle,
  title: "Seamless Tech Docking",
  description: "Our engineers synchronize with your technology ecosystem, mastering your tools, frameworks, and methodologies for frictionless integration and perfect alignment on every mission.",
  image: seamlessTechDocking
}, {
  icon: Sparkles,
  title: "Resource Efficiency",
  description: "No need for extra infrastructure or licenses - expand your crew without additional overhead or losing velocity to costly recruitment wormholes.",
  image: resourceEfficientOrbit
}, {
  icon: Gauge,
  title: "No-Time Crew Assembling",
  description: "Access battle-tested, pre-vetted professionals instantly - no getting stuck in the recruitment gravity well, so development lifts off without delays.",
  image: noTimeCrewAssembling
}];
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
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
    
    // Update holographic effect position with gentle space-themed colors
    const holographic = card.querySelector('.holographic-overlay') as HTMLElement;
    if (holographic) {
      holographic.style.background = `radial-gradient(circle at ${x}px ${y}px, hsl(var(--primary) / 0.12), hsl(260 60% 65% / 0.08), hsl(200 70% 60% / 0.06), transparent 50%)`;
    }
  };
  const handleMouseLeave = (index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    setHoveredIndex(null);
  };
  return <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-space mb-6">
            <span className="text-primary glow-stellar">Solutions</span>
            <span className="text-stellar-white"> Planned for Scale</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Mission-critical capabilities that propel your development velocity to new frontiers
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {solutions.map((solution, index) => {
          return <div key={index} ref={el => cardRefs.current[index] = el} className="group relative bg-card/50 backdrop-blur-sm border border-border rounded-lg overflow-hidden transition-all duration-300 md:hover:shadow-lg md:hover:shadow-primary/20 flex flex-col md:flex-row min-h-[280px]" style={{
            transformStyle: 'preserve-3d',
            transition: 'transform 0.1s ease-out'
          }} onMouseMove={e => {
            if (window.innerWidth >= 1024) {
              handleMouseMove(e, index);
              setHoveredIndex(index);
            }
          }} onMouseLeave={() => {
            if (window.innerWidth >= 1024) {
              handleMouseLeave(index);
            }
          }}>
                {/* Content on Left (tablet/desktop) / Top (mobile) */}
                <div className="relative z-10 py-8 px-8 space-y-4 flex-1 flex flex-col justify-start" style={{
              transform: hoveredIndex === index && window.innerWidth >= 1024 ? 'translateZ(25px)' : 'translateZ(0px)',
              transition: 'transform 0.3s ease-out'
            }}>
                  <h3 className="text-xl font-semibold text-foreground">
                    {solution.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {solution.description}
                  </p>
                </div>

                {/* Image on Right (tablet/desktop) / Bottom (mobile) */}
                <div className="relative w-full md:w-2/5 min-h-[200px] md:min-h-full">
                  <img 
                    src={solution.image} 
                    alt={solution.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Gradient from top on mobile, from left on tablet/desktop */}
                  <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-l from-background via-background/30 to-transparent md:from-transparent md:via-background/30 md:to-background" />
                </div>

                <div className="holographic-overlay absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{
              background: 'radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.12), hsl(260 60% 65% / 0.08), hsl(200 70% 60% / 0.06), transparent 50%)',
              mixBlendMode: 'screen'
            }} />
              </div>;
        })}
        </div>
      </div>
    </section>;
};
export default SolutionsSection;