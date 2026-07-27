import { Linkedin, Users, Youtube } from "lucide-react";
import adirPortrait from "@/assets/adir-kandel-portrait.png";
import { impactAbout } from "@/lib/impact-service";

const LINK_ICONS = {
	LinkedIn: Linkedin,
	Community: Users,
	YouTube: Youtube,
} as const;

const ImpactAboutSection = () => {
	return (
		<section id="impact-about" className="relative overflow-hidden pt-16 md:pt-24">
			<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/28 via-primary/10 to-transparent" />

			<div className="container relative z-10 mx-auto px-6">
				<div className="mx-auto grid max-w-6xl items-end md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
					<div className="order-2 relative mx-auto w-full max-w-sm md:order-1 md:mx-0 md:max-w-lg">
						<img
							src={adirPortrait}
							alt="Adir Kandel"
							className="mx-auto block h-auto w-full object-contain object-bottom"
						/>
					</div>

					<div className="order-1 flex flex-col gap-5 pb-8 text-center md:order-2 md:text-left">
						<div>
							<p className="mb-2 text-sm font-medium tracking-[0.16em] text-neon-teal uppercase">
								{impactAbout.subtitle}
							</p>
							<h2 className="font-space text-3xl font-bold text-white md:text-4xl">
								{impactAbout.title}
							</h2>
						</div>

						<p className="text-base leading-relaxed text-stellar-white/85 md:text-lg">
							{impactAbout.lead}
						</p>

						<ul className="space-y-4 text-center md:text-left">
							{impactAbout.bullets.map((bullet) => (
								<li key={bullet.label} className="md:border-l border-primary/35 md:pl-4">
									<p className="mb-1 font-space text-sm font-semibold text-primary">
										{bullet.label}
									</p>
									<p className="text-base leading-relaxed text-stellar-white/85 md:text-lg">
										{bullet.text}
									</p>
								</li>
							))}
						</ul>

						<p className="text-base leading-relaxed text-stellar-white/85 md:text-lg">
							{impactAbout.close}
						</p>

						<div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
							{impactAbout.links.map((link) => {
								const Icon =
									LINK_ICONS[link.label as keyof typeof LINK_ICONS] ?? Users;
								return (
									<a
										key={link.href}
										href={link.href}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-deep-space/40 px-4 py-2 text-sm font-medium text-stellar-white/90 transition-stellar hover:border-primary/60 hover:text-primary"
									>
										<Icon className="h-4 w-4" aria-hidden />
										{link.label}
									</a>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ImpactAboutSection;
