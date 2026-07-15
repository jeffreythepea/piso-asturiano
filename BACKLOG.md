# Backlog

The work queue, roughly in value order. Pick an item, read its context in
SPEC.md, build it as a discrete shippable chunk (tests green, version bumped,
CHANGELOG line added). Move the item here → CHANGELOG when done. Jeffrey
prioritizes; don't invent large features not listed without asking him.

## 3. FSRS parameter fitting
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
