# Working agreement for AI collaborators

This file is the handoff contract. It applies to Claude, Claude Code, Codex,
Hermes (any model), and any other agent touching this repo.

## Document map

- `AGENTS.md` — this contract. Read first.
- `BACKLOG.md` — the work queue. Pick from here; Jeffrey prioritizes.
- `CHANGELOG.md` — what each version added. Read before assuming something
  doesn't exist; add a line with every version bump.
- `SPEC.md` — the living design record: every mechanic, physics rule, data
  model, and the iPad port plan. Update it in the same commit as any design
  change.
- `README.md` — humans: how to run and test.
- `tests/` — the commit gate.

## Architecture map (index.html, single file)

Top to bottom: CSS → HTML shell (tabs: casa/juego/repaso/stats) → script:
- `/*CORE-START*/ … /*CORE-END*/` — pure match-3 logic, DOM-free (board build,
  match analysis, gravity/reachability physics, blast engine returning
  `{clear, events}`, combo seeds). Ports 1:1 to Swift. Keep pure.
- DATA — `TILES`, `ROOMS`/`ROOM_ORDER`, `CATALOG` (objects), `PHRASES`
  (tasks), `COMMANDS` (exam drill), `COOPER` (narrative lines).
- `/*SRS-START*/ … /*SRS-END*/` — FSRS-5 scheduler, pure, own test file.
- STATE — `DEFAULT_STATE`, `loadState()` (every new state field needs a
  backfill line for old saves), localStorage key `piso-asturiano`.
- AUDIO — es-ES speech + synthesized SFX.
- CASA — rooms, shop, tasks, exam drill (`renderDrill`, garage-only).
- JUEGO — levels (`LEVELS` ASCII maps), goals, boosters, FX player, input.
- REPASO — session runner. PROGRESO — stats. INIT.

## Process

1. **Propose diffs; Jeffrey commits.** Never commit or push directly unless
   explicitly asked in the session. (Same rule as his ~/memory repo.)
2. **Tests are the gate.** `node tests/core.test.js && node tests/levels.test.js`
   must pass before presenting any change. Add tests for new core mechanics.
3. **Bump the version stamp** in the footer of `index.html` on any
   game-behavior change (docs-only commits don't bump), add a CHANGELOG.md
   line in the same commit, and move the finished BACKLOG.md item there.
   Optionally `git tag vX.Y` on push.
4. **SPEC.md is the source of truth.** Update it in the same change as any
   design or mechanic modification. It is the design record for the iPad port.
5. Terminal commands in discussion with Jeffrey must be location-independent
   (`git -C <abs-path>`, absolute paths).

## Architecture invariants

- **Single self-contained HTML file.** No build step, no external assets;
  fonts via Google Fonts CDN are the only network dependency. SFX are
  synthesized WebAudio; word audio is Web Speech API (es-ES).
- **The core is pure.** Everything between `/*CORE-START*/` and `/*CORE-END*/`
  is DOM-free and must stay that way — it ports 1:1 to Swift. UI concerns
  (rendering, animation, goals credit) live outside it. The blast engine
  returns `{clear, events}`; the event stream is the animation spec.
- **Storage:** localStorage key `piso-asturiano`, in-memory fallback. New state
  fields need a backfill line in `loadState()` for old saves.

## Content checklists

**New room**: ROOMS + ROOM_ORDER + ROOM_ES entry → backdrop branch in
`roomBgSVG` → 12 CATALOG items (emoji-renderable, coords in the 780×400
scene) → one PHRASES task per item (mind the grammar ramp: tú → plurals →
reflexives → usted) → unlock-chain position → SPEC.md content section.

**New exam command**: add to `COMMANDS` with stable id, category, unique icon
within its category. Cards auto-seed on next garage visit.

## Design invariants (do not regress)

- Spanish lives in the meta/SRS layer, never inside the match mechanic.
- Fluent Forever principles: image → Spanish recall (no EN on card fronts),
  pronunciation-first (speak on reveal/purchase/tap), gender color-coded
  everywhere (el = #3E6E8E, la = #C0563B).
- Gravity is reachability physics (straight falls through holes, cascading
  diagonal infill, roofed cells stay empty). Don't "fix" the feed-choke.
- Level maps: never author a full-width wall of blockers — leave feed gaps.
- Reviews are the source of hammers; learning stays the strongest tactical
  resource in the game.

<!-- context7 -->
Use Context7 MCP to fetch current documentation whenever the user asks about a
library, framework, SDK, API, CLI tool, or cloud service. This includes API
syntax, configuration, version migration, library-specific debugging, setup
instructions, and CLI tool usage. Use whenever the answer is version-specific,
involves a library updated in the last two years, or you have any uncertainty.
Skip only for stable, foundational APIs you are certain about.
Prefer Context7 over web search for library docs. If Context7 cannot resolve a
library or the release is too recent to be indexed, fall back to the official
docs via web fetch.
Do not use for: refactoring, writing scripts from scratch, debugging business
logic, code review, general programming concepts, or unindexed libraries.
