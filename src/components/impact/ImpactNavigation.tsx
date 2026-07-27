import { SiteNavBar, type SiteNavItem } from "@/components/SiteNavBar";
import { useActiveSectionId } from "@/hooks/use-active-section-id";
import { IMPACT_CTA_LABEL } from "@/lib/impact-service";

const IMPACT_NAV_ITEMS: SiteNavItem[] = [
	{ id: "impact-pains", label: "Problem", href: "#impact-pains" },
	{ id: "impact-about", label: "About", href: "#impact-about" },
	{ id: "impact-loop", label: "Method", href: "#impact-loop" },
	{ id: "impact-launch", label: "Launch", href: "#impact-launch" },
	{ id: "impact-faq", label: "FAQ", href: "#impact-faq" },
];

function scrollToImpactSection(sectionId: string) {
	const element = document.getElementById(sectionId);
	if (!element) return;
	window.location.hash = sectionId;
	element.scrollIntoView({ behavior: "smooth" });
}

const ImpactNavigation = () => {
	const [activeId, setActiveId] = useActiveSectionId("impact-pains");

	return (
		<SiteNavBar
			items={IMPACT_NAV_ITEMS}
			ctaLabel={IMPACT_CTA_LABEL}
			activeId={activeId}
			onCtaClick={() => {
				scrollToImpactSection("impact-interest");
				setActiveId("impact-interest");
			}}
			onItemNavigate={(item) => {
				scrollToImpactSection(item.id);
				setActiveId(item.id);
			}}
		/>
	);
};

export default ImpactNavigation;
