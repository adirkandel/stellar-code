# IMPACT

## Agentic SDLC, made predictable.

**IMPACT** is a methodology and installed operating system for engineering organizations that want better outcomes from AI coding agents - without losing control, without rebuilding context every sprint, and without turning documentation into a daily tax.

Stellar Code installs IMPACT as a service: persistent **Memory**, **Intent** on the ticket, bounded **Agents**, codified **Policy**, risk-aware **Checks**, and measured **Telemetry** - wired into the tools your team already uses.

---

## Where agentic delivery actually breaks

R&D leaders need competitive velocity without giving up quality. Tools alone rarely deliver that. AI coding assistants can accelerate **authoring speed** without improving **delivery velocity** - and the gap shows up as **AI tax**: review bottlenecks, rework, and seniors drowning in verification while throughput looks busy.

Across teams adopting agentic coding, the same three failure modes repeat:

1. **Authoring speed ≠ delivery. The AI tax shows up downstream.** Agents produce diffs faster than humans can review. Shared project truth still lives in chats, heads, and half-synced docs. Living shared context and quality both lose to speed - and the review bottleneck becomes the real constraint.
2. **No standards, uneven outcomes.** Everyone picks their own tools, prompts, and habits. Techniques stay tribal. Results stay inconsistent. Quality becomes a person problem instead of a system property - and the verification loop has no shared Policy.
3. **Serial bottlenecks where parallel should win.** Leaders want fleets of agents solving work side by side on one living shared context - not a queue of manual handoffs. Non-technical teammates should be able to run a well-defined task under the same standards.

IMPACT exists because the problem is not "which coding agent you picked." The problem is that agents reset, standards are optional, work stays serial, and speed without a balanced scorecard creates AI tax instead of throughput. Knowledge does not compound. Policy does not enforce. Quality does not scale with speed.

---

## What we believe

These are not slogans. They are design constraints for every IMPACT installation.

1. **Agents retrieve living shared context** instead of relying on pasted chat history.
2. **Work starts from Intent on the ticket**, not vibes in a prompt.
3. **Important knowledge becomes living shared context**, not tribal and undocumented.
4. **Rules and gates are codified**, not left to whoever happens to remember.
5. **Agents stay bounded**. They don't operate with unbounded imagination.
6. **Progress is measured with telemetry**, not declared as productivity.
7. **Humans remain in the loop** on product decisions that change direction, scope, or shared truth.
8. **More people can contribute behind gates**. Delivery doesn't depend on hero developers only.

There is value in the alternatives. We optimize for the left side of each statement.

---

## What IMPACT is

IMPACT is not a checklist. It is a **closed loop** where every discipline reinforces the next. Over time, Telemetry informs what Memory should surface and what Policy should enforce - so the system learns instead of decaying. Launch proves the scorecard. Expansion and Retainer deepen the feedback practices.

```
Intent leads to Memory, then Policy, then Agents, then Checks, then Telemetry
   ↑___________________________________________|
              (feedback loop)
```

| Letter | Discipline    | In one sentence                                                                                                           |
| ------ | ------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **I**  | **Intent**    | Work is anchored to tickets - living specifications PMs and agents maintain together.                                     |
| **M**  | **Memory**    | Living shared context agents retrieve - not chat history, not someone's head.                                             |
| **P**  | **Policy**    | Organizational rules encoded as skills, hooks, and CI gates - enforced, not remembered.                                   |
| **A**  | **Agents**    | Bounded coding agents with explicit scope, tools, and spawn surfaces.                                                     |
| **C**  | **Checks**    | Human review and automated evaluation calibrated to risk.                                                                 |
| **T**  | **Telemetry** | Velocity and Quality metrics that prove delivery moved without trading off stability - and that the gates mean something. |

**Category name:** Agentic SDLC OS  
**Methodology name:** IMPACT

---

## Each discipline, in detail

### I - Intent

A ticket is not a title. It is the contract between product intent and engineering execution.

When a PM shapes a feature with an agent, IMPACT expects product decisions to land on the ticket - scope, constraints, open questions, acceptance signals. When an engineer picks up work, the agent loads **Intent first**, not a pasted prompt from yesterday's chat.

Intent is versioned in your ticket system (Jira, Linear, or equivalent). It is the front door to every agent session.

Without Intent on the ticket, every agent run is an interpretation - and agents accelerate the rate at which interpretations diverge.

### M - Memory

Memory is the largest hidden cost in agentic engineering: the cost of **rebuilding context** every time someone spawns an agent, joins the team, or returns to a project after a week away.

IMPACT installs **living shared context** - a markdown vault in git with wikilinks and agent-grade retrieval (via tools like [qmd](https://github.com/tobi/qmd) for hybrid search). Obsidian is the recommended human interface. The vault itself is tool-agnostic.

Memory has two layers in practice:

| Layer                     | Purpose                                                                                 | Who writes                       | Retrieval                                            |
| ------------------------- | --------------------------------------------------------------------------------------- | -------------------------------- | ---------------------------------------------------- |
| **Working memory**        | Sources, references, agent run summaries, ticket distillations                          | Agents and humans                | Cold by default - scoped to the active ticket or run |
| **Living shared context** | Architecture, product principles, runbooks, glossaries - truth the whole team relies on | Humans approve. Agents may draft | Hot - default retrieval for every agent session      |

**How knowledge flows without a daily documentation tax:**

- **PM + agent on tickets** documents product decisions on Intent (ticket updates)
- **Engineer + coding agent** keeps local technical decisions beside the code (comments, ADRs in-repo) when they don't need to propagate org-wide
- **Architecture Decision Records (ADRs)** capture structural and high-risk design choices so decision access holds under agent speed. Org-wide decisions promote into living shared context
- **Working memory** captures sources and session distillations that _may_ promote into living shared context
- **Compile ritual** periodically distills working memory into living shared context and archives noise so retrieval stays sharp

**Locality is an operating rule, not a manifesto pillar:** not every decision belongs in living shared context. Context should live where the next reader will look for it - ticket, code, ADR beside the change, or the shared brain - and agents are taught to respect that boundary.

**Phase-1 sources:** tickets and code-adjacent capture (default). Slack harvest optional. Meeting/call ingestion only after explicit security and approval gates.

### P - Policy

Policy is what your organization already knows but rarely enforces consistently - naming conventions, security requirements, how agents must search memory before coding, when to write beside code vs propose a durable doc update, when a structural change requires an **ADR**, which surfaces agents may use, redaction rules, model boundaries.

In IMPACT, policy is **encoded**:

- Project **rules** and **skills** per product or repo
- **Hooks** on coding platforms (Cursor, Claude Code, Codex) that detect decisions worth documenting
- **ADR gate** for structural or high-risk changes - the decision is captured before merge, not reconstructed in a postmortem
- **CI gates** that fail when policy is violated - not when someone forgot

Policy that lives only in a senior engineer's head lapses the moment they're on vacation. Policy enforced in the pipeline does not lapse.

### A - Agents

Agents have explicit scope, explicit tools, and explicit entry points. They do not "figure out the org."

IMPACT supports spawning bounded agents from the surfaces teams already use:

- **Agentic coding platforms:** Cursor, Claude Code, Codex (and adapters for others over time)
- **Communication platforms:** Slack, Discord, Teams (Expansion phase and beyond - not Launch week-one scope)

Every spawn path shares the same Policy and Memory retrieval contract. An agent in Cursor and an agent in Slack should not be two different organizations.

### C - Checks

Not every change deserves the same scrutiny. A copy tweak and a billing-flow change should not travel the same review path.

**Checks** combines:

- **Human review** calibrated to risk - rules written down, not improvised under deadline
- **Automated evaluation** - golden tasks, regression gates, wiki lint - introduced at Launch exit or Expansion entry, not as a prerequisite to starting

Launch ships with **policy + gates**. Eval harness maturity is the upgrade path that makes IMPACT defensible at scale.

### T - Telemetry

Telemetry is how IMPACT proves it works for leadership - buyer proof on a balanced scorecard, not vanity adoption.

We pair **throughput** with **stability**, the same way VPs of R&D defend delivery to their boards: Velocity improved, Quality did not regress, **AI tax** stayed under control.

| Pillar       | What it tells you                                         | What we actually watch                                                                                                                   |
| ------------ | --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **Velocity** | Delivery moved - not just authoring speed                 | Time from a clear ticket to review-ready work, and how long tickets sit in progress before a PR opens                                    |
| **Quality**  | Speed did not break things - and the gates mean something | Review load and rework do not spike; fewer bugs show up after the gates already said yes; agents clear gates on the first try more often |

**Role-shift evidence (not a third pillar):** developers spend fewer extra touch points beyond the agreed approvals - more specifying and approving, less rewriting the agent's work by hand. That is how you see the AI tax come down.

**Adoption is hygiene, not the headline.** Team adoption trend on the golden path shows the OS is inhabited - useful Launch-exit evidence, not a scorecard pillar.

**Launch-exit evidence (not pillars):** Intent bridge in use. Policy/CI gates failing closed. ADR gate live with adoption tracked. Compile ritual / Memory promotion ran. Telemetry before/after baseline delivered. Golden-path adoption trending up.

Authoring speed alone does not count. Velocity must move and Quality must hold - or the AI tax is winning. Hollow coverage percentages do not count either; later maturity looks at whether tests actually catch breakage.

Over Expansion and Retainer, scorecard trends inform what Memory should surface and what Policy should enforce. That feedback practice is not a Launch-week delivery claim.

---

## The closed loop

IMPACT is designed as a system, not a toolchain shopping list.

```
┌─────────────────────────────────────────────────────────────────┐
│                         INTENT (tickets)                        │
│              PM + agent maintain living spec                    │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│              MEMORY (living shared context)                     │
│     compiled from working memory + code-local truth             │
│     + ticket distillations (vault + retrieval under the hood)   │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│              POLICY (rules · skills · hooks · CI)               │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│           AGENTS (Cursor · Claude Code · Codex · …)             │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│         CHECKS (risk-tiered review · evals · wiki lint)         │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│         TELEMETRY (velocity · quality informs Memory + Policy)  │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             └────────── feeds back to Memory + Policy
                                          (deepens after Launch)
```

---

## What is different from "good engineering practice"

Most of these disciplines existed before AI. What changes with agentic engineering is the **velocity at which their absence becomes catastrophic**.

A team that ships twice as fast, with twice the surface area per agent session, can erode coherence in months that would otherwise have taken years.

IMPACT is not new rules. It is the rules made **retrievable, enforceable, and measurable** - installed into the systems agents and humans already touch.

What IMPACT adds that generic "AI coding best practices" miss:

| Generic advice             | IMPACT                                                                                       |
| -------------------------- | -------------------------------------------------------------------------------------------- |
| "Write good prompts"       | Intent on the ticket + retrieved Memory                                                      |
| "Use Cursor rules"         | Policy pack + CI gates + per-product kit                                                     |
| "Document your decisions"  | Multi-sink capture + ADR gate - not a daily wiki tax                                         |
| "Review AI code carefully" | Risk-tiered Checks + verification loop that contains AI tax                                  |
| "Measure AI productivity"  | Velocity + Quality scorecard - ticket to review-ready, gates that hold, AI tax under control |

---

## Who this is for

**Primary buyer:** VP Engineering, Head of Platform, Engineering Director at a growth-stage product company.

**Primary pain:** Agentic coding produced a burst of authoring speed, then **AI tax** - review bottleneck, rework, context chaos, and onboarding drag - without reliable delivery velocity.

**Phase-1 users in the room:**

- Engineers and tech lead (Agents, Policy, Checks)
- PM who writes tickets with agents (Intent, Memory distillations)
- Customer Success observer with read access to living shared context (validates Memory serves beyond engineering)

**North star (not week-one scope):** More roles contribute behind gates - PMs, designers, CS - without hero-developer bottlenecks.

---

## How engagements work

IMPACT ships as a **package ladder**. Every relationship starts at Launch.

### Launch - 4 to 6 weeks

**Scope:** One product team. One living shared context. One ticket system. One golden-path coding surface (reference: Linear + Cursor. Jira and Claude Code/Codex supported via adapters).

**Installed:**

- Living shared context (markdown vault in git + qmd retrieval + wikilinks)
- Working memory promoting into living shared context
- Thin Intent bridge (ticket and agent context)
- Policy pack + CI gates (rules, skills, hooks) including ADR gate for structural / high-risk changes
- Telemetry baseline (Velocity + Quality scorecard. Adoption as hygiene)

**Exit criteria:** Improvement on at least one Velocity signal (for example, ticket → review-ready gets faster). No meaningful Quality regression - review load and rework hold, and bugs after a gate pass do not climb.

**Launch-exit evidence (installation fidelity):** Golden-path adoption trend. ADR gate live with adoption tracked. Compile / Memory promotion evidence. Intent bridge used on golden-path tickets. Policy/CI gates failing closed. Before/after telemetry baseline delivered. Early read on whether agents clear gates on the first try, and whether humans still touch work beyond the agreed approvals.

**Optional Launch exit upgrade:** Eval harness (golden tasks) - or defer to Expansion.

### Expansion - 8 to 12 weeks

Expand to additional repos, optional Slack harvest, multi-surface agent spawn, eval harness maturity, operating cadence (compile, lint, promote rituals), training for PM and CS read paths.

### Retainer - ongoing

Wiki gardener, Policy drift control, Telemetry review, adapter maintenance, expansion to new teams.

---

## Integration posture

IMPACT is methodology-first. It is not locked to one vendor stack.

| Layer                | Launch allowlist                               | Golden path (kit reference) |
| -------------------- | ---------------------------------------------- | --------------------------- |
| Tickets              | Jira, Linear                                   | Linear                      |
| Coding agents        | Cursor, Claude Code, Codex                     | Cursor                      |
| Memory               | Git markdown vault + qmd. Obsidian recommended | Obsidian + qmd              |
| Comms spawn          | Expansion+                                     | -                           |
| Call/meeting harvest | Gated (security approval)                      | -                           |

ClickUp, Discord, Teams, and others follow the same adapter pattern in Expansion phase.

---

## Intellectual property

- **Client owns:** their living shared context content, ticket wiring, repo-specific configuration
- **Stellar Code owns:** IMPACT methodology, generic templates, portable skills/hooks kit
- **Fold-back clause:** Generic improvements discovered during an engagement may be anonymized and incorporated into the Stellar kit - never client secrets or proprietary content

---

## What leaders ask us

### Is this another framework that collects dust?

No. IMPACT is enforced from week one - vault structure, retrieval rules, policy checks in CI, telemetry on the scoreboard. If a discipline cannot be observed in the team's actual workflow, it is not installed yet.

### How does this fit our existing SDLC?

IMPACT augments rather than replaces. You keep your ticket system, git flow, code review, and security review. IMPACT defines how agentic work plugs into those controls - which living shared context to retrieve, which gates apply, what gets documented where, what the telemetry story is.

### Do we have to adopt Obsidian?

No. The vault is markdown in git. Obsidian is the recommended editor for knowledge workers. Engineers can use any markdown tool. CS and PM can browse without living in an IDE.

### How do we know it is working?

The buyer scorecard is two pillars:

1. **Velocity improves** - time from a clear ticket to review-ready work moves in the right direction (and tickets spend less time sitting in progress before a PR opens)
2. **Quality holds** - review load and rework do not regress; fewer bugs still escape after the gates said yes; agents clear those gates on the first try more often. AI tax stays under control

Supporting evidence at Launch exit (not scorecard pillars): the OS is inhabited (adoption trend), ADRs capture structural decisions, compile/Memory promotion ran, Intent and Policy gates are observable in the workflow, and human touch beyond the agreed approvals trends down. Decision access improves because design choices land in an ADR or beside the change. Knowledge access improves because product truth lives in Intent and living shared context - not only in chat.

### What does week one actually look like?

Day one: vault scaffold, retrieval index, policy skeleton.  
Week one: first agent workflow from a real ticket end-to-end.  
Month one: compile ritual, gate enforcement, telemetry baseline.  
Quarter one: team operates IMPACT without Stellar in the room.

---

## The mission

**Better agentic coding outcomes.** Context that compounds. Intent that persists. Policy that holds at speed.

**Broader contribution over time.** When Memory, Policy, and Checks are trustworthy, more people can move the product forward - not by bypassing engineering, but by working inside a system that makes contribution safe.

**Remove the daily documentation burden.** Knowledge should be captured as a side effect of doing the work - on tickets, beside code, and in a shared brain agents actually use - not as a separate chore nobody sustains.

---

## Stellar Code

IMPACT is how Stellar Code installs agentic SDLC for product engineering teams.

We dogfood the methodology on our own delivery work before we sell it. The Launch kit is extracted from what we run - not from a slide deck.

**Next step:** A working session on your stack, your team, and whether a Launch on one product team is the right entry point.

---

_IMPACT - Intent · Memory · Policy · Agents · Checks · Telemetry_
