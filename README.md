# El Piso Asturiano

A Homescapes-inspired match-3 game for learning Spanish, built as a single-file
HTML prototype that doubles as the living spec for a future SwiftUI/SpriteKit
iPad app. Personal project — Jeffrey Pease, Oviedo.

**Core loop:** match-3 wins and SRS reviews earn estrellas → buy furniture for
an Asturian piso → every object is learned in Spanish (image-first, Fluent
Forever style) → the furnished rooms are the vocabulary, visible.

## Run

Open `index.html` in Safari (iPad or Mac). No build step, no dependencies —
everything (SFX, FX, storage) is synthesized in-file. Progress persists in
localStorage; the version stamp is in the footer.

## Test

    node tests/core.test.js
    node tests/levels.test.js

Both must pass before any commit. The tests extract the pure game core from
`index.html` (between the `/*CORE-START*/` and `/*CORE-END*/` markers) and
exercise match analysis, special pieces, combos, gravity physics, obstacles,
droppers, and all authored level maps.

## For AI collaborators

Bootstrap prompt (paste into Codex, Hermes, Claude, or any capable model with
repo access):

> You are iterating on this repo. Read AGENTS.md fully and follow it — it is
> the working contract. Check CHANGELOG.md for what exists and BACKLOG.md for
> the work queue. Propose diffs; run the tests in tests/ as your gate; bump
> the version and changelog per the contract. Ask Jeffrey before large
> unlisted features.

Codex reads AGENTS.md automatically; Claude Code reads CLAUDE.md (which
points there). For Hermes or others, include the prompt above.

## Files

- `index.html` — the entire game. UI layer + pure core (marked).
- `SPEC.md` — the living spec: every design decision, mechanic table, physics
  rule, and the iPad port plan. Read it before changing anything.
- `AGENTS.md` — working contract for AI collaborators.
- `tests/` — node test suite, no dependencies.
