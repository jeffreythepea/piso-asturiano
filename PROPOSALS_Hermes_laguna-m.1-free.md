# PROPOSALS_Hermes_laguna-m.1-free.md

**Design research proposals for discussion — NOT backlog items.**  
These proposals either respect the design invariants in AGENTS.md or explicitly flag a violation with justification. They reflect *my* research and reasoning; I have not read any other PROPOSALS* files in this repo.

---

## Research Direction 1 — TACTILE, HARDER DRIVING DRILL

### 1a) "Modo examen completo" — Full Response Board (Toggleable, Off by Default)

**Concept:** A toggleable exam mode (off by default) displaying **all ~22 command icons simultaneously** in a single SVG grid. The player hears one command audio (es-ES) and must tap the correct icon from the full board. This replaces the current 4-choice same-category distractor model with true exam conditions: hear once, discriminate from the full command set.

**Layout for ~22 targets on iPad:**  
- Native SVG layout (no `foreignObject` per CHANGELOG v0.17 fix) — 6 columns × 4 rows = 24 cells, 44×44pt minimum tap targets (iOS guideline), 8pt gutters  
- Category grouping via vertical dividers and color-tints on category headers (dirección=cyan, rotonda=orange, velocidad=bold red, maniobras=green, pre-arranque=gray)  
- Spatial grouping preserved (all dirección commands cluster together) because exam mental model is categorical — learner thinks "that's a turn command" before recalling which turn  
- Audio replay button (🔊) top-center; does NOT reshuffle — real exam doesn't shuffle reality when you ask for repetition

**Scoring / FSRS implications:**  
- Grade = Good(3) on first tap correct, Again(1) on any mistake (including re-tap correction)  
- Wrong answers loop immediately at +1 min within session (preserves "must get right" contract)  
- Separate deck key `deckExamFull` so this harder mode doesn't pollute the main command deck's stability estimates  
- Stats: track "full-board accuracy %" separately; add "modo examen completos" count to Progreso

**Learning value:** Trains global command discrimination under pressure — the actual DGT practical exam skill. The 4-choice mode trains within-category distinction; full board trains the real skill.

**Game value:** Badge unlock "Examen Completo Master" at 3 perfect runs. ★1 for first-attempt-perfect (not retries).

**Effort:** M — new SVG grid layout, separate deck tracking, toggle UI in garage panel

**Risks / open questions:**  
- Tap-target density: 44×44pt minimum on 22 items in ~600×400pt viewport — test on iPad mini for thumb accuracy  
- Does spatial grouping help or hurt? Some learners may scan top→bottom, but categories aid chunking  
- Should iPhone collapse to 2-column scroll view? (Defer to iPad-first priority)

---

### 1b) Driving-Like Interaction Concepts

| Concept | Description | Trains Exam Skill? | iOS Safari Viability (native SVG) |
|---------|-------------|-------------------|-----------------------------------|
| **Swipe steering** | Swipe left/right on steering wheel SVG to answer dirección; circular swipe for rotonda. `touchstart→touchmove→touchend` events, preventDefault scroll on gesture zone. | **Yes** — physical steering motion builds procedural memory | **Viable** — SVG paths respond to touch, no Canvas needed |
| **Persistent dashboard scene** | A continuous SVG junction (crossroads + roundabout merged) stays visible; commands highlight relevant arms/exits. Next command fades in at 30% opacity during answer. | **Partial** — reduces recall load, but trains spatial mapping | **Viable** — native SVG state changes, keep within CORE purity |
| **Route mode (command chains)** | 3-4 commands played sequentially: "Gire a la derecha → Segunda salida → Reduzca la velocidad". Player answers all in order, single grade for sequence accuracy. | **High** — the real exam strings instructions | **Viable** — add sequence field to Card, queue audio timers |
| **Voice response capture** | "Diga la orden en voz alta" after hearing it. Web Speech API `SpeechRecognition.start()` listens; fuzzy match against correct command. | **Yes** — actual examiner listens to verbal acknowledgment | **Partial** — iOS Safari has limited `SpeechRecognition`; 2026 Safari supports it? |

**Recommendation:**  
- Prototype **swipe steering** first — lowest complexity, highest skill transfer  
- Prototype **route mode** next — exam fidelity, uses existing SVG surfaces  
- Defer **persistent dashboard** — it reduces the "hear → recall → act" demand which is the core exam skill  
- Defer **voice response** — check iOS Safari compatibility; may work on iPadOS 17+  

**Effort:** Swipe=S, Route mode=M, Dashboard=M, Voice=L (browser support pending)

---

## Research Direction 2 — HOMESCAPES DEPTH RESEARCH

*Mechanics inspired by Homescapes/Gardenscapes (Playrix). No cloned names, assets, or art. Social/competitive/monetization excluded. "UNVERIFIED" marks items based on memory without current source.*

### 2a) Match-3 Obstacles & Sophistication (Not Yet In-Game)

| Mechanic | Homescapes Behavior | What Makes It Engrossing | Learning-Value Adaptation | Effort | Status |
|----------|-------------------|-------------------------|---------------------------|--------|--------|
| **Miel/ Honey** | Sticky overlay; matching adjacent tiles clears honey. Multiple layers. | Creates "peeling" tension, forces strategic planning | Miel asturiana — clearing speaks Asturian foods (fabada, cachopo, sidra) | M | UNVERIFIED |
| **Cadenas reforzadas** | Chained tile that reveals another chain beneath when cleared (2-3 layers). | Escalation satisfaction, "almost there" feeling | Grammatical layers: imperative → present → subjunctive; inner layer unlocks next verb form | M | UNVERIFIED |
| **Portales** | Tiles enter at portal A, exit at portal B. Board becomes non-Euclidean. | Breaks spatial reasoning, forces mental model update | Puertas de preposiciones — portal pairs labeled *desde/hacia/por*; matching through speaks prepositional phrase | L | UNVERIFIED |
| **Generadores** | Obstacle that spawns tiles/collectibles every N moves until destroyed. | Persistent pressure without a move clock | Generador de vocabulario — spawns new-word tiles with emoji; collecting unlocks SRS card | L | UNVERIFIED |
| **Burbujas crecientes** | Bubbles rise one cell per move; matching adjacent pops them. | Vertical motion adds 3D feel | Burbujas de sidra — cider bubbles rise on match clears; popping speaks *escanciar, espuma, burbuja* | M | UNVERIFIED |
| **Hielo** | Tile frozen; requires 2-3 matches to break free. | Delayed gratification, setup required | Hielo en parabrisas — clearing reveals driving vocab (nieve, hielo, freno) | M | UNVERIFIED |

**Pre-level Booster Equipping:**  
Homescapes lets you equip boosters (rocket, bomb, plane) before starting, consuming coins. Current game: ❌ no pre-level prep.

**Proposal:** "Preparación del viaje" — spend ★1 in a pre-level modal to equip 🔨 or 🧤. **Learning hook:** booster tooltips show Spanish word + audio (*martillo*, *guante*). Creates tactical choice: stars for furniture vs stars for level prep.

**Verdict on Lives/Energy:** REJECT — Current gate is SRS due cards, which keeps learning the strongest resource (per AGENTS.md). Lives would shift focus to time-gated grinding.

---

### 2b) Meta-Game & Sub-Games (Narrative & Variety)

| Mechanic | Homescapes Behavior | What Makes It Engrossing | Learning-Value Adaptation | Effort | Status |
|----------|-------------------|-----------------------|-------------------------|--------|--------|
| **Día/Tarea narrative deepening** | Each day has 3-5 tasks; completing them advances light story. | Micro-narrative gives purpose to grinding. | Deepen PHRASES tasks: add "Cooper's request" each room — e.g., "Cooper quiere sentarse en el sofá" = play 1 level to earn ★1 | S | NEW variant |
| **Minijuegos entre niveles** | Pin-pull, pair-matching, spot-difference every 5-10 levels. | Cognitive mode shift, dopamine reset, reward boosters. | Mini examen: single drill card after level win; correct = 🔨1, wrong = no penalty. 20% of levels trigger it. | S | NEW |
| **Elección de decoración (1 of 3 styles)** | Pick rustic/modern/vintage style for each renovation. | Autonomy creates ownership investment. | Estilo asturiano: pick *mesa de piedra / madera / rafia* — adjective becomes SSR card (el estilo) | M | NEW |
| **Eventos estacionales** | 2-week events with exclusive decorations, event currency. | Scarcity + novelty create urgency. | Fiestas asturianas: San Mateo (sept), Carnaval, Navidad. Event currency = *sidra tokens*; unlocks event objects | L | NEW concept |
| **Recompensas diarias** | Login streak → escalating rewards (coins → boosters → infinite lives). | Habit anchoring, loss aversion on streak break. | Paseo diario: open app → Cooper → 1 due card → ★1 + 🔨1 for review. Streak ≥7 = rare booster drop | S | EXTEND existing |

**Effort Summary:** S-tier (daily mini-review, mini-games, decoration choice) all HTML-prototype viable. L-tier (portals, generators) need core physics changes → iPad-port-era.

---

## Research Direction 3 — GENERAL-VOCAB SRS: REPLACING FLUENT FOREVER

### 3a) Import: Fluent Forever App Export Options

| Path | Format | Assets Exported? | Notes |
|------|--------|-----------------|-------|
| **Official FF App** | None documented | ❌ No user-facing export | SQLite/IndexedDB in sandbox — not accessible |
| **Anki/APKG (legacy)** | Anki package with media | ✅ Yes if user has old export | FF desktop could export to Anki; current mobile app can't |
| **Manual CSV + media zip** | User creates CSV + provides media | ⚠️ User-dependent | Most honest path — user dragged image files per FF method |
| **AnkiConnect bridge** | Local HTTP API to Anki desktop | ✅ Yes if Anki running | Too much setup friction for single-user project |

**Recommended Import Architecture:**  
1. CSV parser: `id,es,en,gender,image_base64,audio_base64,card_type,tags`  
2. Base64 → IndexedDB for storage (see 3c), localStorage fallback for text-only  
3. Import wizard in Repaso tab: drag-drop JSON or file picker → validate → merge into deck

**UNVERIFIED CLAIM:** No official FF export exists for current mobile app. Recommend CSV wizard.

---

### 3b) Card Types Beyond Object Nouns

| Card Type | Fluent Forever Analog | Belongs in Piso? | SVG/HTML Rendering Notes |
|-----------|---------------------|-----------------|------------------------|
| **Picture Word (noun)** | Core FF method | ✅ **Core** — already implemented | Emoji + gender color border; iPad port: camera photo |
| **Minimal Pair** | *casa/caza, vaso/baso* — hear one, pick which | ✅ **High value** — seseo distinctions matter for Spanish learners | SVG 2-button pad: 🔊 + 🅰️/🅱️; no images needed |
| **Word Form (conjugation)** | Verb forms & variants | ✅ **High value** — grammar ramp fits game structure | Front: infinitive + pronoun icon (👉 tú, 👑 usted). Back: conjugated form + audio |
| **Example Sentence** | Personal sentence with word | ⚠️ **Maybe** — FF says this is critical depth | Textarea in card editor → stored in card; localStorage bloat risk |
| **Phrase/Action** | Current game mechanic | ✅ **In-game** | Keep the ⚡/🔄 tier system |

**Recommendation:** Implement **Minimal Pair** and **Word Form** card types — text-only, low storage, high learning value for A2→B1 transition.

---

### 3c) Storage Honesty: 1000+ Cards with Images

| Approach | Capacity | Complexity | Viable? |
|----------|----------|------------|---------|
| **localStorage (current)** | ~5 MB | Trivial | ✅ Up to ~200 text-only cards |
| **localStorage + base64 images** | ~100 cards @ 50KB each | Trivial | ❌ Will crash at 1000+ |
| **IndexedDB** | ~50-500 MB | Medium | ✅ Single file can inline idb wrapper |
| **Defer to iPad port** | Unlimited (SwiftData) | N/A | ✅ Honest deferral |

**Recommendation:**  
- Now: localStorage for text-only cards (safe for 1000+ minimal pairs/word forms)  
- Add IndexedDB layer for user-imported images/audio (idb wrapper inline in HTML)  
- iPad port: SwiftData with camera integration (FF killer feature)

**Migration:** `loadState()` checks `indexedDB` support → reads blobs if available, falls back silently.

---

### 3d) ECONOMY DESIGN — Free-Play SRS Feeds Game Progression

*Core tension: SRS must motivate daily review without feeling like a chore or creating honesty pressure.*

#### Model A — "Reviews Power Lives" (Hard Gate)  
- ❤️ lives cost access to match-3  
- Lives only regen via completed due-review  
- **Verdict: REJECT** — violates AGENTS.md ("learning stays tactical resource, not sole gate")

#### Model B — "Daily Key" (Soft Gate)  
- Completing due-review → Daily Key (🔑) unlocks 1 level attempt  
- No key? Pay ★2 or review now  
- **Verdict:** Good balance, but bypass could devalue review

#### Model C — "Streak Multipliers" (Incentive Only)  
- Streaks grant 🔨 multipliers (2x at day 3, 2x+★ at day 7)  
- No gate, just bonuses  
- **Verdict:** Lowest pressure, weakest daily pull

#### Model D — "Two-Currency: Saber (⚗️) for Learning Features"  
- ★ = match-3 progress (rooms, boosters)  
- ⚗️ = learning unlocks (minimal pairs, word forms, decoration choices, Cooper outfits)  
- Reviews earn 1 ⚗️ per card, ★+🔨 per session (unchanged)  
- **Verdict:** Learning directly buys FF-replacement features

**Recommended Hybrid: Daily Key + Saber Currency**  
- Due-review session → 🔑 (unlocks level) + ⚗️1 per card reviewed  
- Streak ≥3 → 🔨×2 bonus  
- Spend ⚗️: Minimal Pair Deck (⚗️50), Word Forms (⚗️100), Decoration Choice (⚗️20)  
- Missed day: No key, no multiplier; streak repair = complete any review

**Honesty safeguard:** ⚗️ only from auto-graded or objectively-graded cards (exam drill, minimal pairs, word forms with typed input). Self-graded noun/phrase cards keep current ★+🔨 reward.

---

## Research Direction 4 — SHAREABLE DRILL (Driving First)

### 4a) Shareable Driving-Only Experience

| Option | Description | Maintenance | Single File? |
|--------|-------------|-------------|--------------|
| **Hash route `#examen`** | Same HTML; hash boots to garage → drill start panel | Zero | ✅ Perfect |
| **URL param `?modo=examen`** | Query param variant | Zero | ✅ Perfect |
| **Separate `examen.html`** | Copy-paste needed | High — drift risk | ❌ Violates invariant |
| **QR code generator** | Garage button generates scannable QR | Low | ⚠️ Adds QR lib (~10KB) |

**Recommendation:** `#examen` hash route — survives link sharing, zero maintenance. Add "Compartir examen" button in garage that copies URL to clipboard.

**First-run modal for shared drill:**  
> "🐕 Cooper: Escuchas la orden → tocas la maniobra.  
> Tu progreso guarda *solo en este navegador*.  
> [Entendido] → start drill"

---

### 4b) First-Run Onboarding for Friends

**Binary first-run choice (new `S.isFirstRun` flag):**  
1. Cooper welcome: *"Soy Cooper. ¿Ver la casa o preparar el examen?"*  
2. **Ver la casa** → normal match-3 flow  
3. **Preparar el examen** → garage with `#examen` active

**DGT exam prep context:**  
- Garage explanation: *"Estas son las órdenes exactas que dice el examinador en Oviedo"*  
- Modo examen completo toggle explained with ⚠️ icon

**Curious non-learner path:** Same house flow, but Cooper's lines adapted to Spanish-first comprehensible input ("¿Quieres ayudarme a decorar?").

---

### 4c) Multiple People on ONE Device

| Approach | Complexity | Value | Recommendation |
|----------|------------|-------|--------------|
| **Local profiles** | M — name picker, keyed storage `piso-asturiano-<name>` | Low-medium | **Defer** — Jeffrey's iPad is personal |
| **Shared device + export** | Zero — already works | Low | **Current answer** — import/export handles portability |

**Note:** If shared-device need emerges, add minimal profile selector (S effort). Keep it out of v1.

---

### 4d) Single-File Architecture Pressure

| Feature | Lines Added | Risk |
|---------|-------------|------|
| `#examen` hash route | ~10 | ✅ Safe |
| Shared drill modal | ~30 | ✅ Safe |
| Saber currency + streaks | ~100 | ✅ Still <50KB JS |
| IndexedDB layer | ~150 | ⚠️ Approaching large |
| Local profiles | ~80 | ⚠️ Defer |
| Full seasonal event art | ~500+ | ❌ Multi-file risk |

**Verdict:** Directions 4a-b fit cleanly in single file. Direction 4c (profiles) acceptable if needed later.

---

## SUMMARY

### (1) Recommended Shortlist — 7 Items for BACKLOG.md

| # | Proposal | Direction | Effort | Era |
|---|----------|-----------|--------|-----|
| 1 | **Daily Key + Saber Currency** (hybrid economy) | 3d | M | HTML-prototype |
| 2 | **Modo examen completo** (full response board) | 1a | M | HTML-prototype |
| 3 | **Route mode** (3-4 command sequences) | 1b | M | HTML-prototype |
| 4 | **Minimal Pair & Word Form card types** | 3b | M | HTML-prototype |
| 5 | **Swipe steering gestures** on dirección commands | 1b | S | HTML-prototype |
| 6 | **Shareable drill via `#examen` hash route** | 4a | S | HTML-prototype |
| 7 | **Decoration choice → adjective cards** | 2b | M | HTML-prototype |

*Deferred to iPad port:* portals/generators (core physics), seasonal art, haptics, personal example sentences with camera, local profiles.

---

### (2) Questions for Jeffrey

1. **Modo examen completo timing:** Should this wait for instructor-verified COMMANDS (BACKLOG #1) or prototype with the current 22 commands?

2. **Saber currency scope:** The proposal restricts ⚗️ rewards to auto-graded/minimal-pair cards only. Do you want ALL reviews to earn Saber, or is the honesty-preserving split correct?

3. **Fluent Forever history:** Do you have an old Anki export (`.csv` or `.apkg`) from the legacy desktop app, or do we start fresh with a CSV+zip wizard?

4. **Minimal pair priority:** Which seseo/ceceo distinctions trip you up most? (e.g., *casa/caza, vaso/baso, Bello/Vello, cazar/casar*). I can seed 20-30 high-value pairs.

5. **Hash route sufficiency:** Is `#examen` enough for sharing, or do you want a QR code button in the garage? (Adds ~10KB QR lib.)

6. **Decoration adjectives:** If user picks *sillón de mimbre* vs *sillón de cuero*, should the adjective card (*mimbre/cuero*) use its own gender color or inherit the noun's?

7. **Daily Key bypass cost:** ★2 to play without reviewing — fair price or too steep? Current economy: ★1/level, ★33 total for all furniture.

---

**Changed files:** `PROPOSALS_Hermes_laguna-m.1-free.md` only.  
**No other file changes, no version bump, no commit.**  
**Proposals are my own — not influenced by any other PROPOSALS document.**