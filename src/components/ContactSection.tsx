import { useState } from 'react';
import { Send, Calendar, Mail, MessageSquare, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({ name: '', email: '', company: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 bg-gradient-galaxy relative overflow-hidden">
      {/* Orbital rings */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-96 h-96 border border-primary/30 rounded-full animate-orbit" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-neon-teal/30 rounded-full animate-orbit" style={{ animationDirection: 'reverse', animationDuration: '15s' }} />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-space mb-6">
              <span className="text-stellar-white">Ready to Build Something</span>
              <br />
              <span className="text-primary glow-stellar">Stellar?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tell us about your vision or the challenges you're facing — we'll figure out how our team can help.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <div className="bg-card/50 backdrop-blur-sm border border-nebula-blue/30 rounded-xl p-8">
              <h3 className="text-2xl font-bold font-space text-stellar-white mb-6">
                Let's Talk
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-12 pr-4 py-3 bg-input border border-nebula-blue/30 rounded-lg text-stellar-white placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-stellar"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-12 pr-4 py-3 bg-input border border-nebula-blue/30 rounded-lg text-stellar-white placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-stellar"
                    />
                  </div>
                </div>

                <div className="relative">
                  <MessageSquare className="absolute left-3 top-4 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    name="company"
                    placeholder="Company Name (Optional)"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-3 bg-input border border-nebula-blue/30 rounded-lg text-stellar-white placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-stellar"
                  />
                </div>

                <div className="relative">
                  <textarea
                    name="message"
                    placeholder="Tell us about your project or challenges..."
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full p-4 bg-input border border-nebula-blue/30 rounded-lg text-stellar-white placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-stellar resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-primary-foreground px-6 py-4 rounded-lg font-semibold transition-stellar hover-glow hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-card/30 backdrop-blur-sm border border-nebula-blue/20 rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary/20 border border-primary/30 rounded-lg">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-stellar-white">Schedule a Call</h4>
                    <p className="text-muted-foreground">Free 30-minute consultation</p>
                  </div>
                </div>
                <button className="w-full bg-primary/20 border border-primary/30 text-primary px-4 py-3 rounded-lg font-medium transition-stellar hover:bg-primary/30">
                  Book a Free Consultation
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-stellar-white mb-4">What Happens Next?</h4>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/20 border border-primary/40 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs text-primary font-bold">1</span>
                      </div>
                      <div>
                        <p className="text-stellar-white font-medium">Initial Discovery</p>
                        <p className="text-muted-foreground text-sm">We'll discuss your goals, challenges, and timeline</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/20 border border-primary/40 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs text-primary font-bold">2</span>
                      </div>
                      <div>
                        <p className="text-stellar-white font-medium">Proposal & Planning</p>
                        <p className="text-muted-foreground text-sm">Custom solution with timeline and team structure</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/20 border border-primary/40 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs text-primary font-bold">3</span>
                      </div>
                      <div>
                        <p className="text-stellar-white font-medium">Start Building</p>
                        <p className="text-muted-foreground text-sm">Kick off with your dedicated development team</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;