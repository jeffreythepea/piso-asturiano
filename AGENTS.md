# Working agreement for AI collaborators

This file is the handoff contract. It applies to Claude, Claude Code, Codex,
Hermes, and any other agent touching this repo.

## Process

1. **Propose diffs; Jeffrey commits.** Never commit or push directly unless
   explicitly asked in the session. (Same rule as his ~/memory repo.)
2. **Tests are the gate.** `node tests/core.test.js && node tests/levels.test.js`
   must pass before presenting any change. Add tests for new core mechanics.
3. **Bump the version stamp** in the footer of `index.html` on every change,
   so Jeffrey can verify at a glance which build he's playing.
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
