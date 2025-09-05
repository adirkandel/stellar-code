import { Code, Cloud, Users, GraduationCap } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: Code,
      title: 'Full-Stack Web Development',
      description: 'Modern React, Node.js, and cloud-native applications built for scale and performance.',
      features: ['React & TypeScript', 'API Development', 'Database Design', 'Performance Optimization']
    },
    {
      icon: Cloud,
      title: 'Cloud Infrastructure & DevOps',
      description: 'Scalable, secure, and cost-effective cloud solutions using AWS, GCP, and modern DevOps practices.',
      features: ['Infrastructure as Code', 'CI/CD Pipelines', 'Monitoring & Alerts', 'Cost Optimization']
    },
    {
      icon: Users,
      title: 'Dedicated Developers',
      description: 'Skilled developers who integrate seamlessly with your team and understand startup culture.',
      features: ['Full-time Commitment', 'Startup Experience', 'Direct Communication', 'Flexible Scaling']
    },
    {
      icon: GraduationCap,
      title: 'Team Training & Leadership',
      description: 'Transform your engineering culture with mentorship, best practices, and leadership development.',
      features: ['Code Reviews', 'Architecture Guidance', 'Team Processes', 'Technical Leadership']
    }
  ];

  return (
    <section id="services" className="py-24 bg-gradient-galaxy">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-space mb-6">
            <span className="text-stellar-white">Our</span>
            <span className="text-primary glow-stellar"> Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From MVP to scale, we provide the technical expertise and partnership your startup needs to succeed
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="flip-card h-80"
              >
                <div className="flip-card-inner holographic">
                  {/* Front of card */}
                  <div className="flip-card-front bg-gradient-card backdrop-blur-sm border border-primary/20 p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                    <div className="relative z-10">
                      <div className="p-4 bg-primary/20 border border-primary/30 rounded-lg mb-4 holographic-rainbow">
                        <IconComponent className="w-12 h-12 text-stellar-white" />
                      </div>
                      <h3 className="text-lg font-bold font-space text-stellar-white leading-tight">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  {/* Back of card */}
                  <div className="flip-card-back bg-gradient-card backdrop-blur-sm border border-primary/20 p-6 flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                    <div className="relative z-10">
                      <h3 className="text-lg font-bold font-space text-stellar-white mb-4">
                        {service.title}
                      </h3>
                      
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                        {service.description}
                      </p>

                      <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-neon-teal rounded-full flex-shrink-0" />
                            <span className="text-stellar-white">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;