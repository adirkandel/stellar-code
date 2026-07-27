import {
	type CSSProperties,
	type ReactNode,
	useEffect,
	useId,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import {
	impactLaunchDeliverables,
	impactLaunchSteps,
} from "@/lib/impact-service";

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
			data-launch-step
			data-enter-index={enterIndex}
			className="relative min-w-0 flex-1 overflow-hidden rounded-2xl bg-[linear-gradient(to_right,transparent,oklch(68.63%_0.129_191.84_/_0.55),transparent),radial-gradient(ellipse_at_top_left,oklch(68.63%_0.129_191.84_/_0.16),transparent_55%),radial-gradient(ellipse_at_bottom_right,oklch(0.55_0.2_300_/_0.14),transparent_50%)] bg-[length:100%_1px,auto,auto] bg-[position:top,0_0,0_0] bg-no-repeat px-6 py-5 opacity-0 [backface-visibility:hidden]"
			style={{ transform: enterTransform }}
		>
			<span
				className="absolute -right-1 -top-4 font-space text-7xl font-bold leading-none text-primary/[0.14] select-none"
				aria-hidden="true"
			>
				{number}
			</span>

			<div className="relative z-[1]">
				<p className="mb-1 font-space text-xs font-semibold tracking-[0.16em] text-neon-teal uppercase">
					{step.week}
				</p>
				<h3 className="mb-1.5 font-space text-xl font-bold text-white">
					{step.title}
				</h3>
				<p className="text-sm leading-relaxed text-stellar-white/85">
					{step.description}
				</p>
			</div>
		</article>
	);
}

const ARROW_COLOR = "oklch(60.59% 0.213 292.72)";
/** Soft light highlight - gentle contrast on the purple shaft */
const ARROW_PULSE_COLOR = "oklab(0.61 0.08 -0.2)";

function usePrefersReducedMotion() {
	const [reduced, setReduced] = useState(() => prefersReducedMotion());

	useEffect(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		const sync = () => setReduced(mq.matches);
		sync();
		mq.addEventListener("change", sync);
		return () => mq.removeEventListener("change", sync);
	}, []);

	return reduced;
}

/**
 * Stable arrow fill + separate soft pulse overlay that walks base → tip.
 */
function useConnectorPaint(x1: number, y1: number, x2: number, y2: number) {
	const uid = useId().replace(/:/g, "");
	const baseGradId = `launch-grad-base-${uid}`;
	const pulseGradId = `launch-grad-pulse-${uid}`;
	const reducedMotion = usePrefersReducedMotion();

	const dx = x2 - x1;
	const dy = y2 - y1;
	const len = Math.hypot(dx, dy) || 1;
	const ux = dx / len;
	const uy = dy / len;
	// Start before the base; end past the tip so the band clears the head
	const overshoot = len * 1.05;
	const startX = -ux * overshoot;
	const startY = -uy * overshoot;
	const endX = ux * overshoot;
	const endY = uy * overshoot;

	const defs = (
		<defs>
			{/* Original soft purple shaft - does not animate */}
			<linearGradient
				id={baseGradId}
				gradientUnits="userSpaceOnUse"
				x1={x1}
				y1={y1}
				x2={x2}
				y2={y2}
			>
				<stop offset="0%" stopColor={ARROW_COLOR} stopOpacity="0" />
				<stop offset="100%" stopColor={ARROW_COLOR} stopOpacity="0.5" />
			</linearGradient>

			{/* Mostly transparent; soft light band walks along the arrow */}
			<linearGradient
				id={pulseGradId}
				gradientUnits="userSpaceOnUse"
				x1={x1}
				y1={y1}
				x2={x2}
				y2={y2}
			>
				<stop offset="0%" stopColor={ARROW_PULSE_COLOR} stopOpacity="0" />
				<stop offset="50%" stopColor={ARROW_PULSE_COLOR} stopOpacity="0.2" />
				<stop offset="100%" stopColor={ARROW_PULSE_COLOR} stopOpacity="0" />
				{reducedMotion ? null : (
					<animateTransform
						attributeName="gradientTransform"
						type="translate"
						from={`${startX} ${startY}`}
						to={`${endX} ${endY}`}
						dur="2.5s"
						repeatCount="indefinite"
						calcMode="linear"
					/>
				)}
			</linearGradient>
		</defs>
	);

	return {
		defs,
		baseFill: `url(#${baseGradId})`,
		pulseFill: `url(#${pulseGradId})`,
	};
}

/** Shared ribbon geometry for horizontal step connectors */
const ARROW_SHAFT_HALF = 5;
const ARROW_HEAD_HALF = 12;
const ARROW_TIP_EXTEND = 26;

/** Original ribbon + tip style between steps in a row. */
function HorizontalConnector({
	direction,
	enterIndex,
}: {
	direction: "right" | "left";
	enterIndex: number;
}) {
	const toRight = direction === "right";
	const cy = 20;
	const { defs, baseFill, pulseFill } = useConnectorPaint(
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
				<path d={d} fill={baseFill} />
				<path d={d} fill={pulseFill} />
			</svg>
		</div>
	);
}

/**
 * Ribbon vertical arrow - same geometry as HorizontalConnector, rotated.
 * viewBox 40×80 mirrors the horizontal 80×40; display size matches w/h swap.
 */
function VerticalConnector({
	enterIndex,
	className,
	style,
}: {
	enterIndex: number;
	className?: string;
	style?: CSSProperties;
}) {
	const cx = 20;
	const { defs, baseFill, pulseFill } = useConnectorPaint(cx, 4, cx, 76);
	const x0 = cx - ARROW_SHAFT_HALF;
	const x1 = cx + ARROW_SHAFT_HALF;
	const hx0 = cx - ARROW_HEAD_HALF;
	const hx1 = cx + ARROW_HEAD_HALF;
	const shaftEnd = 50;
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
			className={
				className ??
				"flex h-16 shrink-0 justify-center opacity-0 sm:h-20 md:h-24 [backface-visibility:hidden]"
			}
			style={style ?? { transform: "translate3d(0, 0.5rem, 0)" }}
			aria-hidden="true"
		>
			<svg
				viewBox="0 0 40 80"
				className="h-full w-10 overflow-visible"
				aria-hidden="true"
			>
				{defs}
				<path d={d} fill={baseFill} />
				<path d={d} fill={pulseFill} />
			</svg>
		</div>
	);
}

type WrapArrowLayout = {
	rowIndex: number;
	enterIndex: number;
	style: CSSProperties;
};

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
	const wrapEnterRef = useRef<number[]>([]);
	const [wrapArrows, setWrapArrows] = useState<WrapArrowLayout[]>([]);

	useLayoutEffect(() => {
		const map = mapRef.current;
		if (!map) return;

		const measure = () => {
			const mapRect = map.getBoundingClientRect();
			const next: WrapArrowLayout[] = [];

			for (let r = 0; r < rows.length - 1; r++) {
				const topRow = rowRefs.current[r];
				const bottomRow = rowRefs.current[r + 1];
				if (!topRow || !bottomRow) continue;

				// Last step in DOM = wrap point (LTR → rightmost, RTL reverse → leftmost)
				const steps = topRow.querySelectorAll<HTMLElement>("[data-launch-step]");
				const wrapStep = steps[steps.length - 1];
				if (!wrapStep) continue;

				const stepRect = wrapStep.getBoundingClientRect();
				const topRect = topRow.getBoundingClientRect();
				const bottomRect = bottomRow.getBoundingClientRect();
				const centerX = stepRect.left - mapRect.left + stepRect.width / 2;
				const gapTop = topRect.bottom - mapRect.top;
				const gapBottom = bottomRect.top - mapRect.top;
				const gapHeight = Math.max(gapBottom - gapTop, 64);
				// Match horizontal connector footprint (w-10 × h-16/20/24); avoid
				// translateX so enter-animation transform doesn't un-center it.
				const arrowW = 40;
				const arrowH = Math.min(80, gapHeight);

				next.push({
					rowIndex: r,
					enterIndex: wrapEnterRef.current[r] ?? 0,
					style: {
						position: "absolute",
						left: centerX,
						top: gapTop + (gapHeight - arrowH) / 2,
						width: arrowW,
						height: arrowH,
					},
				});
			}

			setWrapArrows(next);
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
	}, [rows.length, columns]);

	const wrapEnterIndices: number[] = [];
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
			wrapEnterIndices[rowIndex] = enterIndex++;
		}

		rowNodes.push(
			<div
				key={rowKey}
				ref={(el) => {
					rowRefs.current[rowIndex] = el;
				}}
				className={rowIndex > 0 ? "mt-16 md:mt-24" : undefined}
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

	wrapEnterRef.current = wrapEnterIndices;

	return (
		<div
			ref={mapRef}
			className={`relative ${className ?? ""}`}
			data-launch-snake
		>
			{rowNodes}
			{wrapArrows.map((arrow) => (
				<VerticalConnector
					key={`wrap-${arrow.rowIndex}`}
					enterIndex={arrow.enterIndex}
					className="pointer-events-none z-10 flex items-center justify-center opacity-0 [backface-visibility:hidden]"
					style={{
						...arrow.style,
						transform: "translate3d(0, 0.5rem, 0)",
					}}
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
							<div className="flex justify-center py-1">
								<VerticalConnector enterIndex={arrowEnter} />
							</div>
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
				<div className="mx-auto mb-14 max-w-3xl text-center lg:mb-20">
					<h2 className="mb-4 font-space text-3xl font-bold md:text-4xl">
						<span className="text-white">Pilot </span>
						<span className="text-primary glow-stellar">Launch</span>
					</h2>
					<p className="text-lg text-stellar-white/85">
					In 4 to 6 weeks, we embed with your team and wire IMPACT where you already work.
					</p>
				</div>

				<MobileStack />

				<SnakeMap
					columns={2}
					className="mx-auto hidden max-w-3xl md:block lg:hidden"
				/>

				<SnakeMap columns={3} className="mx-auto hidden lg:max-w-6xl lg:block" />

				<div className="mx-auto mt-16 max-w-3xl lg:mt-20">
					<h3 className="mb-3 text-center font-space text-xl font-bold text-white md:text-2xl">
						What you own at hand-off
					</h3>
					<p className="mb-6 text-center text-sm text-stellar-white/75 md:text-base">
						Concrete artifacts on your systems - not a slide deck.
					</p>
					<ul className="space-y-3 rounded-2xl border border-primary/20 bg-deep-space/40 p-6 backdrop-blur-sm md:p-8">
						{impactLaunchDeliverables.map((item) => (
							<li
								key={item}
								className="flex gap-3 text-sm leading-relaxed text-stellar-white/85 md:text-base"
							>
								<span
									className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
									aria-hidden
								/>
								<span>{item}</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
};

export default ImpactLaunchSection;
