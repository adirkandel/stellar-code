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
	/** Canonical one-line definition - used in ring a11y, pills, panel, FAQ */
	definition: string;
	/** Methodology default - always in the DOM under the ring */
	detail: string;
	bullets: string[];
	color: string;
};

export const impactLetters: ImpactLetter[] = [
	{
		id: "impact-i",
		letter: "I",
		name: "Intent",
		definition:
			"Work is anchored to tickets - living specs PMs and agents maintain together.",
		detail:
			"A ticket is the contract between product intent and engineering execution. When a PM shapes a feature with an agent, product decisions land on the ticket - scope, constraints, open questions, acceptance signals. When an engineer picks up work, the agent loads Intent first, not a pasted prompt from yesterday's chat.",
		bullets: [
			"Versioned in your ticket system (Jira, Linear, or equivalent)",
			"Front door to every agent session",
			"Without Intent on the ticket, every run is an interpretation - and agents accelerate divergence",
		],
		color: "oklch(68.63% 0.129 191.84)",
	},
	{
		id: "impact-m",
		letter: "M",
		name: "Memory",
		definition:
			"Living shared context agents retrieve - not chat history, not someone's head.",
		detail:
			"Memory is the largest hidden cost in agentic engineering: rebuilding context every time someone spawns an agent or returns to a project. IMPACT embeds living shared context - a markdown vault in git with agent-grade retrieval. Working memory captures run distillations; the living shared context holds architecture, principles, and runbooks the whole team relies on.",
		bullets: [
			"Working memory (cold by default) vs living shared context (hot retrieval)",
			"Locality rule: context lives where the next reader will look - ticket, code, ADR, or shared context",
			"Compile ritual promotes working memory into living shared context and archives noise",
		],
		color: "oklch(64% 0.14 230)",
	},
	{
		id: "impact-p",
		letter: "P",
		name: "Policy",
		definition:
			"Organizational rules encoded as skills, hooks, and CI gates - enforced, not remembered.",
		detail:
			"Policy is what your organization already knows but rarely enforces consistently - naming, security, when to search memory before coding, when a structural change needs an ADR, which surfaces agents may use. In IMPACT, policy is encoded so it does not lapse when a senior is on vacation.",
		bullets: [
			"Project rules and skills per product or repo",
			"Hooks on coding platforms that catch decisions worth documenting",
			"ADR gate for structural or high-risk changes before merge",
			"CI gates that fail closed when policy is violated",
		],
		color: "oklch(60.59% 0.213 292.72)",
	},
	{
		id: "impact-a",
		letter: "A",
		name: "Agents",
		definition:
			"Bounded coding agents with explicit scope, tools, and spawn surfaces.",
		detail:
			"Agents have explicit scope, tools, and entry points. They do not \"figure out the org.\" Every spawn path shares the same Policy and Memory retrieval contract - an agent in Cursor and an agent elsewhere should not be two different organizations.",
		bullets: [
			"Launch surfaces: Cursor, Claude Code, Codex (adapters for others over time)",
			"Comms spawn (Slack, Discord, Teams) is Expansion-phase scope - not week one",
			"Same Policy + Memory contract on every spawn path",
		],
		color: "oklch(58% 0.17 270)",
	},
	{
		id: "impact-c",
		letter: "C",
		name: "Checks",
		definition:
			"Human review and automated evaluation calibrated to risk.",
		detail:
			"Not every change deserves the same scrutiny. A copy tweak and a billing-flow change should not travel the same review path. Checks combines risk-calibrated human review with automated evaluation so “done” is agreed without arguing in PR comments.",
		bullets: [
			"Human review rules written down - not improvised under deadline",
			"Automated evaluation: golden tasks, regression gates, wiki lint",
			"Launch ships policy + gates; eval harness maturity is the upgrade path",
		],
		color: "oklch(64% 0.16 28)",
	},
	{
		id: "impact-t",
		letter: "T",
		name: "Telemetry",
		definition:
			"Velocity and quality metrics that prove throughput improved without trading off stability.",
		detail:
			"Telemetry is how IMPACT proves it works for leadership - a balanced scorecard, not vanity adoption. Velocity must move and Quality must hold, or AI tax is winning. Over time, signals inform what Memory should surface and what Policy should enforce.",
		bullets: [
			"Velocity: clear ticket to review-ready work gets faster - not just authoring speed",
			"Quality: gates hold - fewer escapes after a pass, less rework, agents clear gates on the first try more often",
			"Role-shift evidence: fewer extra human touch points beyond the agreed approvals",
		],
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
			"Agents can run work in parallel, but teams still jump between tabs and lose context on every handoff. Without one living shared context and Policy contract, more agents just multiply the AI tax.",
	},
] as const;

export const impactAbout = {
	title: "Hi, I'm Adir",
	subtitle: "Founder & Creator of IMPACT",
	lead: "I've operated at both ends of engineering - startups and global enterprise, while shaping Israel's engineering community.",
	bullets: [
		{
			label: "Startup to enterprise",
			text: "Early engineer at Eureka Security through high growth and acquisition by Tenable - then led engineering there, shipping complex systems under security, compliance, and quality pressure.",
		},
		{
			label: "Community Leadership",
			text: 'Co-founder and co-host of "לא טכני ולא במקרה" - one of Israel\'s largest eng communities and a Geektime Podcast Contest 2025 3rd-place winner. I\'m also a frequent speaker on dev conferences and meetups.',
		},
	],
	close:
		"I built IMPACT to kill the AI tax: agents that speed up authoring while seniors drown in review and rework. You get startup speed, cyber-grade discipline, and real AI SDLC practice - wired into your team workflow.",
	links: [
		{
			label: "LinkedIn",
			href: "https://www.linkedin.com/in/adir-kandel/",
		},
		{
			label: "Community",
			href: "https://lotechni.dev",
		},
		{
			label: "YouTube",
			href: "https://www.youtube.com/results?search_query=adir+kandel",
		},
	],
} as const;

export const impactLaunchDeliverables = [
	"Living shared context (markdown vault in git + retrieval)",
	"Thin Intent bridge between tickets and agent sessions",
	"Policy pack: rules, skills, hooks, ADR gate, and CI gates that fail closed",
	"Checks path on the golden-path coding surface",
	"Velocity + Quality telemetry baseline (before/after pack)",
	"Operating runbook: compile / promote ritual so Memory stays sharp",
] as const;

export const IMPACT_CTA_LABEL = "Schedule a pilot";
export const IMPACT_CTA_HREF = "#impact-interest";
export const IMPACT_FORM_SUBMIT_LABEL = "Send";

export const impactPilotCta = {
	eyebrow: "Early pilot",
	title: "We're installing IMPACT with a small group of early teams.",
	body: "Those first engagements are at pilot pricing - a lower entry while we prove the scorecard together. If it might be a fit, leave a note and we'll follow up.",
} as const;

export const impactLaunchSteps = [
	{
		id: "audit",
		title: "Audit",
		week: "Week 1",
		description:
			"Map your stack, tools, and how the team already uses agents - clear gaps and a golden path to wire IMPACT into.",
	},
	{
		id: "kickoff",
		title: "Kickoff",
		week: "Week 1",
		description:
			"Walk through findings and lock scope, owners, and prerequisites - everyone aligned on the plan and who owns what.",
	},
	{
		id: "scaffold",
		title: "Scaffold",
		week: "Week 2",
		description:
			"Set up living shared context, Policy, and Checks on the golden path - agents can pull context, Policy has a skeleton, CI actions are in place.",
	},
	{
		id: "first-run",
		title: "First end-to-end run",
		week: "Week 3",
		description:
			"Take a real product ticket through the full agent workflow - one live run of Intent → Agents → Checks end to end.",
	},
	{
		id: "hardening",
		title: "System hardening",
		week: "Week 4–5",
		description:
			"Tighten context, close Policy gates, and capture the scorecard baseline - Policy fails closed with a Velocity + Quality before/after.",
	},
	{
		id: "hand-off",
		title: "Hand off",
		week: "Week 5–6",
		description:
			"Leave you with evidence - your team runs the golden path without us, then decide on next steps: Expansion or Retainer.",
	},
] as const;

export type ImpactSuccessStatIcon =
	| "throughput"
	| "lead-time"
	| "touch-points"
	| "bug-trend"
	| "first-pass"
	| "rework";

export type ImpactSuccessStat = {
	id: string;
	icon: ImpactSuccessStatIcon;
	/** Absolute value animated (e.g. 35 for 35%) */
	value: number;
	prefix?: string;
	suffix?: string;
	/** Short ICP-facing description */
	description: string;
};

export const impactSuccessLook = {
	eyebrow: "Pilot / Launch scorecard targets",
	subhead:
		"What we aim to move on a pilot. Velocity has to improve, Quality has to improve.",
	/** Vision targets for R&D leaders - not claimed client results */
	pillars: [
		{
			id: "velocity",
			label: "Velocity",
			blurb: "Delivery moves - without the AI tax bottleneck.",
			color: "oklch(68.63% 0.129 191.84)",
			stats: [
				{
					id: "intent-to-ready",
					icon: "throughput" as const,
					value: 70,
					prefix: ">",
					suffix: "%",
					description:
						"Get from a clear ticket to review-ready work much faster.",
				},
				{
					id: "review-load",
					icon: "lead-time" as const,
					value: 50,
					prefix: "<",
					suffix: "%",
					description:
						"Spend less time stuck in review queues, rounds, and cleanup.",
				},
				{
					id: "touch-points",
					icon: "touch-points" as const,
					value: 40,
					prefix: "<",
					suffix: "%",
					description:
						"Human steps outside the defined approval gates. This count shrinks toward only those gates.",
				},
			] satisfies ImpactSuccessStat[],
		},
		{
			id: "quality",
			label: "Quality",
			blurb: "The gates mean something - even as you ship faster.",
			color: "oklch(60.59% 0.213 292.72)",
			stats: [
				{
					id: "escaped-defects",
					icon: "bug-trend" as const,
					value: 75,
					prefix: "<",
					suffix: "%",
					description:
						"Less bugs slip through after the gates we set - approved the outcome.",
				},
				{
					id: "first-pass",
					icon: "first-pass" as const,
					value: 80,
					prefix: ">",
					suffix: "%",
					description:
						"Agents clear the gates on the first try more often.",
				},
				{
					id: "rework",
					icon: "rework" as const,
					value: 85,
					prefix: "<",
					suffix: "%",
					description:
						"Less rework and fewer reverts after merge.",
				},
			] satisfies ImpactSuccessStat[],
		},
	],
} as const;

export type ImpactFlowNodeId =
	| "intent"
	| "memory"
	| "policy"
	| "agents"
	| "checks"
	| "telemetry";

export type ImpactFlowNode = {
	id: ImpactFlowNodeId;
	letter: string;
	name: string;
	/** Where this stage wires into the stack */
	tools: string;
	color: string;
};

/** Closed-loop stages with integration labels - used by the connection diagram */
export const impactFlowNodes: ImpactFlowNode[] = [
	{
		id: "intent",
		letter: "I",
		name: "Intent",
		tools: "Jira, Confluence, Slack",
		color: "oklch(68.63% 0.129 191.84)",
	},
	{
		id: "memory",
		letter: "M",
		name: "Memory",
		tools: "Living shared context",
		color: "oklch(64% 0.14 230)",
	},
	{
		id: "policy",
		letter: "P",
		name: "Policy",
		tools: "Rules, hooks, CI gates",
		color: "oklch(60.59% 0.213 292.72)",
	},
	{
		id: "agents",
		letter: "A",
		name: "Agents",
		tools: "Cursor, Claude Code, Codex",
		color: "oklch(58% 0.17 270)",
	},
	{
		id: "checks",
		letter: "C",
		name: "Checks",
		tools: "Review + eval gates",
		color: "oklch(64% 0.16 28)",
	},
	{
		id: "telemetry",
		letter: "T",
		name: "Telemetry",
		tools: "Velocity + quality scorecard",
		color: "oklch(70% 0.14 155)",
	},
];

export type ImpactUseCaseId =
	| "dev-pulls-ticket"
	| "product-writes-prd"
	| "qa-starts-check"
	| "agent-codes-change"
	| "reviewer-opens-pr"
	| "policy-blocks-merge"
	| "memory-compile"
	| "sprint-telemetry";

export type ImpactUseCase = {
	id: ImpactUseCaseId;
	/** Short action label on the chip */
	label: string;
	/** Who is acting - shown as a quiet eyebrow */
	actor: string;
	/** What happens in this use case */
	caption: string;
	/** Box that blinks as the starting point */
	entry: ImpactFlowNodeId;
	/** Stages highlighted for this use case */
	emphasis: ImpactFlowNodeId[];
	/** Active edges for the animated path (from → to) */
	edges: readonly [ImpactFlowNodeId, ImpactFlowNodeId][];
	/** Ordered path description for GEO / screen readers */
	path: string;
};

export const impactUseCases: ImpactUseCase[] = [
	{
		id: "dev-pulls-ticket",
		label: "Developer pulls a ticket",
		actor: "Developer",
		caption:
			`Work starts on Intent. The agent loads the ticket, retrieves Memory, runs inside Policy, and only then codes -
			so the session is not a blank prompt.`,
		entry: "agents",
		emphasis: ["intent", "memory", "policy", "agents"],
		edges: [
			["agents", "intent"],
			["agents", "memory"],
			["agents", "policy"],
		],
		path: "Intent → Agents ↔ Memory ↔ Policy",
	},
	{
		id: "product-writes-prd",
		label: "Product creates a PRD",
		actor: "Product",
		caption:
			`A PRD begins as Intent - scope, constraints, and acceptance settle on the ticket.
			That context flows directly to Memory and Agents, so future agent runs inherit the brief without starting from scratch.`,
		entry: "intent",
		emphasis: ["intent", "memory", "agents"],
		edges: [
			["intent", "memory"],
			["intent", "agents"],
			["agents", "memory"],
		],
		path: "Intent ↔ Memory ↔ Agents",
	},
	{
		id: "qa-starts-check",
		label: "QA starts checking",
		actor: "QA",
		caption:
			`QA checks ticket's scope and acceptance criteria. Memory retrieves past bugs and known edge cases.
			CI checks for Policy violations and set new data in Telemetry if quality is drifting.`,
		entry: "checks",
		emphasis: ["checks", "intent", "memory", "policy", "telemetry"],
		edges: [
			["checks", "intent"],
			["checks", "memory"],
			["checks", "policy"],
			["checks", "telemetry"],
		],
		path: "Checks ↔ Intent ↔ Memory ↔ Policy ↔ Telemetry",
	},
	{
		id: "agent-codes-change",
		label: "Agent implements a change",
		actor: "Coding agent",
		caption:
			"An agent executes against Intent, retrieves Memory, obeys Policy hooks, and tests with Checks before anything is done.",
		entry: "agents",
		emphasis: ["agents", "intent", "memory", "policy", "checks"],
		edges: [
			["agents", "intent"],
			["agents", "memory"],
			["agents", "policy"],
			["agents", "checks"],
		],
		path: "Agents ↔ Intent ↔ Memory ↔ Policy ↔ Checks",
	},
	{
		id: "reviewer-opens-pr",
		label: "Reviewer opens a PR",
		actor: "Reviewer",
		caption:
			"Reviewer starts with checking ticket's acceptance. If the ticket involves complexity a Policy review might be needed, along with Memory for prior decisions. Telemetry shows if review load or time is climbing.",
		entry: "checks",
		emphasis: ["checks", "intent", "policy", "memory", "telemetry"],
		edges: [
			["checks", "intent"],
			["checks", "policy"],
			["checks", "memory"],
			["checks", "telemetry"],
		],
		path: "Checks ↔ Intent ↔ Policy ↔ Memory ↔ Telemetry",
	},
	{
		id: "policy-blocks-merge",
		label: "Policy blocks a merge",
		actor: "CI / Policy",
		caption:
			"The pull request is blocked due to failing Policy checks - CI refuses the merge, Checks stay red, Agents cannot skip the rule, and Telemetry records the stop.",
		entry: "policy",
		emphasis: ["policy", "checks", "telemetry"],
		edges: [
			["policy", "checks"],
			["checks", "telemetry"],
		],
		path: "Policy ↔ Checks ↔ Telemetry",
	},
	{
		id: "memory-compile",
		label: "Team compiles Memory",
		actor: "Eng + PM",
		caption:
			"Using agent for knowledge trimming and documenting - notes promote into living shared context or Policy after ticket comments distillation, agent running sessions dump, meetings, and other sources - so context stays sharp.",
		entry: "intent",
		emphasis: ["memory", "agents", "policy"],
		edges: [
			["intent", "agents"],
			["agents", "memory"],
			["memory", "policy"],
		],
		path: "Agents → Memory ↔ Policy",
	},
	{
		id: "sprint-telemetry",
		label: "Lead reads sprint Telemetry",
		actor: "Eng lead",
		caption:
			"Telemetry is how you see Velocity and Quality together - then decide what Memory should surface next and which Policy gates to tighten.",
		entry: "telemetry",
		emphasis: ["telemetry", "memory", "policy"],
		edges: [
			["telemetry", "memory"],
			["telemetry", "policy"],
		],
		path: "Telemetry ↔ Memory ↔ Policy",
	},
];

export type ImpactFaq = {
	id: string;
	question: string;
	answer: string;
};

/** Buyer FAQs - manifesto + GEO + SPECTRA-style; keep answers short and crawlable */
export const impactFaqs: ImpactFaq[] = [
	{
		id: "who-for",
		question: "Who is this for - and who is it not for?",
		answer:
			"For VP Engineering, Head of Platform, Eng Director / Manager at a growth-stage product company where agents already create authoring speed but delivery stalls under AI tax. Pilots fit one product team willing to put Policy in CI and run a golden path. Not for teams looking only to buy Cursor seats, or unwilling to encode standards as gates.",
	},
	{
		id: "framework-dust",
		question: "Is this another framework that collects dust?",
		answer:
			"No. IMPACT is wired and enforced from week one - living shared context, Policy checks in CI, and Telemetry on the scoreboard. If a discipline cannot be observed in the team's actual workflow, it is not embedded yet. The deliverable is a running golden path, not a deck.",
	},
	{
		id: "how-it-works",
		question: "How does IMPACT work in practice?",
		answer:
			"Work starts from Intent on the ticket. Agents retrieve living shared context (Memory), stay inside Policy, ship through risk-aware Checks, and Telemetry shows whether Velocity and Quality moved together. The loop repeats - signals feed what Memory should surface next and which Policy gates to tighten.",
	},
	{
		id: "memory",
		question: "What is Memory - and what does living shared context include?",
		answer:
			"Memory is the team knowledge layer agents retrieve every session - not chat history and not someone's head. Living shared context holds architecture, principles, and runbooks the whole team relies on. Working memory captures run distillations that may promote into that shared layer through a compile ritual. Context still lives where the next reader will look - ticket, code, ADR, or shared brain.",
	},
	{
		id: "policy",
		question: "What does Policy enforce?",
		answer:
			"The rules your org already knows but rarely enforces consistently - naming, security, search Memory before coding, when a structural change needs an ADR, which surfaces agents may use. In IMPACT those rules become skills, hooks, and CI gates that fail closed, so Policy does not lapse when a senior is on vacation.",
	},
	{
		id: "existing-sdlc",
		question: "How does this fit our existing SDLC?",
		answer:
			"IMPACT augments rather than replaces. You keep your ticket system, git flow, code review, and security review. IMPACT defines how agentic work plugs into those controls - which context to retrieve, which gates apply, what gets documented where, and what the Telemetry story is.",
	},
	{
		id: "security",
		question: "Where does our code go - and how does this pass security review?",
		answer:
			"Your code, tickets, and vault stay in your systems. Agents run in the coding platforms you already choose (Cursor, Claude Code, Codex, etc.) under your accounts and retention policies. Stellar does not take a copy of your monorepo to operate IMPACT. You own vault content and repo config; we bring the methodology and portable kit. Enterprise SOC2/ISO review is a conversation against your stack - we connect into existing controls rather than inventing a shadow toolchain.",
	},
	{
		id: "tools",
		question: "Which tools does IMPACT require?",
		answer:
			"None locked. A pilot typically wires one ticket system (Jira or Linear), one coding surface (Cursor, Claude Code, or Codex), and living shared context as markdown in git with retrieval - Obsidian is recommended for humans, not required. Other tools follow the same adapter pattern as you expand.",
	},
	{
		id: "working",
		question: "How do we know it is working?",
		answer:
			"Two buyer pillars: Velocity improves (time from a clear ticket to review-ready work moves the right way), and Quality holds (review load and rework do not regress; fewer bugs escape after the gates said yes; agents clear those gates on the first try more often). Supporting pilot evidence includes golden-path adoption, ADR and Policy gates failing closed, Memory promotion running, fewer extra human touch points beyond the agreed approvals, and a before/after Telemetry baseline.",
	},
	{
		id: "week-one",
		question: "What happens in the first week?",
		answer:
			"On day one we stand up the shared context, retrieval, and a first Policy skeleton. By the end of week one, a real ticket has run end to end on the golden path. Within a month the compile ritual, gates, and Telemetry baseline are live. Within a quarter, your team runs IMPACT without us in the room.",
	},
	{
		id: "engagement",
		question: "What does an engagement look like - and what about pricing?",
		answer:
			"Pilots start as a Launch on one product team (about 4–6 weeks) to embed the golden path and instrument the scorecard. Early engagements are at pilot pricing - lower than later Launch/Expansion rates - with founder-led attention. From there you can continue with Expansion or Retainer. Exact numbers are a custom proposal.",
	},
	{
		id: "ownership",
		question: "Who owns the context, content, and methodology?",
		answer:
			"You own your living shared context content, ticket wiring, and repo-specific configuration. Stellar Code owns the IMPACT methodology and portable kit. Generic improvements found during an engagement may fold back into the kit in anonymized form - never your secrets or proprietary content.",
	},
];

export const impactServiceMeta = {
	title: "IMPACT Method | Agentic SDLC Framework",
	description:
		"IMPACT is a new Agentic SDLC methodology from Stellar Code, currently running pilot engagements: Intent, Memory, Policy, Agents, Checks, and Telemetry - wired into your tickets, repos, and CI.",
	path: "/services/agentic-sdlc-impact-method",
	ogImage: "/impact-og-image.jpg",
} as const;
