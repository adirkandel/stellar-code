import { useState, useCallback, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import type { UseEmblaCarouselType,} from "embla-carousel-react";

type CarouselApi = UseEmblaCarouselType[1];

const CaseStudiesSection = () => {
  const caseStudies = [
    {
      title: 'SaaS MVP Launch',
      company: 'TechFlow Analytics',
      industry: 'Data Analytics',
      story: 'A startup needed to launch their analytics platform MVP within 3 months to secure Series A funding. We assembled a full-stack team and delivered a React/Node.js platform with real-time data processing. The platform launched on time and secured $5M Series A funding within 6 weeks.',
      testimonial: '"It was a game-changer for us. They took our vague ideas and transformed them into a sleek, user-friendly interface that our customers love. Their attention to detail truly sets them apart."',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=center'
    },
    {
      title: 'E-commerce Platform',
      company: 'RetailNext',
      industry: 'E-commerce',
      story: 'A growing retail company needed to modernize their legacy e-commerce platform to handle increasing traffic and improve user experience. We rebuilt their entire frontend with React and optimized their backend infrastructure. The new platform reduced page load times by 70% and increased conversion rates by 45%.',
      testimonial: '"The team delivered beyond our expectations. The new platform not only looks amazing but performs incredibly well. Our customers love the improved shopping experience."',
      logo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop&crop=center'
    },
    {
      title: 'Team Training & Scale',
      company: 'InnovateCRM',
      industry: 'CRM Software',
      story: 'A growing SaaS company struggled with code quality and team coordination. We provided technical leadership and established proper development processes. Successfully scaled team from 5 to 15 developers while maintaining velocity and reducing deployment time by 80%.',
      testimonial: '"Their mentorship transformed our engineering culture. The processes they established helped us scale efficiently while maintaining high code quality standards."',
      logo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop&crop=center'
    },
    {
      title: 'Mobile App Development',
      company: 'HealthTech Solutions',
      industry: 'Healthcare',
      story: 'A healthcare startup needed a secure mobile app for patient data management and telemedicine consultations. We developed a React Native app with end-to-end encryption and HIPAA compliance. The app now serves 50,000+ patients and has a 4.8-star rating.',
      testimonial: '"The security features and user experience exceeded our expectations. The app has transformed how we deliver healthcare services to our patients."',
      logo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop&crop=center'
    },
    {
      title: 'AI Integration Platform',
      company: 'DataFlow AI',
      industry: 'Artificial Intelligence',
      story: 'An enterprise client needed to integrate AI capabilities across their existing systems without major infrastructure changes. We built a unified API gateway with machine learning pipelines. The solution reduced AI processing costs by 60% while improving accuracy by 35%.',
      testimonial: '"They made AI accessible to our entire organization. The seamless integration and performance improvements have been remarkable."',
      logo: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop&crop=center'
    },
    {
      title: 'Financial Dashboard',
      company: 'WealthWise',
      industry: 'Fintech',
      story: 'A financial services company required a real-time portfolio management dashboard with advanced analytics and risk assessment tools. We created a comprehensive platform with live market data integration. Client assets under management increased by 200% within 8 months.',
      testimonial: '"The dashboard gives us insights we never had before. Our clients love the transparency and real-time updates on their investments."',
      logo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=300&fit=crop&crop=center'
    },
    {
      title: 'Supply Chain Optimization',
      company: 'LogiCore Systems',
      industry: 'Logistics',
      story: 'A logistics company needed to optimize their supply chain management with predictive analytics and automated routing. We developed an intelligent system that reduced delivery times by 40% and operational costs by 25%. The platform now handles over 10,000 shipments daily.',
      testimonial: '"The optimization algorithms have revolutionized our operations. We can now predict and prevent bottlenecks before they happen."',
      logo: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=300&fit=crop&crop=center'
    },
    {
      title: 'Educational Platform',
      company: 'EduTech Pro',
      industry: 'Education Technology',
      story: 'An educational institution wanted to create an interactive learning platform with virtual classrooms and AI-powered personalized learning paths. We built a comprehensive LMS that increased student engagement by 85% and completion rates by 60%.',
      testimonial: '"Student outcomes have improved dramatically. The personalized learning approach has made education more effective and engaging."',
      logo: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop&crop=center'
    }
  ];

  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  const logSlidesInView = useCallback((carouselApi) => {
    console.log(carouselApi.slidesInView())
  }, [])

  useEffect(() => {
    if (carouselApi) carouselApi.on('slidesInView', logSlidesInView)
  }, [carouselApi, logSlidesInView])

  return (
    <section id="case-studies" className="py-24 bg-gradient-galaxy">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-space mb-6">
            <span className="text-stellar-white">Success</span>
            <span className="text-primary glow-stellar"> Stories</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real challenges, stellar solutions, and measurable results from our partnerships
          </p>
        </div>

        <Carousel setApi={carouselApi} className="w-full max-w-6xl mx-auto overflow-hidden" opts={{ align: "center", loop: true, containScroll: "trimSnaps" }}>
          <CarouselContent className="-ml-6">
            {caseStudies.map((study, index) => (
              <CarouselItem key={index} className="pl-6 basis-full md:basis-2/3 lg:basis-1/2">
                <div className="relative pb-12 transition-all duration-500 ease-out [&:not(.embla__slide--snapped)]:scale-75 [&:not(.embla__slide--snapped)]:opacity-50">
                  {/* Main Case Study Card */}
                  <div 
                    className="relative h-96 rounded-xl overflow-hidden bg-gradient-card backdrop-blur-sm border border-primary/20 hover-glow transition-stellar"
                    style={{
                      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url(${study.logo})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                    
                    <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                      {/* Company Info */}
                      <div>
                        <h3 className="text-3xl font-bold font-space text-stellar-white mb-2">
                          {study.company}
                        </h3>
                        <div className="text-primary font-medium mb-6">{study.industry}</div>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                          {study.story}
                        </p>
                      </div>
                      
                      {/* View Button */}
                      <div className="mt-6">
                        <button className="inline-flex items-center gap-3 bg-primary/20 border border-primary/30 text-primary px-6 py-3 rounded-lg font-medium transition-stellar hover:bg-primary/30 hover-glow">
                          VIEW
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Testimonial Card - Outside and Overlapping */}
                  <div className="absolute -bottom-4 left-4 right-4 bg-stellar-white/95 backdrop-blur-sm rounded-lg p-6 border border-primary/10 shadow-lg z-20">
                    <p className="text-deep-space text-base italic leading-relaxed">
                      {study.testimonial}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <CarouselPrevious className="left-4 z-30" />
          <CarouselNext className="right-4 z-30" />
        </Carousel>

        <div className="text-center mt-16">
          <button className="inline-flex items-center gap-3 bg-primary/20 border border-primary/30 text-primary px-6 py-3 rounded-lg font-medium transition-stellar hover:bg-primary/30 hover-glow">
            View More Case Studies
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;