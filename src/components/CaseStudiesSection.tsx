import { ArrowRight } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

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
    }
  ];

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

        <Carousel className="w-full max-w-7xl mx-auto">
          <CarouselContent className="-ml-4">
            {caseStudies.map((study, index) => (
              <CarouselItem key={index} className="pl-4 basis-full md:basis-4/5 lg:basis-3/5">
                <div className="relative">
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
                  
                  {/* Testimonial Card - Overlapping */}
                  <div className="absolute -bottom-8 left-8 right-8 bg-stellar-white/95 backdrop-blur-sm rounded-lg p-6 border border-primary/10 shadow-lg">
                    <p className="text-deep-space text-base italic leading-relaxed">
                      {study.testimonial}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
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