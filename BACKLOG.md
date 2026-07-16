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

## 3. Personal vocabulary intake  ← manual baseline shipped; bulk evidence pending
v0.31 adds durable one-at-a-time entry with stable identity, duplicate handling,
deletion, gender, emoji cues, es-ES audio, fresh FSRS cards, migration, and full
JSON backup/restore. It deliberately does not claim that emoji replaces
personal-image learning.
- Evaluate the manual flow with a real 20-word batch and revise only from
  observed friction.
- For bulk intake, first inspect the actual Fluent Forever data export requested
  by Jeffrey; do not invent its format or claim to preserve unavailable review
  history.
- Keep English glosses off recall fronts. Do not add browser image storage or
  IndexedDB without a separately approved, completely recoverable media design.
- Done when: the real batch reviews correctly after continued use, Jeffrey finds
  intake worthwhile, and any bulk path is based on an inspected source file.

## 4. Personal image cues and image search  ← essential
Emoji cues are an interim plumbing baseline, not an adequate replacement for
personally selected images in the Fluent Forever learning model. Personal
vocabulary cards need durable image-backed fronts.
- First support adding or replacing an image through the lowest-friction
  browser paths that work reliably on Jeffrey's iPad and Mac: clipboard paste,
  drag/drop, and Photos/Files selection. Resize and orient a local review
  derivative while preserving a clear remove/replace action.
- The preferred discovery experience is an in-app image search, ideally Google
  Images. Investigate the supported API, cost, authentication, usage rights,
  privacy, CORS, and single-file implications before choosing a provider. Do
  not scrape Google Images, hotlink remote results, or ship a brittle hidden
  dependency. An external-search → paste/Photos handoff is the acceptable first
  fallback if direct search is not defensible.
- Store an ingested local copy used by the card; a remote URL alone is not a
  recoverable learning asset. Define quota failures, missing-image behavior,
  replacement, deletion, and orphan cleanup.
- Backup and restore must recover both scheduling state and every personal
  image. If images require IndexedDB or another store, replace the current
  single-JSON recovery claim with a complete archive/manifest design before
  shipping.
- Keep English off card fronts. The chosen image remains a recall cue, not a
  recognition grade or permission to change FSRS semantics.
- Done when: Jeffrey can find or paste/select an image, attach and replace it on
  a personal word, review it offline on the card front, delete it cleanly, and
  restore the complete image-backed card from backup on iPad Safari.

## 5. FSRS parameter fitting
`S.log` records every review. Once ~300+ entries exist, fit FSRS weights to
Jeffrey's data (a `tools/fit-fsrs.js` script reading an exported log; output:
a `FW` array to paste in). Don't change the scheduler API.
- Done when: script exists, documented in README, and produces a plausible
  weight set from the real log.

## 6. Targeted phrase and word-form expansion
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

## 7. Evidence-led match-3 tuning and depth
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

## 8. Typing / speech recall input  (deferred by Jeffrey — don't build unasked)

## 9. iPad port (SwiftUI/SpriteKit)
The endgame. SPEC.md is the design record; the CORE and SRS marked blocks and
the FX event stream port 1:1. Recorded audio replaces TTS here.
