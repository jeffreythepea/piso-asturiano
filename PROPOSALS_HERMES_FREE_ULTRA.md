# PROPOSALS_HERMES_FREE_ULTRA.md

## Research for Discussion — Not Backlog

*Platform*: Single-file HTML prototype (SPEC.md)  
*Target*: Eventual native iPad app (SwiftUI/SpriteKit)  
*Constraint*: No monetization, accounts, tracking, social, or competitive systems

---

## 1. TACTILE, HARDER DRIVING DRILL

### 1.1 Full Response Board — “modo examen completo” (toggleable, off by default)
Present all ~22 command responses simultaneously after audio plays. On iPad, use a persistent landscape board in a 5×5 footprint (with empty/structural cells). Tap ergonomics require 44px minimum (iOS guideline). Spatial commands on native-SVG road zone; non-spatial commands in dashboard zones. **Do not shuffle positions between questions** — motor map is part of simulated driving response.

- **Learning value**: Removes category cue supplied by four same-category distractors. Tests audio comprehension plus command selection under uncertainty.
- **Game value**: Visibly intimidating “full controls” board creates mastery step.
- **Effort**: Medium — SVG layout, timed mode refactor, FSRS implications.
- **Risks**: 22 controls become visual-search test. Stable zones help, but too much grouping leaks answer category. **Record mode and response latency**. Grade same card Good/Again, but keep accuracy separate by mode.
- **Era**: HTML-prototype viable (native SVG only; no `foreignObject` per CHANGELOG v0.17).

### 1.2 Persistent Cockpit & Road Scene
Keep a simplified cockpit/road on screen while audio commands ask for steering wheel, indicators, pedals, mirrors, or junction exit. Scene changes state after action (indicator flashes, wheel turns, car stops).

- **Learning value**: High for controls with physical mapping; low for abstract commands without natural representation.
- **Game value**: Strong tactility and continuity; feels like one drive.
- **Effort**: Medium in HTML for subset; Large for full drive.
- **Risks**: Decorative animation may mask weak comprehension. Touch areas should be native SVG groups with generous hit circles.
- **Era**: HTML-prototype viable for limited “controls + junction” pilot; full in iPad port.

### 1.3 Gesture Controls
Use directional swipes for turn/continue/U-turn and vertical drag for accelerate/slow/stop. Supplement, not replace, explicit controls.

- **Learning value**: Moderate when gesture resembles driving action (left swipe = gire a la izquierda).
- **Game value**: Tactile and fast in timed mode.
- **Effort**: Simple for four directions; Medium with conflict handling.
- **Risks**: Safari scroll/navigation gestures, accidental diagonals, handedness, discoverability. Require minimum distance, dominant axis; show trace before committing.
- **Era**: HTML-prototype viable for direction commands only.

### 1.4 Route Mode — Command Sequences
Play three commands in sequence (`siga recto, en la rotonda tome la segunda salida, estacione a la derecha`), then require three ordered actions on persistent road scene. Expand to four after measured success.

- **Learning value**: Trains listening working memory and route retention (relevant in driving lesson). Should not replace single-command FSRS (failed sequence doesn’t identify which card was forgotten).
- **Game value**: Short journey with suspense and clear finish.
- **Effort**: Medium for authored sequences; Large for generated valid routes and animation.
- **Risks**: Grade each command from its action, but label session as route mode; separate sequence completion stats. Instructor-verified wording prerequisite.
- **Era**: HTML-prototype viable with authored routes; richer in iPad port.

---

## 2. HOMESCAPES DEPTH RESEARCH

### 2A. Match-3 Sophistication Not Yet Present

| Proposal | Learning Value | Game Value | Effort | Status |
|---|---|---|---|---|
| **Layered restraints** | Ambient Spanish counting/labels | Strategically deeper obstacles, little new ontology | Simple | HTML-viable |
| **Spreading resin (Asturian theme)** | Temporal pressure; source-control decisions | Tempo and spatial management | Medium | HTML-viable |
| **Portals** | Spatial prepositions (framing text only) | Non-linear gravity puzzles | Large | HTML after core spike |
| **Generators/spawners** | Goal nouns visible, repeated without testing | Source management & changing boards | Large | High risk per CHANGELOG |
| **Moving lanes** | Low direct learning value | Dynamic planning | Large | iPad-port era |
| **Hidden/reveal goals** | Revealed objects spoken once uncovered | Discovery purpose beyond damage | Medium | HTML-viable |
| **Charge-and-release fixtures** | Fixture states use concise Spanish | Local tactical objectives | Medium | HTML-viable |
| **Pre-level booster loadout** | Review could earn equipment | Preparation decisions | Medium | HTML-viable |

**Lives/energy**: Rejected — punitive for single user with no monetization purpose.

### 2B. Meta-Game & Sub-Games Not Yet Present

| Proposal | Learning Value | Game Value | Effort | Status |
|---|---|---|---|---|
| **Days & task chapters** | Small grammar/content themes per day | Renovation arc with stopping points | Medium | HTML-viable |
| **Decoration choices** | Style adjectives/materials natural variants | Ownership personalization | Medium+ per room | HTML pilot; rich on iPad |
| **Pin-and-path mini-puzzles** | Rehearse driving sequence logic | Variety breather | Large | iPad-port unless learning-tied |
| **Pair matching** | Strong recognition practice | Tactile reuse | Medium | HTML (warm-up, no FSRS grade) |
| **Seasonal Asturian moments** | Cultural vocabulary (amagüestu, Antroxu) | Refreshes piso without servers | Large | HTML (unlock by calendar, no deadlines) |
| **Daily gift** | Review ritual reinforcement | Pleasant daily bonus | Simple | HTML (no punitive resets) |

---

## 3. GENERAL-VOCAB SRS: REPLACING FLUENT FOREVER

### 3.1 Import Architecture
**Concept**: Accept word list import (one word or CSV), hear TTS, choose image before FSRS card creation.

- **Learning value**: Recreates FF image-selection act without proprietary card data.
- **Game value**: Each chosen image adds to visible personal vocabulary collection; general vocab feeds review-driven progression.
- **Effort**: Medium for word entry + Photos; Large for embedded search.
- **Risks**: FF retail subscribers historically **cannot download created flashcards** per help page 360026204612 (verified unverified; user must confirm current support).
- **Era**: HTML text-only intake viable; Photos ingestion Swift-first.

**Intake flow**: Imported words enter “image inbox”, not review deck. Daily batch: hear → select image → confirm meaning/gender → FSRS card. Prevents 1000 faceless cards review avalanche.

### 3.2 Image Acquisition

**Apple Photos & camera**: Standard picker invokes Photo Library, camera, Files. User explicitly chooses what to share (right privacy model). HEIC/orientation and large originals need real-device testing.

**Google Images handoff (research spike)**: Search tab → save to Photos → return import. No API key, scraping, backend, tracking, or hotlink fragility. **Disposable validation path**, not final UX.

### 3.3 Card Families

| Type | Learning Value | Game Value | Effort | Era |
|---|---|---|---|---|
| **Picture words** | Image → Spanish recall (FF core) | Expands beyond rooms | Medium | HTML emoji now; photos iPad |
| **Minimal pairs** | Pronunciation-first contrasts | Short objective sessions | Medium | Recorded native audio needed; iPad-port |
| **Word forms** | Grammatical transformations (gender/number) | Visible mastery paths | Medium | HTML |
| **Personal example sentences** | Personal context & sentence retrieval | Cooper phrases tie to Oviedo life | Medium | HTML TTS now; rich media iPad |
| **Recognition browse** | Reference & passive reinforcement | Collection satisfaction | Simple | HTML; no FSRS grade |

### 3.4 Storage Architecture

**Recommendation**: Keep scheduling/state in `localStorage`. Separate optional media into IndexedDB for resized image blobs (first image-backed relearning prototype). JSON backup holds scheduling/state; **label as incomplete without media**.

- **Learning value**: Reliable storage; personal images increase memorability.
- **Game value**: Enables collection without bloating game file.
- **Effort**: Simple for 1000+ text-only; Large for robust IndexedDB + archive packaging.
- **Risks**: Browser storage is origin-specific and can be evicted per WebKit policy.

### 3.5 Economy Models

**Model A — Reviews mint tactical supplies (recommended)**
- Due-review sessions earn hammer + capped choice of booster (hammer/glove/booster).
- Free practice pays nothing (no farming).
- Motivation: Direct daily incentive, learning powerful without withholding play.

**Model B — Daily review key**
- Key unlocks special level/chest for the day; ordinary match-3 remains playable.
- Key stacks, never deletes content on missed day.
- Motivation: Daily destination for review.

**Model C — Streak-powered booster multiplier**
- Consecutive days increase chance of two booster choices instead of one.
- Plateaus quickly; missing a day steps down, never resets to zero.
- Motivation: Continuity without streak anxiety.

**Model D — Vocabulary renovation currency**
- General-vocab reviews earn “memory tile” currency for second setting (Oviedo street/mercado).
- Motivation: Gives imported vocab visible home without distorting star economy.
- **Large effort**; split currencies risk division.

**Model E — Review-fueled lives (rejected)**
- Match-3 attempts replenished only by review.
- Turns study into toll; punishes missed days. Reject.

---

## 4. SHAREABLE WITH FRIENDS — DRIVING DRILL FIRST

### 4.1 `?modo=examen` Deep Link (recommended)
URL parameter boots directly into compact driving welcome, seeds command cards, opens garage drill. Normal piso one tap away. `&practica=libre` preselects but does not auto-start.

- **Learning value**: Removes irrelevant setup for DGT exam candidates.
- **Game value**: Fastest shareable path; Cooper retains personality.
- **Effort**: Simple
- **Risks**: Command set must be instructor-verified first. Query alters entry flow, not storage keys.
- **Era**: HTML-prototype viable.

### 4.2 Separate `examen.html` (rejected)
- Would violate single-file invariant; creates code/content drift needing build step.

### 4.3 Minimal Friend Onboarding
Two Cooper cards for `?modo=examen`:  
1. “Practica las órdenes del examen práctico”  
2. Three-step explanation (listen, tap action, repeat misses)  

Ask only for UI language preference (Spanish + small EN help vs Spanish-only). No name or account request.

- **Learning value**: Sets audio-first contract.
- **Game value**: Cooper makes tool feel intentional.
- **Effort**: Simple
- **Risks**: Curious non-learner needs one-sentence explanation + “ver el piso” exit.

### 4.4 Local Profiles (deferred)
- Name picker maps to separate localStorage keys; requires backup/migration per profile.
- **Recommendation deferred** — likely unnecessary until two people repeatedly share one device. Honest answer: one device + export/import for portability.

---

## Recommended Shortlist for BACKLOG.md

1. **Instructor-verified command wording** — already #1 (prerequisite for sharing/mode).
2. **Shareable `?modo=examen` + minimal friend onboarding** — nearest-term, simple, no architectural split.
3. **Full response board (modo examen completo)** — clearest exam-fidelity increase; log mode-specific accuracy/latency.
4. **Persistent cockpit/road pilot** — validate tactile value on controls with physical mapping.
5. **Swift-first relearning inbox + Photos** — prove 1000-word replacement without FF export dependency.
6. **Capped review-to-booster choice meter** — extend existing hammer principle.
7. **One match-3 depth slice: layered chains + hidden/reveal goal** — highest variety per CORE complexity unit.

---

## Questions for Jeffrey

1. For full response board: Fastest physical response or correct comprehension with visual search? Determined stable zones vs mixed grid.

2. Which controls has your instructor asked you to operate (indicators, mirrors, pedals, parking brake, lights) — not just verbally?

3. Does route mode reflect real instruction (3-4 chained orders) or does your examiner give one instruction at a time?

4. For relearning, do you have a usable word list outside FF, or is reconstructing Spanish lemmas required?

5. Of 1000+ words, roughly how many are picture words / minimal-pair cards / sentences? Changes first importer design.

6. Should general vocabulary remain one review queue, or selectable “piso”, “general”, “examen” sessions?

7. When sharing, keep small English support or Spanish-only (target user takes lessons in Spain)?

8. Is Safari round-trip (search → save to Photos → return → choose photo) acceptable for prototype, or justify breaking “fonts-only network dependency” invariant?