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
import OpenAILogo from "@/assets/openai-logo.svg";
import FigmaLogo from "@/assets/figma-logo.svg";
import TypeScriptLogo from "@/assets/typescript-logo.svg";
import PHPLogo from "@/assets/php-logo.svg";
import AzureLogo from "@/assets/azure-logo.svg";
import AWSLogo from "@/assets/aws-logo.svg";
import FloatingAstronautBg from "@/assets/floating-astronaut-background.jpg";

const technologies = [
  { name: "React", logo: ReactLogo, speed: 0.5, x: 12, y: 18, size: 90, mobileSize: 60 },
  { name: "Vue.js", logo: VueLogo, speed: 0.7, x: 78, y: 12, size: 80, mobileSize: 55 },
  { name: "Node.js", logo: NodeJSLogo, speed: 0.3, x: 20, y: 75, size: 100, mobileSize: 65 },
  { name: "Next.js", logo: NextJSLogo, speed: 0.6, x: 68, y: 68, size: 85, mobileSize: 58 },
  { name: "Nuxt.js", logo: NuxtLogo, speed: 0.4, x: 88, y: 38, size: 95, mobileSize: 62 },
  { name: "Laravel", logo: LaravelLogo, speed: 0.8, x: 8, y: 48, size: 75, mobileSize: 50 },
  { name: "PostgreSQL", logo: PostgreSQLLogo, speed: 0.2, x: 42, y: 22, size: 110, mobileSize: 70 },
  { name: "Prisma", logo: PrismaLogo, speed: 0.9, x: 58, y: 82, size: 85, mobileSize: 58 },
  { name: "Docker", logo: DockerLogo, speed: 0.35, x: 35, y: 52, size: 90, mobileSize: 60 },
  { name: "Kubernetes", logo: KubernetesLogo, speed: 0.65, x: 82, y: 78, size: 105, mobileSize: 68 },
  { name: "TypeScript", logo: TypeScriptLogo, speed: 0.45, x: 28, y: 32, size: 95, mobileSize: 62 },
  { name: "OpenAI", logo: OpenAILogo, speed: 0.55, x: 72, y: 28, size: 88, mobileSize: 58 },
  { name: "Figma", logo: FigmaLogo, speed: 0.25, x: 15, y: 88, size: 82, mobileSize: 55 },
  { name: "PHP", logo: PHPLogo, speed: 0.75, x: 92, y: 18, size: 78, mobileSize: 52 },
  { name: "Azure", logo: AzureLogo, speed: 0.85, x: 52, y: 58, size: 92, mobileSize: 60 },
  { name: "AWS", logo: AWSLogo, speed: 0.15, x: 38, y: 92, size: 108, mobileSize: 70 },
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
    <section 
      ref={sectionRef} 
      id="technologies" 
      className="py-20 relative overflow-hidden bg-deep-space"
      style={{
        backgroundImage: `url(${FloatingAstronautBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay to maintain contrast */}
      <div className="absolute inset-0 bg-deep-space/60"></div>
      
      {/* Top gradient blend */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-deep-space to-transparent z-10"></div>
      
      {/* Bottom gradient blend */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-deep-space to-transparent z-10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="glow-stellar text-primary">Technologies</span> We Master
          </h2>
        </div>

        <TooltipProvider>
          <div className="relative w-full h-96 max-w-6xl mx-auto">
            {technologies.map((tech, index) => (
              <Tooltip key={tech.name}>
                <TooltipTrigger asChild>
                  <div
                    className="absolute group cursor-pointer"
                    style={{
                      left: `${tech.x}%`,
                      top: `${tech.y}%`,
                      transform: `translate(-50%, -50%) translateY(${scrollY * tech.speed}px)`,
                      transition: "transform 0.1s ease-out",
                    }}
                  >
                    {/* Bubble container */}
                    <div 
                      className="relative mx-auto group-hover:animate-float"
                      style={{
                        width: `${window.innerWidth < 768 ? tech.mobileSize : tech.size}px`,
                        height: `${window.innerWidth < 768 ? tech.mobileSize : tech.size}px`,
                      }}
                    >
                      {/* Bubble background */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 shadow-lg transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-primary/50 group-hover:scale-110">
                        {/* Shine effect */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        {/* Shimmer effect on hover */}
                        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                      </div>
                      
                      {/* Technology logo */}
                      <div className="absolute inset-0 flex items-center justify-center p-4">
                        <img
                          src={tech.logo}
                          alt={tech.name}
                          className="object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300 group-hover:scale-110"
                          style={{
                            width: `${(window.innerWidth < 768 ? tech.mobileSize : tech.size) * 0.4}px`,
                            height: `${(window.innerWidth < 768 ? tech.mobileSize : tech.size) * 0.4}px`,
                          }}
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