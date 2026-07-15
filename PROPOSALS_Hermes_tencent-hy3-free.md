# PROPOSALS — Hermes (tencent/hy3:free) — Design Research Only

> **Status: PROPOSALS FOR DISCUSSION, NOT BACKLOG.** This is a research artifact produced from
> reading `AGENTS.md`, `SPEC.md`, `CHANGELOG.md`, `BACKLOG.md`, and the drill implementation in
> `index.html`. No other file was read, created, edited, or deleted. **No other file changed, no
> version bump, no commit.**
>
> **Independence statement:** I did **not** read any file whose name contains `PROPOSALS`. My
> proposals below are my own reasoning grounded in the four required docs and the drill code. I was
> not influenced by any other researcher's PROPOSALS document.
>
> **Web-verification caveat:** Attempted web research (Fluent Forever export capability,
> Homescapes/Gardenscapes mechanic inventory) was blocked by search-engine bot protection on every
> attempt (DuckDuckGo CAPTCHA/iframe, Bing/Brave/Startpage returned only the query echo, not real
> results; Fluent Forever support subdomains returned 403/404/timeout). All web-dependent claims
> below are explicitly marked **[UNVERIFIED]** and must be confirmed before any implementation is
> scoped. Knowledge-based items are labeled **[KB]** (from general knowledge, accuracy not confirmed
> via primary source).

---

## Grounding facts (from the repo, not assumptions)

- **Single-file invariant** (`AGENTS.md`): no build step, no external assets; Google Fonts CDN is the
  only network dependency; WebAudio-synthesized SFX; Web Speech API (es-ES) for word audio.
- **No `foreignObject`** (`CHANGELOG.md` v0.17): iPad Safari renders it unreliably. All tap targets
  must be **native SVG** (`<g>`, `<circle>`, `<text>`). This is a hard constraint for every proposal
  below.
- **Exam drill today** (`index.html` `renderDrill`/`answerCmd`/`drillOptions`/`COMMANDS`):
  - 22 provisional commands across 5 categories: `dir` (4), `rot` (4), `spd` (4), `man` (5), `pre` (5).
  - Per card, `drillOptions` builds **exactly 4** answers: the correct one + 3 distractors drawn
    **first from the same category** (the real exam confusions), then topped up from other categories
    if a category has <3 siblings. Unique icons enforced.
  - `dir` → junction SVG (crossroads, N/E/W/S arms). `rot` → roundabout SVG (4 exits at 12/3/6/9).
    All other categories → 2×2 icon pad.
  - **Auto-graded FSRS**: correct → Good(3), wrong/time-up → Again(1). Wrong answers requeue until
    answered right; first-attempt success counted for the "X de Y a la primera" score.
  - **Own review track**: `kind:'cmd'` excluded from the game's `dueCards()` gate and the main
    Repaso. Due-mode session completion pays ★1 + 🔨1; unlimited free practice pays nothing (no
    farming). This is deliberate — exam volume must never block the match-3 loop.
  - Opt-in timed mode (8s/card, not persisted).
- **Storage**: localStorage key `piso-asturiano`; full-state JSON export/import exists (`Copia de
  seguridad`, v0.15) via a textarea + clipboard. `loadState()` backfills every new state field.
- **Design invariants I must respect** unless I explicitly argue a violation:
  - Spanish lives in the meta/SRS layer, never inside the match mechanic.
  - FF principles: image→Spanish recall (no EN on card fronts), pronunciation-first, gender
    color-coded (el=#3E6E8E, la=#C0563B).
  - "Reviews are the source of hammers; learning stays the strongest tactical resource."
- **Already-public baseline** (`README`/backlog context): the app is on GitHub Pages; localStorage is
  per-device/per-browser, so a friend on their own device already gets independent progress.

---

# Direction 1 — TACTILE, HARDER DRIVING DRILL

## 1A. "Modo examen completo" — full response board, exactly one right

**Concept.** A toggle (off by default) on the drill start panel that, instead of the 4-option
multiple-choice, shows **all N command targets at once** as a response board; Cooper plays one audio
order and you tap the single correct target. Nothing narrows your options — mirroring real DGT
conditions where the examiner says one thing and you must pick the right action from everything
available. With 22 commands this is a 22-target board; categories can be spatially grouped or
shuffled.

**Learning value.** High, and pointed at the *actual exam failure mode*: under pressure you don't get
a 4-way menu, you get every possible action and must discriminate. Trains recognition of the right
command among all siblings-of-all-categories, not just same-category confusions. Strengthens the
"hear → act" reflex the drill already targets.

**Game value.** Pure skill trainer. No economy change. The harder mode is its own reward ("I can do
the real exam board"). Could feed a separate accuracy stat ("aciertos modo examen").

**Effort.** **M (medium).** Board layout + a distinct answer path. Reuses `answerCmd` grading (right
id vs tapped). No FSRS change needed if we keep auto-grade. Layout is the real work (below).

**Layout for ~22+ targets on iPad (native SVG only, no foreignObject):**
- A responsive CSS grid of tappable cells (each cell a `<button>` or a `<g>`-backed native SVG glyph)
  is simplest and iPad-safe. 22 cells → a 4-col × 6-row grid at ~90px cells fits a portrait iPad with
  the audio bar above. Each cell carries the command's icon + tiny ES label (label optional; the real
  exam is audio-only, so offer a "sin etiquetas" hard sub-mode).
- **Grouped vs shuffled:** recommend **category-clustered by default, with a shuffle toggle**.
  Clustered (dir cluster, rot cluster, spd/man/pre clusters) lets the brain use spatial memory during
  *practice*; shuffled removes that crutch for the *exam-sim* feel. This is a tuning choice, not a
  regression.
- **Tap ergonomics:** minimum 44×44pt targets (Apple HIG; also the v0.16/0.17 floor already in code).
  Sticky audio-replay button at top; progress dot-row; the board scrolls if it exceeds viewport.
- For the `dir`/`rot` categories you already have geometric SVGs — in full-board mode those four can
  keep their natural positions (crossroads arms / roundabout exits) while the remaining ~18 sit in the
  grid, OR the whole board can be abstract cells. Recommend: keep `dir`/`rot` geometric glyphs in their
  natural spots, grid the rest.

**Scoring / FSRS implications (the interesting part):**
- Keep **auto-graded FSRS** (correct=Good, wrong=Again). On a 22-board a wrong tap is far more likely,
  so raw success rate drops — but FSRS already handles that via stability; the card just gets reviewed
  sooner. Good, honest, no self-grading.
- **First-attempt accuracy** will look worse in full-board mode. Recommend a *separate* accuracy stat
  per mode so the 4-choice score and the full-board score aren't compared apples-to-oranges.
- **Requeue-on-wrong** still applies; on a 22-board, requeue churn is heavier. Cap requeues per card
  per session (e.g., 2) to avoid a death spiral, then show the right answer and move on (grade=Again).
- **Reward honesty:** full-board is just a *practice* surface unless it's a due session. Keep the
  existing rule: ★1+🔨 only for completing a *due* session, regardless of mode. Don't let full-board
  become a farming loophole. **Flag:** if full-board practice is too easy to grind, it could dilute the
  "reviews are the source of hammers" invariant — keep it practice-only or require it to draw from the
  due queue like normal.

**Risks / open questions.**
- 22 simultaneous distractors may overwhelm rather than teach — needs the category-cluster + reduced
  set (e.g., "modo examen" draws 8–12 random targets, not all 22) as an easier on-ramp.
- Does full-board retroactively make the 4-choice mode feel like a crutch? Probably fine; they're
  different drills.
- Accessibility: 22 small labels on a phone is cramped. Phone = abstract cell grid; iPad = comfortable.

**Viability.** **HTML-prototype-viable now.** The toggle, board, and grading all live in `renderDrill`;
no core/pure block touched (drill is UI). Fits the single-file + native-SVG constraints.

---

## 1B. More driving-like interaction concepts

For each: does it train the *actual exam skill* (hear Spanish → act under pressure) or just add novelty?

### 1B-i. Swipe / steering gestures
**Concept.** Replace taps with directional swipes: hear "Gire a la derecha" → swipe right; "Cambie de
sentido" → swipe down/up-U. On `dir`/`rot` you could literally steer the simulated car through the
junction/roundabout SVG.
**Learning value.** Medium-high *if* the gesture maps to the meaning (swipe-right = turn right). It
reinforces direction kinesthetically — embodied cognition helps recall under stress. Weak for
`spd`/`man`/`pre` (no natural gesture).
**Game value.** Novelty + tactile satisfaction; strong "driving feel."
**Effort.** **M.** Touch handlers + gesture→command mapping. Native-SVG friendly (gestures are DOM
events). Keep the icon/SVG targets as the visual; swipe is an *alternative* input, not a replacement,
so accessibility is preserved.
**Honesty check.** Trains recall of direction meaning, which *is* the exam skill for `dir`/`rot`. For
other categories it's novelty. **Recommend: gesture as an optional input layer on `dir`/`rot` only**,
not a global rewrite.
**Viability.** HTML-prototype-viable now (touch events).

### 1B-ii. Persistent dashboard / junction scene
**Concept.** A single persistent SVG "drive scene" (a road, your car, a junction ahead). Each command
acts on the scene: "reduce la velocidad" dims/slows a speedometer; "gire a la derecha" animates a
turn; "estacione" parks the car. Commands become *actions on a continuous drive* rather than discrete
cards.
**Learning value.** High for *sequencing and context* — the exam is a continuous flow of orders, not
isolated flashcards. Seeing your last action persist ("you're now in the right lane") builds the
realistic mental model.
**Game value.** High engagement; it's a tiny driving sim. Cooper can narrate ("¡Buen cambio de
sentido!").
**Effort.** **L (large).** Stateful scene + per-command animation + a notion of "current driving
state." This is a mini-game, not a tweak. Biggest risk: scope.
**Honesty check.** Train the real skill (hear → act under pressure, in context). Yes, strongly — more
than the discrete card.
**Viability.** **iPad-port-era** for the polished version (recorded audio, smooth SpriteKit animation);
a **limited HTML prototype** is viable (static SVG scene + a few animated state changes) but would be
rough in the single-file constraint.

### 1B-iii. "Route mode" — command SEQUENCES held in memory
**Concept.** Cooper issues a **3–4 order chain** ("Siga recto, luego la segunda salida, después
reduzca la velocidad"), and you must execute/select them **in order**; the sequence is held in working
memory, not shown all at once. Mirrors a real drive where the examiner stacks instructions.
**Learning value.** Highest of the three for the *actual exam*: the DGT oral exam is a stream of
orders, and the failure mode is losing the thread. Training working-memory retention of Spanish
commands is exactly the skill.
**Game value.** Tense, game-like, "beat the route." Natural Cooper framing ("Llévame a la playa").
**Effort.** **M.** Needs a sequence queue + per-step grading + a "route" data structure in `COMMANDS`
(mark some commands as chainable / define routes). Auto-grade each step.
**Honesty check.** Trains recall-under-pressure-in-sequence = the exam skill, squarely. Strongly
recommended.
**Viability.** **HTML-prototype-viable now.** Pure UI/state; no core block. Native SVG for any map.

**Direction 1 recommendation:** Build **1A (full-board, off by default)** + **1B-iii (route mode)** as
the two that most directly train the real exam skill. 1B-i (gestures) as an optional `dir`/`rot` input
layer. Defer 1B-ii (persistent scene) to iPad-port era.

---

# Direction 2 — HOMESCAPES DEPTH RESEARCH

Inventory of Homescapes/Gardenscapes mechanics **not yet in this game**, split as requested. All items
are **[KB]** (general knowledge; not verified against current Playrix builds — see web caveat).
"Inspired-by only" — no cloned names/assets/art. Excludes social/competitive/monetization entirely.

## (a) Match-3 sophistication

| Mechanic | In game? | Engrossing because | Learning value (if any) | Effort |
|---|---|---|---|---|
| **Honey / syrup** (spreading sticky tile) | No (we have orbayu/jelly `J`, similar spirit) | Spread creates urgency | Low — pure obstacle | S |
| **Chains-on-chains** (double/triple chained tiles) | Partial (`C` chained tile exists, single) | Layered unlocking | Low | S |
| **Portals / teleporters** (tiles enter one, exit another) | No | Spatial puzzle twist, breaks gravity expectation | Low–med (could teach prepositions: *por aquí sale allí*) | M |
| **Generators / spawners** (cells that periodically create a tile/obstacle) | No | Dynamic board, no static solve | Low | M |
| **Expanding hazards** (e.g., ice that grows each move) | No (orbayu spreads but is not "ice") | Time pressure | Low | M |
| **Color-bomb / rainbow specials** | Partial (🔮 laser wipes a color) | Satisfying clears | Low | — |
| **Obstacle "goals" with sub-steps** (free all + collect N) | Yes (goals auto-derived) | — | — | — |
| **Level goal types: timed levels** | No (moves are the only loss condition) | Different pressure profile | Low | M |
| **Level goal types: "bring X to bottom" / ingredient drop** | No | Gravity puzzle variant | Med (could map to *bajar la compra*) | M |
| **Pre-level booster equipping** (choose boosters before a level) | Partial (boosters exist: 🔨🔧; no pre-equip choice) | Strategy/agency | Low (but see Dir 3d economy) | S |
| **Lives / energy system** (wait or refill) | **No** | Retention via scarcity | **Negative for learning** — gates practice | — (rejected) |
| **Multi-stage / "boss" levels** | No | Climax feel | Low | M |
| **Rainbow/collectible token tiles** | No | Collection completionism | Med (collect = vocabulary sets) | M |

**Learning-value verdict for (a):** Almost none of the match-3 sophistication carries *learning* value
directly — and that's by design (SPEC: "Match-3 stays pure fun… no vocabulary inside the puzzle
mechanic"). The one lever with learning potential is **goal-type variety mapped to Spanish scenarios**
("bring the compra to the bottom" = *bajar la compra*), and **portals** could subtly teach
prepositions. Recommend treating (a) as *engagement-only* polish, not a learning investment, and
**explicitly rejecting the lives/energy system** (it gates practice and fights the "learning stays the
strongest resource" invariant).

## (b) Meta-game and sub-games

| Mechanic | In game? | Engrossing because | Learning value | Effort |
|---|---|---|---|---|
| **Day/task narrative structure** (story beats between levels) | Partial (Cooper banter + task list exist) | Soap-opera pull | **High already** — the room renovation *is* the grammar on-ramp | — |
| **Mini-games between levels** (pin-pull puzzles, pair-matching) | No | Variety break | **Med-high**: a *pair-matching* minigame of Spanish↔image is pure SRS-shaped practice; pin-pull is novelty | M |
| **Decoration choice moments** (pick 1 of 3 styles) | Partial (you buy fixed items; no style choice) | Agency/ownership | **Med**: a "pick the style" moment could require *naming* the choice in Spanish (tap the correct *la lámpara moderna* vs *la lámpara clásica*) | S–M |
| **Seasonal / event levels** | No | Return hook | Low (and risks "chore" feel for a solo learner) | M |
| **Daily rewards / login bonus** | No | Habit hook | **Med**: a daily "Cooper's word of the day" reward could feed the SRS (see Dir 3d) | S |
| **Achievement / milestone badges** | Partial (stats tab exists) | Completionism | Med (badges = grammar milestones: "Conjugaste 50 imperativos") | S |
| **Photo/decoration personalization** | No (emoji only) | Ownership | **High but iPad-only** (camera; see SPEC iPad port) | L (iPad) |
| **Renovation "reveal" cutscene** | No (items just appear) | Payoff dopamine | Med (a short Cooper reveal after furnishing a room = comprehensible input) | S |

**Learning-value verdict for (b):** Two items are genuine learning investments, not just engagement:
- **Pair-matching minigame** between levels (match Spanish word ↔ its image/emoji) — this is SRS
  practice disguised as a break. Strong fit, low-ish effort.
- **Decoration choice moments that require a Spanish label tap** — turns a cosmetic choice into a
  recall event.
- **Daily reward → SRS feed** (cross-links to Direction 3d economy).
Everything else (seasonal events, login streaks as pure retention) is engagement-only and should be
weighed against the "no chore gate" rule. **Reject social/competitive entirely** per brief.

**Direction 2 recommendation:** Pursue (b)'s **pair-matching minigame** and **Spanish-labeled decoration
choices** as learning-bearing; treat (a)'s match-3 sophistication as optional engagement polish and
**reject lives/energy**. All **[KB]** — verify against current Playrix titles before scoping.

---

# Direction 3 — GENERAL-VOCAB SRS: REPLACING FLUENT FOREVER

## 3a. Import — Fluent Forever app export options

> **[UNVERIFIED — web research blocked].** The following is my best understanding from general
> knowledge of the Fluent Forever (FF) app; **Jeffrey must confirm the real export path before any
> build.** I could not reach FF support/docs (403/404/timeout) or any search engine result (bot
> block).

**What I believe about FF export (treat as hypothesis):**
- The FF app is **closed-source and cloud-backed**; it is **[UNVERIFIED]** whether it offers a
  user-facing bulk export of your deck (CSV/JSON/Anki `.apkg`). My strong prior: FF does **not**
  advertise a clean "export everything to CSV/Anki" button — it's designed as a walled garden, which is
  precisely why replacing it is attractive. **Flag: this is the single biggest unknown in Direction 3.**
- If an export exists, likely formats would be **CSV** (word, image ref, audio ref, mnemonic) or an
  **Anki** intermediate. Images/audio in FF are often stored server-side and may **not** export with
  the text (licensing/asset control). **[UNVERIFIED]**

**Proposed import path (defensive design):**
1. **Primary (if FF export exists):** accept CSV/JSON; map columns → Piso card model
   (`{id, kind, es, en, gender, imageRef, audioRef}`). One-time "Importar desde Fluent Forever"
   modal in the existing `Copia de seguridad` area.
2. **Fallback A (Anki intermediate):** if FF exports to Anki, import the `.apkg`/`.csv` via a tiny
   converter (browser-side JS, no server) into the same card model. Anki is the lingua franca of SRS
   export, so this is the most robust fallback. **[KB: Anki supports CSV import/export; .apkg is a
   zip — extractable client-side.]**
3. **Fallback B (manual CSV you build):** Jeffrey exports his 1000+ words however he can (even
   copy-paste into a spreadsheet) → a strict `es,en,gender,type` CSV the game parses. Lowest-tech,
   always works, no FF cooperation needed.
4. **Image/audio reality:** assume FF media **won't** travel. Plan to re-derive media in Piso: emoji
   for objects (already the v1 convention), Web Speech es-ES for audio (already the convention), and
   **personal photos on the iPad port** (SPEC's killer feature). So import = **text + structure**, not
   media. This is honest and fits the single-file constraint.

**Recommendation:** Build the importer around **Fallback B (manual strict CSV)** as the guaranteed
path, and add FF-CSV/Anki mapping on top *only after* Jeffrey confirms what FF actually exports. Don't
block the feature on an unconfirmed export capability.

## 3b. Card types beyond object nouns

Which FF-style card types belong, given emoji/image constraints of a single HTML file:

| Card type | Belongs? | How it renders (single-file, emoji/WebAudio) | Notes |
|---|---|---|---|
| **Picture words (object nouns)** | Yes — already the core (`obj`) | Object emoji + es-ES audio + gender color | The existing model |
| **Minimal pairs** (pero/perro, casa/caza) | **Yes — high value** | Two emoji/word cards; drill "which did you hear?" via audio-only tap | Trains the listening discrimination A2 learners need; pure audio, no media needed |
| **Word forms** (singular/plural, gender pairs) | Yes | Tap the correct form given audio; reuses gender-color + emoji | Fits the grammar ramp (plurals/los-las already introduced) |
| **Personal example sentences** | **Partial** | Text card, es-ES reads it, recall the *blanked* word; emoji where possible | Risky in single-file: long text ≠ FF image method. OK as audio+text, not as "image recall." Defer rich version to iPad |
| **Sound-separated spelling / pronunciation drills** | Yes | Audio-only discrimination tap | Cheap, high value, no media |
| **Grammar-morphology cards** (conjugate) | **Defer** | Needs typed/speech input (BACKLOG #7, deferred by Jeffrey) | Not now |

**Recommendation:** Add **minimal pairs** and **word forms** now (both are audio/emoji-native, no media,
fit the single file). **Defer personal-example-sentences rich cards** to the iPad port where photos +
typed input are viable. This respects the "no typing/speech recall until asked" deferral.

## 3c. Storage honesty — 1000+ cards with images

| Option | Pros | Cons | Verdict for 1000+ |
|---|---|---|---|
| **Text-only cards now (localStorage)** | Zero media; smallest footprint; works today | 1000+ JSON cards + review log could approach the **~5 MB localStorage cap** over time, but text-only is usually fine (~hundreds of KB) | **Viable now** for text; watch the `S.log` (capped 2000) and deck size |
| **IndexedDB** | Much larger quota (hundreds of MB), async, handles media | **Violates single-file simplicity** (still client-side, no server, but adds an async storage layer and more code); not a hard architectural break, but a meaningful one | **Defer** until media-rich cards exist; overkill for text-only |
| **Defer rich cards to iPad port** | iPad = SwiftData/photos/camera; the designed killer feature | Delays FF-replacement of *rich* cards on web | **Recommended split**: text+audio SRS *now* in localStorage; *rich/photo* cards on iPad |

**Recommendation:** **Text + es-ES audio cards in localStorage now** (cheap, fits the invariant). Use
**IndexedDB only when/if** image/photo cards arrive — and that's the iPad port's job per SPEC. Don't
preemptively complicate the single file. Keep `S.log` capped (already 2000) and consider archiving old
logs to control growth.

## 3d. ECONOMY DESIGN — free-play SRS practice must feed game progression

The core creative ask. Constraint from invariants: reviews are the source of hammers; learning stays the
strongest tactical resource; no chore gate; self-grading under reward pressure must stay honest.

**Model 1 — Lives only from reviews.**
You get N "practice lives"; a completed review session refills them; you can't play match-3 without
lives. *Motivates daily review?* Moderately (scarcity). *Honest?* No — it turns review into a toll
and invites fake-grading to get lives. *Chore gate?* **Yes — rejects the "no chore gate" rule.** ❌
**Reject.**

**Model 2 — Daily review "key" that unlocks play.**
Review today → earn a "llave de Cooper" that unlocks the next level or a booster. *Motivates daily?*
Yes (miss a day, no key). *Honest?* Same self-grade risk as Model 1, plus it **gates the fun behind
study** — explicit chore gate. ❌ **Reject** (collides with invariant).

**Model 3 — Review streaks as booster multipliers.**
A review streak (consecutive days) multiplies booster drops or unlocks cosmetic Cooper gear. Miss a day
→ multiplier resets to 1×, but you can still play. *Motivates daily?* Yes (loss-aversion on the
streak). *Honest?* **Yes** — self-grading a review still earns the streak; there's no play-lock, so
the temptation to fake-grade is low (you're not unblocking anything, just a bonus). *Chore gate?* No —
play is never blocked. *Missed day?* Streak resets, no punishment beyond losing the multiplier. ✅
**Strong.**

**Model 4 — Separate currency for a new content type.**
Reviews earn "monedas de Cooper" spent only on *new vocab content* (e.g., themed word packs,
minimal-pair decks from 3b), not on hammers/stars. *Motivates daily?* Yes if the content is desirable.
*Honest?* Yes — it's a sink, not a gate; faking reviews just wastes your own time. *Chore gate?* No.
*Missed day?* You just earn slower. ✅ **Strong, and it directly serves FF-replacement** (earn the
words you'd otherwise have in FF).

**Model 5 — "Review dividend": reviews top up a slowly-draining hammer/star trickle.**
Reviews add to a small passive income of hammers/stars (capped), so daily review = steady resources
without hard-gating. *Motivates daily?* Mildly. *Honest?* Yes. *Chore gate?* No. *Missed day?* Trickle
just doesn't grow. ✅ **Acceptable, weaker motivator than 3/4.**

**Recommended: Model 3 (streak multipliers) + Model 4 (separate vocab currency), combined.**
- **Streak multiplier** keeps daily review emotionally sticky without ever blocking play → satisfies
  "motivate daily" + "stays honest" + "no chore gate."
- **Vocab currency** gives reviews a *purposeful* payoff that directly replaces Fluent Forever: your
  study effort unlocks new Spanish content (minimal-pair decks, word packs) inside the same game. This
  is the cleanest answer to "free-play SRS practice must feed game progression" — the progression it
  feeds is *your vocabulary*, which is the whole point.
- **On a missed day:** streak resets to 1× (soft, non-punitive) and vocab-currency accrual just pauses.
  No lost progress, no locked game. Matches a solo learner's real life.

**Why not gate play:** The existing design already pays ★1+🔨 for *due* review sessions and keeps exam
drill on its own track — so the "review → resource" link exists. The proposal extends it *additively*
(streak bonus + vocab currency) rather than *restrictively* (lives/keys that block). This preserves the
invariant that learning is the strongest resource without making the game a chore.

---

# Direction 4 — SHAREABLE WITH FRIENDS (driving drill first)

Baseline already true: public on GitHub Pages; localStorage per-device → a friend on their own device
already has independent progress. Design from there. No accounts, servers, or tracking (hard constraint).

## 4a. Shareable driving-only experience

**Option 1 — URL parameter (`?modo=examen`).**
Boots straight into the garage drill (skipping the house/room flow) on load. Implementation: read
`location.search` in `INIT`; if `modo=examen`, switchTab('casa'), set `S.room='garaje'`,
`startDrill(...)`. **Maintenance cost: near-zero** — one parse in init, reuses all existing drill code.
No new file, no duplicated marked blocks. **Respects the single-file invariant perfectly.**
**Option 2 — Separate `examen.html` in the same repo sharing the marked code blocks.**
Would mean either copying `COMMANDS`/`renderDrill`/`answerCmd` (duplication → drift risk, violates
"single source of truth") or `<iframe>`/shared-fragment hacks (ugly, breaks single-file ethos).
**Maintenance cost: high** (two copies of drill logic to keep in sync).
**Recommendation: Option 1 (`?modo=examen`).** Nearest-term, cheapest, invariant-safe. A friend gets a
link like `…/index.html?modo=examen` and lands in the drill. Option 2 only if Jeffrey later wants a
*statically different* exam page (e.g., embedded on a separate site) — not warranted now.

## 4b. First-run experience for a non-Jeffrey user

Today the welcome, Cooper framing, and UI assume Jeffrey (Oviedo, his piso, "our flat"). For a friend
preparing for the **same DGT exam**: minimal onboarding = keep Cooper + drill, but the house/shop
narrative ("our piso in Oviedo") is Jeffrey-specific. Proposal:
- **Two lightweight welcome variants** chosen on first run: *(i) "Soy Jeffrey / ya tengo mi piso"*
  (current experience) vs *(ii) "Solo el examen"* (drives straight to `?modo=examen`-style drill,
  hides/shrinks the house tabs, Cooper says a generic "¡Vamos a aprobar!" instead of "our flat").
- **Curious non-learner** (someone just trying the drill for fun): same exam-only mode, Cooper framed
  as a game ("ayuda a Cooper a aprobar"), no Spanish-learning pressure, EN subtitles emphasized.
**Effort: S.** A first-run modal with 2–3 choices; persists a `S.audience` field (needs a backfill line
in `loadState`, per invariant). Doesn't break single-file.

## 4c. Multiple people on ONE device

**Lightweight local profiles** (a name picker keying separate localStorage entries, e.g.,
`piso-asturiano::Maria`): honest multi-user on a shared iPad, no server. **Cost: M** (profile switcher
UI + keyed storage + migration of the existing single key).
**Alternative (the brief's "honest answer"):** "Everyone uses their own device + existing
export/import for portability." Since localStorage is already per-device and the `Copia de seguridad`
JSON export/import exists, a friend can export from their phone and import on a shared tablet.
**Recommendation:** **Don't build profiles yet.** The export/import already solves portability, and
Jeffrey's stated use (share with friends, each on their own device) doesn't require same-device
multi-user. Profiles add meaningful complexity for a case the existing design already covers. **Flag
for later** if Jeffrey actually shares one iPad with a co-learner.

## 4d. Constraint audit

- No accounts/servers/tracking: all proposals are client-side only. ✅
- Single-file pressure: `?modo=examen` (4a) and the audience modal (4b) add only a few lines to `INIT`
  and `loadState` backfill — **no threat** to the single-file architecture. Profiles (4c, deferred)
  would be the only moderate addition, and we recommend deferring it. ✅
- **Nearest-term:** 4a (`?modo=examen`) is the cheapest, highest-value shareable feature and should ship
  before Directions 2 and 3.

---

# RECOMMENDED SHORTLIST (promote to BACKLOG.md, in order)

1. **4a — `?modo=examen` URL boot into the drill.** (S) Nearest-term, cheapest, invariant-safe
   shareable experience. Ships first.
2. **1A — "Modo examen completo" full response board** (off by default) + **1B-iii Route mode**
   (M). The two drill upgrades that most directly train the real DGT skill (hear → act among all
   options / in sequence).
3. **4b — First-run audience modal** (S). Makes the shared drill usable by a friend/exam-candidate
   without Jeffrey's context. Pairs with #1.
4. **3a/b/c — FF-replacement SRS: text+audio import (manual CSV path) + minimal-pair & word-form
   cards in localStorage** (M). Build the guaranteed path now; verify FF export later. Replaces FF
   incrementally.
5. **3d — Economy: review-streak multiplier + separate vocab currency** (M). The honest way free-play
   SRS feeds progression without a chore gate.
6. **2b — Pair-matching minigame + Spanish-labeled decoration choices** (M). The two
   Homescapes-style meta features that carry real learning value.
7. **1B-i — Gesture input layer on `dir`/`rot`** (M, optional). Tactile driving feel; scoped to the
   categories with natural gestures so it trains meaning, not just novelty.

*(Deferred / rejected: 1B-ii persistent drive scene → iPad-port era; 2a lives/energy system →
rejected; 4c local profiles → deferred; 3b personal-example rich cards & typed input → iPad/deferred
per BACKLOG #7.)*

---

# QUESTIONS FOR JEFFREY

1. **Fluent Forever export — the critical unknown.** What does the FF app *actually* let you export
   today (settings → ?). CSV? Anki? Nothing? This determines whether 3a is a clean importer or a
   manual-CSV-only build. *(I couldn't verify this — web blocked.)*
2. **Modo examen completo scope.** Full 22-target board, or a randomized 8–12 subset per card
   (easier on-ramp, still "nothing narrows your options")? And category-clustered vs shuffled default?
3. **Route mode sequencing.** Want 3- or 4-order chains? And should routes be hand-authored DGT-style
   scripts (e.g., "drive to the plaza") or randomly assembled from `COMMANDS`?
4. **Economy shape.** Do you like the combined **streak-multiplier + vocab-currency** model (3d), or
   prefer one alone? The vocab currency is what actually replaces FF's value — want it spent on word
   packs, or on boosters/decorations?
5. **Audience modal (4b).** Is "Solo el examen" mode worth building, or is the shared link
   (`?modo=examen`) enough and you'll just tell friends "tap the garage"? Affects whether 4b ships with
   4a.
6. **Same-device multi-user.** Are you actually sharing one iPad with a co-learner, or is
   "own device + export/import" genuinely sufficient? Determines whether 4c ever gets built.
7. **Verification of [KB] items.** Direction 2's Homescapes inventory is from general knowledge — want
   me to re-attempt web verification later (different network/method), or accept it as directional?

---

*Researcher: Hermes (tencent/hy3:free). This document is proposals only; it changes no code, no version,
no other file. Diff = this new `PROPOSALS_Hermes_tencent-hy3-free.md` only.*
