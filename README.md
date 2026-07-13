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

## Files

- `index.html` — the entire game. UI layer + pure core (marked).
- `SPEC.md` — the living spec: every design decision, mechanic table, physics
  rule, and the iPad port plan. Read it before changing anything.
- `AGENTS.md` — working contract for AI collaborators.
- `tests/` — node test suite, no dependencies.
