# El Piso Asturiano — Proposal Review

**Status:** Review record. No proposal is approved for implementation by this document.

> **Implementation update (v0.25):** The review below evaluated the then-current
> v0.23 corpus of 23 grouped prompts. v0.24 supersedes that baseline with 30
> active atomic prompts (16 driving, 14 precheck) and withholds one disputed
> reservoir term. References below to the “current 23-command corpus” are
> historical review context, not current repository facts. v0.25 implements the
> recorded scheduling-integrity and command-instrumentation decisions. v0.26
> adds persisted driving, precheck, and mixed phase filtering.

This document defines the review method for comparing:

1. `PROPOSALS.md`
2. `PROPOSALS_HERMES_FREE_ULTRA.md`
3. `PROPOSALS_HERMES_NEMOTRON_ULTRA.md`
4. `PROPOSALS_Hermes_laguna-m.1-free.md`
5. `PROPOSALS_Hermes_tencent-hy3-free.md`

The objective is not majority agreement or selection of one winning document. The objective is a traceable synthesis of the strongest compatible ideas, with disagreements, unsupported claims, risks, and validation needs kept visible.

---

## 1. Unit of review

Do not assign a single score to each complete proposal. Each proposal covers several separable product decisions and may be strong in one area but weak in another.

Review these decision areas independently:

1. **Driving-test content foundation** — authority, coverage, wording, corrections, and limitations.
2. **Full response board** — layout, grouping, labels, target density, grading, scheduling, and statistics.
3. **Driving-like interactions** — gestures, cockpit/dashboard, route sequences, voice, and other tactile ideas.
4. **Match-3 depth** — obstacles, goals, boosters, physics complexity, and separation from learning mechanics.
5. **Meta-game and sub-games** — chapters, decoration choices, pair matching, daily rituals, and seasonal content.
6. **General-vocabulary intake** — Fluent Forever replacement, word intake, image selection, and imports.
7. **Card families** — picture words, minimal pairs, word forms, personal examples, and recognition activities.
8. **Media and storage** — localStorage, IndexedDB, backup completeness, Photos, search, and the Swift boundary.
9. **Learning-to-game economy** — tactical rewards, daily keys, streaks, secondary currencies, honesty, and coercion.
10. **Sharing and onboarding** — query/hash entry, friend experience, profiles, and local-only progress.
11. **Roadmap** — sequencing, dependencies, feasibility spikes, and HTML-versus-Swift placement.

A cross-cutting idea may be scored in more than one area, but reviewers must avoid double-counting the same benefit in the final synthesis.

---

## 2. Weighted scoring rubric

Score each applicable criterion from **1 to 5**:

- **1 — Poor:** conflicts with the goal, lacks a credible mechanism, or creates disproportionate risk.
- **2 — Weak:** some value, but major gaps or unfavorable trade-offs.
- **3 — Adequate:** plausible and balanced, with ordinary uncertainties.
- **4 — Strong:** well matched to the project, with manageable risks and a clear validation path.
- **5 — Exceptional:** unusually high value, strong evidence, excellent fit, and low avoidable risk.

| Criterion | Weight |
|---|---:|
| Likely to improve Spanish retention and recall | 20% |
| Alignment with the real Spanish driving test | 20% |
| Engaging, repeatable gameplay loop | 15% |
| Feasible within the existing prototype | 15% |
| Fast path to a testable version | 10% |
| Easy to add, verify, or correct content | 10% |
| Clear measurement of learning progress | 5% |
| Maintainability and technical risk | 5% |

### Scoring formula

For an area where every criterion applies:

`weighted score = sum(score × weight) / 5`

The result is a percentage from 20% to 100%.

If a criterion is genuinely not applicable, mark it **N/A** and normalize over the remaining weights:

`normalized score = sum(score × applicable weight) / (5 × sum(applicable weights)) × 100`

Do not assign zero merely because an area is unrelated to driving or language learning. Conversely, do not mark a criterion N/A when the proposal makes a learning or exam-fidelity claim that can be evaluated.

### Score evidence requirement

Every score must include:

- a short rationale;
- a citation to the relevant proposal section;
- the mechanism by which the claimed benefit would occur;
- important assumptions;
- evidence or validation still needed.

Scores without this support are provisional and cannot determine the final recommendation.

---

## 3. Hard gates and project invariants

A hard-gate failure overrides a high weighted score. Mark the option **REJECT**, **DEFER**, or **REQUIRES EXPLICIT ARCHITECTURE CHANGE**.

### Product and learning gates

- Spanish remains in the meta/SRS layer, never in match-3 rules or as a condition for making a match.
- Image-first and pronunciation-first learning remains the default for suitable vocabulary.
- English does not appear on recall card fronts.
- Gender colors remain consistent: `el = #3E6E8E`, `la = #C0563B`.
- Recognition activities must not masquerade as recall or create misleading FSRS grades.
- Harder drill modes must not contaminate easier-mode measurements without an explicit scheduling/statistics rationale.
- Learning may create tactical power, but ordinary play must not become a coercive toll that encourages dishonest grading.


### Driving-content gates

- Backlog item 1 is complete: v0.23 contains 23 source-backed prompts extracted from Autoescuela Fermín's 2020 student guide.
- The guide is illustrative, not an exhaustive or authoritative transcript of every Oviedo DGT examiner.
- Proposals written before v0.23 may contain stale assumptions about the provisional 22-command set. Reviewers must evaluate them against the current 23-command baseline.
- No feature may claim that the prompts are the exact or complete words an examiner will use.
- Route sequences, new wording, and procedural claims need source or instructor validation before being represented as real-test behavior.

### Architecture and platform gates

- The current prototype remains one self-contained `index.html`, with no build step or external assets; Google Fonts is the only existing network dependency.
- Match-3 logic between `CORE-START` and `CORE-END` remains pure and DOM-free.
- New state fields require backward-compatible `loadState()` migration.
- Browser progress remains local and exportable; no accounts, servers, tracking, social, or competitive systems.
- Relevant iPad interactions use native SVG; do not use `foreignObject`.
- Media proposals must distinguish scheduling/state backup from image/audio backup and must handle quota or eviction honestly.
- HTML should cheaply validate uncertain loops. Photos, camera capture, recorded audio, large media libraries, or infrastructure-heavy workflows default to the native Swift app unless an HTML spike answers a specific high-risk question.

### Process gates

- `SPEC.md` remains the design source of truth after a decision is approved for implementation.
- Review conclusions do not automatically enter `BACKLOG.md`.
- Jeffrey chooses priorities and approves implementation.
- Agents propose diffs; Jeffrey commits unless he explicitly authorizes otherwise.

---

## 4. Evidence classification

Label material claims using one of these classes:

- **REPO FACT:** directly supported by the current repository.
- **PRIMARY SOURCE:** supported by an authoritative external source.
- **SECONDARY SOURCE:** supported by a credible but non-authoritative source.
- **EXPERT JUDGMENT:** reasoned recommendation without direct empirical evidence.
- **USER-SPECIFIC FACT:** supplied or confirmed by Jeffrey.
- **UNVERIFIED:** plausible but not presently supported.
- **STALE:** contradicted or superseded by the current repository.

When sources disagree, preserve the disagreement. Do not convert repetition across model proposals into independent evidence; similar model claims may share training data or assumptions.

---

## 5. Review roles

### Reviewer A — Learning and game design

Focus on:

- retrieval practice and retention;
- audio/image/meaning alignment;
- recognition versus recall;
- engagement and repeatability;
- feedback quality;
- whether the game mechanic reinforces the learning objective rather than decorating a quiz.

### Reviewer B — Driving-test and content integrity

Focus on:

- fidelity to the practical driving-test task;
- source authority and limitations;
- wording and regional/generalizability risks;
- whether an interaction trains comprehension, visual search, motor mapping, or working memory;
- content correction and update strategy.

### Reviewer C — Technical product architecture

Focus on:

- current codebase and invariants;
- implementation effort and regression risk;
- FSRS/data/statistics implications;
- HTML prototype versus Swift placement;
- storage, migration, backup, and maintainability;
- smallest useful feasibility spike.

Reviewers work independently before seeing one another's conclusions.

### Senior synthesizer

The synthesizer does not vote or average blindly. It must:

- reconcile reviewer findings;
- identify consensus and material disagreement;
- select compatible components rather than a whole-document winner;
- document rejected alternatives and reasons;
- separate reversible prototype decisions from durable architecture decisions;
- produce a sequenced recommendation with explicit dependencies and validation gates.

### Adversarial reviewer

A fresh reviewer challenges the synthesis for:

- decorative gamification;
- memorizing answer locations instead of Spanish;
- visual-search or motor-map confounds;
- unsupported DGT claims;
- coercive or gameable reward systems;

- unnecessary prototype architecture;
- hidden media/content maintenance costs;
- metrics that could look positive without demonstrating learning.

The synthesizer receives one revision pass after the adversarial review. No open-ended agent debate.

---

## 6. Required reviewer output

For each decision area, every specialist returns:

1. **Options found**, with proposal citations.
2. **Material differences** between superficially similar options.
3. **Weighted score table** for applicable options.
4. **Strongest idea**, even if its parent proposal is not preferred.
5. **High-impact risks or hard-gate failures**.
6. **Stale, unsupported, or contradictory claims**.
7. **Smallest useful validation test**.
8. **Recommendation:** `ADOPT`, `ADAPT`, `SPIKE`, `DEFER`, or `REJECT`.
9. **Confidence:** high, medium, or low, with explanation.

Reviewers must explicitly distinguish:

- agreement caused by genuine project fit;
- repeated claims that still lack evidence;
- incompatible product philosophies;
- differences that can be resolved by a cheap prototype;
- value judgments that require Jeffrey's decision.

---

## 7. Decision rule

An option advances to synthesis only when it satisfies all applicable hard gates and at least one of the following:

- receives a normalized weighted score of **70% or higher** from at least two relevant reviewers;
- contains a distinctive high-value component that can be adapted into a stronger option;
- resolves a prerequisite or major risk that other options ignore;
- is cheap enough to justify a bounded spike despite uncertain value.

A score is not approval. Final decisions also consider dependencies, opportunity cost, coherence with other selected options, and evidence from spikes.

---

## 8. Review stages

- [x] **Step 1 — Repository and proposal inventory:** clean baseline verified; five proposal files identified.
- [x] **Step 2 — Freeze review brief:** decision areas, rubric, gates, evidence rules, roles, and outputs defined here.
- [x] **Step 3 — Normalize proposals:** construct a claim-and-option matrix without scoring.
- [x] **Step 4 — Independent specialist reviews:** three reviewers score from separate perspectives.
- [x] **Step 5 — Senior synthesis:** produce the best-of proposal and decision record.
- [x] **Step 6 — Adversarial review:** challenge assumptions, metrics, and architecture.
- [x] **Step 7 — Final revision and Jeffrey decisions:** identify promotions, spikes, deferrals, and open choices.

No implementation work begins as part of these review stages.

---

## 9. Step 3 normalized claim-and-option matrix

### 9.1 Reading key and independence warning

Proposal abbreviations:

- **P** — `PROPOSALS.md`
- **F** — `PROPOSALS_HERMES_FREE_ULTRA.md`
- **T** — `PROPOSALS_Hermes_tencent-hy3-free.md`
- **L** — `PROPOSALS_Hermes_laguna-m.1-free.md`
- **N** — `PROPOSALS_HERMES_NEMOTRON_ULTRA.md`

The five documents are not five independent votes:

- **F is substantially a compressed restatement of P**, including its full-board dimensions, feature set, economy models, shortlist, and questions (`P:18–101,147–354,429–468`; `F:11–47,81–143,179–206`).
- **N and L are extremely close variants**, sharing structure, examples, numerical economy values, storage estimates, onboarding copy, shortlist, and questions (`N:10–55,114–224,232–321`; `L:10–54,98–179,185–276`).
- Repetition within P/F or N/L is therefore apparent consensus, not independent corroboration.

Current repository corrections apply to every area:

- The baseline is **v0.23 with 23 guide-supported prompts**, not 22 provisional commands (`CHANGELOG.md:7–16`; `SPEC.md:272–288`; `tests/commands.test.js:12–56`).
- The Fermín guide is illustrative and non-exhaustive; it does not establish every Oviedo examiner's exact wording (`references/fermin-practical-test-commands-2020.md:15–21`).
- The corpus includes complete instructions, terminology fragments, and prechecks; 23 prompts do not automatically imply 23 atomic physical responses.
- The existing drill has a command review track, but no separate schedules by difficulty. Wrong attempts currently update FSRS, log a grade, and requeue (`index.html:2257–2271,2496–2523`).
- JSON backup currently contains the complete state and describes itself as containing all progress (`index.html:2634–2658`). That claim would need revision under a separate-media design.

No option below is scored or approved. `GATE FLAG` identifies a conflict that must be resolved before an option can advance.

### 9.2 Area 1 — Driving-test content foundation

| ID | Normalized option | Support | Claimed mechanism | Material risks, variants, and evidence |
|---|---|---|---|---|
| **DCF-01** | Keep the current source-bounded 23-prompt corpus, preserving exact extracted fragments and the non-exhaustive warning. | P 361–376; F 149–156; current v0.23 repo | Traceable wording without inventing examiner speech. | Complete instructions, terminology, and prechecks are different response types. **REPO FACT / PRIMARY SOURCE.** |
| **DCF-02** | Add an instructor/local validation layer over the guide corpus. | P 80–96,361–376,429–438; F 40–47,149–156,179–185; N 307–310; L 262–265 | Validate wording, omissions, physical responses, and route realism. | Wording validation, coverage expansion, procedural validation, and route validation are separate tasks. One instructor is locally useful but not universally authoritative. **EXPERT JUDGMENT; future confirmation would be USER-SPECIFIC FACT.** |
| **DCF-03** | Present prompts as the exact words used by an Oviedo examiner. | N 253–260; L 203–214 | Simpler, more confident onboarding. | Contradicted by the source limitation. **GATE FLAG: unsupported exact/exhaustive claim.** |

**Preserved conflicts and questions**

- “Guide extraction complete” and “instructor validation remains open” are separate facts; old references to pending backlog item 1 are **STALE**.
- Route examples across the proposals use retired or unsupported wording such as *siga recto*, *reduzca la velocidad*, and *estacione a la derecha* (`P:82–85`; `F:40–46`; `N:43–46`; `L:43–46`; `T:156–165`).
- Before scoring full-board or route designs, classify each current prompt as spoken instruction, terminology recognition, physical demonstration, or multi-step precheck, and define its expected response.


### 9.3 Area 2 — Full response board

| ID | Normalized option | Support | Claimed mechanism | Material risks, variants, and evidence |
|---|---|---|---|---|
| **FRB-01** | Stable semantically zoned board with geometric road areas and dashboard/control zones. | P 20–43; F 13–20; N 14–24; L 14–24; T 76–90 | Full-corpus discrimination plus a stable motor map; grouping reduces search load. | Category zones leak a cue; fixed locations may test location memory; target count is now 23. Layout, labels, and target sizes vary materially. **EXPERT JUDGMENT / UNVERIFIED.** |
| **FRB-02** | Stable mixed board without explicit semantic zones. | P 36–42; T 81–90 | Reduces category cueing without per-question target hunting. | Still creates a motor map; initial layout and future command migrations are undefined. |
| **FRB-03** | Shuffled board, either once per session or each question. | T 58–64,81–90 | Suppresses location memorization. | Adds visual-search variance; moving geometric targets can destroy natural mappings. Session shuffle and per-question shuffle are different measured tasks. |
| **FRB-04** | Graduated 8–12-target board before the complete 23-target board. | T 98–108,444–445 | Reduces early overload while broadening uncertainty beyond the current drill. | Subset selection can leak categories; metrics are not comparable with complete-board results. |
| **FRB-05** | Shared command schedule with mode-tagged accuracy and latency. | P 36–42; F 16–20; T 92–104 | Avoids duplicate schedules while exposing performance by mode. | Harder-mode misses alter the common schedule. Requires an explicit scheduling rationale and log schema. |
| **FRB-06** | Separate full-board deck/schedule. | N 19–24; L 20–24 | Keeps harder-mode failures out of normal-mode scheduling. | Duplicates semantic cards, may double review burden, and can produce contradictory mastery states. |
| **FRB-07** | Reward harder mode with badges or a first-perfect-run star. | N 26–30; L 26–30 | Visible mastery and incentive. | Conflicts with P/F's no-extra-reward position and may distort participation or grading. Economy review required. |

**Preserved conflicts and questions**

- Stable motor mapping and shuffled anti-memorization are opposing hypotheses, not mergeable defaults.
- Shared versus separate scheduling is a durable data-model decision, not a UI detail.
- Persistent labels, delayed labels, and “sin etiquetas” measure different skills and need separate metrics.
- A response ontology is required before assuming every current prompt belongs on one board.
- Global icon uniqueness, retry grading, mode-specific latency, and layout versioning remain undefined.

### 9.4 Area 3 — Driving-like interactions

| ID | Normalized option | Support | Claimed mechanism | Material risks, variants, and evidence |
|---|---|---|---|---|
| **DLI-01** | Gestures only for naturally mapped actions, with tap controls retained. | P 64–78; F 31–38; N 41–55; L 41–54; T 122–136 | Kinesthetic mapping and faster tactile response. | Scroll conflicts, diagonals, handedness, and recognition errors; arbitrary gestures train a private code. Learning transfer is **UNVERIFIED**. |
| **DLI-02** | Limited causal cockpit/road pilot: actions visibly change controls or road state. | P 45–62; F 22–29; T 138–154 | One-to-one sensorimotor encoding and continuity. | Decorative animation may disguise weak comprehension; many prompts lack a natural cockpit action. Full simulation adds substantial state and belongs later. |
| **DLI-03** | Persistent junction/dashboard recognition surface, optionally highlighting or previewing responses. | N 41–51; L 41–51 | Reuses existing geometry and reduces UI discontinuity. | Highlight/preview supplies answer information and changes recall into visually cued recognition. Not equivalent to DLI-02's causal scene. |
| **DLI-04** | Three- or four-command route sequences as a separate working-memory task. | P 80–96; F 40–47; N 43–55; L 43–54; T 156–168 | Listening working memory and ordered action. | Real-exam chain frequency is unverified; examples are partly stale; generated routes may be impossible. Per-command grading and one sequence grade are incompatible policies. |
| **DLI-05** | Spoken repetition/acknowledgment using browser speech recognition. | L 39–54 | Adds spoken production after listening. | Examiner acknowledgment claim and iPad browser reliability are unverified; recognition errors could be misgraded. Typing/speech recall is explicitly deferred in `BACKLOG.md`. |
| **DLI-06** | Native haptic confirmation. | N 41–55 | Tactile confirmation and physicality. | Low direct language value; requires native hardware/API and may remain decorative. |

**Preserved conflicts and questions**

- P/F/T see value in a bounded persistent-scene pilot; N/L argue persistence reduces recall demand.
- P/F/T favor per-command route grading; N/L specify one grade for the entire sequence.
- Route mode cannot be scored as exam-aligned until Jeffrey's lesson experience or another source establishes realistic sequence behavior.
- Gesture-recognition failures must not become language failures.

### 9.5 Area 4 — Match-3 depth

| ID | Normalized option | Support | Claimed mechanism | Material risks, variants, and evidence |
|---|---|---|---|---|
| **M3-LAYER** | Multi-hit restraint primitive: layered chains, ice, or another peelable blocker. | P 115–126; F 53–64; T 182–199; L 62–71; N 63–73 | More visible progress and setup depth using a familiar obstacle ontology. | Neutral damage layers differ from grammar-tier or vocabulary layers. **GATE FLAG** for L/N variants that put learning progression inside blocker rules. |
| **M3-SPREAD** | Source-controlled/fixed-cadence spread, expanding hazard, or rising entity. | P 120; F 58; T 186,190; L 66,70–71; N 67,71–73 | Tempo, containment, and source-control decisions. | Must differ from current no-clear-triggered orbayu; overlays and moving entities are separate primitives. |
| **M3-PORTAL** | Paired cells redirect falling pieces. | P 121; F 59; T 188,203–204; L 68; N 69 | Non-linear gravity and spatial planning. | Requires a complete reachability/gravity specification and tests. **GATE FLAG** for variants that make Spanish prepositions part of matching. |
| **M3-GEN** | Fixtures spawn pieces, droppers, obstacles, or specials. | P 122; F 60; T 189; L 69; N 70 | Dynamic source management. | Feed choke, determinism, event order, authorability. **GATE FLAG** for vocabulary tiles whose collection unlocks cards. |
| **M3-MOVE** | Moving lanes or rising pieces after turns. | P 123; F 61; L 70; N 73 | Planning across future board states. | High interaction cost with gravity, specials, blockers, and masks. |
| **M3-REVEAL** | Covering layers reveal hidden known objects; exposure-only variant. | P 124; F 62; N 67–68,72 | Discovery payoff and ambient spoken exposure. | SRS/tier unlock variants couple learning progression to board clearing and must remain separate. |
| **M3-FIXTURE** | Adjacent matches charge a reusable fixture that releases an effect. | P 125; F 63 | Local tactical objective and earned spectacle. | Risk of one-off-rule proliferation; needs a reusable state/event model. |
| **M3-GOALS** | Escort-to-exit, reveal-all, activate-N, survival, boss/HP, beneficial spread, or multi-stage goals. | P 126; T 193–198; N 75–79 | Variety through objectives rather than stronger blockers alone. | Each family needs authoring, HUD, target-selection, and tests. Scenario framing must remain outside match correctness. |
| **M3-LOADOUT** | Pre-level booster choice, either review-earned or star-purchased. | P 127; F 64; T 195; L 73–78; N 81–83 | Preparation and agency. | Can flatten level design or compete with furnishing economy. |
| **M3-LIVES** | Failure consumes attempts restored by time or review. | All five; all reject | Stakes and return cadence. | Coercive play gate without product purpose; review-fueled form encourages dishonest grading. |

**Normalization corrections**

- Layered chains/ice and honey/resin/orbayu variants overlap mechanically and must not be counted as many independent systems.
- Ingredient droppers already exist; claims that escort/drop goals are wholly absent are stale (`SPEC.md:211–216`).
- Physics ideas require explicit interactions with holes, diagonal feed, blockers, specials, hammers, reshuffle, and goal-seeking planes.
- New depth should be tied to a specific play-feedback problem; current backlog prohibits speculative difficulty tuning.

### 9.6 Area 5 — Meta-game and sub-games

| ID | Normalized option | Support | Claimed mechanism | Material risks, variants, and evidence |
|---|---|---|---|---|
| **META-CHAPTER** | Short day/task chapters; optional recurring Cooper request. | P 130–145; F 68–77; T 212; L 86; N 96 | Narrative arcs, stopping points, themed recycling. | Tasks already exist; new value is structure and writing. Content burden may dominate. |
| **META-DECOR** | Decoration style choice. Variants: cosmetic choice, Spanish-labelled recognition, or automatic adjective-card creation. | P 135; F 73; T 214,224–225; L 88; N 98 | Ownership plus possible adjective/material exposure. | Triples art. Preference, recognition test, and scheduled-card creation are different products. |
| **META-PAIR** | Optional image/audio pair matching from learned material. | P 137; F 75; T 213,221–223 | Fast tactile recognition and content reuse. | **GATE FLAG:** recognition-only; no recall-equivalent FSRS grade. T blurs this distinction. |
| **META-PUZZLE** | Optional causal/interstitial puzzle. | P 136; F 74; T 213; L 87; N 97 | Rhythm break and variety. | Generic novelty may dilute identity. Not equivalent to an exam-card interruption. |
| **META-DRILL-DOSE** | One driving card between levels, optionally paying a hammer. | L 87; N 97 | Micro-dose of exam practice. | Isolated reward may bypass due-session reward semantics or create farming. |
| **META-SEASON** | Permanently replayable Asturian seasonal chapters/events. | P 138; F 76; T 215; L 89; N 99 | Cultural vocabulary and freshness. | Content/art burden; deadline, scarcity, and event-currency variants have different FOMO profiles. |
| **META-DAILY** | Daily gift after a full due review, one-card ritual, or login/word-of-day gift. | P 139; F 77; T 216; L 90; N 100 | Habit ritual and daily destination. | These trigger conditions are not interchangeable; one-card full rewards undermine session semantics. |
| **META-BADGE** | Achievement or grammar milestone badges. | T 217 | Completion visibility. | Quantity metrics may not demonstrate learning. |
| **META-PERSONAL** | Photo/decoration personalization. | T 218 | Ownership and personal-memory value. | Media/storage/camera work defaults to Swift. |
| **META-REVEAL** | Renovation reveal with Cooper comprehensible input. | T 219 | Stronger payoff and ambient exposure. | Primarily presentation/content; not retrieval practice. |

### 9.7 Area 6 — General-vocabulary intake

| ID | Normalized option | Support | Claimed mechanism | Material risks, variants, and evidence |
|---|---|---|---|---|
| **INTAKE-INBOX** | Import or enter words into an image inbox; hear, select image, confirm meaning/gender, then create fresh FSRS cards. | P 149–181; F 83–92 | Recreates deliberate personal-image selection and prevents a review avalanche. | Requires actual lemma list, queue policy, deduplication, and image workflow. Deliberately does not recover old scheduling. |
| **INTAKE-TEXTCSV** | Strict text-only CSV/manual list with emoji and TTS. | P 176–181; T 254–272 | Guaranteed low-complexity path independent of FF export. | Glosses must remain off recall fronts; text import is not full rich-card migration. |
| **INTAKE-MEDIAZIP** | User-created CSV plus image/audio archive or base64 media. | L 100–112; N 116–129 | Preserves rich media when the user possesses files. | Validation, duplicate IDs, rights, quota, backup, and interrupted imports. Does not establish that FF can produce such a package. |
| **INTAKE-FFDIRECT** | Conditional direct FF CSV/JSON importer if an actual export exists. | P 151–171; T 245–272; N 123–126 | Lowest reconstruction work if available. | Current export format, media, and history availability remain unverified. |
| **INTAKE-ANKI** | Conditional Anki CSV/APKG bridge; AnkiConnect variant. | T 251–261; L 103–105; N 119–121 | Potential bridge if Jeffrey possesses a legacy export. | APKG/media mapping is nontrivial; AnkiConnect adds setup friction. |
| **INTAKE-MANUAL** | One-card manual entry or “create from FF card” template. | P 151–155; N 124–126 | Always-available deliberate relearning fallback. | Slow for 1000+ words without batching. |
| **IMG-PHOTOS** | Explicit Photos/camera/Files picker with resize/crop and local derivative. | P 183–205; F 94–98 | Personally meaningful imagery. | HEIC/orientation, quota, privacy, backup, real-device testing; default placement is Swift-first. |
| **IMG-EMBEDDED** | Embedded image-search provider followed by local ingestion. | P 207–229 | Faster image choice. | **GATE FLAG:** changes network/privacy architecture; CORS, rights, hotlinks, and provider longevity. |
| **IMG-HANDOFF** | External search tab, save to Photos, return and import. | P 231–247; F 98 | Tests image-selection loop without API/backend. | Context-switch friction; still requires Photos ingestion. |
| **IMG-NONE-WEB** | Keep HTML text/emoji/TTS-only and defer rich media to Swift. | T 265–301; L 139–142; N 156–159 | Fastest low-storage path. | Must not be represented as replacing the personal-image value of FF. |

**External-evidence warning**

No proposal establishes a verified current Fluent Forever export path, media export, or scheduling-history export. P is the most qualified, T labels its assumptions unverified, while L/N assert unsupported implementation and legacy-export details. Any direct importer remains conditional on inspecting files Jeffrey actually possesses.

### 9.8 Area 7 — Card families

| ID | Normalized option | Support | Claimed mechanism | Material risks, variants, and evidence |
|---|---|---|---|---|
| **CARD-PICTURE** | Image/emoji front to spoken/written Spanish recall; optional audio-to-image reverse card. | All five; P 249–257 | Concrete vocabulary recall aligned with current design. | Emoji ambiguity and media requirements. Existing object cards are **REPO FACT**. |

| **CARD-MINPAIR** | Audio forced-choice discrimination, production, or spelling discrimination. | P 254; F 105; T 281,284; L 121; N 138 | Pronunciation-first contrast training. | These are different tasks. TTS may not realize fine contrasts; P/F require native recordings. Forced choice is recognition, not production recall. |
| **CARD-WORDFORM** | Contextual grammatical transformation, infinitive/pronoun recall, or audio forced choice. | P 255; F 106; T 282; L 122; N 139 | Targets grammar forms and observed errors. | Card explosion; prompt/response varies materially. Typed/spoken objective grading is deferred. |
| **CARD-PERSONAL-SENT** | Situation/image to personal sentence recall, or cloze/blank completion. | P 256; F 107; T 283; L 123; N 140 | Personal context and sentence-level transfer. | Full-sentence recall and cloze are different; avoid English fronts and generic filler. Rich version depends on media/native. |
| **CARD-BROWSE** | Searchable gallery with tap-to-hear and no scheduling. | P 257; F 108 | Reference and passive reinforcement. | Exposure only; no FSRS effect. |
| **CARD-SOUND** | Sound/spelling discrimination. | T 284 | Objective auditory practice. | Recognition versus production must be explicit; audio authority required. |
| **CARD-PHRASE** | Existing object/action phrase tiers generalized or retained. | L 124; N 141; current repo | Action recall and grammar progression. | Existing capability, not automatically a new family. |
| **CARD-MORPH-PROD** | Typed/spoken morphology or conjugation production. | T 285 | Objective production grading. | Explicitly deferred; browser recognition and grading unresolved. |

**Recognition gate:** pair matching, forced-choice minimal pairs, word-form selection, and browse activities cannot share recall-equivalent FSRS grading without a defensible model and separate statistics.

### 9.9 Area 8 — Media and storage

| ID | Normalized option | Support | Claimed mechanism | Material risks, variants, and evidence |
|---|---|---|---|---|
| **STORE-LS-TEXT** | Keep state, logs, schedules, and text-only cards in current `localStorage`. | All five | Lowest complexity and current one-text JSON backup. | Quota and origin-specific persistence; capacity estimates are rough. Current write failure can fall back to memory-only. |
| **STORE-LS-BASE64** | Put media as base64 in `localStorage`. | L 134–136; N 151–153 | Simplest single store. | Considered brittle for 1000+ images; quota failure semantics unacceptable without redesign. |
| **STORE-IDB-MEDIA** | Keep scheduling in localStorage and blobs in IndexedDB. | P 272–281; F 112–117; T 296–301; L 136–144; N 153–161 | Larger blob store while retaining small JSON scheduling state. | Async lifecycle, cross-store consistency, missing blobs, migration, eviction, orphan cleanup, and backup. Single-file-compatible does not mean simple. |
| **STORE-SWIFT-RICH** | Keep HTML text/emoji-only; use SwiftData/native files for Photos, recordings, and large libraries. | P 276–281; T 297–302; L 137–142; N 154–159; `SPEC.md` 249–258 | Avoids throwaway browser-media infrastructure. | Delays rich-card validation; needs browser-to-native migration contract. |
| **MEDIA-DERIVATIVE** | Leave originals in Photos and store resized review derivatives. | P 278–281 | Reduces storage and avoids treating app storage as master archive. | Cropping/versioning, deleted originals, rights, and derivative backup. |
| **BACKUP-MANIFEST** | JSON state plus media manifest and separate archive, or clearly label JSON as incomplete. | P 272–281; F 112 | Honest recovery boundary. | Requires archive packaging/import validation; incomplete fallback may destroy image-first prompts. |
| **BACKUP-NATIVE** | Defer complete media archive/recorded-audio recovery to native. | P 279–281 | Puts durable recovery with the intended media platform. | Any browser image prototype remains incompletely recoverable unless disclosed. |

**Backup warning:** T, L, and N propose or discuss IndexedDB without a complete media export/restore design. The current “Todo tu progreso” backup copy would become false under any split-store design unless revised.

### 9.10 Area 9 — Learning-to-game economy

| ID | Normalized option | Support | Claimed mechanism | Material risks, variants, and evidence |
|---|---|---|---|---|
| **ECO-SUPPLY** | Capped due-review completion mints a tactical supply choice. | P 283–297; F 121–125 | Learning creates power rather than permission to play. | Define caps, completion, Again treatment, and self-grading safeguards. Extends current session reward. |
| **ECO-KEY-BONUS** | Review key unlocks optional special content/chest while ordinary play remains available. | P 299–310; F 126–129 | Visible daily destination without base-game lock. | Optional content may feel essential; key stacking and missed-day policy required. |
| **ECO-KEY-GATE** | Key unlocks an ordinary level attempt; no key requires review or a star bypass. | L 157–179; N 177–224; rejected by T 315–318 | Strong daily pull with nominal bypass. | **GATE FLAG:** ordinary-play toll and grading pressure. L/N call it soft despite blocking or charging for the next level. |
| **ECO-STREAK** | Additive booster/cosmetic multiplier. Variants: step-down, full reset, or reset-and-repair. | P 312–322; F 131–134; T 320–347; L 162–177; N 185–217 | Continuity incentive without direct lock. | Loss aversion and grading pressure; the three missed-day policies are incompatible. |
| **ECO-CURRENCY-SCENE** | General-vocabulary reviews mint currency for a second memory-palace scene. | P 324–336; F 136–139 | Gives vocabulary a visible home without changing stars. | Second scene/art burden and fragmented economies. |
| **ECO-CURRENCY-CONTENT** | Reviews mint currency for word packs, card types, decoration variants, or outfits. | T 328–346; L 167–179; N 197–224 | Learning effort unlocks further learning/cosmetic content. | Can gate useful learning tools behind prior study and create grading pressure; per-card versus per-session minting differs. |
| **ECO-DIVIDEND** | Reviews top up a capped passive hammer/star trickle. | T 335–338 | Mild persistent reward without a play lock. | Relationship to existing direct rewards and tuning are undefined. |
| **ECO-LIVES** | Reviews replenish match attempts. | All five; all reject | Maximum daily pressure. | Coercive, punitive, and strongly gameable. |
| **ECO-DAILY-GIFT** | One due card or completed due session triggers a daily gift. | P 139; F 77; L 90; N 100 | Compact ritual. | One-card and full-session triggers create very different farming and scheduling incentives. |

**Repo-fact correction:** ordinary match-3 already hard-prompts for review at three or more due cards (`index.html:2134–2155`; `SPEC.md:12–16`). Stage 4 must evaluate every economy option relative to that existing gate, not an imagined gate-free baseline.

### 9.11 Area 10 — Sharing and onboarding

| ID | Normalized option | Support | Claimed mechanism | Material risks, variants, and evidence |
|---|---|---|---|---|
| **SHO-QUERY** | `?modo=examen` entry in the existing file; optional parameters preselect practice/full-board mode. | P 361–376; F 149–156; N 232–240; L 185–194; T 362–375 | Reuses one deployment, scheduler, command set, and storage model. | Must stop at a user gesture before audio; route parameters must not fork storage/content. |
| **SHO-HASH** | `#examen` and optional `#examen-completo`. | N 232–249; L 185–199 | Same single-file benefit; claimed messaging compatibility. | Messaging advantage is unverified; hash may conflict with future fragments; canonical form required. |
| **SHO-SEPARATE** | Separate `examen.html`. | Discussed by all; rejected by all | Cleaner standalone identity. | Duplicates code/data or requires an architecture change. **GATE FLAG under current single-file invariant.** |
| **SHO-MINIMAL** | Deep-link-specific one/two-card Cooper onboarding with local-progress and source warnings. | P 393–408; F 161–171; N 242–249; L 196–199 | Removes Jeffrey-specific setup without accounts. | Exact-examiner copy in N/L is prohibited; persisted visited/language state needs migration. |
| **SHO-GLOBAL** | Global first-run Casa-versus-Examen or audience choice. | N 253–260; L 203–214; T 377–388 | Gives every visitor a comprehensible entry path. | Adds friction and quasi-profile state; may duplicate deep-link onboarding. |
| **SHO-COPY** | Garage button copies canonical exam URL. | N 238–247; L 189–199 | Discoverable sharing. | Clipboard behavior and canonical query/hash choice need testing. |
| **SHO-QR** | Generate a QR code. | L 185–194,270–272 | Device-to-device sharing without typing. | Dependency/file-size cost and no demonstrated demand. |
| **SHO-PROFILES** | Named local profiles with separate storage and profile-aware backup/migration. | All five | Prevents shared-device schedule contamination. | Names resemble accounts without sync; every entry/reset/backup path changes; demand unverified. |
| **SHO-OWN-DEVICE** | Friends use their own browser/device; existing export/import provides portability. | All five | Natural local separation with no account/profile infrastructure. | No automatic sync; local data can be cleared; import behavior must remain clear. |

**Evidence warning:** the proposals repeatedly say the app is already on GitHub Pages, but the reviewed README only documents local opening. A stable public deployment URL should be confirmed before scoring sharing details.

### 9.12 Area 11 — Roadmap strategies

These are competing sequencing theories, not cumulative backlog items.

| ID | Normalized strategy | Support | Dependencies and unresolved assumptions |
|---|---|---|---|
| **ROAD-CONTENT** | Establish response/procedure confidence, then sharing and harder drill experiments. | P 429–446; F 179–187 | Guide extraction is complete, but response ontology, route behavior, and instructor/local validation remain open. |
| **ROAD-SHARE** | Ship a low-cost exam deep link/onboarding before larger SRS/game work. | P 424–446; T 403–425 | Requires accurate warning, stable public URL, and canonical route. |
| **ROAD-DRILL** | Prototype full board plus route mode as the next learning slice. | T 414–430; F 181–187 | Full-board ontology/scheduling and route realism/grading must be resolved first. |
| **ROAD-ECONOMY** | Build Daily Key/Saber before or alongside drill/card expansion. | L 246–258; N 291–303 | Contains unresolved ordinary-play-gate, currency, grading, and unlock-catalog decisions. |
| **ROAD-WEB-TEXT** | Add manual CSV/text+TTS, minimal pairs, and word forms in HTML; defer rich media. | T 423–427; L 253–258; N 298–303 | Requires card-task semantics, audio source, recognition/recall statistics, schema migration, and actual capacity tests. |
| **ROAD-SWIFT-MEDIA** | Build relearning inbox/Photos native-first; use HTML only for a bounded flow spike. | P 429–446; F 179–187 | Requires native roadmap and browser-to-native data contract. |
| **ROAD-M3-SLICE** | Add layered restraint plus hidden/reveal goal before portals/generators. | P 141–145,445–446; F 187 | Depends on specific play feedback showing that current depth is insufficient. |
| **ROAD-DEFER-CORE** | Defer portals, generators, moving lanes, rich simulation, haptics, and full seasonal art unless a bounded spike resolves a named risk. | P 121–145; F 53–77; T 433–435; L 258; N 303 | Physics still needs specification before a 1:1 Swift port; deferral must not leave the native architecture undefined. |
| **ROAD-VALIDATE** | Use bounded HTML spikes for full-board ergonomics, image handoff, portal physics, and other uncertain loops. | P platform horizon and era notes; F mirrors | Every spike needs an explicit question, observable evidence, and stop/continue criterion. |

### 9.13 Cross-area hazards for Stage 4 reviewers

Every specialist must account for these hazards rather than scoring proposal repetition as evidence:

1. **Response ontology:** the 23-prompt corpus does not yet prove 23 atomic controls suitable for one board.
2. **Measurement contamination:** layout cues, labels, gestures, route memory, recognition, and recall are different constructs.
3. **Scheduling semantics:** harder modes, forced-choice cards, retries, and sequences need explicit FSRS/log policies.
4. **Source authority:** guide support, instructor validation, and exact-examiner claims are different evidence levels.
5. **Match-3 boundary:** ambient Spanish exposure is permitted; Spanish-dependent matching or board-triggered learning unlocks are not.
6. **Existing due gate:** economy proposals must be compared with the current three-due-card gate.
7. **Media recovery:** IndexedDB capacity is not a backup strategy; state and media restore guarantees must be explicit.
8. **Prototype/native boundary:** single-file feasibility does not by itself justify durable browser infrastructure.
9. **Proposal dependence:** P/F and N/L are paired lineages, not four independent confirmations.
10. **Roadmap alternatives:** many shortlist items are mutually exclusive product philosophies, not an additive backlog.

### 9.14 Questions carried into specialist review

The specialists may score with explicit assumptions, but must identify where Jeffrey's answer could change the result:

1. Which current prompts map to a single physical target, and what should happen for terminology and prechecks?
2. Is the full board intended to measure comprehension, latency, visual search, motor mapping, or a combination reported separately?
3. Should harder-mode performance share a schedule with normal mode?
4. Does Jeffrey receive realistic multi-command chains in lessons, and how should a partial route failure be graded?
5. What Fluent Forever exports, lists, images, audio, or Anki files does Jeffrey actually possess?
6. Is the browser vocabulary goal a durable replacement, a relearning intake spike, or a bridge to Swift?
7. Must browser backup restore all media offline, or is a clearly disclosed incomplete prototype acceptable?
8. Does the existing three-due-card match-3 gate remain, change, or become part of the economy review?
9. Is there a stable public deployment URL, and is same-device multi-user use demonstrated?
10. How much recurring writing, art, and content maintenance is sustainable for this personal project?

---

## 10. Stage 4 independent specialist review record

### 10.1 Reviewer provenance and usage

The three completed reviewers ran independently, read-only, without access to one another's outputs. Model assignment was approved by Jeffrey before execution.

| Specialist | Model | Hermes session | Input tokens | Output tokens | Estimated cost |
|---|---|---:|---:|---:|---:|
| Learning and game design | `anthropic/claude-sonnet-5` via OpenRouter | `20260715_223637_8956fa` | 20 uncached + 582,191 cache-read + 113,113 cache-write | 47,659 | $0.875851 |
| Driving-test content and validity | `~google/gemini-pro-latest` via OpenRouter | `20260715_223638_9bc0d0` | 111,977 uncached + 566,159 cache-read | 13,370 | $0.497626 |
| Technical and product architecture | `deepseek/deepseek-v4-pro` via OpenRouter | `20260715_223850_683b70` | 92,838 uncached + 331,008 cache-read | 23,987 | $0.062453 |
| **Completed-review total** | | | | | **$1.435930** |

The originally approved free architecture reviewer, `qwen/qwen3-coder:free`, returned HTTP 429 after three provider retries and produced no review. Its usage report contains no token or cost estimate. Jeffrey explicitly approved DeepSeek V4 Pro as the replacement.

Post-run verification showed only the pre-existing untracked `PROPOSAL_REVIEW.md`; no product, proposal, test, specification, backlog, changelog, or Git-history change was made by any reviewer.

### 10.2 Independent areas of agreement

These are convergent reviewer judgments, not new facts and not automatic approval:

1. Preserve the source-bounded v0.23 corpus and reject exact/exhaustive examiner-wording claims.
2. Classify the 23 prompts by response type before building a complete board, route mode, or cockpit.
3. Do not let recognition activities produce recall-equivalent FSRS evidence without explicit separation.
4. Reject ordinary-play key gates, lives/energy, and other incentives that pressure self-grading.
5. Reject a separate `examen.html` under the current one-file invariant.
6. Keep the browser text/emoji/TTS-first and put durable rich-media architecture in Swift unless a bounded HTML spike resolves a named uncertainty.
7. Reject base64 media in localStorage and embedded image search under the current quota/network constraints.
8. Treat neutral layered restraints and exposure-only reveal goals as the lowest-risk match-3 additions; reject Spanish-dependent variants.
9. Keep speech-recognition production and native haptics deferred.
10. Prefer bounded experiments with explicit hypotheses and stop/continue criteria over additive implementation of proposal shortlists.

### 10.3 Material disagreements preserved for synthesis

1. **Harder-mode scheduling:** Claude favors one schedule with mode-tagged reporting (`FRB-05`); DeepSeek favors a separate schedule (`FRB-06`) as safer and more reversible; Gemini favors shared scheduling but does not adequately resolve contamination.
2. **First driving interaction:** Claude leans toward a graduated board and an authored route pilot; Gemini favors a stable zoned board plus causal cockpit; DeepSeek prioritizes response ontology, then a graduated board and limited gestures/cockpit experiments.
3. **First roadmap slice:** DeepSeek puts sharing first because it is architecturally cheap; Claude prioritizes ontology and learning-pipeline experiments; Gemini begins with instructor consultation and then a stable board.
4. **Recognition scheduling:** Claude favors separate recognition statistics and initially ungraded experiments; DeepSeek suggests a recognition flag with temporarily shared FSRS; Gemini is inconsistent, sometimes flagging recognition but still assigning high scores without a complete scheduling policy.
5. **Economy additions:** all reject coercive gates, but they differ on whether streaks, daily gifts, and optional keys add useful motivation or unnecessary FOMO/content burden.
6. **Route grading:** per-command grading preserves card-level evidence; one sequence grade better resembles whole-route success but contaminates attribution. No reviewer resolves the product objective.

### 10.4 Reviewer-specific quality-control caveats

The synthesis must not treat any reviewer as authoritative:

- **Claude:** correctly distinguishes evidence levels in most places, but cites Spanish `b/v` as a possible minimal-pair contrast. Standard Spanish does not generally make `b` and `v` phonemically contrastive, so that example must be discarded. Its claims about phonetic examples and transfer remain unverified.
- **Gemini:** uses several shortened option IDs and makes strong claims about stable tactile maps, examiner acknowledgment preferences, and cockpit fidelity without project evidence. Treat these as model judgments. It also labels stronger authority on exact examiner wording “unobtainable,” which is not established by the reviewed sources.
- **DeepSeek:** incorrectly says `references/fermin-practical-test-commands-2020.md` is absent; direct repository search confirms it exists. It then infers that Jeffrey has no Anki/Fluent Forever export from that mistaken premise. Both claims are invalid. Its line-count, storage-capacity, browser-compatibility, and implementation-effort estimates are unverified unless independently checked.
- **All reviewers:** weighted totals reflect subjective inputs, and some N/A decisions differ. Totals are decision aids, not empirical measurements. Hard gates and cited evidence take precedence over arithmetic rank.

### 10.5 Stage boundary

Stage 4 is complete. Stage 5 must reconcile mechanisms and disagreements into one accountable recommendation; it must not blindly average reviewer totals or use proposal/reviewer majority voting.

---

## 11. Stage 5 senior synthesis — best-of recommendation

### 11.1 Accountability and synthesis rule

**Senior synthesizer:** GPT-5.6 Sol in the controlling Hermes session, approved by Jeffrey after Stage 4.

This synthesis selects mechanisms, not proposal authors or reviewer majorities. It gives precedence in this order:

1. repository and primary-source facts;
2. hard gates and explicit project invariants;
3. reversible ways to resolve disagreement with real evidence;
4. coherent product architecture and opportunity cost;
5. weighted reviewer judgments, treated as advisory rather than factual.

The recommendation remains provisional until Stage 6 adversarial review and Jeffrey's Stage 7 decisions.

### 11.2 Executive recommendation

Do **not** implement a union of the five proposal shortlists. Extend the prototype through two learning-centered tracks, with game-depth work held behind actual play feedback:

1. **Driving comprehension track:** classify the 23 prompts by response type and validation status; then test a graduated, stable response surface as a diagnostic mode that does not initially alter FSRS scheduling or pay rewards.
2. **General Spanish track:** inventory Jeffrey's real Fluent Forever/Anki/list assets; then validate a fresh-schedule intake pipeline on a small text/emoji/TTS batch, preserving image-first rich cards for a bounded handoff experiment or the Swift app.
3. **Game track:** retain the current match-3/economy until Jeffrey reports a specific depth or motivation problem. If deeper mechanics are justified, layered restraints and exposure-only reveal goals are the first candidates.

This sequencing protects measurement integrity, avoids inventing DGT authority, and prevents the HTML prototype from accumulating media, physics, and economy systems before their value is demonstrated.

### 11.3 Integrated decision record by area

| Area | Decision | Selected mechanism | Confidence | Reason and condition |
|---|---|---|---|---|
| 1. Driving content | **ADOPT + prerequisite** | `DCF-01` as the authoritative source-bounded baseline; `DCF-02` as instructor/local validation metadata | High | v0.23 and source limits are repo facts. Validation must separately cover wording, response mapping, procedure, and route realism. Reject `DCF-03`. |
| 2. Full response board | **ADAPT / SPIKE** | `FRB-04` graduated 8–12-target surface, using stable natural geometry where justified; one underlying command corpus, but diagnostic mode-tagged outcomes that initially do **not** update FSRS | Medium | This hybrid avoids both shared-schedule contamination and duplicated mastery states. Scale only after the response ontology and actual visual-search data support it. No per-question shuffle of natural road geometry. |
| 3. Driving-like interactions | **SPIKE selectively** | Small causal cockpit/road surface for a few instructor-validated one-to-one actions; gestures only where semantically natural and always with tap fallback | Medium-low | Engagement potential is real but transfer is unverified. Defer route mode until real lesson-chain frequency and grading purpose are known. Reject previews that reveal answers; keep speech/haptics deferred. |
| 4. Match-3 depth | **DEFER pending play feedback** | If a demonstrated problem exists, test neutral `M3-LAYER`, then exposure-only `M3-REVEAL` | High | These fit current primitives and boundaries better than portals, generators, or moving lanes. Spanish-dependent variants and lives fail gates. No speculative tuning. |
| 5. Meta-game/sub-games | **DEFER broad expansion; ADAPT only cheap honest polish** | Optional renovation reveal or short chapter framing; any pair activity must be ungraded and statistically separate | Medium | Seasonal art, photos, generic puzzles, and broad decoration variants create recurring content burden without demonstrated learning value. A daily gift is unnecessary until a habit problem is observed. |
| 6. Vocabulary intake | **SPIKE after asset inventory** | `INTAKE-TEXTCSV`/`INTAKE-MANUAL` into a fresh-schedule inbox; test `IMG-HANDOFF` separately if image selection is the target uncertainty | Medium | No proposal establishes Jeffrey's actual export assets. Text-only validates ingestion/scheduling but is not a claim to replace personal-image learning. Defer direct FF/Anki/media import until real files exist. |
| 7. Card families | **ADOPT existing; selectively ADAPT** | Preserve `CARD-PICTURE` and `CARD-PHRASE`; add tightly scoped `CARD-WORDFORM` only for observed errors | High | Existing recall cards fit the learning model. Minimal-pair/sound work requires valid audio and a separate recognition measurement policy. Keep typed/spoken production deferred. |
| 8. Media/storage | **ADOPT text-first HTML + Swift-first rich media** | `STORE-LS-TEXT` now; define a browser-to-native export contract; use native storage for durable Photos/audio | High | Base64 exceeds practical localStorage design; IndexedDB creates cross-store and backup obligations that are not justified yet. If any browser media spike ships, disclose incomplete recovery or build a manifest first. |
| 9. Learning/game economy | **ADAPT existing only** | Keep tactical review rewards; if a motivation problem appears, `ECO-SUPPLY` is the first extension | High | Reject lives, ordinary-play keys, secondary currencies, and full-reset streaks. Before adding rewards, make the existing ≥3-due-card prompt's bypass policy explicit; its backdrop-dismiss behavior is not a clear user-facing choice. |
| 10. Sharing/onboarding | **ADOPT conditionally** | Same-file `SHO-QUERY` plus minimal, source-honest onboarding and copy-link control | High | Cheap and coherent only after confirming a stable public URL and actual sharing need. Own-device storage remains the default. Reject separate HTML, profiles, and QR without evidence. |
| 11. Roadmap | **ADOPT validation-gated sequence** | `ROAD-VALIDATE` governs the ordered plan below | High | The cheapest feature is not automatically the highest-value feature. Each code slice must answer a named uncertainty and preserve the backlog/architecture contract. |

### 11.4 Resolution of the major specialist disagreements

#### A. Shared versus separate harder-mode scheduling

Neither reviewed implementation is safe as the initial default:

- **Shared updating (`FRB-05`)** risks allowing visual-search difficulty to lower semantic stability.
- **Separate scheduling (`FRB-06`)** duplicates the same Spanish knowledge and can create contradictory mastery states and extra due work.

**Synthesis:** retain one authoritative command deck and schedule. Treat the first graduated/full-board mode as **diagnostic practice**:

- log command ID, mode, first-attempt correctness, response latency, selected target, and layout version;
- do not update FSRS stability from diagnostic attempts;
- pay no stars, hammers, badges, or perfect-run rewards;
- continue scheduled command review through the existing authoritative mode;
- reconsider scheduling only after mode data shows what the harder surface is measuring.

This is an adaptation of `FRB-04` and `FRB-05`, not a vote for either original architecture.

#### B. Stable versus shuffled targets

Use stable natural geometry for direction, roundabout, and validated cockpit controls. Do not shuffle those targets per question. For arbitrary terminology choices, a mixed or session-varied grid may be tested separately, but its latency cannot be compared directly with the stable surface.

The initial goal is not to prove that motor mapping equals comprehension. It is to measure them separately. A later transfer probe can change labels or representation without turning every item into a target-hunting task.

#### C. Route mode versus cockpit versus gestures

The response ontology decides this, not proposal enthusiasm:

- atomic, physically mapped commands may enter a bounded causal cockpit;
- direction/roundabout actions may use natural geometry and optional semantic gestures;
- terminology and prechecks need distinct recognition/demonstration treatments;
- route sequences remain deferred until Jeffrey's lessons establish realistic chaining and an instructor validates procedural assumptions.

If route mode advances, store per-command diagnostic results even if the UI also reports whole-sequence success. A single sequence result cannot safely update several independent cards.

#### D. Recognition versus recall scheduling

Do not merely add a `recognition: true` flag while silently using recall-calibrated outcomes as equivalent evidence. Initial pair/minimal-pair/sound activities should be one of:

1. ungraded exposure/practice with separate accuracy statistics; or
2. a separately defined recognition schedule whose outcomes are never merged with recall stability.

Recorded or instructor-checked audio is required before treating fine phonetic discrimination as valid. Discard Claude's `b/v` example.

#### E. Sharing-first versus learning-first roadmap

A deep link is technically cheap, but this is a personal learning product. Cost alone does not make sharing the first priority. Confirm the public URL and desired audience; then the deep link can be a small independent slice. The response ontology and actual vocabulary assets resolve more consequential uncertainty and therefore come first in the learning roadmap.

### 11.5 Smallest useful validation plan

#### Phase 0 — No-code evidence inventory

**0A. Driving response ontology**

Create a table for all 23 prompts containing:

- stable command ID and exact source-bounded Spanish;
- prompt type: atomic spoken instruction, terminology, physical demonstration, multi-step precheck, or other;
- expected learner response in the current drill;
- proposed real-world response, marked unverified until instructor-confirmed;
- source and validation status;
- suitability for stable geometric target, cockpit control, sequence, or no physical board.

**Continue when:** every prompt has exactly one primary type and no proposed physical/procedural mapping is represented as authoritative without validation.

**0B. Personal asset inventory**

Record what Jeffrey actually has: word lists, FF exports, Anki files, images, audio, and desired migration scale. Do not design a file importer before inspecting a real sample.

**0C. Product baseline decisions**

Record Jeffrey's answers on:

- what the full board should measure;
- whether current ≥3-card review prompting should always show an explicit “Jugar igual” choice;
- whether browser vocabulary work is a durable tool or a bridge to Swift;
- whether sharing is currently important and what public URL is stable.

#### Phase 1 — Graduated driving diagnostic

Build only after Phase 0A:

- 8–12 prompts from one or two response-compatible groups;
- native SVG with stable natural geometry and 44px-or-larger practical targets;
- no answer preview;
- diagnostic logs separated by mode and layout version;
- no FSRS update and no economy reward;
- current four-choice/geometry drill remains the scheduled baseline.

**Hypothesis:** increasing target uncertainty reveals listening/comprehension weaknesses without making visual search the dominant task.

**Observe:** first-attempt accuracy, latency, selected distractor, repeat corrections, and Jeffrey's qualitative reason for each miss.

**Stop or redesign when:** misses are predominantly target-finding/layout errors, target density is poor on iPad, or prompt types do not fit a common response surface.

**Continue when:** errors appear semantically meaningful, target use is comfortable, and repeated sessions remain useful rather than tedious. Then compare zoned and mixed variants or expand the compatible prompt set; do not jump automatically to all 23.

#### Phase 2 — Twenty-word vocabulary intake spike

Build only after Phase 0B:

- import or manually enter 20 real words;
- create fresh schedules rather than claiming to preserve old FF history;
- keep English glosses off recall fronts;
- retain gender colors and es-ES audio;
- use emoji/text only for the ingestion test, or test a separate external-search-to-Photos handoff on a few cards;
- verify duplicate handling, state migration, backup, and deletion.

**Hypothesis:** the existing scheduler and card model can absorb personal vocabulary without a review avalanche or schema confusion.

**Stop or redesign when:** deduplication, card identity, migration, or backup becomes ambiguous; do not scale to hundreds of cards until these are deterministic.

**Continue when:** a real batch imports cleanly, reviews correctly, and Jeffrey finds the intake effort worthwhile. Then decide whether rich-media value justifies a Swift-first implementation.

#### Phase 3 — Optional game-depth slice

Only after Jeffrey supplies concrete play feedback showing insufficient depth:

- add one neutral layered-restraint variant or one exposure-only reveal goal, not both simultaneously;
- specify interactions with gravity, blockers, specials, hammers, reshuffle, droppers, and existing spread mechanics;
- add pure CORE tests before UI work;
- verify Swift-port semantics in `SPEC.md`.

**Stop when:** the new primitive cannot be explained as a reusable rule, causes feed/reachability ambiguity, or adds content work without improving play decisions.

### 11.6 Explicit deferrals and rejections

#### Reject under current gates

- exact/exhaustive Oviedo examiner wording (`DCF-03`);
- Spanish grammar/vocabulary as a match-3 rule or unlock condition;
- lives/energy and review-fuelled ordinary-play gates;
- `ECO-KEY-GATE` and similar star-bypass tolls;
- separate `examen.html`;
- base64 image libraries in localStorage;
- embedded image-search/network architecture;
- answer previews graded as recall;
- speech-recognition or typed-production grading in the current HTML phase.

#### Defer until prerequisite evidence

- all-23 full response board;
- route mode and sequence scheduling;
- full persistent driving simulation;
- direct Fluent Forever/Anki/media import;
- IndexedDB media store;
- minimal-pair/sound scheduling;
- personal rich-sentence cards;
- portals, generators, moving lanes, and haptics;
- profiles, QR sharing, second currency/scene, seasonal content, and large decoration variants.

### 11.7 Decisions reserved for Jeffrey

The synthesis cannot legitimately decide these value or user-specific questions:

1. **Primary near-term outcome:** driving-test comprehension, broader vocabulary intake, or an intentionally small slice of each.
2. **Harder-mode objective:** semantic comprehension, rapid action, motor-map rehearsal, visual search, or separately reported combinations.
3. **Review prompt policy:** whether ordinary play must ever be unavailable when three or more cards are due, versus always offering an explicit bypass.
4. **Route realism:** how often real lessons contain multi-command chains and what partial success means.
5. **Available source material:** actual FF/Anki/list/media assets.
6. **Browser horizon:** durable learning tool versus temporary bridge to Swift.
7. **Sharing priority:** whether anyone besides Jeffrey needs the exam mode now.
8. **Content capacity:** sustainable recurring writing/art effort for a personal project.

### 11.8 Proposed best-of sequence after Stage 7 approval

This is the recommended order, not implementation authorization:

1. Driving response ontology and instructor-validation worksheet.
2. Real vocabulary/export asset inventory.
3. Jeffrey resolves the measurement, gate, browser-horizon, and sharing decisions above.
4. Graduated 8–12-target non-scheduling driving diagnostic.
5. Twenty-word fresh-schedule vocabulary intake spike.
6. Conditional same-file exam deep link/onboarding if a stable public URL and audience exist.
7. Evaluate evidence before promoting any full-board, route, economy, rich-media, or match-3 work.
8. Add one CORE depth primitive only after specific play feedback.

No implementation begins as part of Stage 5.

---

## 12. Stage 6 adversarial review record

### 12.1 Reviewer provenance and verdict

| Role | Model | Hermes session | Input tokens | Output tokens | Estimated cost |
|---|---|---:|---:|---:|---:|
| Fresh adversarial reviewer | `x-ai/grok-4.5` via OpenRouter | `20260715_230025_e833d9` | 47,565 uncached + 169,216 cache-read | 9,967 | $0.239540 |

**Verdict:** `ACCEPTABLE WITH MAJOR REVISIONS`.

Grok found that Stage 5's durable gates were sound but its first experimental slice was too detached from the existing practiced loop. It argued that a rewardless, non-scheduling 8–12-target mode could generate sparse, self-selected data while measuring layout familiarity more than comprehension.

Post-run Git verification showed only the pre-existing untracked `PROPOSAL_REVIEW.md`; the adversarial reviewer changed no repository file.

### 12.2 Challenges accepted into the revision

1. **Instrument the existing drill before adding a third surface.** It already contains due/free modes, timed pressure, category-specific distractors, junction SVG, roundabout SVG, auto-grading, and FSRS.
2. **Create a mode-policy matrix.** Direct code inspection after the critique found that due and free practice both call `answerCmd`, and timed expiry shares the same path; all currently update command FSRS (`index.html:2355–2364,2496–2504,2526–2534`). The present semantics are more ambiguous than Stage 5 recorded.
3. **Split response classification into a cheap repo-grounded pass and targeted instructor validation.** Instructor access must not block all experimentation.
4. **Promote due-gate honesty.** At ≥3 due cards, the modal exposes only “Repasar ahora,” but clicking the backdrop closes it (`index.html:2140–2147,1226–1234`). That is neither a clear hard block nor an explicit soft choice and conflicts with confident product wording.
5. **Relabel the 20-word text/emoji intake as schema and workflow validation only.** It cannot validate the image-first learning thesis.
6. **Use type-specific densification rather than a mixed 8–12 board as the first driving experiment.** Expand existing compatible surfaces only after classification and baseline instrumentation.
7. **Tie proposed work explicitly to backlog opportunity cost.** Review recommendations remain candidates; Jeffrey must decide what, if anything, enters `BACKLOG.md` and what it displaces.
8. **Demote sharing to zero priority without a named audience and confirmed stable URL.**
9. **Add an optional miss taxonomy or equivalent evidence.** Accuracy and latency alone do not distinguish semantic errors from layout/search errors.
10. **Lower confidence in the initial board experiment and avoid claiming its metrics directly measure comprehension or transfer.**

### 12.3 Challenges qualified or rejected

- A diagnostic mode does not inherently need rewards or forced consequences, but it does need a defined reason for repeated use. The revision avoids building it first rather than making it coercive.
- No universal numeric stop threshold is adopted before collecting a baseline; placeholders such as “X%” would imply precision the project does not have.
- The critique's suggestion that a diagnostic be required before an exam claim is not adopted; that would create another gate without evidence.
- The project should reserve a bounded budget for research work, but Stage 6's example effort caps are not repo facts. Jeffrey will set the acceptable time/feature budget.
- The phrase-variant backlog may overlap v0.21, but it is not declared stale without comparing the desired second/third variants against the shipped two-tier behavior.
- Grok output contained malformed wording such as “micro Iranian surface” and garbled text in the asset-inventory table. These are discarded as generation errors.

### 12.4 Durable Stage 5 conclusions retained

Keep the rejection of false DGT authority, Spanish-dependent match rules, lives/key gates, separate `examen.html`, base64/embedded-search media architecture, recall-equivalent recognition grading, and current-phase speech production. Keep rich media Swift-first as an architecture default, route mode evidence-gated, and any CORE additions feedback-gated and fully tested.

---

## 13. Stage 7 revision after adversarial review

### 13.1 Revised central recommendation

The first implementation candidate should **not** be a new 8–12-target diagnostic board. First make the current learning loop internally honest and measurable:

1. Jeffrey selects the primary near-term outcome and review-gate policy.
2. Classify the current command corpus using only repo-grounded response types; seek instructor input only for physical/procedural claims intended for implementation.
3. Define consistent semantics for due, free-practice, and timed command modes.
4. Make the ≥3-due-card UI and `SPEC.md` agree on hard versus soft gating.
5. Instrument the existing drill before changing its target density.
6. Use the resulting evidence to decide whether a denser, type-specific response surface is needed.

General-vocabulary import remains a separate conditional branch, not a parallel default roadmap. It starts only if broader vocabulary is Jeffrey's selected priority and real source assets are inspected.

### 13.2 Proposed command-mode policy for Jeffrey's decision

The current code updates FSRS in every command mode. The recommended default policy is:

| Mode | Purpose | Update command FSRS? | Economy reward? | Required logs |
|---|---|---:|---:|---|
| Due, untimed | Authoritative scheduled recall | Yes | Existing due-session reward | mode, timed=false, first attempt, selected target, elapsed, replay count |
| Due, timed | Speed-pressure challenge, not yet calibrated as semantic forgetting | **No initially** | No additional reward | same fields plus timeout |
| Free practice, untimed | Voluntary rehearsal | No | No | same fields, tagged practice |
| Free practice, timed | Voluntary pressure rehearsal | No | No | same fields, tagged practice+timed |
| Future dense/gesture/cockpit modes | Diagnostic until construct is validated | No initially | No | mode/layout version, interaction type, first attempt, elapsed, selected target |

This policy is a recommendation, not a fact. Its key principle is that only the designated authoritative due-recall mode changes semantic stability. If later evidence supports timed or dense modes as equivalent recall measurements, they can be promoted deliberately rather than contaminating history by default.

### 13.3 Revised first code candidate: gate truth plus instrumentation

After Jeffrey chooses hard versus soft gating:

- **If soft:** show an explicit `Jugar igual` control at every due count and update `SPEC.md` to describe a prompt, not a hard gate.
- **If hard:** backdrop clicks must not bypass the ≥3 modal, and the code must consistently prevent play rather than relying on presentation alone. This requires an explicit exception to the “learning creates power rather than a toll” review gate.

The synthesis recommends the **soft, explicit-bypass** version because it preserves honest self-grading and aligns with the stated anti-coercion principle. Jeffrey owns the final choice.

In the same bounded slice, extend command logs without changing the visible drill:

- due versus practice;
- timed versus untimed;
- first-attempt status;
- selected target ID;
- elapsed response time;
- audio replay count;
- layout/surface identifier;
- optional low-friction miss reason after a wrong answer: heard incorrectly, meaning confused, target/layout problem, premature tap, or other.

Instrumentation must remain export-compatible and must not claim that latency equals comprehension.

### 13.4 Revised driving experiment

After repo-grounded classification and baseline use across multiple days:

- keep existing direction and roundabout geometry stable;
- identify one response-compatible category where current four-choice/category filtering appears too easy or errors remain hidden;
- increase uncertainty inside that compatible family, for example by removing a category cue or increasing same-family distractors;
- do not mix terminology, atomic actions, and multi-step prechecks merely to reach an 8–12 target count;
- compare error type and repeated voluntary use, not accuracy alone;
- stop if target/layout errors dominate or the denser surface does not reveal information beyond the existing drill.

The all-23 board remains deferred. Confidence in this first densification experiment is **low–medium** until Jeffrey defines whether the target construct is semantic comprehension, rapid action, or motor-map rehearsal.

### 13.5 Revised vocabulary branch

Only if broader vocabulary is the selected near-term priority:

1. inspect one real source sample;
2. define identity, deduplication, fresh-schedule, deletion, and backup semantics;
3. run a small text/emoji/TTS plumbing test only to validate those engineering paths;
4. state explicitly that this does **not** validate image-first retention or Fluent Forever replacement;
5. if image selection is the key learning question, test at most a few real personal-image handoffs before deciding between browser media work and a concrete Swift milestone.

No direct FF/Anki importer is scoped without an actual file. No rich-media deferral is justified by “Swift someday” alone; the architecture default must be paired with a real decision about whether and when native work will begin.

### 13.6 Revised priority sequence

This sequence is a recommendation awaiting Jeffrey's choices, not authorization to edit the backlog or product:

1. **Jeffrey decision:** primary near-term outcome and due-gate policy.
2. **0A-lite:** classify 23 prompts by repo-grounded response type; mark physical/procedural mappings as hypotheses.
3. **Mode policy:** approve or revise the scheduling matrix above.
4. **First code proposal:** gate truth + current-drill instrumentation, with tests and SPEC/log-schema updates.
5. **Use the existing drill across multiple days** and inspect errors, replays, timing, and optional miss reasons.
6. **One type-specific driving densification** only if the data and Jeffrey's experience show a gap.
7. **Vocabulary asset inventory and plumbing spike** only if broader vocabulary is the selected priority.
8. **Sharing** only for a named audience and confirmed URL.
9. **Game-depth primitive** only for a written play problem, with pure CORE tests.
10. **Instructor validation** only for physical/procedural behavior the product is ready to represent.

### 13.7 Decisions needed to finish Stage 7

1. Primary outcome for the next bounded cycle.
2. Hard versus soft ≥3-due-card policy.
3. What the harder drill should primarily measure.
4. Whether real lessons use multi-command chains.
5. Which controls/procedures an instructor has actually required.
6. What vocabulary/list/media assets exist.
7. HTML daily-tool horizon versus a concrete or indefinite Swift horizon.
8. Named sharing audience and stable URL, if any.
9. Preferred tone: garage mini-game mastery versus serious exam drill.
10. Acceptable time before the next change should feel visibly better in Safari.

### 13.8 Jeffrey decisions recorded

| Decision | Jeffrey's choice | Effect on recommendation |
|---|---|---|
| Primary outcome for the next bounded cycle | **Practical-driving command fluency** | Driving classification, mode-policy correction, and current-drill instrumentation lead. Vocabulary intake, sharing, and match-3 depth are conditional rather than parallel work. |
| Match-3 entry when ≥3 ordinary cards are due | **Soft prompt with an explicit `Jugar igual` choice** | A future proposal should make the bypass visible and update `SPEC.md` from “hard gate” to an honest soft prompt. Backdrop dismissal should no longer be the implicit policy. |
| Authoritative command scheduling | **Only untimed due review updates FSRS** | Free practice, timed practice, timed due sessions, and future diagnostic surfaces should log separately without changing command stability unless later evidence supports promotion. |
| Primary construct for the next harder drill | **Semantic comprehension first; latency secondary** | Accuracy and error type lead. Speed is reported separately and is not treated as proof of comprehension. Motor-map rehearsal remains a distinct future pilot. |
| Frequency of chained instructions in real lessons | **Mostly one instruction at a time** | Route-chain mode remains deferred. The next cycle should focus on atomic command comprehension rather than sequence grading. |
| Instructor-validated physical controls/procedures | **None yet; practical driving lessons have not started** | Do not implement cockpit/procedure grading or claim real-driving mapping. Revisit after lessons provide actual observations. |
| HTML versus Swift horizon | **HTML remains the daily tool; Swift has no committed date** | Near-term HTML changes must be durable and honestly backed up. Do not use indefinite Swift work to justify an incomplete browser path. |
| Sharing audience/priority | **People are conceivable, but Jeffrey's own learning is the priority** | Defer sharing/onboarding/deep-link work for this cycle. Optimize the drill for Jeffrey first. |
| Driving-drill tone | **Garage mini-game mastery and playful progression** | Keep comprehension measurement honest, but express feedback and progress through Cooper/garage presentation rather than worksheet-style UI. Do not equate playful tone with extra currencies or coercive gates. |
| Scope before user evaluation | **One focused implementation slice, then reassess in Safari** | The first proposal must be cohesive and bounded; do not complete the broader review roadmap before Jeffrey evaluates real use. |

### 13.9 Final promotion, spike, deferral, and rejection record

#### Promote to the next bounded proposal

1. **Soft-gate truth:** visible `Jugar igual` at every due count, with `SPEC.md` aligned to soft-prompt behavior.
2. **Command-mode scheduling integrity:** only untimed due review changes command FSRS; all other current modes log without rescheduling.
3. **Existing-drill instrumentation:** mode, timed state, first-attempt status, selected target, elapsed time, replay count, and surface ID; optional low-friction miss reason.
4. **Repo-grounded command classification:** classify the 23 prompts without claiming instructor or DGT authority.
5. **Playful session feedback:** improve the existing Cooper completion summary using honest session data, without adding currency, lives, or persistent rank inflation.

These items form one proposed slice because they correct the meaning of current data, support backlog item #3's future fitting work, and produce a visible garage-drill improvement.

#### Spike only after multiple days of current-drill evidence

- One denser response surface inside a response-compatible command family.
- Removal of a category cue or increase in same-family distractors where the current drill appears too easy.
- An optional miss-reason UI only if selected-target and replay data cannot explain errors with less friction.

#### Defer

- mixed 8–12 and all-23 response boards;
- motor-map and cockpit simulations;
- route-chain mode;
- physical/procedural grading until practical lessons produce instructor evidence;
- vocabulary import and personal-image pipeline during the driving-first cycle;
- sharing/onboarding/deep links;
- new match-3 primitives, currencies, seasonal content, and profiles;
- Swift-dependent media work without a committed Swift milestone.

#### Reject under the frozen gates

- exact/exhaustive examiner-language claims;
- Spanish-dependent match rules or ordinary-play locks;
- lives/energy and key-gate economies;
- answer previews graded as recall;
- recognition results merged into recall FSRS;
- separate `examen.html`;
- base64 image libraries or embedded image-search architecture;
- speech/typed production grading in this cycle.

### 13.10 First focused implementation slice — proposal only

If Jeffrey later authorizes implementation, the proposed slice is:

1. Make the ≥3-card match-3 entry prompt explicitly soft, with visible `Repasar ahora` and `Jugar igual` actions; backdrop behavior must no longer be the only bypass.
2. Separate command scheduling from diagnostic practice: untimed due answers update FSRS; timed or free-practice answers do not.
3. Extend command-log entries with the approved mode and interaction fields while preserving backup/restore compatibility and the existing 2,000-entry cap unless a separate migration is justified.
4. Make the existing end-of-drill modal mode-aware and more playful: retain first-attempt accuracy, identify the run type, and give one Cooper/garage mastery line derived only from that session's real result. No new currency or permanent badge system.
5. Update `SPEC.md`, add/adjust focused tests, and verify the single-file app in Safari before any denser board work.

**Slice exit conditions:**

- due untimed answers demonstrably update FSRS;
- free/timed answers demonstrably do not update FSRS;
- logs distinguish the modes and survive backup/restore;
- both soft-prompt actions work visibly at ≥3 due cards;
- completion feedback reports real session data without claiming driving transfer;
- existing CORE/SRS tests and syntax checks pass;
- Jeffrey evaluates the result in Safari before another slice is approved.

No code, backlog, specification, or product change is authorized by this review document.

---
