# El Piso Asturiano — Proposals for Discussion

**Status: design research, not backlog.** Nothing here is approved for implementation.
The proposals preserve the current identity: Spanish stays in the meta/SRS layer,
match-3 remains pure play, learning is image- and pronunciation-first, Cooper is the
guide, and all progress remains local. No monetization, accounts, tracking, social,
or competitive systems are proposed.

**Platform horizon.** The destination is a native Swift app for iPad and iPhone; the
single-file HTML game is a prototype and living design record, not the permanent
technical ceiling. Use HTML to validate uncertain learning loops, economies, and game
interactions cheaply. Scope features that depend on Photos, camera capture, recorded
audio, large media libraries, richer touch interaction, or durable local storage for
Swift when an HTML implementation would require architectural contortions or throwaway
infrastructure. “iPad-port-era” below therefore means a legitimate product scope, not
a rejection or indefinite parking lot.

## 1. Tactile, harder driving drill

### 1.1 Modo examen completo: full response board

**Concept.** Add an opt-in mode, off by default, that presents every command response
at once after the audio plays. On iPad, use a persistent landscape board of roughly
22 targets in a 5×5 footprint (with three empty/structural cells), each at least 52–60
points, with short icons as the primary targets and small Spanish labels appearing
only after the answer. Put the spatial commands on a native-SVG road zone and the
non-spatial commands in adjacent dashboard zones; do not shuffle positions between
questions, because the motor map is part of the simulated driving response.

- **Learning value:** Removes the category cue supplied by four same-category
  distractors. It tests audio comprehension plus command selection under broad
  uncertainty, closer to *hear → decide → act*.
- **Game value:** A visibly intimidating “full controls” board creates a meaningful
  mastery step beyond ordinary and timed practice without replacing either.
- **Effort:** M.
- **Risks/open questions:** Twenty-two controls can become a visual-search test rather
  than a listening test. Stable category zones help, but too much grouping leaks the
  answer category. Prototype both “semantic dashboard zones” and one stable mixed
  grid; reject per-question shuffling because it measures target hunting. Record mode
  and response latency in the log. Grade the same card Good/Again, but keep accuracy
  separate by mode so easier practice does not mask exam-mode weakness. Do not give a
  stronger economy reward for harder grading; that would invite avoidance.
- **Era:** HTML-prototype-viable. Native SVG only; no `foreignObject`.

### 1.2 Persistent cockpit and road scene

**Concept.** Keep a simplified cockpit/road scene on screen while audio commands ask
the player to touch a steering wheel, indicator, pedals, mirrors, or a junction exit.
The scene changes state after the action—indicator flashes, wheel turns, car stops—so
the response feels causal rather than like choosing an icon.

- **Learning value:** High for commands tied to a physical control or spatial road
  action; low for abstract/pre-check commands unless their control is naturally
  represented. It adds useful sensorimotor encoding only where the mapping is real.
- **Game value:** Strong tactility and continuity; it feels like one drive rather than
  a stack of flashcards.
- **Effort:** M in HTML for a small command subset; L for a convincing full drive.
- **Risks/open questions:** Decorative animation can disguise weak comprehension.
  Every interaction needs a one-to-one command mapping and immediate correction.
  Touch areas should be native SVG groups with generous hit circles.
- **Era:** HTML-prototype-viable as a limited “controls + junction” pilot; full version
  belongs in the iPad port.

### 1.3 Gesture controls

**Concept.** Use directional swipes for turn/continue/U-turn commands and a vertical
drag or press-and-hold for accelerate/slow/stop. Gestures should supplement, not
replace, explicit controls because several commands do not have an unambiguous gesture.

- **Learning value:** Moderate when the gesture resembles the driving action. A left
  swipe for *gire a la izquierda* reinforces meaning; arbitrary gestures for mirror
  checks train a private code, not the exam skill.
- **Game value:** Tactile and fast, especially in timed mode.
- **Effort:** S for four directions; M with conflict handling and feedback.
- **Risks/open questions:** Safari scroll/navigation gestures, accidental diagonals,
  handedness, and discoverability. Require a minimum distance and dominant axis; show
  a trace before committing. Do not score ambiguous gestures as language failures.
- **Era:** HTML-prototype-viable for direction commands only.

### 1.4 Route mode: command sequences

**Concept.** Play three commands in sequence, then require three ordered actions on
the persistent road scene; expand to four only after measured success. Use plausible
chains—*siga recto, en la rotonda tome la segunda salida, estacione a la derecha*—and
replay the whole route only before the first action.

- **Learning value:** High but distinct: it trains listening working memory and route
  retention, both relevant in a driving lesson. It should not replace single-command
  FSRS because a failed sequence does not identify which card was forgotten.
- **Game value:** Strong sense of a short journey, with suspense and a clear finish.
- **Effort:** M for authored sequences; L for generated valid routes and animation.
- **Risks/open questions:** Grade each command from its action, but label the session
  as route mode and report sequence-completion separately. Do not apply Again to all
  cards when only one action is wrong. Instructor-verified wording is a prerequisite.
- **Era:** HTML-prototype-viable with authored three-command routes; richer simulation
  is iPad-port-era.

**Direction recommendation.** Build the full response board first, then a small
persistent-cockpit pilot. Gesture controls are a selective enhancement. Route mode is
valuable after the command set is instructor-verified and the single-command drill is
stable.

## 2. Homescapes/Gardenscapes depth research

Playrix's current help material verifies pre-level boosters, portals, generators,
multi-layer chains, spreading honey, lives, daily rewards, renovation choices, and
optional mini-games. Mechanics below are inspiration only: no Playrix names, assets,
art, or exact level designs should be copied. Sources: [Homescapes boosters](https://playrix.helpshift.com/hc/en/14-homescapes/faq/16364-what-are-boosters-and-how-to-use-them/),
[Homescapes portals](https://playrix.helpshift.com/hc/en/14-homescapes/faq/1084-portals/),
[Homescapes generators](https://playrix.helpshift.com/hc/en/14-homescapes/faq/1216-generator/),
[Gardenscapes match-3 elements](https://playrix.helpshift.com/hc/en/5-gardenscapes/section/129-match-3-elements/),
[Homescapes redesign mode](https://playrix.helpshift.com/hc/en/14-homescapes/faq/5810-can-i-redesign-my-mansion/), and
[Homescapes mini-games](https://playrix.helpshift.com/hc/en/14-homescapes/faq/7098-mini-games/).

### 2A. Match-3 sophistication not yet present

| Proposal | Concept | Learning value | Game value | Effort | Risks/open questions | Era |
|---|---|---|---|---|---|---|
| Layered restraints | Give chained tiles two or three layers, each hit visibly loosening it. | Spanish counting/labels can remain ambient in goal chips; no language enters matching. | Makes familiar obstacles strategically deeper with little new ontology. | S | Must preserve reachability and avoid full-width feed blocks. | HTML |
| Spreading resin | A removable overlay spreads on a fixed cadence from an indestructible source, unlike current orbayu's “no clear” trigger. | An Asturian material/theme can add passive vocabulary, but the main value is play. | Creates tempo pressure and source-control decisions. | M | Too close to orbayu unless the source and cadence create genuinely different play. | HTML |
| Portals | Paired entrances redirect falling pieces between separated board regions. | Spatial prepositions could appear in level framing, never as match rules. | Opens non-linear gravity puzzles and makes board shapes legible in new ways. | L | Major CORE/reachability work; must specify portal gravity for Swift parity. | HTML only after a pure-core design spike |
| Generators/spawners | Board fixtures release specified droppers, obstacles, or specials when space opens beneath them. | Can make goal nouns visible and repeated without testing them. | Turns collection into source management and creates changing boards. | L | Generator output can choke feeds; deterministic event rules and tests are essential. | HTML viable, high risk |
| Moving lanes | A lane shifts pieces one cell after each move, independently of gravity. | Low direct learning value. | Adds planning across time and makes static maps dynamic. | L | High interaction cost with specials, blockers, and reachability. | iPad-port-era unless strongly desired |
| Hidden/reveal goals | Clear covering layers to uncover several concealed target objects. | Strong fit: revealed objects can be known Spanish vocabulary and spoken once uncovered. | Discovery gives each hit a satisfying purpose beyond damage. | M | Do not test vocabulary inside the board; reveal is exposure only. | HTML |
| Charge-and-release fixtures | Adjacent matches charge a fixture that fires a useful board effect. | Fixture states can use concise Spanish feedback. | Creates local tactical objectives and earned spectacle. | M | Avoid an ever-growing zoo of one-off rules. | HTML |
| New goal types | Escort an item to a specific exit; reveal all hidden items; activate N fixtures; spread a beneficial surface. | Goal objects and completion lines can carry ambient Spanish. | Variety comes from goals rather than only tougher blockers. | M each | Add one reusable goal system at a time; keep maps authorable. | HTML |
| Pre-level booster loadout | Equip a starting special or double-plane effect before the board opens. | Reviews could earn the equipment, preserving “learning is tactical power.” | Adds preparation and inventory decisions. | M | Risks flattening level design and adding economy clutter. | HTML |
| Lives/energy | Failed levels consume a regenerating attempt. Playrix uses five lives and removes one on failure ([official help index](https://playrix.helpshift.com/hc/en/14-homescapes/section/150-gameplay-guide/)). | None inherently. | Adds stakes and return cadence. | M | **Recommend against.** For one user, waiting is punishment without business purpose and fights “optimizing for life.” | Neither |

### 2B. Meta-game and sub-games not yet present

| Proposal | Concept | Learning value | Game value | Effort | Risks/open questions | Era |
|---|---|---|---|---|---|---|
| Days and task chapters | Group Cooper tasks into short “days” with a beginning, complication, and room payoff. | A day can introduce a small grammar/content theme and recycle its phrases in context. | Gives renovation an arc and stopping points; Playrix rewards completion of all daily tasks ([official rewards](https://playrix.helpshift.com/hc/en/14-homescapes/faq/16357-getting-in-game-rewards/)). | M content, S system | Writing burden can become the product; keep chapters short and personal. | HTML |
| Decoration choices | On selected purchases, choose one of three visual styles; long-press later to change. | Style adjectives/colors/materials create natural phrase variants. | Ownership and visible personalization are proven meta rewards. | M per room | Three assets per object triples scene work; start with three anchor objects, not all 72. | HTML pilot; richer on iPad |
| Pin-and-path mini-puzzles | Optional one-screen causal puzzles between chapters. | Can rehearse driving sequence logic or household action verbs if meaningfully mapped. | Variety and a short breather; official mini-games are optional and can be skipped. | M/L | Generic pin-pulls add novelty but dilute identity; reject unless tied to learning content. | iPad-port-era, except one prototype |
| Pair matching | Match image↔image or audio↔image pairs from already learned cards. | Strong recognition practice, but weaker than recall; use as warm-up, not FSRS grading. | Fast, tactile reuse of existing content. | S/M | Reward pressure could encourage guessing; no scheduling grade and no required gate. | HTML |
| Seasonal Asturian moments | Temporary-looking but permanently bundled chapters: amagüestu, Antroxu, San Mateo, sidra season. | Excellent cultural vocabulary and personal relevance. | Refreshes the piso without servers or live operations. | M/L content | “Seasonal event” must not imply deadlines or FOMO; unlock by calendar but remain replayable. | HTML |
| Daily gift | A once-daily Cooper gift after review, ideally a small booster. | Can reinforce daily review if earned after it. | Pleasant ritual; Playrix's escalating bonus resets after a miss ([official daily bonus](https://playrix.helpshift.com/hc/en/14-homescapes/faq/16309-daily-bonus-1780683562/)). | S | Never reset accumulated value after a missed day; punitive streak loss is wrong here. | HTML |

**Direction recommendation.** The best depth-to-effort candidates are layered chains,
hidden/reveal goals, one charge-and-release fixture, and short day/task chapters.
Portals and generators are strategically rich but should wait until play feedback says
the current ten-level vocabulary is exhausted. Lives/energy should be explicitly
rejected.

## 3. General-vocabulary SRS: replacing Fluent Forever

### 3.1 Relearning intake: word first, then choose the memory image

**Concept.** Direct Fluent Forever migration is optional. The primary intake should be
“add/relearn a word”: enter or import the Spanish word, hear it, then choose a personally
memorable picture before the card enters FSRS. Offer two adjacent sources: **Buscar una
imagen** and **Elegir de Fotos**; the result becomes a local card asset rather than a
permanent dependency on the original website.

- **Learning value:** This recreates the valuable part of Fluent Forever—the act of
  selecting a meaningful image—without requiring its proprietary card data or review
  history. It deliberately treats the old words as relearning opportunities rather
  than pretending their prior scheduling can be reconstructed.
- **Game value:** Each chosen image adds to a visible personal vocabulary collection;
  general vocabulary can then feed review-driven progression without forcing every
  word into the apartment catalog.
- **Effort:** M for word entry + Photos; L for in-app web image search and durable
  image ingestion.
- **Risks/open questions:** Fluent Forever's official help page still says retail
  subscribers cannot download their created flashcards and stores them on its servers
  ([FF export answer](https://help.fluent-forever.com/hc/en-us/articles/360026204612-How-do-I-download-the-flashcards-I-created-in-the-app)). That page is old, so current
  support should be asked directly before assuming nothing changed. No verified
  evidence was found that images, audio, or review history export today—but that no
  longer blocks the product direction.
- **Era:** A text-only intake pilot is HTML-prototype-viable. Photos-backed relearning
  should be designed Swift-first unless a tiny HTML spike is needed to test the flow;
  a first-class image-search experience belongs with the native app.

**Intake path.** Accept one word at a time and a simple CSV list of Spanish words,
optional glosses, gender, and example sentences. Imported words enter an **image
inbox**, not the review deck. Each day Jeffrey can process a small batch: hear word →
select image → confirm meaning/gender → create new FSRS card. This preserves the
learning value of personally choosing images and prevents 1000 faceless cards from
creating an immediate review avalanche.

### 3.2 Image acquisition in the HTML prototype

#### Apple Photos and camera

**Concept.** A standard image file picker can invoke iPadOS's chooser, including Photo
Library, camera, and Files; the app then resizes the selected image and stores its blob
locally. The picker should be launched once per card, with an image preview and crop/
replace step before saving. A browser cannot silently browse the whole Photos library;
the user explicitly chooses what to share, which is the right privacy model.

- **Learning value:** Highest-quality option because Jeffrey can use his own sofa,
  street, dog, food, or tutor materials—the personal-memory advantage the iPad port
  notes already anticipate.
- **Game value:** Turns vocabulary building into collecting Jeffrey's real Oviedo.
- **Effort:** M including resize/orientation, preview, replacement, storage, and backup.
- **Risks/open questions:** iOS replaces the file selection on each picker invocation,
  so the app must ingest each chosen file immediately rather than trying to accumulate
  a browser `FileList` ([Apple Developer Forums](https://developer.apple.com/forums/thread/826732)).
  HEIC/orientation and large camera originals require real-device testing. A simple
  file input is documented to offer camera, Photo Library, and file choices on iOS
  ([web.dev capture guide](https://web.dev/articles/media-capturing-images)).
- **Era:** Swift-app priority. HTML can prove the picker → crop → card loop, but should
  not become the long-term media library.

#### Google image search called from the app

**Concept.** The desired flow is word → automatically search the Spanish lemma → show
a grid of candidates → tap one → crop/confirm → save a local copy. Google offers a
Programmable Search Element that can display image results inside a page, but it loads
Google's external script and requires a configured search engine. Its results differ
from ordinary Google Images ([Google image-search help](https://support.google.com/programmable-search/answer/12423774?hl=en)).

- **Learning value:** Very high throughput while retaining personal choice; the act of
  rejecting ambiguous images is itself useful semantic processing.
- **Game value:** Makes adding vocabulary feel like discovery rather than data entry.
- **Effort:** L for a robust HTML version; M/L in the native app depending on provider.
- **Risks/open questions:** This **violates the current “fonts are the only network
  dependency” invariant** and introduces an external service/privacy dependency. The
  programmatic Custom Search JSON API is closed to new customers and scheduled for
  discontinuation on 1 January 2027 ([Google API overview](https://developers.google.com/custom-search/v1/overview)),
  so it is not a sound foundation. The embeddable Search Element remains documented
  ([Google control API](https://developers.google.com/custom-search/docs/element)), but
  selected result images may be hotlinked, disappear, resist download because of CORS,
  or carry unclear reuse rights. Saving only the remote URL is unacceptable for a
  memory system.
- **Era:** Research spike only for HTML; preferably iPad-port-era, where the app can
  present a web search sheet and then import an explicitly saved/selected image.

#### Recommended prototype compromise

**Concept.** If relearning must be tested before the Swift app, put **Buscar en Google
Imágenes** beside **Elegir de Fotos**. Search opens the prefilled query in a new Safari
tab; Jeffrey saves the chosen image to Photos and returns to import it. It is one extra
round trip, but uses no API key, scraping, backend, tracking code inside Piso, or
fragile image hotlink. This is a disposable validation path, not the intended final UX.

- **Learning value:** Preserves image choice and creates a durable local copy.
- **Game value:** Less fluid than an embedded grid, but still far faster than drawing
  or hand-authoring card media.
- **Effort:** S for the search handoff, plus M for the shared Photos ingestion path.
- **Risks/open questions:** The Safari context switch may be irritating at volume. Test
  it with a 20-word relearning batch before considering an explicit architecture
  exception for embedded search.
- **Era:** Optional HTML validation slice; otherwise skip it and build the coherent
  native Photos/search workflow in Swift.

### 3.3 Card families

| Proposal | Concept | Learning value | Game value | Effort | Risks/open questions | Era |
|---|---|---|---|---|---|---|
| Picture words | Image/emoji front → spoken and written Spanish answer; reverse audio→image cards only where useful. | Core Fluent Forever behavior; strongest fit for concrete nouns, verbs, and adjectives. | Expands the learnable world beyond rooms. | M | Emoji ambiguity; imported cards need a personal disambiguation cue. | HTML text/emoji now; photos on iPad |
| Minimal pairs | Play one recording; choose or recall which of two sound patterns/words was heard. | Valuable pronunciation-first training, especially Spanish contrasts Jeffrey actually misses. | Short, objective, tactile sessions. | M | TTS is not reliable evidence for fine phonetic contrasts; needs recorded native audio. | iPad-port-era, unless user-supplied recordings |
| Word forms | Prompt with an image/sentence context and one grammatical transformation: gender/number or a high-value verb form. | Extends current tier architecture without turning cards into translation drills. | Visible mastery paths per lemma. | M | Card explosion; add only forms with observed errors or tutor relevance. | HTML |
| Personal example sentences | Image or situation cue → personally meaningful Spanish sentence, with audio and note on reveal. | High: personal context and sentence-level retrieval support transfer to speech. | Cooper can frame sentences as moments in Jeffrey's Oviedo life. | M content | Avoid English sentence fronts and generic AI-generated filler. | HTML text/TTS now; rich media on iPad |
| Recognition-only browse | Searchable vocabulary gallery with tap-to-hear, not scheduled cards. | Useful reference and passive reinforcement. | Collection satisfaction without review burden. | S | Must not masquerade as retrieval practice. | HTML |

### 3.4 Storage architecture

**Concept.** Keep the existing `localStorage` state small and JSON-exportable, while
separating optional media from scheduling data. Browsers generally cap Web Storage at
about 5 MiB per origin, whereas IndexedDB is designed for significant structured data
and blobs ([MDN storage quotas](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria),
[MDN IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)).

- **Learning value:** Reliable storage protects the corpus; richer personal images
  make prompts more memorable.
- **Game value:** Enables a personal collection without bloating the game file itself.
- **Effort:** S for 1000+ text-only cards in current JSON; L for a dependency-free,
  migrated IndexedDB media store with backup/restore.
- **Risks/open questions:** A single HTML file can still *use* IndexedDB, but backup is
  no longer one JSON stringify unless media is packaged separately. Browser storage is
  origin-specific and can be evicted; WebKit documents origin quotas and storage
  policy rather than guaranteeing permanent archival ([WebKit storage policy](https://webkit.org/blog/14403/updates-to-storage-policy/)).
- **Era:** The new requirement changes the recommendation: keep scheduling/state in
  `localStorage`, but use IndexedDB for resized image blobs from the first image-backed
  relearning prototype. Add a media manifest to JSON backup and a separate downloadable
  media archive or explicitly label JSON-only backup as incomplete. Full-resolution
  originals should remain in Photos; Piso stores a review-sized derivative, not the
  camera master. Robust archive packaging and recorded audio remain iPad-port features.

### 3.5 Economy models

#### Model A — Reviews mint tactical supplies

**Concept.** Preserve the existing contract: completing due reviews earns a hammer,
then add a small meter where every N honest due-card successes earns a choice of glove,
hammer, or one pre-level booster. New/free practice does not mint supplies.

- **Learning value:** Direct daily incentive with time-gated farming protection.
- **Game value:** Study creates flexible power rather than permission to have fun.
- **Effort:** S/M.
- **Risks/open questions:** Self-grading can inflate supply. Cap daily minting and base
  it on due cards completed, not Good grades alone; Again must still count toward
  eventual honest completion.
- **Era:** HTML-prototype-viable.

#### Model B — Daily review key

**Concept.** A completed due session creates a key that unlocks a special level,
chapter task, or reward chest for that day; ordinary match-3 remains playable.

- **Learning value:** Strong daily review signal without a total game gate.
- **Game value:** Gives review a visible daily destination.
- **Effort:** M.
- **Risks/open questions:** If the keyed content feels essential, this becomes a chore
  gate. A missed day must not delete content; keys can stack to a small cap or unlock
  the next visit's chest.
- **Era:** HTML-prototype-viable.

#### Model C — Streak-powered booster multiplier

**Concept.** Consecutive review days increase the chance that a completed session
offers two booster choices instead of one; the multiplier plateaus quickly.

- **Learning value:** Motivates continuity.
- **Game value:** Makes streak visible in play.
- **Effort:** S.
- **Risks/open questions:** Streak anxiety and dishonest grading. Missing a day should
  step down one tier, not reset to zero; otherwise the system punishes life happening.
- **Era:** HTML-prototype-viable.

#### Model D — Vocabulary renovation currency

**Concept.** General-vocabulary reviews earn a separate “memory tile” currency used
only to build a second setting—an Oviedo street, market, café, or neighborhood memory
palace—while stars remain tied to the piso and match-3.

- **Learning value:** Gives imported vocabulary a coherent home and visible mastery.
- **Game value:** Creates a new long-term collection without distorting the existing
  star economy.
- **Effort:** L.
- **Risks/open questions:** Two currencies and a second meta scene can split the game.
  It also creates substantial art/content work before the SRS replacement is proven.
- **Era:** iPad-port-era, or a very small HTML pilot.

#### Model E — Review-fueled lives

**Concept.** Match-3 attempts can only be replenished by review.

- **Learning value:** Maximum coercive incentive.
- **Game value:** Artificial scarcity.
- **Effort:** S.
- **Risks/open questions:** **Reject.** It turns study into a toll, rewards dishonest
  self-grading, and imports a monetization-shaped system into a game with no reason to
  ration play. A missed day becomes punitive.
- **Era:** Neither.

**Economy recommendation.** Promote Model A: review sessions mint a capped choice of
tactical supplies. It already matches the hammer economy, motivates due review, lets
Again remain honest, and makes learning powerful without withholding ordinary play.
Optionally add Model B later as a bonus destination, never a play lock. Do not use
lives, hard daily keys, or reset-to-zero streak multipliers.

## 4. Shareable with friends — driving drill first

Baseline: GitHub Pages already gives every visitor an independent, per-origin
`localStorage` save. Sharing does not require accounts or a backend.

### 4.1 `?modo=examen` deep link

**Concept.** A URL parameter boots the existing single file directly into a compact
driving welcome, seeds command cards, and opens the garage drill. The normal piso
remains one tap away; a second parameter such as `&practica=libre` could preselect but
not auto-start free practice, preserving the required audio-unlock gesture.

- **Learning value:** Removes irrelevant setup for friends preparing for the same DGT
  practical exam while retaining the exact drill and scheduler.
- **Game value:** Fastest path to the strongest shareable feature; Cooper still gives
  it personality.
- **Effort:** S.
- **Risks/open questions:** The command set must be instructor-verified first. Query
  parameters should alter entry flow, never storage keys or content versions. This is
  the lowest-maintenance option because there is one implementation.
- **Era:** HTML-prototype-viable and recommended.

### 4.2 Separate `examen.html`

**Concept.** Publish a second stripped-down HTML page containing the drill and copied
marked SRS/command blocks.

- **Learning value:** Same drill, with a cleaner standalone identity.
- **Game value:** Easier to explain to a non-player.
- **Effort:** M initially, L over time.
- **Risks/open questions:** **Violates the single self-contained HTML invariant** and
  creates code/content drift unless a build step or shared JS file is introduced,
  which violates it again. The benefit does not justify two schedulers, two command
  lists, and two migration paths.
- **Era:** Reject for the prototype; reconsider only if the iPad port becomes a
  separate product target.

### 4.3 Minimal friend onboarding

**Concept.** For `?modo=examen`, replace the Jeffrey-specific welcome with two Cooper
cards: “Practica las órdenes del examen práctico” and a three-step explanation—listen,
tap the action, repeat misses. Ask only for preferred UI support language (Spanish with
small English help versus Spanish-only); do not ask for a name or account.

- **Learning value:** Sets the audio-first contract and explains that commands may
  still need local instructor verification.
- **Game value:** Cooper makes the tool feel intentional without walking a friend
  through rooms, stars, or renovation.
- **Effort:** S.
- **Risks/open questions:** A curious non-learner needs one sentence explaining this
  is for Spain's practical driving test and a “ver el piso” exit. An exam candidate
  needs the provisional-wording warning until backlog item 1 is complete.
- **Era:** HTML-prototype-viable.

### 4.4 Local profiles on one device

**Concept.** A name picker would map each profile to a separate localStorage key and
require profile-aware backup, reset, migrations, and every entry path.

- **Learning value:** Correctly separates schedules when a household shares one iPad.
- **Game value:** Minimal for the likely use case.
- **Effort:** M.
- **Risks/open questions:** Names create the appearance of accounts without providing
  sync or recovery; wrong-profile reviews contaminate scheduling. Recommend **not
  building this** until two real people repeatedly share one device. The honest answer
  is one device/browser profile per person plus existing export/import for portability.
- **Era:** Deferred; iPad port can use system/device conventions if demand becomes real.

**Direction recommendation.** After instructor verification, ship the deep link and
two-card friend onboarding as one small slice. They preserve the single-file design
and local-only progress. Do not create `examen.html` or profiles without demonstrated
need.

## Recommended shortlist for promotion to BACKLOG.md

1. **Instructor-verified command wording** — already backlog #1 and prerequisite to
   sharing or higher-stakes drill modes.
2. **Shareable `?modo=examen` entry + minimal friend onboarding** — nearest-term,
   small, and no architectural split.
3. **Modo examen completo full response board** — the clearest increase in exam
   fidelity; log mode-specific accuracy and latency.
4. **Persistent cockpit/road pilot for controls and junction commands** — validate
   tactile value on the commands where action mapping is genuine.
5. **Swift-first word relearning inbox + Photos ingestion** — prove the 1000-word
   replacement path through personal image selection, without depending on Fluent
   Forever export. Use an HTML Google Images handoff only if the learning loop needs
   validation before native development.
6. **Capped review-to-booster choice meter** — extend the existing hammer principle;
   study creates tactical power, not permission to play.
7. **One match-3 depth slice: layered chains + hidden/reveal goal** — high variety per
   unit of CORE complexity; defer portals/generators until play feedback asks for them.

## Questions for Jeffrey

1. For the full response board, is the target skill fastest possible physical response,
   or correct comprehension with modest visual search? That choice determines stable
   zones versus a mixed grid.
2. Which controls has your instructor actually asked you to operate—indicators,
   mirrors, pedals, parking brake, lights—rather than merely naming verbally?
3. Would route mode reflect real instruction in your lessons, or does your examiner
   usually give one instruction at a time?
4. For relearning, do you have a usable word list outside Fluent Forever already, or
   is even reconstructing the Spanish lemmas part of the task?
5. Of the 1000+ words, roughly how many are picture words, pronunciation/minimal-pair
   cards, and sentences? The answer changes the sensible first importer.
6. Should general vocabulary remain one review queue, or do you want “piso,” “general,”
   and “examen” sessions selectable even when all use the same FSRS engine?
7. When sharing with friends, should the interface keep small English support by
   default, or assume Spanish-only because the target user is already taking driving
   lessons in Spain?
8. Is the Safari round trip—search, save to Photos, return, choose photo—acceptable for
   a first prototype, or is an in-app result grid important enough to justify breaking
   the “fonts-only network dependency” invariant?
