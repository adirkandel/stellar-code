import adirPortrait from "@/assets/adir-kandel-portrait.png";
import { impactAbout } from "@/lib/impact-service";

const ImpactAboutSection = () => {
	return (
		<section id="impact-about" className="relative overflow-hidden pt-16 md:pt-24">
			<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/28 via-primary/10 to-transparent" />

			<div className="container relative z-10 mx-auto px-6">
				<div className="mx-auto grid max-w-5xl items-end md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
					<div className="order-2 md:order-1 relative mx-auto w-full max-w-sm md:mx-0 md:max-w-none">
						<img
							src={adirPortrait}
							alt="Adir Kandel"
							className="mx-auto block h-auto w-full max-w-[320px] object-contain object-bottom md:max-w-none"
						/>
					</div>

					<div className="order-1 md:order-2 flex flex-col gap-5 pb-16 text-center md:pb-24 md:text-left">
						<h2 className="font-space text-3xl font-bold text-white md:text-4xl">
							{impactAbout.title}
						</h2>
						<p className="text-base leading-relaxed text-stellar-white/85 md:text-lg">
							{impactAbout.body}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ImpactAboutSection;
