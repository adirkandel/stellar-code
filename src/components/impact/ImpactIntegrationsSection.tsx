import { Bot, Brain, ClipboardList } from "lucide-react";
import { impactIntegrations } from "@/lib/impact-service";

const VIEW = 440;
const CX = VIEW / 2;
const CY = VIEW / 2;
/** Shared orbit so nodes never jump between breakpoints */
const ORBIT = 120;

type ArrowLayout = {
	arrowHalf: number;
	headHalf: number;
	tipDeg: number;
	clearanceDeg: number;
	concaveR: number;
};

const DESKTOP_ARROWS: ArrowLayout = {
	arrowHalf: 8,
	headHalf: 14,
	tipDeg: 10,
	clearanceDeg: 38,
	concaveR: 72,
};

/** Shorter/thinner trails so they stay visible between circles on small screens */
const MOBILE_ARROWS: ArrowLayout = {
	arrowHalf: 5,
	headHalf: 10,
	tipDeg: 9,
	clearanceDeg: 46,
	concaveR: 52,
};

const LAYER_META = [
	{
		Icon: ClipboardList,
		borderGradient: "bg-gradient-to-br from-neon-teal via-neon-teal/70 to-neon-teal/25",
	},
	{
		Icon: Bot,
		borderGradient: "bg-gradient-to-br from-primary via-primary/70 to-primary/25",
	},
	{
		Icon: Brain,
		borderGradient: "bg-gradient-to-br from-sky-400 via-sky-500/70 to-sky-700/30",
	},
] as const;

function polar(r: number, deg: number) {
	const rad = ((deg - 90) * Math.PI) / 180;
	return {
		x: CX + r * Math.cos(rad),
		y: CY + r * Math.sin(rad),
	};
}

type ArrowGeom = {
	d: string;
	tail: { x: number; y: number };
	tip: { x: number; y: number };
	layer: string;
	gradientId: string;
};

function buildArrows(layout: ArrowLayout, idPrefix: string): ArrowGeom[] {
	const { arrowHalf, headHalf, tipDeg, clearanceDeg, concaveR } = layout;

	return impactIntegrations.map((layer, index) => {
		const start = index * 120 + clearanceDeg;
		const bodyEnd = (index + 1) * 120 - clearanceDeg - tipDeg;
		const tipAngle = bodyEnd + tipDeg;
		const headBase = bodyEnd - 0.6;

		const outerStart = polar(ORBIT + arrowHalf, start);
		const outerEnd = polar(ORBIT + arrowHalf, bodyEnd);
		const innerEnd = polar(ORBIT - arrowHalf, bodyEnd);
		const innerStart = polar(ORBIT - arrowHalf, start);
		const tail = polar(ORBIT, start);

		const headOuter = polar(ORBIT + headHalf, headBase);
		const headInner = polar(ORBIT - headHalf, headBase);
		const tip = polar(ORBIT, tipAngle);

		const rOut = ORBIT + arrowHalf;
		const rIn = ORBIT - arrowHalf;

		const d = [
			`M ${outerStart.x.toFixed(2)} ${outerStart.y.toFixed(2)}`,
			`A ${rOut} ${rOut} 0 0 1 ${outerEnd.x.toFixed(2)} ${outerEnd.y.toFixed(2)}`,
			`L ${innerEnd.x.toFixed(2)} ${innerEnd.y.toFixed(2)}`,
			`A ${rIn} ${rIn} 0 0 0 ${innerStart.x.toFixed(2)} ${innerStart.y.toFixed(2)}`,
			`A ${concaveR} ${concaveR} 0 0 0 ${outerStart.x.toFixed(2)} ${outerStart.y.toFixed(2)}`,
			"Z",
			`M ${headOuter.x.toFixed(2)} ${headOuter.y.toFixed(2)}`,
			`L ${tip.x.toFixed(2)} ${tip.y.toFixed(2)}`,
			`L ${headInner.x.toFixed(2)} ${headInner.y.toFixed(2)}`,
			"Z",
		].join(" ");

		return {
			d,
			tail,
			tip,
			layer: layer.layer,
			gradientId: `${idPrefix}-${index}`,
		};
	});
}

const desktopArrows = buildArrows(DESKTOP_ARROWS, "impact-arrow-desktop");
const mobileArrows = buildArrows(MOBILE_ARROWS, "impact-arrow-mobile");

function nodeStyle(index: number) {
	const { x, y } = polar(ORBIT, index * 120);
	return {
		left: `${(x / VIEW) * 100}%`,
		top: `${(y / VIEW) * 100}%`,
	};
}

function ArrowSvg({
	arrows,
	className,
}: {
	arrows: ArrowGeom[];
	className?: string;
}) {
	return (
		<svg
			viewBox={`0 0 ${VIEW} ${VIEW}`}
			className={className}
			aria-hidden="true"
		>
			<defs>
				{arrows.map((arrow) => (
					<linearGradient
						key={arrow.gradientId}
						id={arrow.gradientId}
						gradientUnits="userSpaceOnUse"
						x1={arrow.tail.x}
						y1={arrow.tail.y}
						x2={arrow.tip.x}
						y2={arrow.tip.y}
					>
						<stop
							offset="0%"
							stopColor="oklch(60.59% 0.213 292.72)"
							stopOpacity="0"
						/>
						<stop
							offset="100%"
							stopColor="oklch(60.59% 0.213 292.72)"
							stopOpacity="0.45"
						/>
					</linearGradient>
				))}
			</defs>
			{arrows.map((arrow) => (
				<path
					key={arrow.layer}
					d={arrow.d}
					fill={`url(#${arrow.gradientId})`}
				/>
			))}
		</svg>
	);
}

const ImpactIntegrationsSection = () => {
	return (
		<section className="relative bg-gradient-galaxy py-24">
			<div className="container relative z-10 mx-auto px-6">
				<div className="mx-auto mb-12 max-w-3xl text-center">
					<h2 className="mb-4 font-space text-3xl font-bold md:text-4xl">
						<span className="text-white">The operating </span>
						<span className="text-primary glow-stellar">cycle</span>
					</h2>
					<p className="text-lg text-stellar-white/85">
						After we wire IMPACT, every piece of work runs the same cycle. That
						repetition is what keeps the system alive and not obsolete.
					</p>
				</div>

				<div className="relative mx-auto aspect-square w-full max-w-[42rem]">
					{/* CSS toggle — no JS layout swap / no post-hydration jump */}
					<ArrowSvg
						arrows={mobileArrows}
						className="absolute inset-0 h-full w-full sm:hidden"
					/>
					<ArrowSvg
						arrows={desktopArrows}
						className="absolute inset-0 hidden h-full w-full sm:block"
					/>

					{impactIntegrations.map((layer, index) => {
						const meta = LAYER_META[index] ?? LAYER_META[0];

						return (
							<div
								key={layer.layer}
								className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
								style={nodeStyle(index)}
							>
								<div
									className={`rounded-full p-[2px] ${meta.borderGradient}`}
								>
									<div className="flex h-40 w-40 flex-col items-center justify-center rounded-full bg-gradient-card px-4 text-center backdrop-blur-sm sm:h-44 sm:w-44">
										<meta.Icon
											className="mb-1.5 h-8 w-8 text-white"
											strokeWidth={1.75}
										/>
										<p className="font-space text-base font-bold leading-tight text-white">
											{layer.layer}
										</p>
										<p className="mt-1.5 text-xs leading-snug text-white/75">
											{layer.examples}
										</p>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default ImpactIntegrationsSection;
