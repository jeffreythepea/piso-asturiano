# El Piso Asturiano — Living Spec (v1)

A Homescapes-inspired game for learning Spanish. Personal project, single user (Jeffrey).
Prototype: single-file HTML (`piso_asturiano.html`). Target: eventual native iPad app.

## Design thesis

Homescapes' retention engine is not the match-3 — it's the meta-loop (puzzle → stars →
renovation → story). This game steals that structure and puts the *learning* where the
grind is and the *game* where the fun is:

- **Match-3 stays pure fun.** No vocabulary inside the puzzle mechanic (rejected Option A:
  match-3 rewards pattern-speed, which fights recall).
- **SRS is the gate and a star source.** Due cards block new levels (hard gate at ≥3 due,
  soft prompt at 1–2). Completing a due-review session earns ★1.
- **The house is the vocabulary.** Every purchasable object is a Spanish word, learned
  image-first (Fluent Forever). The furnished room is a visible memory palace: tap any
  object to hear its name.

## Core loop

1. Open app → due cards? → short review (earn ★1)
2. Play match-3 level → win → ★1
3. Spend ★ in the shop → new object placed in room → new card enters SRS deck
4. Repeat. Room fills = vocabulary retained, visibly.

## Fluent Forever alignment

- **Image → Spanish recall**, no English on card front (EN shown small after reveal only).
- **Pronunciation-first**: es-ES speech synthesis on reveal, purchase, and room-tap.
- **Gender encoding by color**: `el` = rain blue (#3E6E8E), `la` = tile red (#C0563B),
  consistent everywhere (shop, cards, room bubbles).
- Passive exposure bonus: match-3 tiles are Asturian nouns (manzana, queso, castaña,
  sidra, paraguas) shown in a legend and as floating words on matches. Not tested, not
  in the deck — ambient only.

## SRS algorithm (v0.9: FSRS-5)

- FSRS-5 scheduler, default parameters, retention target 0.9. Interval = stability
  (definitional: R(S,S) = 0.9). Marked `SRS-START/END` in the file, node-tested.
- Two-grade UI maps to FSRS grades: `Otra vez` → Again(1), `Bien` → Good(3).
- New cards (objects and phrases) start with a 10-min learning step; the closing
  `Bien` of a session assigns the real interval. `Otra vez` applies the lapse
  formula and requeues at +1 min within the session.
- Leitner-era saves migrate automatically (box → stability approximation).
- Session = all due cards, shuffled; loops until each graded `Bien` once.
- ★1 + 🔨1 per completed session (farming impossible — due-ness is time-gated).

## Verbs & tasks — La lista de Cooper (v0.9)

Each object has one action phrase (`PHRASES`): *enciende la lámpara*, *escancia la
sidra*, *llama a Cooper*… Owning an object unlocks its task in the room's checklist;
completing it costs ★1, speaks the phrase, and adds a **phrase card** to the SRS deck.
Phrase cards prompt with the object image + ⚡ and "¿Qué haces con esto?" — recall the
action, not the noun. Completed tasks stay in the list as tappable audio. This is the
Homescapes task-list structure repurposed so the renovation narrative *is* the grammar
on-ramp (imperatives first, A2-appropriate).

## Narrative — Cooper (v0.9)

Cooper is the Austin figure: a welcome scene on first run, rotating level-preview
banter, win reactions, and task praise — all ES lines with small EN subtitles, so the
story layer is itself comprehensible input. Lines live in `COOPER`; port note: same
structure feeds character animation on iPad.

## Star economy

- Sources: level win (★1), completed review session (★1 + 1 🔨 hammer). Starting balance ★3, 1 🔨.
- Sinks: 25 objects across two rooms, ★2–4 each (sala ★33, cocina ★27).
- Sinks: 13 objects, ★2–4 each (★33 total). Roughly 30 play/review cycles to furnish
  the sala — tune after real use.

## Match-3 spec

- **9×9 board** (Homescapes size; chosen over 8×8 so 4/5-in-a-row setups occur often
  enough to matter), 5 tile types, tap-tap swap (adjacent only), invalid swap reverts.
- Match = run of 3+ in row/col, **or a 2×2 square** (Homescapes convention).
- **Goal-based levels** (see below); moves are the loss condition, goals are the win
  condition. Score is gone — goals replaced it.
- Boards never start with matches or squares; the player creates them.
- **Hint**: 2 min idle → a valid move pulses (a lone special counts as a move).
- Auto-reshuffle when no move remains, **preserving obstacles and their damage state**
  (only reachable on special-free boards, so specials are never destroyed).
- Core logic is DOM-free (`CORE-START/END`), node-tested, ports 1:1 to Swift.

## Levels, goals, obstacles

**Level format** — 9 ASCII strings ("map art"), extremely author-friendly and the part
of the spec most worth keeping for the iPad port:
`.` free · `#` hole (masked cell) · `B` caja · `X` caja ×2 · `C` chained tile

**Goals**: collect N of a tile color (matching them counts), break all cajas, free all
cadenas. Obstacle goals are derived from the map automatically. Win = all goals met;
lose = out of moves. A pre-level modal shows the goals (Homescapes-style); the HUD shows
live goal chips that tick down and turn green.

**Obstacles**:
- **📦 caja** (1 or 2 layers): immovable, unmatchable. Damaged by a match orthogonally
  adjacent, or by any blast/hammer hit. Multi-layer cajas shake and show remaining hp.
- **⛓️ cadena**: a colored tile that cannot be moved but CAN be matched in place;
  clearing it counts toward both the cadena goal and its color goal. Immune to laser
  color-clears (must be matched or blasted).

**Board shapes**: masks create holes. Gravity is **reachability physics** (all tested):
tiles fall straight down (passing through holes) or slide one step diagonally down
around blockers, and fills cascade — cavities flood from their openings in diagonal
wavefronts. A cell no tile can physically reach (roofed directly above and on both
upper diagonals) stays empty and casts a tapering **diagonal shadow** below it until
the roof is broken, at which point the region heals instantly. **Level-design rule
learned the hard way (v0.6)**: never author a full-width wall of blockers — always
leave feed gaps, as Playrix does. L4's chain walls now have a central channel.

**8 authored levels** (plain → cut corners → caja ring → chain rows → diamond →
mixed hp2 → caja donut → finale), then infinite procedural continuation: layouts cycle,
tile-collect goals scale +5 per cycle.

**Boosters**:
- 🔨 hammer — tap it, then any cell: clears/damages it, triggers specials, costs no
  move. **Earned +1 per completed SRS review session** (alongside the star) — the
  strongest tactical resource comes from studying. Starts with 1.
- 🧤 glove (v0.12) — free swap of two adjacent movable pieces: no match required, no
  move consumed; if a match or special activation results, it resolves normally.
  Purchasable for ★2 (tap the button when empty); starts with 1. Booster modes are
  mutually exclusive; both reset at level start.

**Juice**: cascade praise popups in Spanish (¡Bien! → ¡Genial! → ¡Increíble! →
¡Espectacular!) — ambient exposure doubling as game feedback.

## Special pieces (Homescapes/Gardenscapes conventions)

Spawn table (special appears at the swap position when possible, else run middle):

| Match shape | Piece | Solo effect |
|---|---|---|
| 4 in a line | 🚀 Rocket | clears full row/col, perpendicular to the match |
| L or T (two intersecting runs) | 💣 Bomb | 3×3 blast |
| 2×2 square | ✈️ Paper plane | clears its 4 neighbors, flies to a random tile |
| 5 in a line | 🔮 Laser ball | wipes the dominant color |

Activation: swap with any neighbor (laser + normal wipes that tile's color), or
**double-tap to set off in place**. Either costs 1 move. Specials never participate
in color matches; they fall with gravity; blasts that touch another special
**chain-react** (the juice). Cascades after a blast can spawn new specials.

Combo table (swap two specials together):

| Combo | Effect |
|---|---|
| 🔮 + 🔮 | clears the entire board |
| 🔮 + other | dominant color wiped + the other special fires |
| 🚀 + 🚀 | full cross (row + column) |
| 🚀 + 💣 | 3 rows + 3 columns |
| 💣 + 💣 | 5×5 blast |
| ✈️ + 🚀 | plane cross, then a cross fired at the flight target |
| ✈️ + 💣 | plane cross, then 3×3 at the flight target |
| ✈️ + ✈️ | crosses at both, plus two flight targets |

Engine: `runEffects(board, seeds)` — a queue of effect primitives (cell / row / col /
rect / color / board / fire / sink) with chain-reaction handling; combos are just seed
lists built by `buildSwapSeeds`. Ports directly: same two functions in Swift.

## Data model

```
State {
  stars: Int
  level: Int
  owned: [itemId]
  deck:  [Card]
}
Card { id: itemId, box: 1–5, due: timestamp, reps: Int }
CatalogItem { id, es, en, gender(el|la), emoji, cost, roomX, roomY, fontSize }
```

Persistence: localStorage (`piso-asturiano` key), in-memory fallback with a visible
"sesión sin guardar" note when storage is unavailable (e.g., artifact preview).
**To keep progress: download the file and open it in Safari on the iPad.**

## Content: rooms (v0.11)

Sequential unlock chain (finish a room to open the next): **la sala de estar** (13:
ventana, televisión, cuadro, espejo, reloj, estantería, piano, sofá, silla, lámpara,
guitarra, planta, cama del perro) → **la cocina** (12: jarra, sartén, olla, tetera,
cuchillo, cuchara, plato, taza, vaso, pan, huevo, salero) → **el dormitorio** (12:
cama, puerta, despertador, vela, libro, camiseta, calcetines, pantalones, maleta,
llave, móvil, peluche — introduces plural articles los/las) → **el baño** (12, v0.13:
bañera, ducha, váter, papel higiénico, grifo, jabón, esponja, cepillo de dientes,
maquinilla, peine, cesta, patito de goma — introduces **reflexive imperatives**:
date una ducha, cepíllate los dientes, péinate el pelo, lávate las manos; plus the
idiomatic *tira de la cadena*). Grammar deliberately ramps room by room: bare
imperatives → plurals → reflexives. Every object has an action phrase/task.
49 nouns + 49 phrases ≈ ★125 of sinks. Each room has its own SVG backdrop; the
selector persists. The piso is complete — next expansion: la terraza / el hórreo
(exterior scene), or a second piso.

## New mechanics (v0.7)

- **🥧 Droppers (la empanada)** — Homescapes cherries. Movable, colorless,
  unmatchable, immune to blasts and never targeted by planes. They descend as tiles
  clear beneath them (diagonal gravity applies) and are collected on reaching the
  floor of their column. Map char `D`; goal auto-derived.
- **🌫️ Orbayu (jelly)** — overlay layer under tiles, map char `J`. Any clear on the
  cell removes it; every move that clears none spreads it to one random adjacent
  free cell. Goal chip tracks live count. Named for Asturias' drizzle.
- **Goal-seeking planes** — plane targets prefer cells that advance open goals
  (cajas, cadenas, orbayu, needed tile colors) via a pickTarget hook injected into
  the blast engine; core stays pure.
- **Rocket finale** — leftover moves (cap 6) convert to rockets that auto-fire with
  full animations on level win. Pure celebration, Homescapes-style.

## FX animation layer (v0.7)

The blast engine returns an ordered **event timeline** alongside the clear set
(streak / boom / plane / laser / ring), preserving chain-reaction order. The UI
plays it before cells pop: paired 🚀 fly from the origin to both board edges,
✈️ flies to its chosen target and detonates there, 💣 blooms scaled to radius,
🔮 pulses with an expanding ring (board-wide for laser+laser). ~140 ms stagger per
chained event. Port note: same event stream drives SpriteKit actions 1:1.

Tiles are **chrome-less** (v0.7): no cell backgrounds — objects float on the slate
board; selection/hint are soft golden circles, specials glow via drop-shadow.

## Audio

- **Word audio**: Web Speech API, es-ES (pronunciation-first, FF).
- **SFX**: synthesized WebAudio oscillators, zero asset files — select blip, swap sweep,
  invalid-swap buzz, match pop (**pitch rises with cascade depth** — the juice), win/lose
  jingles, purchase and star chimes, review Bien/Otra tones, soft hint chime.
- One mute toggle (🔊/🔇 in HUD) silences both SFX and speech; persisted in state.
- iOS constraint: AudioContext unlocks only on user gesture — hint chime (fired from a
  timer) stays silent until first interaction. Port note: AVAudioEngine or bundled
  samples; keep the rising-cascade-pitch behavior.

## iPad port notes

- **UI**: SwiftUI shell; match-3 in SpriteKit (or SwiftUI Canvas — v1 grid is simple
  enough). Core logic ports directly from the marked JS block.
- **Audio**: AVSpeechSynthesizer (es-ES) — same behavior, better voices. Later: recorded
  native audio per FF orthodoxy.
- **Persistence**: SwiftData or a JSON file; the State model above maps 1:1.
- **Images**: v1 uses emoji. Port should move to real photos (FF: personal images beat
  stock) — camera integration is the killer feature the HTML can't do well: photograph
  *your own* sofa in Calle Magdalena, attach it to `el sofá`.

## Progreso & review log (v0.10)

📊 tab: streak (consecutive review days), words+phrases learned, due now / next 24 h,
recent accuracy (last 100 grades), total reviews, and a stability-distribution chart
(aprendiendo <1 d → dominada 21+ d). Every review appends to `S.log`
({t, id, kind, grade, elapsed, resulting stability}, capped 2000) — the dataset for
future FSRS parameter fitting. Cooper appears at streaks ≥3.

## Open questions / v2 backlog

- More rooms (dormitorio, baño), Homescapes-style "tasks" narrative per room.
- Verbs/phrases, not just nouns ("enciende la lámpara" as a room interaction).
- Typing or speech-input recall instead of self-graded reveal (honesty vs. friction).
- FSRS scheduling; stats screen (streak, retention).
- Typing/speech recall input (deferred by design).
- More phrases per object (rotating verbs); past-tense variants at B1.
- FSRS parameter optimization from real review logs (needs the stats layer first).
- Gender imagery per full Fluent Forever method (color is the v1 shortcut).
