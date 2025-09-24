import { useState, useCallback, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import type { UseEmblaCarouselType } from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

type CarouselApi = UseEmblaCarouselType[1];

const TestimonialsSection = () => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);

  const logSlidesInView = useCallback((carouselApi) => {
    const currentSlideIndex = carouselApi.selectedScrollSnap();
    setCurrentSlide(currentSlideIndex);
    if (currentSlideIndex >= 0) {
      carouselApi.slideNodes().forEach((node, nodeIdx) => {
        if (nodeIdx === currentSlideIndex) {
          node.firstElementChild.classList.add('embla-slide-snapped');
        } else {
          node.firstElementChild.classList.remove('embla-slide-snapped');
        }
      });
    }
  }, [])

  useEffect(() => {
    if (carouselApi) {
      carouselApi.on('slidesInView', logSlidesInView);
      carouselApi.on('select', logSlidesInView);
    }
  }, [carouselApi, logSlidesInView])

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Chen',
      title: 'CTO',
      company: 'TechFlow Analytics',
      avatar: 'SC',
      rating: 5,
      quote: "Stellar Code didn't just build our product – they became true partners in our vision. Their team's startup experience and technical excellence helped us launch on time and secure our Series A. The quality of their work and their commitment to our success is unmatched."
    },
    {
      id: 2,
      name: 'Marcus Rodriguez',
      title: 'CEO',
      company: 'InnovateCRM',
      avatar: 'MR',
      rating: 5,
      quote: "Working with Stellar Code transformed our entire engineering culture. Their leadership and mentorship helped our team grow from 5 to 15 developers while actually improving our code quality and deployment speed. They're not just developers – they're true technical leaders."
    },
    {
      id: 3,
      name: 'Emily Thompson',
      title: 'Founder',
      company: 'CloudSync Pro',
      avatar: 'ET',
      rating: 5,
      quote: "As a non-technical founder, I needed a team I could trust completely. Stellar Code explained everything clearly, delivered on every promise, and built a platform that scales beautifully. Six months later, we're processing 10x the data with zero performance issues."
    },
    {
      id: 4,
      name: 'David Park',
      title: 'Co-Founder',
      company: 'AI Insights',
      avatar: 'DP',
      rating: 5,
      quote: "The Stellar Code team brought our AI vision to life with incredible precision. Their deep understanding of machine learning frameworks and scalable architecture helped us process millions of data points daily. They delivered a robust platform that impressed our investors."
    },
    {
      id: 5,
      name: 'Lisa Williams',
      title: 'Head of Product',
      company: 'FinanceFlow',
      avatar: 'LW',
      rating: 5,
      quote: "Security and compliance were critical for our fintech startup. Stellar Code implemented bank-level security measures and helped us achieve SOC 2 compliance ahead of schedule. Their attention to detail and regulatory expertise gave us complete confidence."
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-deep-space relative overflow-hidden">      
      <div className="w-full max-w-6xl mx-auto px-6 relative z-20 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-space mb-6">
            <span className="text-stellar-white">What Our</span>
            <span className="text-primary glow-stellar"> Clients Say</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Don't just take our word for it – hear from the founders and leaders we've partnered with
          </p>
        </div>
        
        {/* Left gradient blend */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#080311] to-transparent z-10"></div>
        
        {/* Right gradient blend */}
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#080311] to-transparent z-10"></div>

        <Carousel 
          setApi={setCarouselApi} 
          className="w-full" 
          opts={{ align: "center", loop: true, containScroll: "trimSnaps" }}
          plugins={[
            Autoplay({
              delay: 5000,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
              stopOnFocusIn: false,
            }),
          ]}
        >
          <CarouselContent className="-ml-6 py-8">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-6 basis-full md:basis-2/3 lg:basis-1/2">
                <div className="transition-all duration-500 ease-out [&:not(.embla-slide-snapped)]:scale-90 [&:not(.embla-slide-snapped)]:opacity-60">
                  <div 
                    className="group bg-gradient-card backdrop-blur-sm border border-primary/20 rounded-xl p-8 transition-stellar hover-glow hover:-translate-y-2 relative overflow-visible cursor-pointer"
                    onClick={() => carouselApi?.scrollTo(index)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                    <div className="relative z-10">
                      {/* Quote Icon */}
                      <div className="mb-6">
                        <Quote className="w-8 h-8 text-primary/60" />
                      </div>


                      {/* Quote */}
                      <blockquote className="text-muted-foreground leading-relaxed mb-8 italic">
                        "{testimonial.quote}"
                      </blockquote>

                      {/* Author */}
                      <div className="flex items-center gap-4">
                        <Avatar className="w-12 h-12 border-2 border-primary/40">
                          <AvatarImage 
                            src={`https://testingbot.com/free-online-tools/random-avatar/200?img=${testimonial.id}`}
                            alt={`${testimonial.name} avatar`}
                          />
                          <AvatarFallback className="bg-primary/20 text-primary font-bold font-space">
                            {testimonial.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold text-stellar-white">
                            {testimonial.name}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {testimonial.title} at <span className="text-primary">{testimonial.company}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => carouselApi?.scrollTo(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? 'w-6 bg-primary'
                  : 'w-3 bg-primary/30 hover:bg-primary/50'
              }`}
            />
          ))}
        </div>

        {/* Additional social proof */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-8">
            Trusted by startups that have raised over <span className="text-primary font-semibold">$50M+</span> in funding
          </p>
          <div className="flex justify-center items-center gap-8 opacity-50">
            {/* Placeholder for company logos */}
            <div className="text-2xl font-bold font-space text-stellar-white">TechFlow</div>
            <div className="text-2xl font-bold font-space text-stellar-white">InnovateCRM</div>
            <div className="text-2xl font-bold font-space text-stellar-white">CloudSync</div>
            <div className="text-2xl font-bold font-space text-stellar-white">DataVault</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;