# PROPOSALS_HERMES_NEMOTRON_ULTRA.md

**Design research proposals for discussion — NOT backlog items.**  
These proposals either respect the design invariants in AGENTS.md or explicitly flag a violation with justification. They reflect *my* research and reasoning; I have not read any other PROPOSALS\* files in this repo.

---

## Research Direction 1 — TACTILE, HARDER DRIVING DRILL

### 1a) "Modo examen completo" — Full Response Board

**Concept:** A toggleable exam mode (off by default) that replaces the 4-choice icon pad with a single screen showing **all ~22 command responses at once**, exactly one correct per audio prompt. The user hears the command once, then scans the full board and taps their answer. This mirrors the real DGT practical exam: you hear the examiner once, you must pick the correct action from your full mental model — no narrowing to 4 same-category distractors.

**Layout for ~22+ targets on iPad:**  
- Native SVG grid (no `foreignObject`, per CHANGELOG v0.17) — 6×4 or 5×5 with 44×44 pt minimum tap targets, 8 pt gutter.  
- Commands grouped by category (dirección, rotonda, velocidad/detención, maniobras, pre-arranque) with subtle color-coded column headers (directional blues, roundabout oranges, speed reds, maneuver greens, pre-start grays). Grouping respects the *mental model* the examiner teaches; shuffling would add noise, not exam fidelity.  
- Audio replays on tap of the 🔊 badge (top-right persistent), **does not reshuffle** the board — the exam doesn't reshuffle the world when you ask "¿Repite, por favor?".

**Scoring / FSRS implications:**  
- Grade = **Good (3)** on first-tap correct, **Again (1)** on any miss (including wrong tap + re-tap correct). No partial credit.  
- Wrong answers requeue *immediately* at +1 min (like current `Otra vez`), preserving the "must get it right to clear" exam contract.  
- FSRS stability updates on *first attempt only* — retries don't create new log entries, avoiding stability inflation from retry farming.  
- Separate FSRS deck (`examFull` track) so this harder mode never inflates the main exam deck's stability estimates.  
- Stats: track "First-attempt accuracy %" separately from existing "aciertos al volante".

**Learning value:** Trains *full-set discrimination* under time pressure — the actual exam skill. The 4-choice mode trains category discrimination; this mode trains global command→action mapping.

**Game value:** Unlockable "Modo examen completo" badge in Progreso; a ★1 bonus on first perfect run (22/22 first-attempt). No stars for retries — keeps the exam honest.

**Effort:** M (new SVG board layout, separate deck track, scoring tweaks, toggle UI). HTML-prototype-viable.

**Risks / open questions:**  
- iPad Safari tap precision on 44pt targets at 22 density — need 8pt gutter minimum, test on iPad mini.  
- Does FSRS stability inflation from retries matter if we don't log retries? (Proposed: don't log retries.)  
- Should category headers be collapsible on iPhone? (Defer to iPad-port era; exam drill is iPad-first.)

---

### 1b) More Driving-Like Interaction Concepts

| Concept | Description | Trains Exam Skill? | Novelty Risk | iOS Safari Viability (native SVG only) |
|---------|-------------|-------------------|--------------|----------------------------------------|
| **Swipe/steer gestures** | Swipe left/right/up on the steering-wheel SVG to answer dirección commands; circular swipe for rotunda exits. | **Yes** — maps physical steering to command, builds muscle memory. | Medium — gesture recognition on SVG is tricky; must not conflict with scroll. | **Viable** — `touchstart`/`touchmove`/`touchend` on SVG groups; preventDefault on drag. |
| **Persistent junction dashboard** | A persistent SVG junction (crossroads + roundabout) stays visible across cards; each audio command highlights the relevant arm/exit, user taps to confirm. Commands queue visually (next command fades in at 50% opacity). | **Partial** — trains spatial mapping, but reduces *recall* load (target stays visible). | Low — builds on v0.16/v0.18 SVG surfaces. | **Viable** — native SVG, stateful highlight groups. |
| **Route mode (command sequences)** | 3–4 commands played in sequence ("Gire a la derecha → Segunda salida → Reduzca a 30"), user must execute all in order on the junction dashboard before submitting. Single grade for the *sequence*. | **High** — the real exam chains instructions; working-memory load is the exam. | High — new card type, sequencing logic, partial credit? | **Viable** — SVG state machine, but sequence grading needs care. |
| **Haptic steering wheel** (iPad only) | On iPad with haptics (iPhone 15+/iPad Pro), subtle tap feedback on correct arm/exit. | Low — novelty, not skill. | High — haptic API is iOS-only, degrades on desktop. | **Not viable in HTML** — needs native. Defer to iPad port. |

**Recommendation:**  
- **Prototype swipe/steer on direction commands** (lowest risk, highest skill transfer).  
- **Prototype route mode (3-command sequences)** as a separate "Ruta" sub-mode under the exam drill — high exam fidelity, same SVG surfaces.  
- **Defer persistent dashboard** — it reduces recall demand; the exam tests *hear → recall → act*, not *hear → recognize on persistent map*.  
- **Defer haptics** to iPad port.

**Effort:** Swipe = S, Route mode = M, Dashboard = M, Haptics = L (iPad port).  
**HTML-prototype-viable:** Swipe, Route mode — yes. Dashboard — yes. Haptics — no (iPad port era).

---

## Research Direction 2 — HOMESCAPES DEPTH RESEARCH

*Mechanics inspired by Homescapes/Gardenscapes (Playrix). No cloned names, assets, or art. Social/competitive/monetization mechanics excluded entirely. Knowledge-based items marked **[UNVERIFIED]**.*

### 2a) Match-3 Sophistication — Obstacles & Mechanics Not Yet In-Game

| Mechanic | Homescapes Behavior | What Makes It Engrossing | Learning-Value Adaptation | Effort | Status |
|----------|---------------------|--------------------------|---------------------------|--------|--------|
| **Honey / Miel** | Sticky layer on tiles; matched tiles *on* honey don't clear it — must match *adjacent* to honey or hit with blast. Multiple layers. | Creates "sticky" zones that force planning around them; combos feel earned. | **Miel asturiana** — tiles under honey show Asturian vocab (fabada, cachopo); clearing honey *speaks* the word. Vocabulary exposure without SRS pressure. | M | **UNVERIFIED** — exact layer mechanics from memory |
| **Chains-on-chains (Cadenas reforzadas)** | A chained tile that, when cleared, reveals *another* chain beneath (2–3 layers). | Escalating tension; player feels progress peeling layers. | **Cadenas de gramática** — each layer = next grammar tier (imperative → present → subjunctive). Clearing layer N unlocks tier N phrase card for that object. | M | **UNVERIFIED** |
| **Portals (Portales)** | Tiles enter at portal A, exit at portal B (non-Euclidean board topology). | Breaks spatial assumptions; forces mental model update. | **Puertas asturianas** — portal pairs labeled with prepositions (*a*, *desde*, *hacia*, *por*). Matching through portal speaks preposition + direction phrase. | L | **UNVERIFIED** — portal logic non-trivial in reachability physics |
| **Generators / Spawners (Generadores)** | Object (e.g., cookie box) spawns obstacle/collectible every N moves until destroyed. | Persistent pressure; creates "deal with it now or drown" decisions. | **Generador de vocabulario** — spawns *new word tiles* (emoji-renderable) that must be collected to unlock the word's SRS card. Turns match-3 into *discovery* engine. | L | **UNVERIFIED** |
| **Expanding hazards (Lava/veneno que se expande)** | Jelly/oil spreads 1 cell/move if not cleared; can cross holes via diagonal. | Time pressure without a clock; spatial containment puzzle. | **Orbayu que crece** — Asturian drizzle spreads; clearing it speaks weather vocab (*llueve, chispea, orbayu*). Ties to terraza room theme. | M | **PARTIAL** — orbayu (jelly) exists v0.7; expansion logic is new |
| **Ice / Hielo (multi-layer)** | Tile frozen; must be matched 2–3 times to break. Matching *on* ice doesn't clear it. | Delayed gratification; forces setup matches. | **Hielo en el parabrisas** — garage-themed; each layer = driving vocab tier (pre-start → motion → hazard). | M | **UNVERIFIED** |
| **Soap bubbles / Burbujas** | Floating bubbles rise each move; pop by matching adjacent or blast. | Vertical movement adds 3D feel to 2D board. | **Burbujas de sidra** — cider bubbles rise; popping speaks *escanciar, burbuja, espuma*. Seasonal terraza event. | M | **UNVERIFIED** |

**Level Goal Types Not Yet In-Game:**
- **Clear all honey / ice / bubbles** — cleanup goals, distinct from collect/break.
- **Guide item to exit** (e.g., drop acorn to bottom) — path-planning goal.
- **Survive N moves** — pure survival, no collection.
- **Boss-style: damage the "object" (caja gigante) via adjacent matches** — HP bar on obstacle.

**Pre-level Booster Equipping (Pre-nivel):**  
Homescapes lets you equip 1–2 boosters (rocket, bomb, plane) before starting, paid with coins.  
**Adaptation:** Pre-level "Preparación del viaje" — spend ★1 to equip 🔨 (hammer) or 🧤 (guante) *before* the level. Creates strategic star-spend choice: furnish room *or* ease next level. **Learning hook:** Booster equip screen shows the *word* for the booster (*martillo, guante*) with audio — micro-review.

**Lives / Energy System:**  
Homescapes: 5 lives, 30 min recharge, fail = lose life.  
**Current game:** No lives — moves are the loss condition.  
**Proposal:** **No lives system.** The game's gate is *SRS due cards* (stars), not energy. Adding lives would make the game feel like a chore gate (violates AGENTS.md: "learning stays the strongest tactical resource"). **Reject lives/energy.**

---

### 2b) Meta-Game & Sub-Games — Narrative & Variety Mechanics

| Mechanic | Homescapes Behavior | What Makes It Engrossing | Learning-Value Adaptation | Effort | Status |
|----------|---------------------|--------------------------|---------------------------|--------|--------|
| **Day/Task Narrative (Día/Tarea)** | Each day = 3–5 tasks (fix stairs, call mom, feed cat). Completing tasks advances a light story with Austin. | Micro-narrative gives *purpose* to stars; tasks feel like *helping*, not grinding. | **Día con Cooper** — each room = a "day" with 3–5 tasks (already implemented via PHRASES/tasks). *Deepen:* add a daily "Cooper's request" — a micro-quest (e.g., "Cooper quiere su pelota" → play 1 level, earn ★1, unlock *pelota* card). Narrative = comprehensible input. | S | **PARTIAL** — tasks exist; daily request is new |
| **Mini-games between levels (Minijuegos)** | Pin-pull puzzles, pair-matching, spot-the-difference, pipe-connect — appear every 5–10 levels. | Breaks match-3 rhythm; different cognitive mode; rewards coins/boosters. | **Minijuegos de examen** — between levels, a *single* exam drill card (audio → tap junction). Correct = 🔨1. Wrong = no penalty. Micro-dose of exam skill without a full session. | S | **NEW** |
| **Decoration Choice (Elección de decoración)** | Pick 1 of 3 styles for each renovation (modern/rustic/vintage). Purely visual, but *choice* creates ownership. | Autonomy → investment; visual variety. | **Estilo asturiano** — for each room object, pick 1 of 3 *regional variants* (e.g., *sillón* → *sillón de mimbre / sillón de cuero / sillón de pana*). Each variant = same noun, different adjective → **adjective card** enters SRS. Visual stays emoji; card front shows adjective+emoji. | M | **NEW** |
| **Seasonal Events (Eventos estacionales)** | 2-week events: special levels, event currency, exclusive decorations, leaderboard. | Urgency + exclusivity + fresh content. | **Fiestas asturianas** — *San Mateo (sept), Navidad, Carnaval, San Juan*. Event levels use event obstacles (cider bubbles, fabada steam). Event currency = *sidra tokens* → unlock event-only objects (botella de sidra, disfraz, hoguera). **No leaderboard, no FOMO** — event content stays unlockable year-round via ★ spend. | L | **NEW** |
| **Daily Rewards (Recompensas diarias)** | Login streak: day 1–7 escalating rewards (coins → boosters → infinite lives). Streak repair for coins. | Habit anchor; loss aversion on streak break. | **Paseo diario con Cooper** — open app → Cooper greets you with a *single* SRS due card (audio-first). Answer → ★1 + 🔨1. Streak ≥7 = 🎁 (random booster or event token). **Missed day:** no penalty, just no reward. Streak repair = complete a review session. | S | **PARTIAL** — streak exists in Progreso; daily micro-review is new |

**Effort Summary:**  
- S: Daily micro-review, Mini-game between levels, Day/Task deepening  
- M: Decoration choice → adjective cards, Seasonal event framework (no art)  
- L: Full seasonal event content, Portal/generator/spawner mechanics

**HTML-prototype-viable:** All except portal/generator physics (need core physics changes) and full seasonal event art (emoji-only).  
**iPad-port-era:** Portal/generator physics, seasonal event art/animation, haptic mini-games.

---

## Research Direction 3 — GENERAL-VOCAB SRS: REPLACING FLUENT FOREVER

### 3a) Import: Fluent Forever App Export Options

| Path | Format | Assets Exported? | Verified? | Notes |
|------|--------|------------------|-----------|-------|
| **Official FF App Export** | None documented publicly. App stores data in local SQLite / IndexedDB; no user-facing export. | ❌ No official export. Images/audio stored in app sandbox, not accessible. | **[UNVERIFIED]** — based on FF help center + Reddit; no API. | **Assume no official export.** |
| **Anki Export → CSV/APKG** | FF desktop (legacy) could export to Anki. Anki exports `.apkg` (zip: `collection.anki2` + media folder) or CSV (text only). | CSV = text only. APKG = includes images/audio. | **[UNVERIFIED]** — legacy desktop only; current app is mobile-first. | If user has old Anki deck, use `apkg` → extract media + `collection.anki2` (SQLite). |
| **Manual / CSV Fallback** | User creates CSV: `id,es,en,gender,image_filename,audio_filename,card_type,tags` | User provides images/audio in a zip alongside CSV. | ✅ Verified — this works today. | Build an **Import Wizard** in Repaso: paste CSV + drag zip → parse, validate, create cards. |
| **AnkiConnect Bridge** | If user runs AnkiDesktop + AnkiConnect addon, we could pull via local HTTP. | Full deck + media. | **[UNVERIFIED]** — requires user running Anki locally. | Too much friction for single-user; skip. |

**Recommended Import Architecture:**  
1. **Primary:** CSV + media zip import wizard (user-controlled, no external deps).  
2. **Fallback:** Manual entry with "Create from Fluent Forever card" template (pre-fills gender color, card type).  
3. **Future:** If FF adds export, add a one-click importer.  

**Card Fields for Import:**  
`id, es, en, gender (el/la), image (base64 or filename), audio (base64 or filename), card_type (noun/phrase/minimal_pair/word_form/example), tier (0/1), tags (room, theme)`

---

### 3b) Card Types Beyond Object Nouns

| Card Type | Fluent Forever Analog | Belongs in Piso? | Rendering in Single-HTML (emoji/image constraints) |
|-----------|----------------------|------------------|---------------------------------------------------|
| **Picture Word (noun)** | Core FF: image → recall target word | ✅ **Core** — already implemented for 72 objects | Emoji + gender color border (current). Future: user photo (iPad port). |
| **Minimal Pair** | Two similar-sounding words (e.g., *casa/caza, vaso/baso*) — hear one, pick which. | ✅ **High value** — Asturian Spanish has *seseo/ceceo* distinctions; *b/v*, *y/ll* minimal pairs. | SVG 2-button pad (🔊 + 2 emoji/text buttons). No images needed — text + audio. |
| **Word Form (conjugation)** | Verb infinitive → recall conjugated form (or vice versa). | ✅ **High value** — grammar ramp (tú → plurals → reflexives → usted) maps perfectly. | Front: infinitive + pronoun emoji (👉 for tú, 👑 for usted). Back: conjugated form + audio. Text-only, gender color on pronoun. |
| **Personal Example Sentence** | User writes own sentence with the word; card shows image + sentence with blank. | ⚠️ **Maybe** — FF insists on *personal* sentences for depth. But single-file HTML has no text input persistence beyond localStorage. | Textarea on card creation → saved in card `example` field. Render: image + sentence with `____` blank. **localStorage bloat risk** (see 3c). |
| **Phrase/Action (current)** | Object + "what do you do?" → recall phrase. | ✅ **Already in game** — 72 phrases × 2 tiers. | Current implementation (emoji + ⚡/🔄 icon). Keep. |

**Recommendation:** Add **Minimal Pair** and **Word Form** card types now — text-only, low storage, high learning value for A2→B1. Defer **Personal Example Sentence** to iPad port (native text input, IndexedDB, camera for images).

---

### 3c) Storage Honesty: 1000+ Cards with Images

| Approach | Capacity | Persistence | Complexity | Single-File HTML Viable? |
|----------|----------|-------------|------------|--------------------------|
| **localStorage (current)** | ~5 MB (≈500KB JSON + overhead) | Survives browser clear? No — user can clear. | Trivial | ✅ Yes |
| **localStorage + base64 images** | ~100 cards with 50KB images before quota | Same | Trivial | ⚠️ **Brittle** — 1000 cards × 50KB = 50 MB → **will hit quota / crash** |
| **IndexedDB** | ~50–500 MB (browser-dependent) | Survives browser clear? Yes (unless "site data" cleared). | Medium (idb wrapper, migration from localStorage) | ✅ Yes — single file can include idb logic |
| **Defer rich cards to iPad port** | N/A — native SwiftData/CoreData | Full control | N/A | ✅ Honest — HTML stays text-only |

**Recommendation:**  
- **Now:** Keep SRS in localStorage **text-only** (noun, phrase, minimal pair, word form cards = ~1–2 KB each → 1000 cards ≈ 1–2 MB, safe).  
- **Add IndexedDB layer** for *optional* image/audio blobs (user-imported photos, recorded audio). On quota error, fall back to text-only with a toast: "Imágenes guardadas en almacenamiento ampliado; el texto siempre está a salvo."  
- **iPad port:** Native SwiftData — unlimited photos/audio, camera integration (FF killer feature: photograph *your* sofa → `el sofá` card).

**Migration path:** `loadState()` checks for `indexedDB` support → if yes, reads blobs from IDB, falls back to localStorage for text. New `Card` field: `media: {image?: string, audio?: string}` (IDB keys). Old saves work unchanged.

---

### 3d) ECONOMY DESIGN — Free-Play SRS Feeds Game Progression

*Core tension:* SRS *must* be daily for retention, but the game must not feel like a chore gate. Self-grading under reward pressure invites cheating. Three distinct models:

#### Model A — "Reviews = Lives" (Hard Gate)
- **Mechanic:** Match-3 levels cost 1 ❤️ life. Lives *only* regenerate by completing a due-review session (★1 + 🔨1 = 1 life). No time regen. Start with 3 lives.
- **Daily review motivation:** ★★★ — you *cannot play* without reviewing.
- **Honesty risk:** ★★★★★ — high pressure to cheat on self-graded cards to get lives.
- **Chore-gate feel:** ★★★★★ — "I have to study to play" = resentment.
- **Missed day:** 0 lives next session. Must review to play *at all*.
- **Verdict:** **Reject** — violates "learning stays the strongest tactical resource, not the only gate" (AGENTS.md).

#### Model B — "Daily Review Key" (Soft Gate + Unlock)
- **Mechanic:** Completing *any* due-review session (even 1 card) grants a **Daily Key** (🔑). The Key unlocks *one* match-3 level attempt. No key = "Volver mañana" or spend ★2 to buy a key. Keys don't stack (max 1).
- **Daily review motivation:** ★★★★ — strong, but you *can* pay stars to bypass.
- **Honesty risk:** ★★ — low pressure; skipping review just costs ★2 (which you earned from prior reviews/levels).
- **Chore-gate feel:** ★★ — optional bypass; review feels like a *bonus*, not a tax.
- **Missed day:** No key today. Play anyway for ★2, or review now for free key.
- **Verdict:** **Strong contender** — respects agency, low honesty pressure.

#### Model C — "Review Streaks = Booster Multipliers" (Incentive, No Gate)
- **Mechanic:** No gate. But:  
  - Day 1–2 streak: 🔨×1 (normal)  
  - Day 3–6 streak: 🔨×2 (double hammers per review)  
  - Day 7+ streak: 🔨×2 + ★1 bonus on level win  
  - Streak breaks → back to ×1. **Streak repair:** complete a review session today → streak restored (no ★ cost).
- **Daily review motivation:** ★★★ — compounding rewards, not punishment.
- **Honesty risk:** ★ — zero pressure; cheating only cheats yourself out of hammers.
- **Chore-gate feel:** ★ — purely additive; game fully playable at base rate.
- **Missed day:** Lose multiplier, keep base hammers. Repair is one review session.
- **Verdict:** **Best for honesty & feel** — but weakest daily pull.

#### Model D — "Separate Currency: Saber (⚗️) for Content Unlocks"
- **Mechanic:** Reviews earn **Saber** (⚗️), a *second currency* distinct from ★.  
  - ★ = match-3 progress (rooms, boosters).  
  - ⚗️ = *content unlocks*: new card types (minimal pairs, word forms), cosmetic variants (decoration choices), event access, Cooper outfits.  
  - 1 review session = ⚗️5. Minimal pair deck unlock = ⚗️50. Word-form deck = ⚗️100. Decoration choice = ⚗️20.
- **Daily review motivation:** ★★★★ — tangible content unlocks, not just game resources.
- **Honesty risk:** ★★ — moderate; unlocks are desirable but not game-blocking.
- **Chore-gate feel:** ★ — main game (★ economy) untouched; ⚗️ is *extra*.
- **Missed day:** Just slower ⚗️ accumulation. No penalty.
- **Verdict:** **Best long-term** — creates a *learning economy* parallel to game economy. Aligns with "SRS replaces Fluent Forever" goal: ⚗️ buys the features FF charges for (minimal pairs, word forms, custom images).

---

#### Recommendation: **Hybrid B + D — "Daily Key + Saber Currency"**

| Layer | Mechanic | Why |
|-------|----------|-----|
| **Gate (soft)** | Daily Review Session → **Daily Key (🔑)** unlocks 1 level free. No key? Pay ★2 or review now. | Strong daily habit; bypass exists (★2) so never blocked. |
| **Incentive (additive)** | Review streak ≥3 → **🔨×2**; streak ≥7 → **🔨×2 + ★1/level**. Streak repair = 1 review session. | Rewards consistency, no punishment. |
| **Content Economy** | Each review session → **⚗️5 Saber**. Spend ⚗️ on: Minimal Pair Deck (⚗️50), Word Form Deck (⚗️100), Decoration Variants (⚗️20/event), Cooper Outfits (⚗️30). | Learning *directly* buys the FF-replacement features. Honest: you *earn* the advanced cards by reviewing. |
| **Missed Day** | No key today (pay ★2 or review). Streak multiplier resets. Saber unchanged. | No death spiral. Come back, review, key restored, streak repaired. |

**Honesty safeguards:**  
- Self-graded cards (nouns/phrases) → no direct ⚗️/🔑 reward. Only **auto-graded** cards (exam drill, minimal pairs, word forms with typed/spoken input) earn currency.  
- Noun/phrase reviews still give ★1 + 🔨1 (current) — the *tactical* resource.  
- ⚗️/🔑 only from *objective* grading → no cheating incentive.

**Effort:** M (new currency, streak logic, unlock gating, UI). HTML-prototype-viable.

---

## Research Direction 4 — SHAREABLE WITH FRIENDS (Driving Drill First)

*Constraints: No accounts, no servers, no tracking. Progress stays local to each device. Game is already on GitHub Pages; localStorage is per-browser. Design from there.*

### 4a) Shareable Driving-Only Experience

| Option | Description | Maintenance Cost | Single-File Invariant |
|--------|-------------|------------------|----------------------|
| **URL Parameter** `?modo=examen` | Same `index.html`; URL param boots straight to garage → exam drill start panel. `?modo=examen&completo=1` → full-board mode. | **Zero** — one file, one deploy. | ✅ Perfect. |
| **Separate `examen.html`** | Thin wrapper: loads `index.html` as module? No — single file means *copy* the exam code into a second HTML. | **High** — every exam drill change = edit two files. Drift inevitable. | ❌ Violates single-file invariant. |
| **Hash Route** `#examen` | Same as URL param but in hash; survives sharing via messaging apps that strip query params. | **Zero** — same file. | ✅ Perfect. |

**Recommendation:** **Hash route `#examen` + `#examen-completo`** — survives WhatsApp/Telegram sharing, zero maintenance, single file. Add a "Compartir examen" button in garage that copies `location.origin + location.pathname + '#examen'` to clipboard.

**First-run for shared drill:** If `!state.examSharedVisited`, show a one-screen modal:  
> "🐕 **Cooper te da la bienvenida al examen DGT.**  
> Escuchas la orden → tocas la maniobra correcta.  
> Modo normal: 4 opciones. **#examen-completo** = tablero completo (22 órdenes).  
> Tu progreso se guarda *solo en este navegador*."  
> [Entendido — Empezar]

No name entry, no profile — just context.

---

### 4b) First-Run Experience for Non-Jeffrey Users

| User Type | Current Flow | Minimal Onboarding Additions |
|-----------|--------------|------------------------------|
| **DGT exam prep (friend)** | Garage → Exam drill → 4-choice → FSRS | 1. "¿Preparas el examen práctico?" modal on first garage visit. 2. Toggle "Modo examen completo" explained. 3. Cooper says: *"Estas son las órdenes exactas que dice el examinador en Oviedo."* (Instructor-verified banner when BACKLOG #1 done.) |
| **Curious non-learner** | Casa → Sala → Shop → Match-3 | 1. Cooper welcome: *"Soy Cooper. Aprendemos español jugando. ¿Quieres ver la casa o probar el examen de conducir?"* Two buttons: **Ver la casa** / **Probar el examen**. 2. If "Ver la casa" → normal flow. 3. If "Probar el examen" → jump to garage with `#examen` hash. |

**Key principle:** No forced tutorial. One binary choice on first launch. Cooper speaks Spanish + small EN subtitle (existing pattern).

---

### 4c) Multiple People on ONE Device

| Approach | Complexity | Honesty | Portability | Verdict |
|----------|------------|---------|-------------|---------|
| **Local Profiles (name picker → separate localStorage keys)** | M — profile selector UI, keyed storage (`piso-asturiano-jeff`, `piso-asturiano-ana`), export/import per profile. | ✅ Each profile isolated. | ✅ Export/import works per profile. | **Worth it** if Jeffrey shares iPad with partner/family. |
| **Everyone uses own device + export/import** | Zero — already works. | ✅ Naturally isolated. | ✅ JSON backup works. | **Honest answer** for most cases. |

**Recommendation:** **Don't build profiles yet.** The game is on GitHub Pages — friends use their own phones. Jeffrey's iPad is personal. If a real shared-device need emerges, add a minimal profile picker (S). **Flag:** Profile selector adds a top-level UI branch; keep it out of v1.

---

### 4d) Single-File Architecture Pressure Check

| Feature | Pressure on Single File? | Mitigation |
|---------|-------------------------|------------|
| `#examen` hash route | None — 10 lines of `location.hash` check in `init()`. | ✅ |
| Shared drill first-run modal | +30 lines HTML/JS. | ✅ |
| Daily Key / Saber currency | +100 lines (state, UI, logic). | ✅ Still < 50 KB JS. |
| IndexedDB media layer | +150 lines (idb wrapper, migration). | ⚠️ Approaching "large single file" — but still one file. |
| Local profiles | +80 lines (selector, keyed storage). | ⚠️ Do only if needed. |

**Verdict:** All Direction 4 proposals are **HTML-prototype-viable**. Direction 3 (IndexedDB, new card types) pushes file size but stays viable. Direction 2 (portal/generator physics) needs core physics changes — **iPad-port-era**.

---

## SUMMARY

### (1) Recommended Shortlist — 7 for BACKLOG.md (in priority order)

| # | Proposal | Direction | Effort | Era |
|---|----------|-----------|--------|-----|
| 1 | **Daily Key + Saber Currency (Hybrid B+D)** | 3d | M | HTML-prototype |
| 2 | **Swipe/Steer Gestures on Direction Commands** | 1b | S | HTML-prototype |
| 3 | **Route Mode (3–4 Command Sequences)** | 1b | M | HTML-prototype |
| 4 | **Minimal Pair & Word Form Card Types** | 3b | M | HTML-prototype |
| 5 | **Shareable Drill via `#examen` Hash Route** | 4a | S | HTML-prototype |
| 6 | **First-Run Binary Choice (Casa vs Examen)** | 4b | S | HTML-prototype |
| 7 | **Decoration Choice → Adjective Cards** | 2b | M | HTML-prototype |

*Deferred to iPad port:* Portal/generator physics, seasonal event art, haptics, personal example sentences with camera, local profiles.

---

### (2) Questions for Jeffrey

1. **Exam drill:** The provisional `COMMANDS` set (v0.14) needs instructor verification (BACKLOG #1). Should "Modo examen completo" wait until the verified list lands, or prototype with current 22 commands?

2. **SRS Economy:** The Hybrid B+D model gives ⚗️ Saber for *auto-graded* reviews only (exam drill, minimal pairs, word forms). Noun/phrase self-graded reviews keep giving ★+🔨. Does this split feel right, or should *all* reviews earn some ⚗️?

3. **Fluent Forever Import:** You have 1000+ cards in FF. Do you have an old Anki export (`.apkg` or `.csv`) from the legacy desktop app, or are we building the CSV+zip wizard from scratch?

4. **Minimal Pairs:** Which Asturian Spanish minimal pairs hurt you most? (e.g., *casa/caza, vaso/baso, hierba/hierva, Bello/Vello, cazar/casar*) — I'll seed the deck with 20–30 high-value pairs.

5. **Shareable Drill:** Is `#examen` hash route sufficient for sharing with friends, or do you want a "Copy link" button that generates a short URL via a free shortener (adds external dependency — violates no-backend rule)?

6. **Decoration Choice → Adjectives:** If you pick *sillón de mimbre* vs *sillón de cuero*, the adjective (*mimbre, cuero*) enters SRS. Should adjectives have their own gender color (invariant) or inherit the noun's gender?

7. **Daily Key Bypass Cost:** ★2 to play without reviewing — too cheap (trivializes review), too dear (feels punitive), or about right? Current star economy: ~★1 per level + ★1 per review. A level costs 0★; furnishing costs ★2–4.

---

**Changed files:** `PROPOSALS_HERMES_NEMOTRON_ULTRA.md` only.  
**No other file changes, no version bump, no commit.**  
**Proposals are my own — not influenced by any other PROPOSALS document.**