import { impactPains } from "@/lib/impact-service";

const ImpactPainsSection = () => {
	return (
		<section id="impact-pains" className="relative py-24">
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
			<div className="container relative z-10 mx-auto px-6">
				<div className="mx-auto mb-12 max-w-3xl text-center">
					<h2 className="mb-4 font-space text-3xl font-bold md:text-4xl">
						<span className="text-white">Your teams have AI tools. </span>
						<span className="text-primary glow-stellar">
							Delivery still stalls.
						</span>
					</h2>
					<p className="text-lg text-stellar-white/85">
						R&D leaders need competitive velocity without giving up quality.
						Ad-hoc agent adoption usually creates{" "}
						<span className="text-stellar-white">AI tax</span> - review
						bottlenecks, rework, and seniors drowning in verification while
						throughput looks busy - in three places:
					</p>
				</div>

				<div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
					{impactPains.map((pain) => (
						<article
							key={pain.title}
							className="rounded-xl border border-primary/20 bg-gradient-card p-6 text-left backdrop-blur-sm transition-stellar hover:border-primary/40"
						>
							<h3 className="mb-3 font-space text-xl font-bold text-white">
								{pain.title}
							</h3>
							<p className="leading-relaxed text-stellar-white/85">
								{pain.description}
							</p>
						</article>
					))}
				</div>
			</div>
		</section>
	);
};

export default ImpactPainsSection;
