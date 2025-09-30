import { Code, Cloud, Users, GraduationCap } from 'lucide-react';
const ServicesSection = () => {
  const services = [{
    icon: Code,
    title: 'Full-Stack Web Development',
    description: 'Modern React, Node.js, and cloud-native applications built for scale and performance.',
    features: ['React & TypeScript', 'API Development', 'Database Design', 'Performance Optimization']
  }, {
    icon: Cloud,
    title: 'Cloud Infrastructure & DevOps',
    description: 'Scalable, secure, and cost-effective cloud solutions using AWS, GCP, and modern DevOps practices.',
    features: ['Infrastructure as Code', 'CI/CD Pipelines', 'Monitoring & Alerts', 'Cost Optimization']
  }, {
    icon: Users,
    title: 'Dedicated Developers',
    description: 'Skilled developers who integrate seamlessly with your team and understand startup culture.',
    features: ['Full-time Commitment', 'Startup Experience', 'Direct Communication', 'Flexible Scaling']
  }, {
    icon: GraduationCap,
    title: 'Team Training & Leadership',
    description: 'Transform your engineering culture with mentorship, best practices, and leadership development.',
    features: ['Code Reviews', 'Architecture Guidance', 'Team Processes', 'Technical Leadership']
  }];
  return <section id="services" className="py-24 bg-gradient-galaxy">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-space mb-6">
            <span className="text-stellar-white">Our</span>
            <span className="text-primary glow-stellar"> Expertise</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From MVP to scale, we provide the technical expertise and partnership your startup needs to succeed
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => {
          const IconComponent = service.icon;
          return <div key={index} className="group holographic-card bg-gradient-card backdrop-blur-sm border border-primary/20 rounded-xl p-6 transition-stellar hover-glow hover:-translate-y-2 relative overflow-hidden">
                {/* Holographic background layers */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-tl from-neon-teal/10 via-transparent to-primary/10 opacity-0 group-hover:opacity-80 transition-opacity duration-700" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-stellar-white/5 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[300%] transition-transform duration-1000" />
                
                {/* Holographic border glow */}
                <div className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r from-primary/30 via-neon-teal/30 to-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[1px]">
                  <div className="w-full h-full bg-gradient-card rounded-xl" />
                </div>
                
                <div className="relative z-10 flex flex-col lg:flex-row gap-6 h-full">
                  {/* Header section - full width on mobile/tablet, 30% on desktop */}
                  <div className="w-full lg:w-[30%] flex flex-col items-center justify-center text-center">
                    <IconComponent className="w-12 h-12 text-primary mb-4" />
                    <h3 className="text-xl font-bold font-space text-stellar-white leading-tight">
                      {service.title}
                    </h3>
                  </div>

                  {/* Divider */}
                  <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent"></div>
                  <div className="block lg:hidden h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

                  {/* Content section - full width on mobile/tablet, 70% on desktop */}
                  <div className="w-full lg:w-[70%] space-y-4">
                    <p className="text-stellar-white text-base leading-relaxed">
                      {service.description}
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-2">
                      {service.features.map((feature, featureIndex) => <div key={featureIndex} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full group-hover:animate-pulse flex-shrink-0" />
                          <span className="text-muted-foreground text-sm">{feature}</span>
                        </div>)}
                    </div>
                  </div>
                </div>
              </div>;
        })}
        </div>
      </div>
    </section>;
};
export default ServicesSection;