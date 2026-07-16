# Changelog

Versions are stamped in the footer of `index.html`. Bump on any game-behavior
change; docs-only changes don't bump. One line here per version, added in the
same commit.

## v0.26 — Separate driving and precheck practice
Added a persisted three-way Garage selector for Conducción, Comprobaciones, and
Mixto. Due review, free practice, and answer distractors all respect the chosen
phase without duplicating command cards or FSRS history. The selector shows
phase-specific due counts, old saves default to driving, and mixed-session
results report driving and precheck accuracy separately. Recorded the
user-confirmed test car as a 2019 Toyota Yaris Hybrid while keeping its physical
controls and procedures blocked on instructor verification. Added a pre-answer
**Mostrar español** hint that reveals only the written Spanish command; hinted
responses remain answerable but do not count as unaided listening successes and
are recorded explicitly in the command log.

## v0.25 — Honest exam scheduling and diagnostic logs
Only untimed due command review now updates FSRS and earns the existing ★1 + 🔨
reward. Timed due and free-practice attempts requeue within their session but
leave card schedules untouched and pay no reward. Every command attempt logs
phase, due/practice mode, timed state, first-attempt status, selected target,
response milliseconds, manual audio replays, response surface, timeout, and
whether it changed scheduling. Timed UI copy no longer promises a reward, and
the stats and save-report accuracy exclude new diagnostic attempts.

## v0.24 — Atomic precheck commands
Split the seven grouped Fermín precheck cards into 14 safe atomic prompts with
natural *usted* wording, producing a 30-card exam corpus (16 driving, 14
precheck). Each command now records its phase, response type, exact parent
source text/page, wording status, and instructor-validation status. Existing
atomic command IDs survive; ambiguous grouped cards retire without transferring
their FSRS state, while historical log entries remain. The disputed page-3
brake-fluid/washer-fluid card is withheld until Fermín confirms the component.

## v0.23 — Autoescuela guide-supported exam commands
Replaced the 22 provisional Garage commands with 23 unique prompts extracted
from Autoescuela Fermín's 2020 student guide. The main drill now includes the
guide's complete driving instructions, vehicle prechecks, and testable
terminology while preserving the source's exact Spanish fragments. Preserved
stable IDs where meanings survived and kept *parada*, *estacionamiento*, and
*detención* as three distinct concepts. The junction again covers change of
direction and straight steering; the rebuilt roundabout surface represents
five numbered exits on separate roads. The banner states that the guide is
illustrative rather than exhaustive.

## v0.22 — Code review fixes
1. Removed leading "Yo " from all PHRASES_TIER1 entries — pronoun-drop is the natural Spanish register, the subject is encoded in the verb ending.
2. Fixed moto tier-1: "Tengo cuidado con la moto" (was "Cuido la moto").
3. Added missing v0.16 CHANGELOG entry for rotonda SVG surface.

## v0.21 — Frase presente (tier rotation)
Task panel now cycles through phrase tiers. Complete the imperative task (★1) to unlock the present-tense variant (★1). Tier 0: "Lávate las manos" (imperative). Tier 1: "Me lavo las manos" (present). Both cards enter FSRS deck independently, so each phrase form gets its own review schedule. Tier icon shifts from ⚡ to 🔄 on tier 1 cards. Full 72-entry tier-1 dataset with first-person conjugations.

## v0.20 — Timed exam drill
Added opt-in timed mode to Cooper's exam drill. Toggle "⏱️ Modo contrarreloj" on the start panel: 8 seconds per card, color-shifting countdown badge (green → amber → red), time-up counts as wrong (FSRS Again grade, requeue). Timer clears on answer or session end.

## v0.19 — La terraza
Fifth purchasable room: *la terraza*, an outdoor balcony/patio scene in Oviedo.
Backdrop: Asturian sky, Picos de Europa silhouette in the distance, stone sill,
terracotta-tiled floor, and a sliding door to the interior. Twelve items with
fresh vocabulary (plants, garden tools, outdoor furniture, Asturian cider jug
on the terrace — la sidra fuera):
mesa, silla plegable, sombrilla, geranios, lavanda, tomatera, regadera,
tendedero, pinzas, farolillos, hórreo, botella de sidra. Tasks use simple
*tú*-imperative actions (*cuelga la ropa*, *riega las plantas*, *abre la
sidra*). Joins the sequential unlock chain between *el baño* and *el garaje*;
garaje remains exempt (always unlocked).

## v0.18 — Cruce en el examen
The direction drill (cat === 'dir') now replaces the 2×2 icon pad with a
crossroads SVG (300×300 viewBox): four arms radiating from a central
intersection with yellow entry arrow at the bottom, each arm end being a
tappable native-SVG group (r=44) carrying the command's icon. Each command
maps to its geometrically natural arm end — c-recto (➡️) at 12 o'clock,
c-der (➡️) at 3 o'clock, c-izq (⬅️) at 9 o'clock, c-sentido (🔄) at 6
o'clock — so the icon's direction visually matches the arm it sits on.
Same answerCmd flow and .right/.wrong feedback as the roundabout surface;
other categories keep the icon pad.

## v0.17 — Rotonda en el examen (iPad Safari fix)
Fixed roundabout SVG rendering issue on iPad Safari. Previous implementation used foreignObject, which caused layout problems. Now uses native SVG elements for all tap targets, ensuring consistent sizing (44px minimum) and proper touch interactions across all iOS devices.

## v0.16 — Rotonda en el examen
Added SVG roundabout surface for `c-rot1`–`c-rot4` (command category `rot`). Visual answer selector shows a four-exit roundabout diagram: 1ª exit at 3 o'clock (first right), 2ª at 12 (straight), 3ª at 9 (left), 4ª at 6 (U-turn). Yellow entry arrow at bottom. All tap targets are 44px minimum.

## v0.15 — Copia de seguridad
Export/import of the full save (progress, FSRS deck, review log) as JSON via a
footer button — protects localStorage-only data and gets `S.log` out for FSRS
parameter fitting (BACKLOG #3). Restore validates and reloads through the
normal migration path.

## v0.14 — El garaje & El examen de Cooper
Garage room (always unlocked, exempt from room chain), 12 items with usted-register
tasks. Exam drill mini-game: 22-command provisional DGT set, audio-first cards,
same-category icon distractors, auto-graded FSRS on a separate review track
(excluded from the game gate and main Repaso). Stats: órdenes + aciertos al volante.

## v0.13 — El baño
Fourth room (12 items), reflexive imperatives (date una ducha, cepíllate los
dientes), tiled backdrop. Piso interior complete; grammar ramp tú → plurals →
reflexives established.

## v0.12 — El guante
Second booster: free swap of two adjacent pieces, no move consumed; resolves
matches/specials if formed. Purchasable ★2; starts with 1.

## v0.11 — El dormitorio
Third room (12 items), night backdrop, plural articles los/las with gender
colors extended. Generalized sequential room-unlock chain.

## v0.10 — Progreso
Stats tab: streak, due counts, recent accuracy, stability distribution.
Review log (`S.log`, capped 2000) recording every grade — dataset for future
FSRS parameter fitting.

## v0.9 — Phrases, Cooper, FSRS
La lista de Cooper: per-object action-phrase tasks (★1) creating phrase cards
(front: object + ⚡, "¿Qué haces con esto?"). Cooper narrative layer (welcome,
level banter, win/task reactions; ES with EN subtitles). FSRS-5 replaces
Leitner (default params, retention 0.9, Leitner-save migration).

## v0.8 — Paced finale
Leftover-move rockets land and fire sequentially with beats between.

## v0.7 — The big Homescapes build
9×9 board. Goal-based levels with ASCII map masks. Obstacles: cajas (hp 1–2),
cadenas. Droppers (empanada) and orbayu (spreading jelly) with dedicated
levels. FX animation layer driven by the blast engine's event stream (rocket
streaks, plane flights, booms, rings). Chrome-less tiles. Rocket finale.
Goal-seeking planes. Second room: la cocina (sequential unlock).

## v0.6 — Reachability gravity
Cascading diagonal infill; unreachable roofed cells cast tapering shadows that
heal when the roof breaks. Level-design rule: never author full-width blocker
walls (L4 given feed gaps).

## v0.5 — Diagonal infill (first pass)
Tiles slide diagonally around blockers; superseded by v0.6's cascade.

## v0.4 — Special pieces
Rocket/bomb/plane/laser with full Homescapes spawn table (4-line, L/T, 2×2,
5-line), chain reactions, all 8 combos. Fresh board per level fix. 2-min hint.
Version stamping begins.

## Pre-v0.4 (unstamped)
v0.1 core prototype: match-3 + Leitner SRS + sala shop (13 objects), es-ES
speech, WebAudio SFX, hint system, storage with in-memory fallback.
