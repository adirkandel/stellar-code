import { createFileRoute } from "@tanstack/react-router";
import Footer from "@/components/Footer";
import ImpactAboutSection from "@/components/impact/ImpactAboutSection";
import ImpactIntegrationsSection from "@/components/impact/ImpactIntegrationsSection";
import ImpactInterestForm from "@/components/impact/ImpactInterestForm";
import ImpactLaunchSection from "@/components/impact/ImpactLaunchSection";
import ImpactLoopSection from "@/components/impact/ImpactLoopSection";
import ImpactPainsSection from "@/components/impact/ImpactPainsSection";
import ImpactServiceHero from "@/components/impact/ImpactServiceHero";
import ImpactSuccessSection from "@/components/impact/ImpactSuccessSection";
import Navigation from "@/components/Navigation";
import TestimonialsSection from "@/components/TestimonialsSection";
import { impactServiceMeta } from "@/lib/impact-service";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const Route = createFileRoute("/services/agentic-sdlc-impact-method")({
	head: () => {
		const url = absoluteUrl(impactServiceMeta.path);
		return {
			meta: [
				{ title: `${impactServiceMeta.title} | ${siteConfig.siteName}` },
				{ name: "description", content: impactServiceMeta.description },
				{ property: "og:title", content: impactServiceMeta.title },
				{ property: "og:description", content: impactServiceMeta.description },
				{ property: "og:url", content: url },
				{ name: "twitter:title", content: impactServiceMeta.title },
				{
					name: "twitter:description",
					content: impactServiceMeta.description,
				},
			],
		};
	},
	component: ImpactServicePage,
});

function ImpactServicePage() {
	return (
		<div className="min-h-screen bg-deep-space">
			<Navigation />
			<main>
				<ImpactServiceHero />
				<ImpactPainsSection />
				<ImpactLoopSection />
				<ImpactIntegrationsSection />
				<ImpactLaunchSection />
				<ImpactSuccessSection />
				<TestimonialsSection />
				<ImpactAboutSection />
				<ImpactInterestForm />
			</main>
			<Footer />
		</div>
	);
}
