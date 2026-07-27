import { useEffect, useState } from "react";
import {
	impactLetters,
	type ImpactLetter,
} from "@/lib/impact-service";
import { cn } from "@/lib/utils";

const CX = 200;
const CY = 200;
const OUTER_R = 168;
const INNER_R = 98;
const MID_R = (OUTER_R + INNER_R) / 2;
const ARROW_DEG = 12;
const SEGMENT = 360 / impactLetters.length;
/** Rotate ring so Intent is centered at the top */
const RING_OFFSET = -SEGMENT / 2;
const DEFAULT_STAGE_ID = impactLetters[0].id;

function polar(cx: number, cy: number, r: number, angleDeg: number) {
	const a = ((angleDeg - 90) * Math.PI) / 180;
	return {
		x: cx + r * Math.cos(a),
		y: cy + r * Math.sin(a),
	};
}

function segmentStart(index: number) {
	return index * SEGMENT + RING_OFFSET;
}

/**
 * Full clockwise chevron: V-notch at start, arrowhead tip past the end.
 * Single path so hover dimming never seams tip from body.
 */
function chevronPath(index: number) {
	const start = segmentStart(index);
	const end = start + SEGMENT;
	const a = ARROW_DEG;

	const oStart = polar(CX, CY, OUTER_R, start);
	const oEnd = polar(CX, CY, OUTER_R, end);
	const iStart = polar(CX, CY, INNER_R, start);
	const iEnd = polar(CX, CY, INNER_R, end);
	const notch = polar(CX, CY, MID_R, start + a);
	const tip = polar(CX, CY, MID_R, end + a);

	return [
		`M ${notch.x} ${notch.y}`,
		`L ${oStart.x} ${oStart.y}`,
		`A ${OUTER_R} ${OUTER_R} 0 0 1 ${oEnd.x} ${oEnd.y}`,
		`L ${tip.x} ${tip.y}`,
		`L ${iEnd.x} ${iEnd.y}`,
		`A ${INNER_R} ${INNER_R} 0 0 0 ${iStart.x} ${iStart.y}`,
		`L ${notch.x} ${notch.y}`,
		"Z",
	].join(" ");
}

function labelLayout(index: number) {
	const start = segmentStart(index);
	// Visual center of the chevron (body + tip), not the raw segment mid -
	// notch eats the start, tip extends past the end, so shift by half the arrow.
	const midAngle = start + SEGMENT / 2 + ARROW_DEG / 2;
	return { ...polar(CX, CY, MID_R, midAngle), midAngle };
}

function ImpactLoopRing({
	activeId,
	onHover,
	onLeave,
	onSelect,
	isNarrow,
}: {
	activeId: string;
	onHover: (id: string) => void;
	onLeave: () => void;
	onSelect: (id: string) => void;
	isNarrow: boolean;
}) {
	return (
		<div className="relative mx-auto w-full max-w-[640px] md:max-w-[760px] md:px-10 md:py-8">
			<div className="relative aspect-square w-full">
				<svg
					viewBox="0 0 400 400"
					className="h-full w-full overflow-visible"
					role="img"
					aria-label="IMPACT feedback loop: Intent, Memory, Policy, Agents, Checks, Telemetry"
				>
					<title>IMPACT feedback loop</title>

					{impactLetters.map((letter, index) => {
						const label = labelLayout(index);
						const isDimmed = activeId !== letter.id;

						return (
							<g
								key={letter.id}
								className="cursor-pointer outline-none"
								onMouseEnter={
									isNarrow ? undefined : () => onHover(letter.id)
								}
								onMouseLeave={isNarrow ? undefined : onLeave}
								onFocus={
									isNarrow ? undefined : () => onHover(letter.id)
								}
								onBlur={isNarrow ? undefined : onLeave}
								onClick={() => onSelect(letter.id)}
								tabIndex={0}
								role="button"
								aria-label={`${letter.letter} ${letter.name}: ${letter.definition}`}
								aria-pressed={activeId === letter.id}
							>
								<title>{letter.definition}</title>
								<path
									d={chevronPath(index)}
									fill={letter.color}
									stroke="none"
								/>
								{isDimmed ? (
									<path
										d={chevronPath(index)}
										fill="oklch(13.14% 0.023 264.18)"
										opacity={0.55}
										stroke="none"
										pointerEvents="none"
									/>
								) : null}
								<g className="pointer-events-none select-none">
									<text
										x={label.x}
										y={label.y}
										textAnchor="middle"
										dominantBaseline="middle"
										className="fill-white font-space text-[22px] font-bold"
										dy="-0.55em"
									>
										{letter.letter}
									</text>
									<text
										x={label.x}
										y={label.y}
										textAnchor="middle"
										dominantBaseline="middle"
										className="fill-white/95 font-space text-[11px] font-semibold tracking-wide"
										dy="1.05em"
									>
										{letter.name}
									</text>
								</g>
							</g>
						);
					})}
				</svg>

				<div className="pointer-events-none absolute inset-0 flex items-center justify-center">
					<p className="max-w-30 text-center font-space text-xl font-medium leading-snug text-stellar-white/90 lg:max-w-48 lg:text-3xl">
						The agentic SDLC loop
					</p>
				</div>
			</div>
		</div>
	);
}

function StagePills({
	activeId,
	onSelect,
}: {
	activeId: string;
	onSelect: (id: string) => void;
}) {
	return (
		<div
			className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-2"
			role="tablist"
			aria-label="IMPACT stages"
		>
			{impactLetters.map((letter) => {
				const selected = activeId === letter.id;
				return (
					<button
						key={letter.id}
						type="button"
						role="tab"
						aria-selected={selected}
						onClick={() => onSelect(letter.id)}
						className={cn(
							"inline-flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-1.5 font-space text-sm font-semibold transition-stellar",
							selected
								? "border-primary/50 bg-primary/15 text-white shadow-cosmic"
								: "border-primary/20 bg-deep-space/40 text-stellar-white/75 hover:border-primary/35 hover:text-white",
						)}
					>
						<span
							className="inline-flex h-5 w-5 items-center justify-center rounded-sm text-xs font-bold text-white"
							style={{ backgroundColor: letter.color }}
							aria-hidden
						>
							{letter.letter}
						</span>
						{letter.name}
					</button>
				);
			})}
		</div>
	);
}

function StageDetailPanel({
	stage,
	active,
}: {
	stage: ImpactLetter;
	active: boolean;
}) {
	return (
		<article
			className={cn(
				"mx-auto max-w-3xl rounded-xl border border-primary/25 bg-gradient-card p-6 backdrop-blur-sm md:p-8",
				active ? "mt-8" : "sr-only",
			)}
			aria-hidden={!active}
			{...(active ? { "aria-live": "polite" as const } : {})}
		>
			<div className="mb-4 flex items-start gap-3">
				<span
					className="inline-flex shrink-0 h-10 w-10 items-center justify-center rounded-lg font-space text-lg font-bold text-white"
					style={{ backgroundColor: stage.color }}
					aria-hidden
				>
					{stage.letter}
				</span>
				<div>
					<h3 className="font-space text-2xl font-bold text-white">
						{stage.name}
					</h3>
					<p className="text-sm text-stellar-white/80 md:text-base">
						{stage.definition}
					</p>
				</div>
			</div>

			<p className="mb-5 leading-relaxed text-stellar-white/85">
				{stage.detail}
			</p>

			<ul className="space-y-2.5">
				{stage.bullets.map((bullet) => (
					<li
						key={bullet}
						className="flex gap-3 text-sm leading-relaxed text-stellar-white/85 md:text-base"
					>
						<span
							className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
							style={{ backgroundColor: stage.color }}
							aria-hidden
						/>
						<span>{bullet}</span>
					</li>
				))}
			</ul>
		</article>
	);
}

const ImpactLoopSection = () => {
	const [lockedId, setLockedId] = useState(DEFAULT_STAGE_ID);
	const [hoveredId, setHoveredId] = useState<string | null>(null);
	const [isNarrow, setIsNarrow] = useState(false);

	useEffect(() => {
		const mq = window.matchMedia("(max-width: 767px)");
		const sync = () => setIsNarrow(mq.matches);
		sync();
		mq.addEventListener("change", sync);
		return () => mq.removeEventListener("change", sync);
	}, []);

	const activeId = hoveredId ?? lockedId;

	return (
		<section id="impact-loop" className="relative py-24 md:pb-28">
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 overflow-hidden bg-gradient-nebula opacity-60"
			/>

			<div className="container relative z-10 mx-auto px-6">
				<div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
					<h2 className="mb-4 font-space text-3xl font-bold md:text-4xl">
						<span className="text-primary glow-stellar">IMPACT</span>
						<span className="text-white"> feedback loop</span>
					</h2>
					<p className="text-lg text-stellar-white/85">
						Where context, standards, and agents reinforce each other
					</p>
				</div>

				<ImpactLoopRing
					activeId={activeId}
					isNarrow={isNarrow}
					onHover={setHoveredId}
					onLeave={() => setHoveredId(null)}
					onSelect={setLockedId}
				/>

				<StagePills activeId={activeId} onSelect={setLockedId} />

				{/* All stages stay in the DOM (sr-only when inactive) for GEO crawlability */}
				{impactLetters.map((stage) => (
					<StageDetailPanel
						key={stage.id}
						stage={stage}
						active={stage.id === activeId}
					/>
				))}
			</div>
		</section>
	);
};

export default ImpactLoopSection;
