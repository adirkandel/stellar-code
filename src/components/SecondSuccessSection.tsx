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
      fullStory: "We integrated a comprehensive CI/CD pipeline with automated testing, code quality checks, and canary deployment strategies. The implementation included containerized environments, blue-green deployments, and rollback protocols that reduced deployment failures by 85%. We introduced feature flags and automated monitoring for real-time performance insights. The canary strategy enabled gradual traffic shifting with zero-downtime deployments. This approach boosted deploy frequency from weekly to multiple daily releases, dramatically accelerating development velocity.",
      initialTiltDeg: -6
    },
    {
      id: "c2", 
      valueTitle: "Conversion +22%",
      companyName: "Nebula Commerce",
      companyLogoUrl: "/logos/nebula.svg",
      briefDescription: "Optimized checkout experience with performance improvements and data-driven UX enhancements.",
      fullStory: "We rebuilt Nebula Commerce's checkout flow implementing edge caching and extensive A/B testing on microcopy and UI elements. Our analysis identified friction points in the conversion funnel. We implemented PWA technologies, reduced page load times by 60%, and optimized mobile experience. The A/B testing involved 50+ variations of copy, buttons, and layouts. We integrated advanced analytics, smart form validation, guest checkout, and personalized recommendations during checkout, resulting in significant conversion improvements.",
      initialTiltDeg: 8
    },
    {
      id: "c3",
      valueTitle: "MTTR down 48%",
      companyName: "StellarPay",
      companyLogoUrl: "/logos/stellarpay.svg", 
      briefDescription: "Enhanced incident response capabilities through structured monitoring and automated recovery procedures.",
      fullStory: "We introduced comprehensive observability for StellarPay including structured logging, distributed tracing, and real-time monitoring across payment infrastructure. Implementation involved centralized log aggregation, custom dashboards, and automated alerting. We developed detailed on-call playbooks, automated diagnostic tools, and escalation protocols. The system included intelligent alerting reducing false positives by 70%. We implemented automated health checks, circuit breakers, and self-healing mechanisms. Training sessions covered incident response best practices and continuous improvement methodologies.",
      initialTiltDeg: 3
    },
    {
      id: "c4",
      valueTitle: "Revenue +65%",
      companyName: "Quantum Analytics",
      companyLogoUrl: "/logos/quantum.svg",
      briefDescription: "Implemented advanced data processing and machine learning systems to drive customer insights and retention.",
      fullStory: "We implemented real-time data processing and ML platform for Quantum Analytics transforming customer intelligence capabilities. Our solution included Apache Kafka data ingestion, Apache Flink stream processing, and custom ML models for predictive analytics. We created unified customer data platform consolidating multiple touchpoints for 360-degree views. The ML-driven insights engine provided real-time recommendations, churn prediction, and automated segmentation. We developed self-service analytics platform and A/B testing frameworks. Advanced capabilities enabled high-value segment identification and proactive retention campaigns.",
      initialTiltDeg: -4
    },
    {
      id: "c5",
      valueTitle: "Load Time -78%",
      companyName: "VelocityCore",
      companyLogoUrl: "/logos/velocity.svg",
      briefDescription: "Achieved dramatic performance improvements through database optimization and intelligent caching strategies.",
      fullStory: "We conducted comprehensive performance audit for VelocityCore addressing bottlenecks across their technology stack. Our approach included database query optimization, Redis caching layers, CDN distribution, and application refactoring. We resolved N+1 queries, implemented indexing strategies, and established connection pooling. CDN implementation included intelligent cache invalidation, image optimization, and global edge distribution. Server-side optimizations included HTTP/2, gzip compression, and proper cache headers. We established performance monitoring with real-user metrics and automated regression detection. The optimization dramatically improved load times and reduced server costs.",
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
                    isExpanded ? 'w-[32rem]' : 'w-72'
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
                    <h3 className={`text-xl font-bold text-stellar-white font-space transition-all duration-300 ${
                      hoveredCardId === card.id && !isExpanded ? 'transform translate-z-8 scale-105' : ''
                    }`}
                    style={{
                      transform: hoveredCardId === card.id && !isExpanded ? 'translateZ(15px) scale(1.05)' : 'translateZ(0px) scale(1)'
                    }}>
                      {card.valueTitle}
                    </h3>
                    
                    {/* Company Logo and Name */}
                    <div className={`flex items-center gap-3 transition-all duration-300 ${
                      hoveredCardId === card.id && !isExpanded ? 'transform translate-z-6' : ''
                    }`}
                    style={{
                      transform: hoveredCardId === card.id && !isExpanded ? 'translateZ(10px) scale(1.02)' : 'translateZ(0px) scale(1)'
                    }}>
                      <div className="w-12 h-10 flex items-center justify-center bg-stellar-white/10 rounded-lg">
                        <span className="text-stellar-white font-bold text-sm">
                          {card.companyName.split(' ').map(word => word[0]).join('')}
                        </span>
                      </div>
                      <span className="text-muted-foreground font-medium">{card.companyName}</span>
                    </div>
                    
                    {/* Brief Description (collapsed state) */}
                    {!isExpanded && (
                      <p className={`text-muted-foreground text-sm leading-relaxed transition-all duration-300 ${
                        hoveredCardId === card.id ? 'transform translate-z-4' : ''
                      }`}
                      style={{
                        transform: hoveredCardId === card.id ? 'translateZ(8px) scale(1.01)' : 'translateZ(0px) scale(1)'
                      }}>
                        {card.briefDescription}
                      </p>
                    )}
                    
                    {/* Expand Button */}
                    {!isExpanded && (
                      <div className={`flex items-center gap-2 text-primary hover:text-primary/80 transition-all duration-300 text-sm font-medium ${
                        hoveredCardId === card.id ? 'transform translate-z-6' : ''
                      }`}
                      style={{
                        transform: hoveredCardId === card.id ? 'translateZ(12px) scale(1.03)' : 'translateZ(0px) scale(1)'
                      }}>
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