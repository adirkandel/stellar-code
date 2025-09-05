import { Star, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Sarah Chen',
      title: 'CTO',
      company: 'TechFlow Analytics',
      avatar: 'SC',
      rating: 5,
      quote: "Stellar Code didn't just build our product – they became true partners in our vision. Their team's startup experience and technical excellence helped us launch on time and secure our Series A. The quality of their work and their commitment to our success is unmatched."
    },
    {
      name: 'Marcus Rodriguez',
      title: 'CEO',
      company: 'InnovateCRM',
      avatar: 'MR',
      rating: 5,
      quote: "Working with Stellar Code transformed our entire engineering culture. Their leadership and mentorship helped our team grow from 5 to 15 developers while actually improving our code quality and deployment speed. They're not just developers – they're true technical leaders."
    },
    {
      name: 'Emily Thompson',
      title: 'Founder',
      company: 'CloudSync Pro',
      avatar: 'ET',
      rating: 5,
      quote: "As a non-technical founder, I needed a team I could trust completely. Stellar Code explained everything clearly, delivered on every promise, and built a platform that scales beautifully. Six months later, we're processing 10x the data with zero performance issues."
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-deep-space relative overflow-hidden">
      {/* Nebula background */}
      <div className="absolute inset-0 bg-gradient-nebula opacity-30" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-space mb-6">
            <span className="text-stellar-white">What Our</span>
            <span className="text-primary glow-stellar"> Clients Say</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Don't just take our word for it – hear from the founders and leaders we've partnered with
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group bg-card/50 backdrop-blur-sm border border-nebula-blue/30 rounded-xl p-8 transition-stellar hover-glow hover:-translate-y-2"
            >
              {/* Quote Icon */}
              <div className="mb-6">
                <Quote className="w-8 h-8 text-primary/60" />
              </div>

              {/* Stars */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, starIndex) => (
                  <Star key={starIndex} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-muted-foreground leading-relaxed mb-8 italic">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/20 border-2 border-primary/40 rounded-full flex items-center justify-center">
                  <span className="text-primary font-bold font-space">
                    {testimonial.avatar}
                  </span>
                </div>
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