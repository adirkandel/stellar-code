import { useState, useEffect, useRef, useMemo } from 'react';
import { Plus, X } from 'lucide-react';

interface SuccessCard {
  id: string;
  valueTitle: string;
  companyName: string;
  companyLogoUrl: string;
  briefDescription: string;
  fullStory: string;
  initialTiltDeg: number;
}

const SecondSuccessSection = () => {
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const [centeringCardId, setCenteringCardId] = useState<string | null>(null);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const expandedCardRef = useRef<HTMLDivElement>(null);

  // Generate scattered positions for desktop
  const scatteredPositions = useMemo(() => {
    const positions = [
      { x: '15%', y: '10%' },
      { x: '65%', y: '5%' },
      { x: '10%', y: '55%' },
      { x: '70%', y: '60%' },
      { x: '40%', y: '25%' },
      { x: '25%', y: '75%' },
      { x: '80%', y: '30%' }
    ];
    return positions;
  }, []);

  const successCards: SuccessCard[] = [
    {
      id: "c1",
      valueTitle: "Cut Time-to-Ship by 35%",
      companyName: "Orion Labs",
      companyLogoUrl: "/logos/orion.svg",
      briefDescription: "Streamlined deployment process through automation and strategic rollout techniques.",
      fullStory: "We integrated a comprehensive CI/CD pipeline with automated testing, code quality checks, and canary deployment strategies for Orion Labs. The implementation included setting up containerized environments, implementing blue-green deployments, and establishing rollback protocols that reduced deployment failures by 85%. We also introduced feature flags and automated monitoring that provided real-time insights into application performance. The canary strategy allowed for gradual traffic shifting, ensuring zero-downtime deployments while maintaining system reliability. Additionally, we established comprehensive logging and alerting systems that enabled the team to proactively identify and resolve issues before they impacted users. This holistic approach not only reduced rollbacks but also boosted deploy frequency from weekly to multiple daily releases, dramatically accelerating their development velocity and time-to-market for new features.",
      initialTiltDeg: -6
    },
    {
      id: "c2", 
      valueTitle: "Conversion +22%",
      companyName: "Nebula Commerce",
      companyLogoUrl: "/logos/nebula.svg",
      briefDescription: "Optimized checkout experience with performance improvements and data-driven UX enhancements.",
      fullStory: "We completely rebuilt Nebula Commerce's checkout flow from the ground up, implementing edge caching strategies and conducting extensive A/B testing on microcopy and user interface elements. Our team analyzed user behavior patterns, identified friction points in the conversion funnel, and systematically addressed each bottleneck. We implemented progressive web app technologies, reduced page load times by 60%, and optimized the mobile experience for seamless transactions. The A/B testing involved over 50 different variations of copy, button placements, form layouts, and trust signals. We also integrated advanced analytics to track user interactions at a granular level, enabling real-time optimization based on conversion data. The implementation included smart form validation, guest checkout options, multiple payment methods, and personalized product recommendations during checkout. Our data-driven approach to UX optimization, combined with technical performance improvements, resulted in a significant lift in conversion rates and substantial revenue growth for Nebula Commerce.",
      initialTiltDeg: 8
    },
    {
      id: "c3",
      valueTitle: "MTTR down 48%",
      companyName: "StellarPay",
      companyLogoUrl: "/logos/stellarpay.svg", 
      briefDescription: "Enhanced incident response capabilities through structured monitoring and automated recovery procedures.",
      fullStory: "We introduced a comprehensive observability strategy for StellarPay that included structured logging, distributed tracing, and real-time monitoring across their entire payment processing infrastructure. Our implementation involved setting up centralized log aggregation with Elasticsearch, creating custom dashboards for different stakeholder groups, and establishing automated alerting based on business-critical metrics. We developed detailed on-call playbooks with step-by-step incident response procedures, automated diagnostic tools, and escalation protocols. The system included intelligent alerting that reduced false positives by 70% while ensuring critical issues were immediately escalated to the right team members. We also implemented automated health checks, circuit breakers, and self-healing mechanisms that could resolve common issues without human intervention. Training sessions were conducted for the entire engineering team on incident response best practices, post-mortem analysis, and continuous improvement methodologies. This comprehensive approach to reliability engineering nearly halved their mean time to recovery, significantly reducing revenue impact from system outages and improving customer satisfaction.",
      initialTiltDeg: 3
    },
    {
      id: "c4",
      valueTitle: "Revenue +65%",
      companyName: "Quantum Analytics",
      companyLogoUrl: "/logos/quantum.svg",
      briefDescription: "Implemented advanced data processing and machine learning systems to drive customer insights and retention.",
      fullStory: "We implemented a real-time data processing pipeline and machine learning platform for Quantum Analytics that transformed their customer intelligence capabilities. Our solution included building scalable data ingestion systems using Apache Kafka, implementing stream processing with Apache Flink, and developing custom ML models for predictive analytics. We created a unified customer data platform that consolidated information from multiple touchpoints, enabling 360-degree customer views and personalized experiences. The ML-driven insights engine provided real-time recommendations, churn prediction models, and automated customer segmentation based on behavior patterns. We also developed a self-service analytics platform that empowered business users to create custom reports and dashboards without technical assistance. The implementation included A/B testing frameworks for continuous optimization, automated model retraining pipelines, and comprehensive data governance protocols. Our advanced analytics capabilities enabled Quantum Analytics to identify high-value customer segments, optimize pricing strategies, and implement proactive retention campaigns. The combination of real-time processing, predictive modeling, and actionable insights doubled their customer retention rate and drove substantial revenue growth through improved customer lifetime value.",
      initialTiltDeg: -4
    },
    {
      id: "c5",
      valueTitle: "Load Time -78%",
      companyName: "VelocityCore",
      companyLogoUrl: "/logos/velocity.svg",
      briefDescription: "Achieved dramatic performance improvements through database optimization and intelligent caching strategies.",
      fullStory: "We conducted a comprehensive performance audit and optimization initiative for VelocityCore that addressed bottlenecks across their entire technology stack. Our approach included database query optimization, implementing Redis caching layers, setting up CDN distribution, and refactoring critical application components for improved efficiency. We identified and resolved N+1 query problems, implemented database indexing strategies, and established connection pooling to reduce database load. The CDN implementation included intelligent cache invalidation, image optimization, and strategic content distribution across global edge locations. We also implemented lazy loading techniques, code splitting for JavaScript bundles, and progressive image loading to reduce initial page load times. Server-side optimizations included implementing HTTP/2, enabling gzip compression, and setting up proper cache headers. Our team established performance monitoring with real-user metrics, synthetic testing, and automated performance regression detection. We also implemented service worker caching strategies and offline functionality to improve user experience during network instability. The comprehensive optimization effort not only dramatically improved load times but also reduced server costs by 40% while significantly enhancing user experience and engagement metrics across VelocityCore's platform.",
      initialTiltDeg: 7
    }
  ];

  // Handle mouse movement for 3D tilt effect
  const handleMouseMove = (e: React.MouseEvent, cardId: string) => {
    if (window.innerWidth <= 768) return; // Skip on mobile
    
    const card = e.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    setMousePosition({ x: mouseX, y: mouseY });
    setHoveredCardId(cardId);
  };

  const handleMouseLeave = () => {
    setHoveredCardId(null);
    setMousePosition({ x: 0, y: 0 });
  };

  // Calculate 3D transform
  const get3DTransform = (cardId: string, initialTilt: number) => {
    if (expandedCardId === cardId) {
      return 'translate(-50%, -50%) scale(1.1) rotateX(0deg) rotateY(0deg)';
    }
    
    if (hoveredCardId === cardId && window.innerWidth > 768) {
      const maxTilt = 20;
      const rotateY = (mousePosition.x / 80) * maxTilt;
      const rotateX = -(mousePosition.y / 80) * maxTilt;
      return `rotate(${initialTilt}deg) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.08) translateZ(20px)`;
    }

    return expandedCardId ? 
      `rotate(${initialTilt}deg) scale(0.9) brightness(0.7)` : 
      `rotate(${initialTilt}deg)`;
  };

  const expandCard = (cardId: string) => {
    setCenteringCardId(cardId);
    // Delay expansion until centering animation completes
    setTimeout(() => {
      setExpandedCardId(cardId);
      setCenteringCardId(null);
      // Focus trap for accessibility
      setTimeout(() => {
        expandedCardRef.current?.focus();
      }, 100);
    }, 500);
  };

  const collapseCard = () => {
    setExpandedCardId(null);
  };

  // ESC key handler
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && expandedCardId) {
        collapseCard();
      }
    };
    
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [expandedCardId]);

  // Backdrop click handler
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      collapseCard();  
    }
  };

  return (
    <section className="relative py-24 bg-gradient-galaxy overflow-hidden" id="proven-results">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-space mb-6">
            <span className="text-stellar-white">Proven</span>
            <span className="text-primary glow-stellar"> Results</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Measurable impact delivered for forward-thinking companies
          </p>
        </div>

        {/* Desktop scattered layout */}
        <div 
          ref={sectionRef}
          className="hidden md:block relative h-[700px] w-full"
        >
          {successCards.map((card, index) => {
            const position = scatteredPositions[index] || { x: '50%', y: '50%' };
            const isExpanded = expandedCardId === card.id;
            const isCentering = centeringCardId === card.id;
            
            return (
              <div
                key={card.id}
                className={`absolute transition-all duration-500 ease-out will-change-transform ${
                  isExpanded ? 'z-40' : 'z-10'
                }`}
                style={{
                  left: (isExpanded || isCentering) ? '50%' : position.x,
                  top: (isExpanded || isCentering) ? '50%' : position.y,
                  transform: get3DTransform(card.id, card.initialTiltDeg),
                  transformStyle: 'preserve-3d'
                }}
              >
                <div
                  className={`bg-gradient-card backdrop-blur-sm border border-primary/20 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-cosmic relative ${
                    isExpanded ? 'w-96' : 'w-72'
                  }`}
                  onMouseMove={(e) => handleMouseMove(e, card.id)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => isExpanded ? collapseCard() : expandCard(card.id)}
                  style={{
                    boxShadow: hoveredCardId === card.id && !isExpanded ? 
                      `${mousePosition.x / 8}px ${mousePosition.y / 8}px 40px rgba(139, 92, 246, 0.4)` :
                      undefined
                  }}
                >
                  {/* Close button for expanded state */}
                  {isExpanded && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        collapseCard();
                      }}
                      className="absolute top-4 right-4 text-stellar-white/60 hover:text-stellar-white transition-colors z-10"
                      aria-label="Close expanded card"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                  
                  {/* Card Content */}
                  <div className="space-y-4">
                    {/* Value Title */}
                    <h3 className="text-xl font-bold text-stellar-white font-space">
                      {card.valueTitle}
                    </h3>
                    
                    {/* Company Logo and Name */}
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-10 flex items-center justify-center bg-stellar-white/10 rounded-lg">
                        <span className="text-stellar-white font-bold text-sm">
                          {card.companyName.split(' ').map(word => word[0]).join('')}
                        </span>
                      </div>
                      <span className="text-muted-foreground font-medium">{card.companyName}</span>
                    </div>
                    
                    {/* Brief Description (collapsed state) */}
                    {!isExpanded && (
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {card.briefDescription}
                      </p>
                    )}
                    
                    {/* Expand Button */}
                    {!isExpanded && (
                      <div className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium">
                        <Plus className="w-4 h-4" />
                        Read Story
                      </div>
                    )}
                    
                    {/* Full Story (expanded state) */}
                    {isExpanded && (
                      <div 
                        id={`story-${card.id}`}
                        className="mt-4 pt-4 border-t border-primary/20 animate-fade-in"
                        ref={expandedCardRef}
                        tabIndex={-1}
                      >
                        <p className="text-muted-foreground leading-relaxed">
                          {card.fullStory}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile list layout */}
        <div className="md:hidden space-y-6">
          {successCards.map((card) => {
            const isExpanded = expandedCardId === card.id;
            
            return (
              <div
                key={card.id}
                className="bg-gradient-card backdrop-blur-sm border border-primary/20 rounded-xl p-6 transition-all duration-300"
              >
                {/* Card Content */}
                <div className="space-y-4">
                  {/* Value Title */}
                  <h3 className="text-xl font-bold text-stellar-white font-space">
                    {card.valueTitle}
                  </h3>
                  
                  {/* Company Logo and Name */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-10 flex items-center justify-center bg-stellar-white/10 rounded-lg">
                      <span className="text-stellar-white font-bold text-sm">
                        {card.companyName.split(' ').map(word => word[0]).join('')}
                      </span>
                    </div>
                    <span className="text-muted-foreground font-medium">{card.companyName}</span>
                  </div>
                  
                  {/* Brief Description (collapsed state) */}
                  {!isExpanded && (
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {card.briefDescription}
                    </p>
                  )}
                  
                  {/* Expand Button */}
                  <button
                    onClick={() => isExpanded ? collapseCard() : expandCard(card.id)}
                    className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
                    aria-expanded={isExpanded}
                    aria-controls={`story-mobile-${card.id}`}
                  >
                    {isExpanded ? (
                      <>
                        <X className="w-4 h-4" />
                        Close
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        Read Story
                      </>
                    )}
                  </button>
                  
                  {/* Full Story (expanded state) */}
                  {isExpanded && (
                    <div 
                      id={`story-mobile-${card.id}`}
                      className="mt-4 pt-4 border-t border-primary/20 animate-fade-in"
                    >
                      <p className="text-muted-foreground leading-relaxed">
                        {card.fullStory}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Backdrop for expanded state (desktop only) */}
      {expandedCardId && (
        <div 
          className="hidden md:block fixed inset-0 bg-deep-space/80 backdrop-blur-sm z-30"
          onClick={handleBackdropClick}
        />
      )}
    </section>
  );
};

export default SecondSuccessSection;