import { SiteNavBar, type SiteNavItem } from "@/components/SiteNavBar";
import { useActiveSectionId } from "@/hooks/use-active-section-id";

const HOME_NAV_ITEMS: SiteNavItem[] = [
	{ id: "solutions", label: "Solutions", href: "/#solutions" },
	{ id: "services", label: "Expertise", href: "/#services" },
	{ id: "technologies", label: "Technologies", href: "/#technologies" },
	{ id: "testimonials", label: "Testimonials", href: "/#testimonials" },
	{ id: "why-us", label: "Why Us", href: "/#why-us" },
	{ id: "contact", label: "Contact", href: "/#contact" },
];

function scrollToHomeSection(sectionId: string) {
	const element = document.getElementById(sectionId);
	if (element) {
		window.location.hash = sectionId;
		element.scrollIntoView({ behavior: "smooth" });
		return;
	}
	window.location.href = `/#${sectionId}`;
}

const Navigation = () => {
	const [activeId, setActiveId] = useActiveSectionId("hero");

	return (
		<SiteNavBar
			items={HOME_NAV_ITEMS}
			ctaLabel="Get Started"
			activeId={activeId}
			onCtaClick={() => {
				scrollToHomeSection("contact");
				setActiveId("contact");
			}}
			onItemNavigate={(item) => {
				scrollToHomeSection(item.id);
				setActiveId(item.id);
			}}
		/>
	);
};

export default Navigation;
