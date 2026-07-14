# Backlog

The work queue, roughly in value order. Pick an item, read its context in
SPEC.md, build it as a discrete shippable chunk (tests green, version bumped,
CHANGELOG line added). Move the item here → CHANGELOG when done. Jeffrey
prioritizes; don't invent large features not listed without asking him.

## 1. Instructor-verified exam commands  ← highest value, blocked on Jeffrey
Replace the provisional `COMMANDS` set with the verbatim phrasing from
Jeffrey's autoescuela instructor (Oviedo, DGT practical exam).
- Keep command `id`s stable where the meaning is unchanged (preserves FSRS
  history); new ids for genuinely new commands.
- Done when: list matches instructor's wording, warning banner in the drill
  panel is removed or softened, CHANGELOG notes verification.

## 2. Exam drill v2
- SVG junction/roundabout diagrams as tappable answer surfaces (replace the
  icon pad for dir/rot categories). The FX layer shows how to do inline SVG.
- Timed-response mode (answer within N seconds = exam pressure).
- Done when: rotonda questions render a roundabout with tappable exits, and a
  timed mode exists as an opt-in toggle.

## 3. FSRS parameter fitting
`S.log` records every review. Once ~300+ entries exist, fit FSRS weights to
Jeffrey's data (a `tools/fit-fsrs.js` script reading an exported log; output:
a `FW` array to paste in). Don't change the scheduler API.
- Done when: script exists, documented in README, and produces a plausible
  weight set from the real log.

## 4. Exterior room — la terraza / el hórreo
Fifth purchasable room (12 items, new vocab domain: exterior/weather/plants),
joins the unlock chain after el baño. Follow the new-room checklist in
AGENTS.md.

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
