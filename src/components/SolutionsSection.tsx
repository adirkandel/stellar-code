import { useState, useRef } from "react";
import stellarExpertiseOnDemand from "@/assets/stellar-expertise-on-demand.jpg";
import focusOnYourVision from "@/assets/focus-on-your-vision.jpg";
import launchFasterLeadMarket from "@/assets/launch-faster-lead-market.jpg";
import alwaysAlignedLatestTech from "@/assets/always-aligned-latest-tech.jpg";

const solutions = [{
  problem: "limited access to expertise",
  title: "Stellar Expertise On Demand",
  description: "Instantly access a team of seasoned developers and specialists ready to join your mission. Our team augmentation connects you with the right talent for every technology challenge, accelerating progress without hiring delays.",
  image: stellarExpertiseOnDemand
}, {
  problem: "loosing focus on core business",
  title: "Focus on Your Vision",
  description: "Free your leadership from recruitment and team management gravity wells. Stellar Code takes care of building and scaling your engineering crew, so you can concentrate on navigating your product's strategic trajectory.",
  image: focusOnYourVision
}, {
  problem: "market competitiveness",
  title: "Launch Faster, Lead the Market",
  description: "Stay ahead in the innovation cosmos by speeding up your development lifecycle. Our stellar teams propel your product to launch windows quickly and efficiently, giving you the momentum to outpace competitors.",
  image: launchFasterLeadMarket
}, {
  problem: "stay up to date with technologies",
  title: "Always Aligned with the Latest Tech",
  description: "Our mission experts continuously adapt to cutting-edge tools, frameworks, and methodologies. We ensure your engineering force stays in sync with the newest technological frontiers, fueling your product's evolution and relevance.",
  image: alwaysAlignedLatestTech
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
  return <section id="solutions" className="py-20 relative overflow-hidden">
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