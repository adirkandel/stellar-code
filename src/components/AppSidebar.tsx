import { Home, Briefcase, Star, FileText, Cpu, MessageCircle, Mail } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'services', label: 'Services', icon: Briefcase },
  { id: 'why-us', label: 'Why Us', icon: Star },
  { id: 'case-studies', label: 'Case Studies', icon: FileText },
  { id: 'technologies', label: 'Technologies', icon: Cpu },
  { id: 'testimonials', label: 'Testimonials', icon: MessageCircle },
  { id: 'contact', label: 'Contact', icon: Mail },
];

export function AppSidebar() {
  const { setOpenMobile } = useSidebar();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setOpenMobile(false); // Close sidebar on mobile after navigation
    }
  };

  return (
    <Sidebar className="bg-deep-space/95 backdrop-blur-xl border-primary/20">
      <SidebarContent>
        {/* Logo */}
        <div className="p-6 border-b border-primary/20">
          <div 
            className="text-2xl font-bold font-space cursor-pointer transition-stellar hover-glow"
            onClick={() => scrollToSection('hero')}
          >
            <span className="text-primary">Stellar</span>
            <span className="text-stellar-white">Code</span>
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-primary/80 font-space">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    onClick={() => scrollToSection(item.id)}
                    className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-stellar cursor-pointer"
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Get Started Button */}
        <div className="mt-auto p-6 border-t border-primary/20">
          <button
            onClick={() => scrollToSection('contact')}
            className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium transition-stellar hover-glow hover:-translate-y-0.5"
          >
            Get Started
          </button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}