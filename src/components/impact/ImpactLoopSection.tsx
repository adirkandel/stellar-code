import { useState } from "react";
import { impactLetters } from "@/lib/impact-service";

const CX = 200;
const CY = 200;
const OUTER_R = 168;
const INNER_R = 98;
const MID_R = (OUTER_R + INNER_R) / 2;
const ARROW_DEG = 12;
const SEGMENT = 360 / impactLetters.length;
/** Rotate ring so Intent is centered at the top */
const RING_OFFSET = -SEGMENT / 2;

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
	// Visual center of the chevron (body + tip), not the raw segment mid —
	// notch eats the start, tip extends past the end, so shift by half the arrow.
	const midAngle = start + SEGMENT / 2 + ARROW_DEG / 2;
	return polar(CX, CY, MID_R, midAngle);
}

function ImpactLoopRing() {
	const [hoveredId, setHoveredId] = useState<string | null>(null);
	const hovered = impactLetters.find((letter) => letter.id === hoveredId);

	return (
		<div className="relative mx-auto w-full max-w-[640px]">
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
						const isDimmed =
							hoveredId !== null && hoveredId !== letter.id;

						return (
							<g
								key={letter.id}
								className="cursor-pointer outline-none"
								onMouseEnter={() => setHoveredId(letter.id)}
								onMouseLeave={() => setHoveredId(null)}
								onFocus={() => setHoveredId(letter.id)}
								onBlur={() => setHoveredId(null)}
								tabIndex={0}
								role="button"
								aria-label={`${letter.letter} ${letter.name}: ${letter.shortBlurb}`}
							>
								<title>{letter.shortBlurb}</title>
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

			<div
				role="tooltip"
				aria-live="polite"
				className="mt-5 flex min-h-[3rem] items-center justify-center px-4 text-center"
			>
				{hovered ? (
					<p className="max-w-md rounded-md border border-primary/40 bg-deep-space/95 px-4 py-2 text-sm text-stellar-white shadow-cosmic animate-in fade-in-0">
						{hovered.shortBlurb}
					</p>
				) : null}
			</div>
		</div>
	);
}

const ImpactLoopSection = () => {
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

				<ImpactLoopRing />
			</div>
		</section>
	);
};

export default ImpactLoopSection;
