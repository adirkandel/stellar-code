import { useState, useEffect, useRef, useMemo } from 'react';
import { Plus, X } from 'lucide-react';

interface SuccessCard {
  id: string;
  valueTitle: string;
  companyName: string;
  companyLogoUrl: string;
  story: string;
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
      story: "We integrated a CI pipeline and a canary strategy which reduced rollbacks and boosted deploy frequency.",
      initialTiltDeg: -6
    },
    {
      id: "c2", 
      valueTitle: "Conversion +22%",
      companyName: "Nebula Commerce",
      companyLogoUrl: "/logos/nebula.svg",
      story: "Rebuilt the checkout flow with edge caching and A/B tested microcopy to lift conversions.",
      initialTiltDeg: 8
    },
    {
      id: "c3",
      valueTitle: "MTTR down 48%",
      companyName: "StellarPay",
      companyLogoUrl: "/logos/stellarpay.svg", 
      story: "Introduced structured logging and on-call playbooks; mean time to recovery nearly halved.",
      initialTiltDeg: 3
    },
    {
      id: "c4",
      valueTitle: "Revenue +65%",
      companyName: "Quantum Analytics",
      companyLogoUrl: "/logos/quantum.svg",
      story: "Implemented real-time data processing and ML-driven insights that doubled their customer retention.",
      initialTiltDeg: -4
    },
    {
      id: "c5",
      valueTitle: "Load Time -78%",
      companyName: "VelocityCore",
      companyLogoUrl: "/logos/velocity.svg",
      story: "Optimized database queries and implemented CDN caching, dramatically improving user experience.",
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
    <section className="relative py-24 bg-gradient-galaxy overflow-hidden">
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
                    
                    {/* Expand Button */}
                    {!isExpanded && (
                      <div className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium">
                        <Plus className="w-4 h-4" />
                        Read Story
                      </div>
                    )}
                    
                    {/* Story (expanded state) */}
                    {isExpanded && (
                      <div 
                        id={`story-${card.id}`}
                        className="mt-4 pt-4 border-t border-primary/20 animate-fade-in"
                        ref={expandedCardRef}
                        tabIndex={-1}
                      >
                        <p className="text-muted-foreground leading-relaxed">
                          {card.story}
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
                  
                  {/* Story (expanded state) */}
                  {isExpanded && (
                    <div 
                      id={`story-mobile-${card.id}`}
                      className="mt-4 pt-4 border-t border-primary/20 animate-fade-in"
                    >
                      <p className="text-muted-foreground leading-relaxed">
                        {card.story}
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
          className="hidden md:block fixed inset-0 bg-deep-space/80 backdrop-blur-sm z-40"
          onClick={handleBackdropClick}
        />
      )}
    </section>
  );
};

export default SecondSuccessSection;