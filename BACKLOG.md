# Backlog

The work queue, roughly in value order. Pick an item, read its context in
SPEC.md, build it as a discrete shippable chunk (tests green, version bumped,
CHANGELOG line added). Move the item here → CHANGELOG when done. Jeffrey
prioritizes; don't invent large features not listed without asking him.

## 1. Vehicle-specific precheck practice  ← vehicle known; controls unverified
The test car is a **2019 Toyota Yaris Hybrid** (user-confirmed). After Fermín
confirms its actual controls and procedures, add engine-bay and dashboard
response diagrams.
- Validate component names, locations, controls, and required actions against
  the real vehicle; do not assume the Toyota/Renault illustrations in the guide
  match the test car.
- Keep generic listening comprehension separate from vehicle-specific physical
  location/procedure practice, with honest measurement for each.
- Done when: the diagrams and expected responses are instructor-validated and
  usable on iPad without `foreignObject`.

## 2. Exam-focused product mode
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

## 3. FSRS parameter fitting
`S.log` records every review. Once ~300+ entries exist, fit FSRS weights to
Jeffrey's data (a `tools/fit-fsrs.js` script reading an exported log; output:
a `FW` array to paste in). Don't change the scheduler API.
- Done when: script exists, documented in README, and produces a plausible
  weight set from the real log.

## 4. Rotating phrase variants
Second/third action phrase per object, rotating on task completion or as new
task tiers. Grammar target: present tense statements after imperatives.

## 5. Level difficulty tuning pass
Jeffrey's play feedback drives this; collect specific complaints first
(moves, targets, obstacle counts). Don't tune speculatively.

## 6. Typing / speech recall input  (deferred by Jeffrey — don't build unasked)

## 7. iPad port (SwiftUI/SpriteKit)
The endgame. SPEC.md is the design record; the CORE and SRS marked blocks and
the FX event stream port 1:1. Recorded audio replaces TTS here.
