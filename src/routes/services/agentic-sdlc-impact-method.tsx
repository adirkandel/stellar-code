import { createFileRoute } from "@tanstack/react-router";
import Footer from "@/components/Footer";
import ImpactAboutSection from "@/components/impact/ImpactAboutSection";
import ImpactFaqSection from "@/components/impact/ImpactFaqSection";
import ImpactIntegrationsSection from "@/components/impact/ImpactIntegrationsSection";
import ImpactInterestForm from "@/components/impact/ImpactInterestForm";
import ImpactLaunchSection from "@/components/impact/ImpactLaunchSection";
import ImpactLoopSection from "@/components/impact/ImpactLoopSection";
import ImpactPainsSection from "@/components/impact/ImpactPainsSection";
import ImpactPilotCta from "@/components/impact/ImpactPilotCta";
import ImpactServiceHero from "@/components/impact/ImpactServiceHero";
import ImpactSuccessSection from "@/components/impact/ImpactSuccessSection";
import Navigation from "@/components/Navigation";
import { impactFaqs, impactServiceMeta } from "@/lib/impact-service";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const Route = createFileRoute("/services/agentic-sdlc-impact-method")({
	head: () => {
		const url = absoluteUrl(impactServiceMeta.path);
		const ogImage = absoluteUrl(impactServiceMeta.ogImage);
		const jsonLd = {
			"@context": "https://schema.org",
			"@graph": [
				{
					"@type": "Service",
					name: impactServiceMeta.title,
					description: impactServiceMeta.description,
					url,
					provider: {
						"@type": "Organization",
						name: siteConfig.siteName,
						url: siteConfig.url,
					},
					serviceType: "Agentic SDLC operating system",
					areaServed: "Worldwide",
				},
				{
					"@type": "FAQPage",
					mainEntity: impactFaqs.map((faq) => ({
						"@type": "Question",
						name: faq.question,
						acceptedAnswer: {
							"@type": "Answer",
							text: faq.answer,
						},
					})),
				},
			],
		};
		return {
			meta: [
				{ title: `${impactServiceMeta.title} | ${siteConfig.siteName}` },
				{ name: "description", content: impactServiceMeta.description },
				{ property: "og:title", content: impactServiceMeta.title },
				{ property: "og:description", content: impactServiceMeta.description },
				{ property: "og:url", content: url },
				{ property: "og:image", content: ogImage },
				{ name: "twitter:card", content: "summary_large_image" },
				{ name: "twitter:title", content: impactServiceMeta.title },
				{
					name: "twitter:description",
					content: impactServiceMeta.description,
				},
				{ name: "twitter:image", content: ogImage },
			],
			links: [{ rel: "canonical", href: url }],
			scripts: [
				{
					type: "application/ld+json",
					children: JSON.stringify(jsonLd),
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
				<ImpactAboutSection />
				<ImpactPilotCta />
				<ImpactLoopSection />
				<ImpactIntegrationsSection />
				<ImpactLaunchSection />
				<ImpactSuccessSection />
				<ImpactFaqSection />
				<ImpactInterestForm />
			</main>
			<Footer />
		</div>
	);
}
