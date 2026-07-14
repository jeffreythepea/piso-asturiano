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
**Done in three slices:**
- v0.16: roundabout SVG surface (`cmd.cat === 'rot'`) — 4 exits at 12/3/6/9
  o'clock positioned per Spanish convention.
- v0.17: fixed iPad Safari rendering — replaced `foreignObject` with native
  SVG groups.
- v0.18: junction SVG surface (`cmd.cat === 'dir'`) — 4-arm crossroads with
  c-recto → north, c-der → east, c-izq → west, c-sentido → south.
- v0.20: timed-response mode — opt-in toggle "⏱️ Modo contrarreloj", 8s per
  card, color-shifting badge, time-up counts as wrong.

## 3. FSRS parameter fitting
`S.log` records every review. Once ~300+ entries exist, fit FSRS weights to
Jeffrey's data (a `tools/fit-fsrs.js` script reading an exported log; output:
a `FW` array to paste in). Don't change the scheduler API.
- Done when: script exists, documented in README, and produces a plausible
  weight set from the real log.

## 4. Exterior room — la terraza / el hórreo
**Done (v0.19).** Fifth purchasable room with 12 items: mesa, silla
plegable, sombrilla, geranios, lavanda, tomatera, regadera, tendedero,
pinzas, farolillos, hórreo, botella de sidra. Tasks use fresh *tú*
imperatives like *cuelga la ropa*, *riega los geranios*, *abre la
sidra*. Placed between *el baño* and *el garaje* in the unlock chain;
garaje remains the always-unlocked exam-drill room.

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
