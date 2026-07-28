import impactBg from "@/assets/impact-hero-bg.jpg";
import { IMPACT_CTA_LABEL } from "@/lib/impact-service";

const ImpactServiceHero = () => {
	const scrollToForm = () => {
		document
			.getElementById("impact-interest")
			?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<section
			className="relative flex min-h-[85vh] items-center overflow-hidden pt-24"
			style={{
				backgroundImage: `url(${impactBg})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
			}}
		>
			<div className="absolute inset-0 bg-deep-space/55 opacity-50" />
			<div className="absolute inset-0 bg-gradient-to-b from-deep-space/60 via-deep-space/20 to-deep-space/80" />

			<div className="container relative z-10 mx-auto px-6 py-20">
				<p className="mb-4 text-sm font-medium tracking-[0.2em] text-neon-teal uppercase">
					New methodology
				</p>
				<h1 className="mb-6 max-w-4xl font-space text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
					<span className="text-primary glow-stellar">IMPACT </span>
					<span className="text-white">
						- Agentic SDLC, embedded into your stack.
					</span>
				</h1>
				<p className="mb-10 max-w-2xl text-lg text-stellar-white/85 md:text-xl">
					An operating layer for agentic engineering - we wire Intent, Memory,
					Policy, and Checks into your tickets, repos, and CI.
				</p>
				<button
					type="button"
					onClick={scrollToForm}
					className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-stellar hover-glow hover:-translate-y-0.5"
				>
					{IMPACT_CTA_LABEL}
				</button>
			</div>
		</section>
	);
};

export default ImpactServiceHero;
