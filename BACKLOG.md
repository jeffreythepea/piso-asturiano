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

## 3. Personal vocabulary intake spike
Test whether the broader game can become an ongoing personal Spanish tool
without prematurely building a rich-media importer.
- First inspect one real vocabulary source/export supplied by Jeffrey; do not
  invent a Fluent Forever, Anki, or other file format.
- Import or manually enter one bounded batch of 20 real words with stable
  identity, deduplication, deletion, gender where applicable, es-ES audio, and
  fresh FSRS schedules. Never claim to preserve scheduling history the source
  does not provide.
- Keep English glosses off recall fronts. Use the current text/emoji/TTS model
  for this plumbing test; it does not validate or replace personal-image
  learning.
- Define deterministic backup/restore and old-save migration before scaling.
  Do not add browser image storage or IndexedDB as part of this spike.
- Done when: the real 20-word batch imports cleanly, reviews correctly, survives
  export/import, handles duplicates and deletion, and Jeffrey finds the intake
  effort useful enough to justify broader vocabulary work.

## 4. FSRS parameter fitting
`S.log` records every review. Once ~300+ entries exist, fit FSRS weights to
Jeffrey's data (a `tools/fit-fsrs.js` script reading an exported log; output:
a `FW` array to paste in). Don't change the scheduler API.
- Done when: script exists, documented in README, and produces a plausible
  weight set from the real log.

## 5. Targeted phrase and word-form expansion
The blanket two-tier phrase ramp already shipped in v0.21: every object has an
imperative card and a separate first-person present card. Do not automatically
create another 72-card tier.
- Collect specific recurring grammar or phrase-recall errors from real use and
  tutoring, then add only small, coherent batches that target those errors.
- Give every materially distinct recall target its own stable card ID and FSRS
  schedule. Never rotate different expected answers through one scheduled card.
- Keep recognition exercises statistically separate from recall, and keep
  English off card fronts.
- Done when: an evidence-backed target batch is defined, added without a card
  explosion, and independently scheduled and tested.

## 6. Evidence-led match-3 tuning and depth
Jeffrey's play feedback drives this; collect specific complaints first. Decide
whether the problem is level balance or genuine mechanical repetition.
- If the issue is balance, tune existing moves, targets, and obstacle counts
  before adding a mechanic. Do not tune speculatively.
- If strategic repetition remains after tuning, prototype exactly one reusable
  mechanic. Prefer an **exposure-only reveal goal** that uncovers a known room
  object and speaks its Spanish name as passive exposure, without grading it or
  putting Spanish inside match correctness.
- A neutral layered restraint is the fallback experiment if play feedback calls
  for more setup depth rather than stronger thematic payoff. Do not build both
  experiments together.
- Before implementation, specify interactions with gravity/reachability,
  specials, existing blockers, hammers, reshuffling, droppers, orbayu, goals,
  and the Swift port. Add pure CORE tests before UI work.
- Done when: a written play problem justifies one bounded change, its reusable
  rule is recorded in `SPEC.md`, and measured play feedback shows improvement.

## 7. Typing / speech recall input  (deferred by Jeffrey — don't build unasked)

## 8. iPad port (SwiftUI/SpriteKit)
The endgame. SPEC.md is the design record; the CORE and SRS marked blocks and
the FX event stream port 1:1. Recorded audio replaces TTS here.
