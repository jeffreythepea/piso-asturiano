# Backlog

The work queue, roughly in value order. Pick an item, read its context in
SPEC.md, build it as a discrete shippable chunk (tests green, version bumped,
CHANGELOG line added). Move the item here → CHANGELOG when done. Jeffrey
prioritizes; don't invent large features not listed without asking him.

## 1. Vehicle-specific precheck practice  ← manual baseline shipped; car unverified
The test car is a **2019 Toyota Yaris Hybrid** (user-confirmed). After Fermín
confirms its actual controls and procedures, replace or correct the provisional
manual-based response diagrams shipped in v0.27.
- v0.27 baseline: native-SVG vehicle/engine, instruments/windows, lighting,
  and body/demister surfaces plus answer notes from Toyota manual
  `PZ49X-52A96-EN` (May 2019). Trim-dependent controls are labeled honestly.
- Validate component names, locations, controls, and required actions against
  the real vehicle; do not assume the Toyota/Renault illustrations in the guide
  match the test car.
- Keep generic listening comprehension separate from vehicle-specific physical
  location/procedure practice, with honest measurement for each.
- Remaining evidence: photos of the actual instrument cluster, left stalk,
  climate panel, driver's window switches, engine bay, hatch opener, and rear
  right battery cover, followed by instructor confirmation.
- Done when: the diagrams and expected responses are instructor-validated and
  usable on iPad without `foreignObject` (the v0.27 baseline already meets the
  rendering constraint).

## 2. Exam-focused product mode  ← reversible focus shipped; usage review pending
v0.28 makes the exam the primary working experience without duplicating the app
into a separate HTML product.
- The app opens into the last-used tab. Optional Exam Focus opens directly in
  the Garage, hides unrelated rooms/tabs, remembers the drill phase, and restores
  the previous room/tab on exit without deleting progress.
- The exported `examFocusStarts` counter provides a minimal usage signal.
- Reassess extracting a standalone exam app only after several weeks of actual
  use show that the apartment and match-3 portions are no longer useful.
- Remaining: use the focus presentation in Safari, then inspect actual behavior
  and `examFocusStarts` before deciding whether to close this item or extract the
  drill. Do not infer that decision from the implementation alone.
- Done when: Jeffrey confirms the focused entry removes the friction and the
  decision to keep or separate the broader game is supported by actual use.

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
