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
    <Sidebar className="bg-deep-space/95 backdrop-blur-xl border-primary/20 h-full">
      <SidebarContent className="flex flex-col h-full overflow-hidden">
        {/* Logo */}
        <div className="p-4 md:p-6 border-b border-primary/20 flex-shrink-0">
          <div 
            className="text-xl md:text-2xl font-bold font-space cursor-pointer transition-stellar hover-glow"
            onClick={() => scrollToSection('hero')}
          >
            <span className="text-primary">Stellar</span>
            <span className="text-stellar-white">Code</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <SidebarGroup>
            <SidebarGroupLabel className="text-primary/80 font-space px-4 md:px-6 py-2">Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="px-2 md:px-4">
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton 
                      onClick={() => scrollToSection(item.id)}
                      className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-stellar cursor-pointer w-full justify-start py-3"
                    >
                      <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                      <span className="font-medium">{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        {/* Get Started Button */}
        <div className="p-4 md:p-6 border-t border-primary/20 flex-shrink-0">
          <button
            onClick={() => scrollToSection('contact')}
            className="w-full bg-primary text-primary-foreground px-4 py-3 rounded-lg font-medium transition-stellar hover-glow hover:-translate-y-0.5"
          >
            Get Started
          </button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}