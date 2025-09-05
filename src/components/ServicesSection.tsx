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

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="group bg-card/50 backdrop-blur-sm border border-nebula-blue/30 rounded-xl p-8 transition-stellar hover-glow hover:-translate-y-2"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-primary/20 border border-primary/30 rounded-lg group-hover:bg-primary/30 transition-stellar">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold font-space text-stellar-white">
                    {service.title}
                  </h3>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-neon-teal rounded-full" />
                      <span className="text-stellar-white">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;