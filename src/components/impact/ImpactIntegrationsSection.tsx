import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import {
	impactFlowNodes,
	impactUseCases,
	type ImpactFlowNodeId,
	type ImpactUseCase,
	type ImpactUseCaseId,
} from "@/lib/impact-service";
import { cn } from "@/lib/utils";

const DEFAULT_USE_CASE: ImpactUseCaseId = "dev-pulls-ticket";

const VIEW_W = 720;
const VIEW_H = 640;
const CX = VIEW_W / 2;
const CY = VIEW_H / 2;
const RING_R = 210;
const NODE_W = 148;
const NODE_H = 80;

type EdgeKey = `${ImpactFlowNodeId}->${ImpactFlowNodeId}`;
type UndirectedKey = string;

function edgeKey(from: ImpactFlowNodeId, to: ImpactFlowNodeId): EdgeKey {
	return `${from}->${to}`;
}

function undirectedKey(a: ImpactFlowNodeId, b: ImpactFlowNodeId): UndirectedKey {
	return [a, b].sort().join("--");
}

/** Hex network - boxes around a ring, not a left-to-right sequence */
function nodeCenter(id: ImpactFlowNodeId) {
	const index = impactFlowNodes.findIndex((n) => n.id === id);
	const angleDeg = -90 + index * (360 / impactFlowNodes.length);
	const rad = (angleDeg * Math.PI) / 180;
	return {
		cx: CX + RING_R * Math.cos(rad),
		cy: CY + RING_R * Math.sin(rad),
		angleDeg,
	};
}

function nodeBox(id: ImpactFlowNodeId) {
	const { cx, cy } = nodeCenter(id);
	return {
		cx,
		cy,
		x: cx - NODE_W / 2,
		y: cy - NODE_H / 2,
	};
}

/** Clip a center→center line to the rectangle border of each box */
function edgeLine(from: ImpactFlowNodeId, to: ImpactFlowNodeId) {
	const a = nodeCenter(from);
	const b = nodeCenter(to);
	const dx = b.cx - a.cx;
	const dy = b.cy - a.cy;
	const len = Math.hypot(dx, dy) || 1;
	const ux = dx / len;
	const uy = dy / len;

	const insetFrom = rectInset(ux, uy);
	const insetTo = rectInset(-ux, -uy);

	return {
		x1: a.cx + ux * insetFrom,
		y1: a.cy + uy * insetFrom,
		x2: b.cx - ux * insetTo,
		y2: b.cy - uy * insetTo,
	};
}

function rectInset(ux: number, uy: number) {
	const hw = NODE_W / 2;
	const hh = NODE_H / 2;
	const tx = Math.abs(ux) < 1e-6 ? Number.POSITIVE_INFINITY : hw / Math.abs(ux);
	const ty = Math.abs(uy) < 1e-6 ? Number.POSITIVE_INFINITY : hh / Math.abs(uy);
	return Math.min(tx, ty);
}

/**
 * Full system graph - every box can connect to related boxes.
 * Drawn muted; use-case selection lights a subgraph.
 */
const NETWORK_LINKS: [ImpactFlowNodeId, ImpactFlowNodeId][] = [
	["intent", "memory"],
	["memory", "policy"],
	["policy", "agents"],
	["agents", "checks"],
	["checks", "telemetry"],
	["telemetry", "intent"],
	["intent", "agents"],
	["intent", "policy"],
	["memory", "agents"],
	["memory", "checks"],
	["memory", "telemetry"],
	["policy", "checks"],
	["policy", "telemetry"],
	["agents", "telemetry"],
	["checks", "intent"],
];

function NetworkDiagram({ useCase }: { useCase: ImpactUseCase }) {
	const uid = useId().replace(/:/g, "");
	const markerActive = `impact-net-active-${uid}`;
	const scrollRef = useRef<HTMLDivElement>(null);
	const emphasis = new Set(useCase.emphasis);
	const activeUndirected = new Set(
		useCase.edges.map(([from, to]) => undirectedKey(from, to)),
	);

	useEffect(() => {
		const el = scrollRef.current;
		if (!el) return;
		el.scrollLeft = Math.max(0, (el.scrollWidth - el.clientWidth) / 2);
	}, []);

	return (
		<div
			ref={scrollRef}
			className="-mx-6 overflow-x-auto overscroll-x-contain px-6 [scrollbar-width:thin] md:mx-0 md:overflow-visible md:px-0"
		>
			<div className="mx-auto w-full min-w-[42rem] max-w-3xl md:min-w-0">
				<svg
					viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
					className="mx-auto h-auto w-full"
					role="img"
					aria-label={`IMPACT network for: ${useCase.label}. ${useCase.path}`}
				>
				<title>
					IMPACT connection network - {useCase.label}: {useCase.path}
				</title>

				<defs>
					<marker
						id={markerActive}
						markerWidth="6"
						markerHeight="6"
						refX="5"
						refY="3"
						orient="auto"
						markerUnits="strokeWidth"
					>
						<path d="M0 0.5 L5.5 3 L0 5.5 Z" fill="oklch(98% 0.01 264)" />
					</marker>
				</defs>

				<text
					x={CX}
					y={CY - 6}
					textAnchor="middle"
					className="fill-white/25 font-space text-[17px] font-semibold"
				>
					IMPACT
				</text>
				<text
					x={CX}
					y={CY + 14}
					textAnchor="middle"
					className="fill-white/20 font-space text-[12px]"
				>
					system graph
				</text>

				{NETWORK_LINKS.map(([a, b]) => {
					const key = undirectedKey(a, b);
					const { x1, y1, x2, y2 } = edgeLine(a, b);
					const onPath = activeUndirected.has(key);

					return (
						<line
							key={`net-${key}`}
							x1={x1}
							y1={y1}
							x2={x2}
							y2={y2}
							stroke={
								onPath
									? "oklch(91.18% 0.013 264.53 / 0.12)"
									: "oklch(91.18% 0.013 264.53 / 0.2)"
							}
							strokeWidth={onPath ? 1 : 1.35}
						/>
					);
				})}

				{useCase.edges.map(([from, to]) => {
					const key = edgeKey(from, to);
					const { x1, y1, x2, y2 } = edgeLine(from, to);
					return (
						<line
							key={`active-${key}`}
							x1={x1}
							y1={y1}
							x2={x2}
							y2={y2}
							stroke="oklch(98% 0.01 264)"
							strokeWidth={2}
							strokeDasharray="12 10"
							strokeLinecap="round"
							markerEnd={`url(#${markerActive})`}
							className="motion-safe:animate-impact-flow-dash"
						/>
					);
				})}

				{impactFlowNodes.map((node) => {
					const { x, y, cx } = nodeBox(node.id);
					const active = emphasis.has(node.id);
					const isEntry = useCase.entry === node.id;
					const fill = isEntry
						? node.color
						: active
							? "oklch(20% 0.035 264 / 0.92)"
							: "oklch(16% 0.02 264 / 0.55)";

					return (
						<g key={node.id}>
							{isEntry ? (
								<text
									x={cx}
									y={y - 16}
									textAnchor="middle"
									className="font-space text-[11px] font-semibold tracking-wider uppercase"
									fill={node.color}
								>
									Starts here
								</text>
							) : null}

							{/* Soft outer halo for entry - pulses with stage color */}
							{isEntry ? (
								<rect
									x={x - 5}
									y={y - 5}
									width={NODE_W + 10}
									height={NODE_H + 10}
									rx={14}
									ry={14}
									fill={node.color}
									stroke={node.color}
									strokeWidth={2}
									className="motion-safe:animate-impact-entry-blink"
									style={
										{
											"--entry-color": node.color,
										} as CSSProperties
									}
								/>
							) : null}

							<rect
								x={x}
								y={y}
								width={NODE_W}
								height={NODE_H}
								rx={12}
								ry={12}
								fill={isEntry ? "oklch(14% 0.025 264 / 0.92)" : fill}
								stroke={
									isEntry || active
										? node.color
										: "oklch(91.18% 0.013 264.53 / 0.18)"
								}
								strokeWidth={isEntry ? 2 : active ? 1.75 : 1}
								opacity={active || isEntry ? 1 : 0.42}
								className="transition-[opacity,stroke,fill] duration-500 ease-out"
							/>

							{/* Top tint bar instead of side stripe */}
							<rect
								x={x + 14}
								y={y + 10}
								width={30}
								height={3}
								rx={1.5}
								fill={node.color}
								opacity={active || isEntry ? 0.95 : 0.25}
							/>

							<text
								x={cx}
								y={y + 38}
								textAnchor="middle"
								className="fill-white font-space text-[15px] font-bold"
								opacity={active || isEntry ? 1 : 0.4}
							>
								{node.name}
							</text>
							<text
								x={cx}
								y={y + 58}
								textAnchor="middle"
								className="fill-[oklch(91.18%_0.013_264.53)] font-space text-[11px]"
								opacity={active || isEntry ? 0.78 : 0.28}
							>
								{node.tools}
							</text>
						</g>
					);
				})}
				</svg>
			</div>
		</div>
	);
}

function UseCaseCaption({
	useCase,
	active,
}: {
	useCase: ImpactUseCase;
	active: boolean;
}) {
	return (
		<div
			className={cn(
				"mx-auto max-w-2xl text-center",
				active ? "mt-6 mb-6 md:mb-8" : "sr-only",
			)}
			aria-hidden={!active}
		>
			<p className="mb-1 font-space text-xs font-semibold tracking-[0.18em] text-neon-teal uppercase">
				{useCase.actor}
			</p>
			<p className="text-base leading-relaxed text-stellar-white/85 md:text-lg">
				{useCase.caption}
			</p>
		</div>
	);
}

const ImpactIntegrationsSection = () => {
	const [useCaseId, setUseCaseId] = useState<ImpactUseCaseId>(DEFAULT_USE_CASE);
	const useCase =
		impactUseCases.find((item) => item.id === useCaseId) ?? impactUseCases[0];

	return (
		<section id="impact-wiring" className="relative bg-gradient-galaxy py-24">
			<div className="container relative z-10 mx-auto px-6">
				<div className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
					<h2 className="mb-4 font-space text-3xl font-bold md:text-4xl">
						<span className="text-white">How IMPACT </span>
						<span className="text-primary glow-stellar">connects</span>
					</h2>
					<p className="text-lg text-stellar-white/85">
						Choose a use case to see how IMPACT connects.
					</p>
				</div>

				<div
					className="mx-auto mb-2 flex max-w-4xl flex-wrap items-center justify-center gap-2"
					role="tablist"
					aria-label="IMPACT use cases"
				>
					{impactUseCases.map((item) => {
						const selected = useCaseId === item.id;
						return (
							<button
								key={item.id}
								type="button"
								role="tab"
								aria-selected={selected}
								onClick={() => setUseCaseId(item.id)}
								className={cn(
									"rounded-lg cursor-pointer border px-3 py-2 text-left transition-stellar sm:px-3.5",
									selected
										? "border-primary/50 bg-primary/15 text-white shadow-cosmic"
										: "border-primary/20 bg-deep-space/40 text-stellar-white/75 hover:border-primary/35 hover:text-white",
								)}
							>
								<span className="block font-space text-[0.65rem] font-medium tracking-wide text-neon-teal/90 uppercase">
									{item.actor}
								</span>
								<span className="font-space text-sm font-semibold leading-snug">
									{item.label}
								</span>
							</button>
						);
					})}
				</div>

				{impactUseCases.map((item) => (
					<UseCaseCaption
						key={item.id}
						useCase={item}
						active={item.id === useCaseId}
					/>
				))}

				<NetworkDiagram useCase={useCase} />
			</div>
		</section>
	);
};

export default ImpactIntegrationsSection;
