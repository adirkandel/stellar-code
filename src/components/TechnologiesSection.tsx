import { useEffect, useRef, useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Import SVG logos
import ReactLogo from "@/assets/react-logo.svg";
import VueLogo from "@/assets/vue-logo.svg";
import NodeJSLogo from "@/assets/nodejs-logo.svg";
import NextJSLogo from "@/assets/nextjs-logo.svg";
import NuxtLogo from "@/assets/nuxt-logo.svg";
import LaravelLogo from "@/assets/laravel-logo.svg";
import PostgreSQLLogo from "@/assets/postgresql-logo.svg";
import PrismaLogo from "@/assets/prisma-logo.svg";
import DockerLogo from "@/assets/docker-logo.svg";
import KubernetesLogo from "@/assets/kubernetes-logo.svg";

const technologies = [
  { name: "React", logo: ReactLogo, speed: 0.5 },
  { name: "Vue.js", logo: VueLogo, speed: 0.7 },
  { name: "Node.js", logo: NodeJSLogo, speed: 0.3 },
  { name: "Next.js", logo: NextJSLogo, speed: 0.6 },
  { name: "Nuxt.js", logo: NuxtLogo, speed: 0.4 },
  { name: "Laravel", logo: LaravelLogo, speed: 0.8 },
  { name: "PostgreSQL", logo: PostgreSQLLogo, speed: 0.2 },
  { name: "Prisma", logo: PrismaLogo, speed: 0.9 },
  { name: "Docker", logo: DockerLogo, speed: 0.35 },
  { name: "Kubernetes", logo: KubernetesLogo, speed: 0.65 },
];

const TechnologiesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const sectionHeight = rect.height;
        const windowHeight = window.innerHeight;
        
        // Calculate scroll progress within the section
        const scrollProgress = Math.max(0, Math.min(1, 
          (window.scrollY + windowHeight - sectionTop) / (sectionHeight + windowHeight)
        ));
        
        setScrollY(scrollProgress * 200); // Multiply by 200 for more dramatic effect
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} id="technologies" className="py-20 relative overflow-hidden bg-deep-space">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Technologies We Master
          </h2>
        </div>

        <TooltipProvider>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
            {technologies.map((tech, index) => (
              <Tooltip key={tech.name}>
                <TooltipTrigger asChild>
                  <div
                    className="relative group cursor-pointer"
                    style={{
                      transform: `translateY(${scrollY * tech.speed}px)`,
                      transition: "transform 0.1s ease-out",
                    }}
                  >
                    {/* Bubble container */}
                    <div className="relative w-24 h-24 mx-auto">
                      {/* Bubble background */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-primary/50 group-hover:scale-110">
                        {/* Shine effect */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                        
                        {/* Shimmer effect on hover */}
                        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 group-hover:animate-spin" style={{ animationDuration: '2s' }}></div>
                      </div>
                      
                      {/* Technology logo */}
                      <div className="absolute inset-0 flex items-center justify-center p-4">
                        <img
                          src={tech.logo}
                          alt={tech.name}
                          className="w-10 h-10 object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300 group-hover:scale-110"
                        />
                      </div>

                      {/* Glow effect */}
                      <div className="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl scale-150"></div>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="bg-gradient-to-r from-primary/90 to-cosmic-purple/90 backdrop-blur-sm border-primary/50 text-white shadow-xl shadow-primary/30 px-4 py-2 rounded-lg font-medium"
                >
                  <div className="relative">
                    {tech.name}
                    {/* Tooltip glow */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-primary/50 to-cosmic-purple/50 rounded-lg blur-md opacity-75 -z-10"></div>
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      </div>
    </section>
  );
};

export default TechnologiesSection;