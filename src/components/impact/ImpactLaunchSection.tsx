import {
	type CSSProperties,
	type ReactNode,
	useEffect,
	useId,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import { impactLaunchSteps } from "@/lib/impact-service";

type LaunchStep = (typeof impactLaunchSteps)[number];

const ENTER_MS = 640;
const ENTER_FADE_MS = 420;
const ENTER_STAGGER_MS = 260;
const ENTER_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const ENTER_REST = "translate3d(0, 0, 0)";

function StepNode({
	step,
	index,
	enterIndex,
	slide = "ltr",
}: {
	step: LaunchStep;
	index: number;
	enterIndex: number;
	slide?: "ltr" | "rtl" | "down";
}) {
	const number = String(index + 1).padStart(2, "0");
	const enterTransform =
		slide === "down"
			? "translate3d(0, -1.15rem, 0)"
			: slide === "rtl"
				? "translate3d(1.25rem, 0, 0)"
				: "translate3d(-1.25rem, 0, 0)";

	return (
		<article
			data-launch-enter
			data-enter-index={enterIndex}
			className="relative min-w-0 flex-1 overflow-hidden rounded-2xl bg-[linear-gradient(to_right,transparent,oklch(68.63%_0.129_191.84_/_0.55),transparent),radial-gradient(ellipse_at_top_left,oklch(68.63%_0.129_191.84_/_0.16),transparent_55%),radial-gradient(ellipse_at_bottom_right,oklch(0.55_0.2_300_/_0.14),transparent_50%)] bg-[length:100%_1px,auto,auto] bg-[position:top,0_0,0_0] bg-no-repeat px-7 py-6 opacity-0 [backface-visibility:hidden]"
			style={{ transform: enterTransform }}
		>
			<span
				className="absolute -right-1 -top-4 font-space text-7xl font-bold leading-none text-primary/[0.14] select-none"
				aria-hidden="true"
			>
				{number}
			</span>

			<div>
				<h3 className="mb-2 font-space text-xl font-bold text-white">
					{step.title}
				</h3>
				<p className="text-sm leading-relaxed text-stellar-white/85">
					{step.description}
				</p>
			</div>
		</article>
	);
}

function useConnectorPaint(
	x1: number,
	y1: number,
	x2: number,
	y2: number,
	options?: { entryFadeOnly?: boolean },
) {
	const uid = useId().replace(/:/g, "");
	const gradId = `launch-grad-${uid}`;
	const entryFadeOnly = options?.entryFadeOnly ?? false;

	const defs = (
		<defs>
			<linearGradient
				id={gradId}
				gradientUnits="userSpaceOnUse"
				x1={x1}
				y1={y1}
				x2={x2}
				y2={y2}
			>
				<stop
					offset="0%"
					stopColor="oklch(60.59% 0.213 292.72)"
					stopOpacity="0"
				/>
				{entryFadeOnly ? (
					<stop
						offset="72%"
						stopColor="oklch(60.59% 0.213 292.72)"
						stopOpacity="0.5"
					/>
				) : null}
				<stop
					offset="100%"
					stopColor="oklch(60.59% 0.213 292.72)"
					stopOpacity="0.5"
				/>
			</linearGradient>
		</defs>
	);

	return { defs, fill: `url(#${gradId})` };
}

/** Shared ribbon geometry — horizontal + bracket tips stay identical */
const ARROW_SHAFT_HALF = 5;
const ARROW_HEAD_HALF = 12;
const ARROW_TIP_EXTEND = 26;

/** Thin ribbon + tip — same language as operating-cycle arrows. */
function HorizontalConnector({
	direction,
	enterIndex,
}: {
	direction: "right" | "left";
	enterIndex: number;
}) {
	const toRight = direction === "right";
	const cy = 20;
	const { defs, fill } = useConnectorPaint(
		toRight ? 4 : 76,
		cy,
		toRight ? 76 : 4,
		cy,
	);

	const y0 = cy - ARROW_SHAFT_HALF;
	const y1 = cy + ARROW_SHAFT_HALF;
	const hy0 = cy - ARROW_HEAD_HALF;
	const hy1 = cy + ARROW_HEAD_HALF;
	const shaftEnd = toRight ? 50 : 30;
	const tipX = toRight
		? shaftEnd + ARROW_TIP_EXTEND
		: shaftEnd - ARROW_TIP_EXTEND;

	const d = toRight
		? [
				`M 4 ${y0}`,
				`H ${shaftEnd}`,
				`L ${shaftEnd} ${hy0}`,
				`L ${tipX} ${cy}`,
				`L ${shaftEnd} ${hy1}`,
				`L ${shaftEnd} ${y1}`,
				"H 4",
				"Z",
			].join(" ")
		: [
				`M 76 ${y0}`,
				`H ${shaftEnd}`,
				`L ${shaftEnd} ${hy0}`,
				`L ${tipX} ${cy}`,
				`L ${shaftEnd} ${hy1}`,
				`L ${shaftEnd} ${y1}`,
				"H 76",
				"Z",
			].join(" ");

	const slideX = toRight ? "-0.75rem" : "0.75rem";

	return (
		<div
			data-launch-enter
			data-enter-index={enterIndex}
			className="flex w-16 shrink-0 items-center self-center opacity-0 sm:w-20 md:w-24 [backface-visibility:hidden]"
			style={{ transform: `translate3d(${slideX}, 0, 0)` }}
			aria-hidden="true"
		>
			<svg
				viewBox="0 0 80 40"
				className="h-10 w-full overflow-visible"
				aria-hidden="true"
			>
				{defs}
				<path d={d} fill={fill} />
			</svg>
		</div>
	);
}

function VerticalConnector({ enterIndex }: { enterIndex: number }) {
	const cx = 28;
	const { defs, fill } = useConnectorPaint(cx, 4, cx, 72);
	const x0 = cx - ARROW_SHAFT_HALF;
	const x1 = cx + ARROW_SHAFT_HALF;
	const hx0 = cx - ARROW_HEAD_HALF;
	const hx1 = cx + ARROW_HEAD_HALF;
	const shaftEnd = 46;
	const tipY = shaftEnd + ARROW_TIP_EXTEND;

	const d = [
		`M ${x0} 4`,
		`V ${shaftEnd}`,
		`L ${hx0} ${shaftEnd}`,
		`L ${cx} ${tipY}`,
		`L ${hx1} ${shaftEnd}`,
		`L ${x1} ${shaftEnd}`,
		"V 4",
		"Z",
	].join(" ");

	return (
		<div
			data-launch-enter
			data-enter-index={enterIndex}
			className="flex justify-center py-1 opacity-0 [backface-visibility:hidden]"
			style={{ transform: "translate3d(0, 0.75rem, 0)" }}
			aria-hidden="true"
		>
			<svg
				viewBox="0 0 56 76"
				className="h-14 w-12 overflow-visible"
				aria-hidden="true"
			>
				{defs}
				<path d={d} fill={fill} />
			</svg>
		</div>
	);
}

/**
 * Absolute flipped-C / `]`.
 * Tip size/alignment matches horizontal arrows.
 * Gradient fades only on the top entry stub (horizontal), then holds solid.
 */
function BracketTurn({
	side,
	enterIndex,
	style,
}: {
	side: "right" | "left";
	enterIndex: number;
	style: CSSProperties;
}) {
	const isRight = side === "right";
	// Longer entry fade along the top flange (toward the spine).
	// Tip is painted solid so the shared X band does not wash it out.
	const { defs, fill } = useConnectorPaint(
		isRight ? 4 : 116,
		25,
		isRight ? 82 : 38,
		25,
		{ entryFadeOnly: true },
	);

	const shaft = ARROW_SHAFT_HALF * 2;
	const topOuter = 20;
	const topInner = topOuter + shaft;
	const botOuter = 170;
	const botInner = botOuter - shaft;
	const botCy = (botOuter + botInner) / 2;
	const spineOuter = 90;
	const spineInner = spineOuter - shaft;
	const headBaseX = isRight ? 50 : 70;
	const tipX = isRight
		? headBaseX - ARROW_TIP_EXTEND
		: headBaseX + ARROW_TIP_EXTEND;
	const hy0 = botCy - ARROW_HEAD_HALF;
	const hy1 = botCy + ARROW_HEAD_HALF;
	const solidFill = "oklch(60.59% 0.213 292.72 / 0.5)";

	const bodyD = isRight
		? [
				`M 8 ${topOuter}`,
				"H 68",
				`Q ${spineOuter} ${topOuter} ${spineOuter} 42`,
				"V 150",
				`Q ${spineOuter} ${botOuter} 68 ${botOuter}`,
				`H ${headBaseX}`,
				`V ${botInner}`,
				"H 64",
				`Q ${spineInner} ${botInner} ${spineInner} 150`,
				"V 42",
				`Q ${spineInner} ${topInner} 68 ${topInner}`,
				"H 8",
				"Z",
			].join(" ")
		: [
				`M 112 ${topOuter}`,
				"H 52",
				`Q ${120 - spineOuter} ${topOuter} ${120 - spineOuter} 42`,
				"V 150",
				`Q ${120 - spineOuter} ${botOuter} 52 ${botOuter}`,
				`H ${headBaseX}`,
				`V ${botInner}`,
				"H 56",
				`Q ${120 - spineInner} ${botInner} ${120 - spineInner} 150`,
				"V 42",
				`Q ${120 - spineInner} ${topInner} 52 ${topInner}`,
				"H 112",
				"Z",
			].join(" ");

	const tipD = [
		`M ${headBaseX} ${hy0}`,
		`L ${tipX} ${botCy}`,
		`L ${headBaseX} ${hy1}`,
		"Z",
	].join(" ");

	return (
		<div
			data-launch-enter
			data-enter-index={enterIndex}
			className={`pointer-events-none absolute z-10 w-24 opacity-0 [backface-visibility:hidden] sm:w-28 ${
				isRight ? "-right-30" : "-left-30"
			}`}
			style={{
				...style,
				transform: "translate3d(0, 0.85rem, 0)",
			}}
			aria-hidden="true"
		>
			<svg
				viewBox="0 0 120 196"
				preserveAspectRatio={isRight ? "xMaxYMid meet" : "xMinYMid meet"}
				className="h-full w-full overflow-visible"
				aria-hidden="true"
			>
				{defs}
				<path d={bodyD} fill={fill} />
				<path d={tipD} fill={solidFill} />
			</svg>
		</div>
	);
}

function chunkSteps(size: number) {
	const rows: { step: LaunchStep; index: number }[][] = [];
	for (let i = 0; i < impactLaunchSteps.length; i += size) {
		rows.push(
			impactLaunchSteps.slice(i, i + size).map((step, offset) => ({
				step,
				index: i + offset,
			})),
		);
	}
	return rows;
}

type BracketLayout = {
	rowIndex: number;
	side: "right" | "left";
	enterIndex: number;
	style: CSSProperties;
};

function prefersReducedMotion() {
	if (typeof window === "undefined") return false;
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function showEnterables(els: HTMLElement[]) {
	for (const el of els) {
		el.style.opacity = "1";
		el.style.transform = ENTER_REST;
		el.style.transition = "none";
		el.style.willChange = "auto";
	}
}

function prepareEnterables(els: HTMLElement[], reduced: boolean) {
	if (reduced) {
		showEnterables(els);
		return;
	}
	for (const el of els) {
		el.style.opacity = "0";
		el.style.transition = "none";
		el.style.willChange = "opacity, transform";
	}
}

function settleEnterable(el: HTMLElement) {
	el.style.willChange = "auto";
	el.style.transition = "none";
	// Keep a compositor layer so Chrome doesn't re-rasterize text/gradients on settle
	el.style.transform = ENTER_REST;
}

function animateEnterables(
	els: HTMLElement[],
	sequenceOriginMs = performance.now(),
) {
	const sorted = [...els].sort(
		(a, b) =>
			Number(a.dataset.enterIndex ?? 0) - Number(b.dataset.enterIndex ?? 0),
	);

	sorted.forEach((el) => {
		const index = Number(el.dataset.enterIndex ?? 0);
		const targetAt = index * ENTER_STAGGER_MS;
		const elapsed = performance.now() - sequenceOriginMs;
		const delay = Math.max(0, targetAt - elapsed);

		window.setTimeout(() => {
			el.style.transition = [
				`opacity ${ENTER_FADE_MS}ms ${ENTER_EASE}`,
				`transform ${ENTER_MS}ms ${ENTER_EASE}`,
			].join(", ");
			el.style.opacity = "1";
			el.style.transform = ENTER_REST;

			const onEnd = (event: TransitionEvent) => {
				if (event.target !== el || event.propertyName !== "transform") return;
				el.removeEventListener("transitionend", onEnd);
				settleEnterable(el);
			};
			el.addEventListener("transitionend", onEnd);
		}, delay);
	});
}

function SnakeMap({
	columns,
	className,
}: {
	columns: 2 | 3;
	className?: string;
}) {
	const rows = chunkSteps(columns);
	const mapRef = useRef<HTMLDivElement | null>(null);
	const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
	const turnEnterRef = useRef<number[]>([]);
	const [brackets, setBrackets] = useState<BracketLayout[]>([]);

	useLayoutEffect(() => {
		const map = mapRef.current;
		if (!map) return;

		const measure = () => {
			const mapRect = map.getBoundingClientRect();
			const next: BracketLayout[] = [];

			for (let r = 0; r < rows.length - 1; r++) {
				const topRow = rowRefs.current[r];
				const bottomRow = rowRefs.current[r + 1];
				if (!topRow || !bottomRow) continue;

				const topRect = topRow.getBoundingClientRect();
				const bottomRect = bottomRow.getBoundingClientRect();
				const startY = topRect.top - mapRect.top + topRect.height * 0.32;
				const endY = bottomRect.top - mapRect.top + bottomRect.height * 0.52;

				next.push({
					rowIndex: r,
					side: r % 2 === 0 ? "right" : "left",
					enterIndex: turnEnterRef.current[r] ?? 0,
					style: {
						top: startY,
						height: Math.max(endY - startY, 120),
					},
				});
			}

			setBrackets(next);
		};

		measure();
		const ro = new ResizeObserver(measure);
		ro.observe(map);
		for (const row of rowRefs.current) {
			if (row) ro.observe(row);
		}
		window.addEventListener("resize", measure);
		return () => {
			ro.disconnect();
			window.removeEventListener("resize", measure);
		};
	}, [rows.length]);

	const turnEnterIndices: number[] = [];
	let enterIndex = 0;
	const rowNodes: ReactNode[] = [];

	for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
		const row = rows[rowIndex];
		const rtl = rowIndex % 2 === 1;
		const arrowDir = rtl ? "left" : "right";
		const rowKey = row.map((item) => item.step.id).join("-");
		const rowItems: ReactNode[] = [];

		for (const item of row) {
			const colIndex = item.index % columns;
			if (colIndex > 0) {
				rowItems.push(
					<HorizontalConnector
						key={`arrow-${item.step.id}`}
						direction={arrowDir}
						enterIndex={enterIndex++}
					/>,
				);
			}
			rowItems.push(
				<StepNode
					key={item.step.id}
					step={item.step}
					index={item.index}
					enterIndex={enterIndex++}
					slide={rtl ? "rtl" : "ltr"}
				/>,
			);
		}

		if (rowIndex < rows.length - 1) {
			turnEnterIndices[rowIndex] = enterIndex++;
		}

		rowNodes.push(
			<div
				key={rowKey}
				ref={(el) => {
					rowRefs.current[rowIndex] = el;
				}}
				className={rowIndex > 0 ? "mt-10 md:mt-12" : undefined}
			>
				<div
					className={`flex items-stretch gap-0 ${
						rtl ? "flex-row-reverse" : "flex-row"
					}`}
				>
					{rowItems}
				</div>
			</div>,
		);
	}

	turnEnterRef.current = turnEnterIndices;

	return (
		<div
			ref={mapRef}
			className={`relative ${className ?? ""}`}
			data-launch-snake
		>
			{rowNodes}
			{brackets.map((bracket) => (
				<BracketTurn
					key={`bracket-${bracket.rowIndex}`}
					side={bracket.side}
					enterIndex={bracket.enterIndex}
					style={bracket.style}
				/>
			))}
		</div>
	);
}

function MobileStack() {
	let enterIndex = 0;

	return (
		<div
			className="mx-auto flex max-w-xs md:max-w-xl flex-col gap-1 md:hidden"
			data-launch-snake
		>
			{impactLaunchSteps.map((step, index) => {
				const stepEnter = enterIndex++;
				const arrowEnter =
					index < impactLaunchSteps.length - 1 ? enterIndex++ : -1;

				return (
					<div key={step.id}>
						<StepNode
							step={step}
							index={index}
							enterIndex={stepEnter}
							slide="down"
						/>
						{arrowEnter >= 0 ? (
							<VerticalConnector enterIndex={arrowEnter} />
						) : null}
					</div>
				);
			})}
		</div>
	);
}

function visibleSnakeRoot(section: HTMLElement) {
	const snakes = section.querySelectorAll<HTMLElement>("[data-launch-snake]");
	for (const snake of snakes) {
		if (snake.offsetParent !== null) return snake;
	}
	return null;
}

const ImpactLaunchSection = () => {
	const sectionRef = useRef<HTMLElement | null>(null);
	const animatedRef = useRef(false);

	useEffect(() => {
		const section = sectionRef.current;
		if (!section) return;

		const reduced = prefersReducedMotion();
		let sequenceOriginMs = 0;

		const collectVisible = () => {
			const root = visibleSnakeRoot(section);
			if (!root) return [] as HTMLElement[];
			return Array.from(
				root.querySelectorAll<HTMLElement>("[data-launch-enter]"),
			);
		};

		const revealHiddenLayouts = () => {
			const visibleRoot = visibleSnakeRoot(section);
			for (const snake of section.querySelectorAll<HTMLElement>(
				"[data-launch-snake]",
			)) {
				if (snake === visibleRoot) continue;
				showEnterables(
					Array.from(
						snake.querySelectorAll<HTMLElement>("[data-launch-enter]"),
					),
				);
			}
		};

		const pending = () =>
			collectVisible().filter((el) => {
				const opacity = el.style.opacity;
				return opacity === "0" || opacity === "";
			});

		const run = () => {
			revealHiddenLayouts();
			const els = pending();
			if (els.length === 0) return;

			if (reduced) {
				showEnterables(collectVisible());
				animatedRef.current = true;
				return;
			}

			prepareEnterables(els, false);
			if (!animatedRef.current) {
				sequenceOriginMs = performance.now();
				animatedRef.current = true;
			}
			requestAnimationFrame(() => animateEnterables(els, sequenceOriginMs));
		};

		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry?.isIntersecting) return;
				run();
				// Absolute brackets mount after measure — pick them up in-sequence
				window.setTimeout(run, 80);
				window.setTimeout(run, 220);
				observer.disconnect();
			},
			{ threshold: 0.2 },
		);

		observer.observe(section);
		return () => observer.disconnect();
	}, []);

	return (
		// biome-ignore lint/correctness/useUniqueElementIds: stable section anchor for in-page navigation
		<section
			ref={sectionRef}
			id="impact-launch"
			className="relative bg-gradient-galaxy py-24 lg:py-32"
		>
			<div className="container relative z-10 mx-auto px-6">
				<div className="mx-auto mb-14 lg:mb-20 max-w-3xl text-center">
					<h2 className="mb-4 font-space text-3xl font-bold md:text-4xl">
						<span className="text-white">How things </span>
						<span className="text-primary glow-stellar">Done</span>
					</h2>
					<p className="text-lg text-stellar-white/85">
						We embed with your team and wire IMPACT where you already work - 4
						to 6 weeks.
					</p>
				</div>

				<MobileStack />

				<SnakeMap
					columns={2}
					className="mx-auto hidden max-w-3xl md:block lg:hidden"
				/>

				<SnakeMap columns={3} className="mx-auto hidden max-w-5xl lg:block" />
			</div>
		</section>
	);
};

export default ImpactLaunchSection;
