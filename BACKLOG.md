# Backlog

The work queue, roughly in value order. Pick an item, read its context in
SPEC.md, build it as a discrete shippable chunk (tests green, version bumped,
CHANGELOG line added). Move the item here → CHANGELOG when done. Jeffrey
prioritizes; don't invent large features not listed without asking him.

## 1. Atomic Fermín command reparse  ← highest priority
Implement the page-by-page atomic inventory in
[`references/fermin-atomic-command-inventory.md`](references/fermin-atomic-command-inventory.md)
and replace grouped precheck cards with independently testable variants. The
PDF has been visually re-audited; its checksum and unresolved source conflicts
are recorded in that inventory. Natural Spanish drill wording may be derived
from a grouped source phrase, but it must be
labelled `source-derived` rather than represented as a verbatim examiner quote.
- Give every command: stable id, exact source text, drill wording, phase
  (`driving` or `precheck`), response type, wording status (`verbatim` or
  `source-derived`), and instructor-validation status.
- Preserve existing ids when the meaning survives. Use new stable ids for
  split variants.
- Expected corpus: approximately 31 cards rather than the current 23.
- Explicit source conflict to resolve: page 3 says *líquido de frenos* in
  Spanish but *windscreen wiper fluid* in English, and the diagram appears to
  support washer fluid. Do not teach either interpretation as authoritative
  until Fermín confirms it.
- Done when: every compound alternative that could be asked independently has
  its own card, the unresolved fluid term has been confirmed or explicitly
  withheld, and focused tests lock the inventory and wording.

## 2. Driving / precheck drill modes
Add a three-way Garage selector: **Conducción**, **Comprobaciones**, and
**Mixto**. Remember the last-used mode; old saves default to `driving`.
- Filter due review and free practice to the selected phase without duplicating
  command cards or FSRS histories.
- Show phase-specific due counts and keep results distinguishable by phase.
- Add the new persisted field to `DEFAULT_STATE` and backfill it in
  `loadState()`.
- Done when: all three queues contain the correct cards, the selection survives
  reload/export/import, and prechecks never appear in a driving-only session.

## 3. Command scheduling integrity and instrumentation
Implement the approved mode policy recorded in `PROPOSAL_REVIEW.md`:
- Only **untimed due review** updates command FSRS scheduling.
- Timed due sessions and all free-practice sessions log results but do not
  reschedule cards or pay an additional reward.
- Command logs record phase, due/practice mode, timed state, first-attempt
  status, selected target, elapsed time, audio replay count, and response
  surface/layout id while preserving backup/restore compatibility.
- Done when: tests prove the scheduling boundary, exported logs distinguish
  every current mode, and existing saves migrate cleanly.

## 4. Vehicle-specific precheck practice  ← blocked on Fermín
After Fermín supplies the training/test car make and model and confirms the
actual controls and procedures, add engine-bay and dashboard response diagrams.
- Validate component names, locations, controls, and required actions against
  the real vehicle; do not assume the Toyota/Renault illustrations in the guide
  match the test car.
- Keep generic listening comprehension separate from vehicle-specific physical
  location/procedure practice, with honest measurement for each.
- Done when: the diagrams and expected responses are instructor-validated and
  usable on iPad without `foreignObject`.

## 5. Exam-focused product mode
After items 1–3 have been used in Safari, make the exam the primary working
experience without duplicating the app into a separate HTML product.
- Open into the last-used tab or Garage, and evaluate an optional Exam Focus
  presentation that hides unrelated tabs without deleting their progress.
- Reassess extracting a standalone exam app only after several weeks of actual
  use show that the apartment and match-3 portions are no longer useful.
- Done when: Jeffrey can enter the exam drill with minimal friction and the
  decision to keep or separate the broader game is supported by usage rather
  than architecture speculation.

## 6. FSRS parameter fitting
`S.log` records every review. Once ~300+ entries exist, fit FSRS weights to
Jeffrey's data (a `tools/fit-fsrs.js` script reading an exported log; output:
a `FW` array to paste in). Don't change the scheduler API.
- Done when: script exists, documented in README, and produces a plausible
  weight set from the real log.

## 7. Rotating phrase variants
Second/third action phrase per object, rotating on task completion or as new
task tiers. Grammar target: present tense statements after imperatives.

## 8. Level difficulty tuning pass
Jeffrey's play feedback drives this; collect specific complaints first
(moves, targets, obstacle counts). Don't tune speculatively.

## 9. Typing / speech recall input  (deferred by Jeffrey — don't build unasked)

## 10. iPad port (SwiftUI/SpriteKit)
The endgame. SPEC.md is the design record; the CORE and SRS marked blocks and
the FX event stream port 1:1. Recorded audio replaces TTS here.
