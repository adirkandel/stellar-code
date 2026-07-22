import { useEffect, useRef, useState } from "react";
import { impactSuccessLook } from "@/lib/impact-service";

const prefersReducedMotion = () => {
	if (typeof window === "undefined") return true;
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/** Mock series — upward growth, no real metrics. ViewBox coords. */
const VELOCITY_POINTS = [
	[40, 168],
	[100, 152],
	[160, 138],
	[220, 118],
	[280, 96],
	[340, 72],
	[400, 48],
	[460, 28],
];

const QUALITY_POINTS = [
	[40, 178],
	[100, 170],
	[160, 158],
	[220, 142],
	[280, 124],
	[340, 102],
	[400, 78],
	[460, 52],
];

const toPolyline = (points: number[][]) =>
	points.map(([x, y]) => `${x},${y}`).join(" ");

const ImpactSuccessSection = () => {
	const { subhead, series } = impactSuccessLook;
	const sectionRef = useRef<HTMLElement>(null);
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const node = sectionRef.current;
		if (!node) return;

		if (prefersReducedMotion()) {
			setVisible(true);
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry?.isIntersecting) {
					setVisible(true);
					observer.disconnect();
				}
			},
			{ threshold: 0.25 },
		);

		observer.observe(node);
		return () => observer.disconnect();
	}, []);

	return (
		<section ref={sectionRef} className="relative py-24">
			<div className="container relative z-10 mx-auto px-6">
				<div className="mx-auto mb-12 max-w-3xl text-center">
					<h2 className="mb-4 font-space text-3xl font-bold md:text-4xl">
						<span className="text-white">What </span>
						<span className="text-primary glow-stellar">Success </span>
						<span className="text-white">looks like</span>
					</h2>
					<p className="text-lg text-stellar-white/85">{subhead}</p>
				</div>

				<div
					className={`mx-auto max-w-3xl transition-all duration-700 ease-out ${
						visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
					}`}
				>
					<div className="rounded-xl border border-primary/25 bg-gradient-card p-5 backdrop-blur-sm md:p-8">
						<ul className="mb-5 flex flex-wrap items-center justify-center gap-6 md:justify-start">
							{series.map((item) => (
								<li key={item.id} className="flex items-center gap-2.5">
									<span
										className="h-0.5 w-6 rounded-full"
										style={{ backgroundColor: item.color }}
										aria-hidden
									/>
									<span className="font-space text-sm font-medium text-stellar-white/90">
										{item.label}
									</span>
								</li>
							))}
						</ul>

						<svg
							viewBox="0 0 500 200"
							className="h-auto w-full"
							role="img"
							aria-label="Illustrative chart: velocity and quality both rising over time"
						>
							<title>Velocity and quality trending up together</title>
							{/* Soft grid — no tick labels */}
							{[40, 80, 120, 160].map((y) => (
								<line
									key={`h-${y}`}
									x1="32"
									y1={y}
									x2="480"
									y2={y}
									stroke="currentColor"
									className="text-stellar-white/8"
									strokeWidth="1"
								/>
							))}
							{[100, 160, 220, 280, 340, 400, 460].map((x) => (
								<line
									key={`v-${x}`}
									x1={x}
									y1="20"
									x2={x}
									y2="188"
									stroke="currentColor"
									className="text-stellar-white/5"
									strokeWidth="1"
								/>
							))}
							{/* Axes without labels */}
							<line
								x1="32"
								y1="188"
								x2="480"
								y2="188"
								stroke="currentColor"
								className="text-stellar-white/20"
								strokeWidth="1.5"
							/>
							<line
								x1="32"
								y1="20"
								x2="32"
								y2="188"
								stroke="currentColor"
								className="text-stellar-white/20"
								strokeWidth="1.5"
							/>

							{/* Quality (slightly behind / lower curve) */}
							<polyline
								fill="none"
								stroke={series[1].color}
								strokeWidth="2.5"
								strokeLinecap="round"
								strokeLinejoin="round"
								points={toPolyline(QUALITY_POINTS)}
								className={
									visible
										? "motion-safe:[stroke-dasharray:600] motion-safe:[stroke-dashoffset:0] motion-safe:transition-[stroke-dashoffset] motion-safe:duration-1000 motion-safe:ease-out"
										: "motion-safe:[stroke-dasharray:600] motion-safe:[stroke-dashoffset:600]"
								}
							/>
							{/* Velocity */}
							<polyline
								fill="none"
								stroke={series[0].color}
								strokeWidth="2.5"
								strokeLinecap="round"
								strokeLinejoin="round"
								points={toPolyline(VELOCITY_POINTS)}
								className={
									visible
										? "motion-safe:[stroke-dasharray:600] motion-safe:[stroke-dashoffset:0] motion-safe:delay-150 motion-safe:transition-[stroke-dashoffset] motion-safe:duration-1000 motion-safe:ease-out"
										: "motion-safe:[stroke-dasharray:600] motion-safe:[stroke-dashoffset:600]"
								}
							/>

							{/* End dots */}
							<circle
								cx={VELOCITY_POINTS.at(-1)![0]}
								cy={VELOCITY_POINTS.at(-1)![1]}
								r="4"
								fill={series[0].color}
								className={`transition-opacity duration-500 delay-700 ${
									visible ? "opacity-100" : "opacity-0"
								}`}
							/>
							<circle
								cx={QUALITY_POINTS.at(-1)![0]}
								cy={QUALITY_POINTS.at(-1)![1]}
								r="4"
								fill={series[1].color}
								className={`transition-opacity duration-500 delay-700 ${
									visible ? "opacity-100" : "opacity-0"
								}`}
							/>
						</svg>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ImpactSuccessSection;
