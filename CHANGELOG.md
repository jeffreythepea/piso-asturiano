# Changelog

Versions are stamped in the footer of `index.html`. Bump on any game-behavior
change; docs-only changes don't bump. One line here per version, added in the
same commit.

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
