import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import impactBg from "@/assets/impact-bg.jpg";

const ImpactPromoSection = () => {
	return (
		<section
			id="impact-method"
			className="relative overflow-hidden py-30"
			style={{
				backgroundImage: `url(${impactBg})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
			}}
		>
		<div className="absolute inset-0 bg-deep-space/55" />
		<div className="absolute inset-0 bg-gradient-to-b from-deep-space/60 via-deep-space/20 to-deep-space/80" />

			<div className="container relative z-10 mx-auto px-6">
				<div className="mx-auto max-w-3xl text-center">
					<p className="mb-3 text-sm font-medium tracking-[0.2em] text-neon-teal uppercase">
						New service
					</p>
					<h2 className="mb-4 font-space text-3xl font-bold md:text-4xl">
						<span className="text-primary glow-stellar">IMPACT </span>
						<span className="text-stellar-white">
							 - Agentic SDLC, made predictable
						</span>
					</h2>
					<p className="mb-8 text-lg text-muted-foreground">
						A methodology and operating layer for engineering teams that want
						better outcomes from AI coding agents - without losing control or
						rebuilding context every sprint.
					</p>
					<Link
						to="/services/agentic-sdlc-impact-method"
						className="group inline-flex items-center gap-3 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-stellar hover-glow hover:-translate-y-0.5"
					>
						Explore the IMPACT Method
						<ArrowRight className="h-5 w-5 transition-stellar group-hover:translate-x-1" />
					</Link>
				</div>
			</div>
		</section>
	);
};

export default ImpactPromoSection;
