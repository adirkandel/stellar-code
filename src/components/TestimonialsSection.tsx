import { useState, useCallback, useEffect } from "react";
import { Star, Quote } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import type { UseEmblaCarouselType } from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import izikAvatar from "@/assets/izik.png";
import gilAvatar from "@/assets/gil.jpeg";
import flamingoLogo from "@/assets/flamingo-logo.png";
import meckanoLogo from "@/assets/meckano-logo.png";
import citySystemsLogo from "@/assets/city-systems-logo.svg";

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
          node.firstElementChild.classList.add("embla-slide-snapped");
        } else {
          node.firstElementChild.classList.remove("embla-slide-snapped");
        }
      });
    }
  }, []);

  useEffect(() => {
    if (carouselApi) {
      carouselApi.on("slidesInView", logSlidesInView);
      carouselApi.on("select", logSlidesInView);
    }
  }, [carouselApi, logSlidesInView]);

  const testimonials = [
    {
      id: 1,
      name: "Izik Binaev",
      title: "CEO",
      company: "Flamingo Holdings",
      avatar: "IB",
      avatarImage: izikAvatar,
      companyLogo: flamingoLogo,
      rating: 5,
      quote:
        "Working with Stellar Code was easy and professional. They built our SaaS platform for property management end to end and really understood what we needed, both technically and from a business perspective. The admin console they developed made our daily work much more efficient. I'd happily work with Stellar Code again.",
    },
    {
      id: 2,
      name: "Gil Cohen",
      title: "CEO",
      company: "Meckano",
      avatar: "GC",
      avatarImage: gilAvatar,
      companyLogo: meckanoLogo,
      rating: 5,
      logoClassName: "h-20",
      quote:
        "Stellar Code helped us streamline and professionalize our developer recruitment process. They quickly understood our challenges and built a clear, effective structure that saved us time and improved the candidate experience. Communication was always straightforward and transparent. It felt like working with a true partner, not just a service provider.",
    },
    {
      id: 3,
      name: "Moshe Tangi",
      title: "CEO",
      company: "City Systems",
      avatar: "MT",
      avatarImage: null,
      companyLogo: citySystemsLogo,
      rating: 5,
      quote:
        "Stellar Code led the process of turning our old Windows system into a modern web-based SaaS product. They managed the team, guided the development, and made sure everything moved forward smoothly. The result is a stable, user friendly product that’s ready for the future. I strongly recommend working with Stellar Code.",
    },
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
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-deep-space to-transparent z-10 hidden md:block"></div>

        {/* Right gradient blend */}
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-deep-space to-transparent z-10 hidden md:block"></div>

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
                    className="group bg-gradient-card backdrop-blur-sm border border-primary/20 rounded-xl p-8 transition-stellar hover-glow hover:-translate-y-2 relative overflow-hidden cursor-pointer"
                    onClick={() => carouselApi?.scrollTo(index)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />

                    {/* Company Logo Background */}
                    <div className="absolute right-4 bottom-4 opacity-10">
                      <img
                        src={testimonial.companyLogo}
                        alt={`${testimonial.company} logo`}
                        className={`h-28 w-auto object-contain ${testimonial.logoClassName || ""}`}
                      />
                    </div>

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
                          <AvatarImage src={testimonial.avatarImage} alt={`${testimonial.name} avatar`} />
                          <AvatarFallback className="bg-primary/20 text-primary font-bold font-space">
                            {testimonial.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold text-stellar-white">{testimonial.name}</div>
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
                currentSlide === index ? "w-6 bg-primary" : "w-3 bg-primary/30 hover:bg-primary/50"
              }`}
            />
          ))}
        </div>

        {/* Additional social proof */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-8">Trusted by innovative companies building the future</p>
          <div className="flex justify-center items-center gap-8 opacity-50">
            <img src={flamingoLogo} alt="Flamingo Holdings" className="h-10 w-auto object-contain" />
            <img src={meckanoLogo} alt="Meckano" className="h-10 w-auto object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
