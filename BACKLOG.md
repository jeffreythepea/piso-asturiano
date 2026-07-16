# Backlog

The work queue, roughly in value order. Pick an item, read its context in
SPEC.md, build it as a discrete shippable chunk (tests green, version bumped,
CHANGELOG line added). Move the item here → CHANGELOG when done. Jeffrey
prioritizes; don't invent large features not listed without asking him.

## 1. Driving / precheck drill modes  ← highest priority
Add a three-way Garage selector: **Conducción**, **Comprobaciones**, and
**Mixto**. Remember the last-used mode; old saves default to `driving`.
- Filter due review and free practice to the selected phase without duplicating
  command cards or FSRS histories.
- Show phase-specific due counts and keep results distinguishable by phase.
- Add the new persisted field to `DEFAULT_STATE` and backfill it in
  `loadState()`.
- Done when: all three queues contain the correct cards, the selection survives
  reload/export/import, and prechecks never appear in a driving-only session.

## 2. Vehicle-specific precheck practice  ← blocked on Fermín
After Fermín supplies the training/test car make and model and confirms the
actual controls and procedures, add engine-bay and dashboard response diagrams.
- Validate component names, locations, controls, and required actions against
  the real vehicle; do not assume the Toyota/Renault illustrations in the guide
  match the test car.
- Keep generic listening comprehension separate from vehicle-specific physical
  location/procedure practice, with honest measurement for each.
- Done when: the diagrams and expected responses are instructor-validated and
  usable on iPad without `foreignObject`.

## 3. Exam-focused product mode
After the drill modes and v0.25 instrumentation have been used in Safari, make
the exam the primary working experience without duplicating the app into a
separate HTML product.
- Open into the last-used tab or Garage, and evaluate an optional Exam Focus
  presentation that hides unrelated tabs without deleting their progress.
- Reassess extracting a standalone exam app only after several weeks of actual
  use show that the apartment and match-3 portions are no longer useful.
- Done when: Jeffrey can enter the exam drill with minimal friction and the
  decision to keep or separate the broader game is supported by usage rather
  than architecture speculation.

## 4. FSRS parameter fitting
`S.log` records every review. Once ~300+ entries exist, fit FSRS weights to
Jeffrey's data (a `tools/fit-fsrs.js` script reading an exported log; output:
a `FW` array to paste in). Don't change the scheduler API.
- Done when: script exists, documented in README, and produces a plausible
  weight set from the real log.

## 5. Rotating phrase variants
Second/third action phrase per object, rotating on task completion or as new
task tiers. Grammar target: present tense statements after imperatives.

## 6. Level difficulty tuning pass
Jeffrey's play feedback drives this; collect specific complaints first
(moves, targets, obstacle counts). Don't tune speculatively.

## 7. Typing / speech recall input  (deferred by Jeffrey — don't build unasked)

## 8. iPad port (SwiftUI/SpriteKit)
The endgame. SPEC.md is the design record; the CORE and SRS marked blocks and
the FX event stream port 1:1. Recorded audio replaces TTS here.
