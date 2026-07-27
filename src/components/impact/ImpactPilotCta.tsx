import { ArrowRight } from "lucide-react";
import pilotSupernova from "@/assets/impact-pilot-supernova.jpg";
import {
	IMPACT_CTA_HREF,
	IMPACT_CTA_LABEL,
	impactPilotCta,
} from "@/lib/impact-service";

type ImpactPilotCtaProps = {
	className?: string;
};

const ImpactPilotCta = ({ className = "" }: ImpactPilotCtaProps) => {
	const { eyebrow, title, body } = impactPilotCta;

	const scrollToForm = () => {
		document
			.getElementById("impact-interest")
			?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<section className={`relative overflow-hidden py-16 md:py-24 ${className}`}>
			<div aria-hidden className="pointer-events-none absolute inset-0">
				<img
					src={pilotSupernova}
					alt=""
					className="absolute w-3xl max-w-none md:w-full md:max-h-full left-1/2 -translate-x-1/2 -bottom-1/4 md:bottom-auto md:top-1/5 opacity-70"
				/>
				{/* Soft edge blend into deep-space page bg */}
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_95%_70%_at_50%_55%,_transparent_40%,_oklch(13.14%_0.023_264.18_/_0.45)_72%,_oklch(13.14%_0.023_264.18)_100%)]" />
				<div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-deep-space via-deep-space/70 to-transparent" />
				<div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-deep-space via-deep-space/70 to-transparent" />
				<div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-deep-space to-transparent md:w-28" />
				<div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-deep-space to-transparent md:w-28" />
				{/* Light readability veil over the core */}
				<div className="absolute inset-0 bg-deep-space/25" />
			</div>

			<div className="container relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
				<p className="mb-3 text-xs font-medium tracking-[0.2em] text-neon-teal uppercase">
					{eyebrow}
				</p>
				<h2 className="mb-4 font-space text-2xl font-bold text-balance text-white md:text-3xl">
					{title}
				</h2>
				<p className="mb-10 max-w-xl text-base leading-relaxed text-stellar-white/85 md:text-lg">
					{body}
				</p>

				{/* Button sits over the oval supernova core */}
				<div className="relative mt-2 flex flex-col items-center pt-6 md:pt-10">
					<a
						href={IMPACT_CTA_HREF}
						onClick={(e) => {
							e.preventDefault();
							scrollToForm();
						}}
						className="relative inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/35 px-8 py-4 text-base font-semibold text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35),0_0_40px_-6px_rgba(255,255,255,0.35),0_0_64px_-10px_oklch(60.59%_0.213_292.72_/_0.5)] backdrop-blur-xl transition-stellar hover:border-white/50 hover:bg-white/18 hover:-translate-y-0.5 md:text-lg"
					>
						{IMPACT_CTA_LABEL}
						<ArrowRight className="h-5 w-5" aria-hidden />
					</a>
				</div>
			</div>
		</section>
	);
};

export default ImpactPilotCta;
