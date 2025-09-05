import { ArrowRight, CheckCircle, TrendingUp, Users } from 'lucide-react';

const CaseStudiesSection = () => {
  const caseStudies = [
    {
      title: 'SaaS MVP Launch',
      company: 'TechFlow Analytics',
      industry: 'Data Analytics',
      challenge: 'A startup needed to launch their analytics platform MVP within 3 months to secure Series A funding. They had a brilliant idea but lacked the technical expertise to build a scalable solution.',
      solution: 'We assembled a full-stack team and delivered a React/Node.js platform with real-time data processing, interactive dashboards, and enterprise-grade security. Implemented CI/CD pipelines and AWS infrastructure.',
      outcome: 'Launched on time, secured $5M Series A funding within 6 weeks of launch. Platform now serves 10,000+ users with 99.9% uptime.',
      metrics: [
        { icon: TrendingUp, label: 'Revenue Growth', value: '400%' },
        { icon: Users, label: 'Active Users', value: '10K+' },
        { icon: CheckCircle, label: 'Uptime', value: '99.9%' }
      ]
    },
    {
      title: 'Team Training & Scale',
      company: 'InnovateCRM',
      industry: 'CRM Software',
      challenge: 'A growing SaaS company struggled with code quality, deployment issues, and team coordination. Their engineering team was talented but lacked senior leadership and established processes.',
      solution: 'We provided technical leadership, established code review processes, implemented automated testing, and mentored their development team. Set up proper git workflows and deployment strategies.',
      outcome: 'Reduced deployment time by 80%, improved code quality scores, and successfully scaled team from 5 to 15 developers while maintaining velocity.',
      metrics: [
        { icon: TrendingUp, label: 'Deploy Speed', value: '80% faster' },
        { icon: Users, label: 'Team Growth', value: '3x' },
        { icon: CheckCircle, label: 'Bug Reduction', value: '60%' }
      ]
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

        <div className="space-y-12">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className="bg-card/50 backdrop-blur-sm border border-nebula-blue/30 rounded-xl p-8 md:p-12 hover-glow transition-stellar"
            >
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold font-space text-stellar-white mb-2">
                    {study.title}
                  </h3>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <span className="font-medium text-primary">{study.company}</span>
                    <span className="w-1 h-1 bg-muted-foreground rounded-full" />
                    <span>{study.industry}</span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 flex gap-4">
                  {study.metrics.map((metric, metricIndex) => {
                    const IconComponent = metric.icon;
                    return (
                      <div key={metricIndex} className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <IconComponent className="w-4 h-4 text-neon-teal" />
                        </div>
                        <div className="text-lg font-bold text-stellar-white">{metric.value}</div>
                        <div className="text-xs text-muted-foreground">{metric.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Content */}
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <h4 className="text-lg font-semibold text-primary mb-3">Challenge</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {study.challenge}
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-neon-teal mb-3">Solution</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {study.solution}
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-stellar-white mb-3">Outcome</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {study.outcome}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
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