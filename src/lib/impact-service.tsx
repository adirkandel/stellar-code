export const IMPACT_ROLES = [
	"VP Engineering",
	"Head of Platform",
	"Eng Manager",
	"CTO",
	"Other",
] as const;

export type ImpactRole = (typeof IMPACT_ROLES)[number];

export type ImpactLetter = {
	id: string;
	letter: string;
	name: string;
	shortBlurb: string;
	color: string;
};

export const impactLetters: ImpactLetter[] = [
	{
		id: "impact-i",
		letter: "I",
		name: "Intent",
		shortBlurb: "Standardized product intent and decisions",
		color: "oklch(68.63% 0.129 191.84)",
	},
	{
		id: "impact-m",
		letter: "M",
		name: "Memory",
		shortBlurb: "Shared knowledge agents can retrieve",
		color: "oklch(64% 0.14 230)",
	},
	{
		id: "impact-p",
		letter: "P",
		name: "Policy",
		shortBlurb: "Rules for what agents may do",
		color: "oklch(60.59% 0.213 292.72)",
	},
	{
		id: "impact-a",
		letter: "A",
		name: "Agents",
		shortBlurb: "Scoped agents that run the work",
		color: "oklch(58% 0.17 270)",
	},
	{
		id: "impact-c",
		letter: "C",
		name: "Checks",
		shortBlurb: "Tests and gates before work moves on",
		color: "oklch(64% 0.16 28)",
	},
	{
		id: "impact-t",
		letter: "T",
		name: "Telemetry",
		shortBlurb: "Measures flow and quality",
		color: "oklch(70% 0.14 155)",
	},
];

export const impactPains = [
	{
		title: "Authoring speed ≠ delivery",
		description:
			"Agents draft faster than the pipeline can absorb. Review becomes the bottleneck, rework creeps up, and shared truth still lives in chats and heads. Throughput looks busy while delivery velocity stalls.",
	},
	{
		title: "No standards, uneven outcomes",
		description:
			"Everyone picks their own tools, prompts, rules, hooks, and habits. Techniques stay tribal, the verification loop has no shared Policy, and quality becomes a person problem instead of a system property.",
	},
	{
		title: "Serial bottlenecks where parallel should win",
		description:
			"Agents can run work in parallel, but teams still jump between tabs and lose context on every handoff. Without one Memory and Policy contract, more agents just multiply the AI tax.",
	},
] as const;

export const impactAbout = {
	title: "Hi, I'm Adir.",
	body: <>I've managed engineering teams through hiring, shipping, and the pressure to move faster without breaking what already works.
	When AI coding tools arrived, I watched the same failure mode repeat: agents wrote code faster, but delivery didn't improve.
	Reviews piled up, context reset every session, and seniors became full-time verifiers of work they didn't author. 
	<span className="text-primary glow-stellar font-bold"> IMPACT</span> came from that gap - a methodology and installed operating system so agentic
	work starts from shared Intent, compounds Memory, enforces Policy, and keeps quality attached to speed.</>,
} as const;

export const impactLaunchSteps = [
	{
		id: "audit",
		title: "Audit",
		description: "We map your stack, tools, agent habits before baseline.",
	},
	{
		id: "kickoff",
		title: "Kickoff",
		description:
			"Showcase audit findings and agree on integration plan and prerequisites.",
	},
	{
		id: "scaffold",
		title: "Scaffold",
		description: "Integrate knowledge vault, policies, and checks.",
	},
	{
		id: "first-run",
		title: "First end-to-end run",
		description: "Run a product requirement through a real agent workflow.",
	},
	{
		id: "hardening",
		title: "System hardening",
		description: "Knowledge trimming, CI gates, and telemetry baseline.",
	},
	{
		id: "hand-off",
		title: "Hand off",
		description: "Hand off with evidence and decide on next steps.",
	},
] as const;

export const impactSuccessLook = {
	subhead:
		"IMPACT is working when the team ships with less friction - and quality still feels under control.",
	series: [
		{
			id: "velocity",
			label: "Velocity",
			color: "oklch(68.63% 0.129 191.84)",
		},
		{
			id: "quality",
			label: "Quality",
			color: "oklch(60.59% 0.213 292.72)",
		},
	],
} as const;

export const impactIntegrations = [
	{
		layer: "Tickets",
		role: "Intent lands where work starts",
		examples: "Jira, Linear, and peers",
	},
	{
		layer: "Coding agents",
		role: "Bounded agents execute against that intent",
		examples: "Cursor, Claude Code, Codex",
	},
	{
		layer: "Memory",
		role: "Shared knowledge compounds across runs",
		examples: "Git markdown vault + retrieval",
	},
] as const;

export const impactServiceMeta = {
	title: "IMPACT Method | Agentic SDLC OS",
	description:
		"IMPACT is Stellar Code's methodology and installed operating system for predictable agentic engineering: Intent, Memory, Policy, Agents, Checks, and Telemetry.",
	path: "/services/agentic-sdlc-impact-method",
} as const;
