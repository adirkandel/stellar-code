import {
	Bug,
	CheckCircle2,
	Clock3,
	ClipboardList,
	RotateCcw,
	UserRoundCheck,
	type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
	impactSuccessLook,
	type ImpactSuccessStat,
	type ImpactSuccessStatIcon,
} from "@/lib/impact-service";
import { cn } from "@/lib/utils";

const prefersReducedMotion = () => {
	if (typeof window === "undefined") return true;
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

const STAT_ICONS: Record<ImpactSuccessStatIcon, LucideIcon> = {
	throughput: ClipboardList,
	"lead-time": Clock3,
	"touch-points": UserRoundCheck,
	"bug-trend": Bug,
	"first-pass": CheckCircle2,
	rework: RotateCcw,
};

function useCountUp(target: number, active: boolean, durationMs = 1400) {
	const [value, setValue] = useState(0);

	useEffect(() => {
		if (!active) {
			setValue(0);
			return;
		}
		if (prefersReducedMotion()) {
			setValue(target);
			return;
		}

		let frame = 0;
		const start = performance.now();

		const tick = (now: number) => {
			const t = Math.min(1, (now - start) / durationMs);
			// Ease-out cubic
			const eased = 1 - (1 - t) ** 3;
			setValue(Math.round(target * eased));
			if (t < 1) frame = requestAnimationFrame(tick);
		};

		frame = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frame);
	}, [active, target, durationMs]);

	return value;
}

function StatCard({
	stat,
	accent,
	active,
	delayMs,
}: {
	stat: ImpactSuccessStat;
	accent: string;
	active: boolean;
	delayMs: number;
}) {
	const [started, setStarted] = useState(false);
	const Icon = STAT_ICONS[stat.icon];
	const display = useCountUp(stat.value, started);

	useEffect(() => {
		if (!active) {
			setStarted(false);
			return;
		}
		const id = window.setTimeout(() => setStarted(true), delayMs);
		return () => window.clearTimeout(id);
	}, [active, delayMs]);

	return (
		<article
			className={cn(
				"rounded-xl border bg-deep-space/40 p-5 backdrop-blur-sm transition-all duration-700 ease-out",
				active ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
			)}
			style={{
				borderColor: `color-mix(in oklab, ${accent} 35%, transparent)`,
				transitionDelay: active ? `${delayMs}ms` : "0ms",
			}}
		>
			<div className="mb-4 flex items-start gap-3">
				<span
					className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
					style={{
						backgroundColor: `color-mix(in oklab, ${accent} 18%, transparent)`,
						color: accent,
					}}
				>
					<Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
				</span>
				<p
					className="font-space text-3xl font-bold tracking-tight md:text-4xl"
					style={{ color: accent }}
				>
					<span className="tabular-nums">
						{stat.prefix}
						{display}
						{stat.suffix}
					</span>
				</p>
			</div>
			<p className="text-sm leading-relaxed text-stellar-white/80">
				{stat.description}
			</p>
		</article>
	);
}

const ImpactSuccessSection = () => {
	const { eyebrow, subhead, pillars } = impactSuccessLook;
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
			{ threshold: 0.2 },
		);

		observer.observe(node);
		return () => observer.disconnect();
	}, []);

	return (
		<section ref={sectionRef} className="relative py-24">
			<div className="container relative z-10 mx-auto px-6">
				<div className="mx-auto mb-12 max-w-3xl text-center">
					<p className="mb-3 text-sm font-medium tracking-[0.18em] text-neon-teal uppercase">
						{eyebrow}
					</p>
					<h2 className="mb-4 font-space text-3xl font-bold md:text-4xl">
						<span className="text-white">What </span>
						<span className="text-primary glow-stellar">Success </span>
						<span className="text-white">targets look like</span>
					</h2>
					<p className="text-lg text-stellar-white/85">{subhead}</p>
				</div>

				<div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 md:gap-10">
					{pillars.map((pillar) => (
						<div
							key={pillar.id}
							className="rounded-2xl border p-5 md:p-6"
							style={{
								borderColor: `color-mix(in oklab, ${pillar.color} 40%, transparent)`,
								background: `linear-gradient(165deg, color-mix(in oklab, ${pillar.color} 12%, transparent), oklch(13.14% 0.023 264.18 / 0.55))`,
							}}
						>
							<header className="mb-6 border-b pb-4"
								style={{
									borderColor: `color-mix(in oklab, ${pillar.color} 28%, transparent)`,
								}}
							>
								<p
									className="mb-1 font-space text-xs font-semibold tracking-[0.18em] uppercase"
									style={{ color: pillar.color }}
								>
									Pilot target pillar
								</p>
								<h3
									className="font-space text-2xl font-bold md:text-3xl"
									style={{ color: pillar.color }}
								>
									{pillar.label}
								</h3>
								<p className="mt-1 text-sm text-stellar-white/75">
									{pillar.blurb}
								</p>
							</header>

							<ul className="flex flex-col gap-4">
								{pillar.stats.map((stat, index) => (
									<li key={stat.id}>
										<StatCard
											stat={stat}
											accent={pillar.color}
											active={visible}
											delayMs={index * 120}
										/>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>

			{/*
			=== Previous Success section (chart + metric cards) - kept for reference ===

			import { impactSuccessLook } from "@/lib/impact-service";
			// Illustrative Velocity / Quality chart + 6 vision metric cards with IMPACT levers.
			// See git history for full implementation (VELOCITY_POINTS, QUALITY_POINTS, metrics grid).

			const { subhead, series, metrics } = impactSuccessLook;
			// Chart: dual polyline (velocity + quality) with legend
			// Grid: metrics.map → metric / vision / IMPACT lever
			*/}
		</section>
	);
};

export default ImpactSuccessSection;
