const fs = require('fs');
const path = require('path');
const assert = require('assert');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const helpersStart = html.indexOf('function commandInDrillPhase(');
const helpersEnd = html.indexOf('function recordCommandAttempt(', helpersStart);
assert(helpersStart >= 0 && helpersEnd > helpersStart, 'command policy helpers not found');

let fsrsCalls = 0;
const sampleCommands = {
  driving1:{id:'driving1', phase:'driving'},
  driving2:{id:'driving2', phase:'driving'},
  precheck1:{id:'precheck1', phase:'precheck'}
};
const helpers = Function('fsrsReview', 'cmdOf',
  `${html.slice(helpersStart, helpersEnd)}; return {` +
  'commandInDrillPhase, commandCardsForPhase, drillPhaseLabel, drillPhaseResultHtml,' +
  'commandAttemptSchedules, gradeCommandCard, drillSurfaceId, commandLogEntry,' +
  'commandMissReasonValid, setCommandMissReason, commandMissReasonHtml};'
)((card, grade) => {
  fsrsCalls++;
  card.S = grade === 3 ? 2.5 : 0.5;
  card.due = 999;
}, card => sampleCommands[card.id]);

const sampleCards = Object.keys(sampleCommands).map(id => ({id}));
assert.deepStrictEqual(helpers.commandCardsForPhase(sampleCards, 'driving').map(c => c.id),
  ['driving1','driving2']);
assert.deepStrictEqual(helpers.commandCardsForPhase(sampleCards, 'precheck').map(c => c.id),
  ['precheck1']);
assert.deepStrictEqual(helpers.commandCardsForPhase(sampleCards, 'mixed').map(c => c.id),
  ['driving1','driving2','precheck1']);
assert.strictEqual(helpers.drillPhaseLabel('driving'), 'Conducción');
assert.strictEqual(helpers.drillPhaseLabel('precheck'), 'Comprobaciones');
assert.strictEqual(helpers.drillPhaseLabel('mixed'), 'Mixto');
assert.strictEqual(helpers.drillPhaseResultHtml({
  driving:{size:2,right:1}, precheck:{size:1,right:1}
}, 'mixed'), '<p>Conducción: 1 de 2 a la primera</p><p>Comprobaciones: 1 de 1 a la primera</p>');

assert.strictEqual(helpers.commandAttemptSchedules('due', false), true,
  'untimed due review is authoritative');
for (const [mode, timed] of [['due', true], ['practice', false], ['practice', true]]) {
  assert.strictEqual(helpers.commandAttemptSchedules(mode, timed), false,
    `${mode}/${timed ? 'timed' : 'untimed'} must be diagnostic`);
}

const dueCard = { id:'c-der', due:1 };
assert.strictEqual(helpers.gradeCommandCard(dueCard, 3, 'due', false), true);
assert.strictEqual(fsrsCalls, 1, 'authoritative attempt should call FSRS once');
assert.strictEqual(dueCard.due, 999, 'authoritative attempt should update the card');

for (const [mode, timed] of [['due', true], ['practice', false], ['practice', true]]) {
  const card = { id:'c-der', due:1 };
  assert.strictEqual(helpers.gradeCommandCard(card, 1, mode, timed), false);
  assert.deepStrictEqual(card, { id:'c-der', due:1 },
    `${mode}/${timed ? 'timed' : 'untimed'} must not mutate scheduling state`);
}
assert.strictEqual(fsrsCalls, 1, 'diagnostic attempts must never call FSRS');

assert.strictEqual(helpers.drillSurfaceId({cat:'rot'}), 'roundabout-v2');
assert.strictEqual(helpers.drillSurfaceId({cat:'dir'}), 'junction-v1');
assert.strictEqual(helpers.drillSurfaceId({cat:'pre-eng'}), 'yaris-manual-v1-eng');
assert.strictEqual(helpers.drillSurfaceId({cat:'pre-light'}), 'yaris-manual-v1-light');

const entry = helpers.commandLogEntry(
  { phase:'driving' }, { id:'c-der', S:2.5 }, 1,
  { now:123, mode:'practice', timed:true, first:false, selected:'c-izq',
    ms:742, replays:2, hinted:true, surface:'junction-v1', scheduled:false, timeout:false }
);
assert.deepStrictEqual(entry, {
  t:123, id:'c-der', k:'cmd', g:1, S:2.5,
  phase:'driving', mode:'practice', timed:true,
  first:false, selected:'c-izq', ms:742, replays:2,
  hinted:true, surface:'junction-v1', scheduled:false, timeout:false
});
assert.deepStrictEqual(JSON.parse(JSON.stringify({log:[entry]})).log[0], entry,
  'instrumented command logs must survive JSON backup/restore');
assert.strictEqual(Object.hasOwn(entry, 'missReason'), false,
  'skipping optional miss diagnosis must leave the additive field absent');
assert.strictEqual(helpers.setCommandMissReason(entry, 'hearing'), true,
  'a recognized reason should attach to a missed command attempt');
assert.strictEqual(entry.missReason, 'hearing');
assert.strictEqual(helpers.setCommandMissReason(entry, 'invented'), false,
  'unknown reason values must be rejected');
assert.strictEqual(entry.missReason, 'hearing', 'an invalid update must not overwrite the reason');
assert(helpers.commandMissReasonHtml().includes('Opcional; puedes continuar.'),
  'the diagnosis UI must make its optional skip path explicit');

const optionsStart = html.indexOf('function drillOptions(');
const optionsEnd = html.indexOf('\nfunction renderDrill(', optionsStart);
assert(optionsStart >= 0 && optionsEnd > optionsStart, 'drillOptions helper not found');
const optionCommands = [
  {id:'d1', phase:'driving', cat:'man', icon:'1'},
  {id:'d2', phase:'driving', cat:'man', icon:'2'},
  {id:'p1', phase:'precheck', cat:'pre', icon:'A'},
  {id:'p2', phase:'precheck', cat:'pre', icon:'B'},
  {id:'p3', phase:'precheck', cat:'pre2', icon:'C'},
  {id:'p4', phase:'precheck', cat:'pre3', icon:'D'}
];
const drillOptions = Function('COMMANDS', 'commandInDrillPhase',
  `${html.slice(optionsStart, optionsEnd)}; return drillOptions;`
)(optionCommands, helpers.commandInDrillPhase);
assert(drillOptions(optionCommands[0], 'driving').every(c => c.phase === 'driving'),
  'driving answer choices must never include prechecks');
assert(drillOptions(optionCommands[2], 'precheck').every(c => c.phase === 'precheck'),
  'precheck answer choices must never include driving commands');
assert(drillOptions(optionCommands[0], 'mixed').some(c => c.phase === 'precheck'),
  'mixed answer choices may use either phase');

assert(html.includes("drillPhase:'driving'"), 'new saves must default to driving mode');
assert(html.includes("if (!['driving','precheck','mixed'].includes(S.drillPhase)) S.drillPhase = 'driving';"),
  'old or invalid saves must backfill to driving mode');
const exportedPhase = JSON.parse(JSON.stringify({drillPhase:'precheck'}));
assert.strictEqual(exportedPhase.drillPhase, 'precheck',
  'the persisted selection must survive JSON export/import');

const defaultMatch = html.match(/const DEFAULT_STATE = (\{[^\n]+\});/);
assert(defaultMatch, 'default state must remain extractable');
const defaultState = Function(`return ${defaultMatch[1]}`)();
assert.strictEqual(defaultState.lastTab, 'casa', 'new saves should start on Casa');
assert.strictEqual(defaultState.examFocus, false, 'Exam Focus must be opt-in');
assert.strictEqual(defaultState.examFocusStarts, 0, 'focus usage starts at zero');
assert(html.includes("if (!['casa','juego','repaso','stats'].includes(S.lastTab)) S.lastTab = 'casa';"),
  'old saves must backfill the last-used tab safely');
assert(html.includes("if (typeof S.examFocus !== 'boolean') S.examFocus = false;"),
  'old saves must backfill Exam Focus as disabled');
assert(html.includes("S.examFocusReturnTab = S.lastTab;") &&
       html.includes("S.examFocusReturnRoom = S.room;"),
  'enabling focus must preserve the previous app location');
assert(html.includes('S.examFocusStarts++;'),
  'focus entries must provide a lightweight usage signal');
assert(html.includes("switchTab(S.examFocus ? 'casa' : S.lastTab);"),
  'startup must honor focus mode or reopen the last-used tab');
assert(html.includes('id="dr-focus-toggle"') && html.includes('🎯 Enfocar examen'),
  'the Garage must expose the reversible focus control');
assert(html.includes("document.body.classList.toggle('exam-focus', S.examFocus);"),
  'focus mode must drive the reduced presentation through one body state');
assert(html.includes('body.exam-focus nav button:not([data-tab="casa"])'),
  'focus mode must hide unrelated bottom tabs');

const answerStart = html.indexOf('function answerCmd(');
const answerEnd = html.indexOf('function nextDrill(', answerStart);
const answerPaths = html.slice(answerStart, answerEnd);
assert.strictEqual((answerPaths.match(/recordCommandAttempt\(/g) || []).length, 2,
  'tap and timeout paths must share instrumented recording');
assert(!answerPaths.includes('fsrsReview('),
  'answer paths must not bypass the command scheduling policy');
assert(answerPaths.includes('right && !drillHinted ? 3 : 1'),
  'a hinted response must not receive a successful listening grade');
assert.strictEqual((answerPaths.match(/id="dr-next"/g) || []).length, 3,
  'correct, incorrect, and timed-out answers must all wait for Continue');
assert(!answerPaths.includes('setTimeout(nextDrill'),
  'correct answers must not disappear on an automatic timer');
assert(answerPaths.includes("$('dr-next').addEventListener('click', nextDrill);"),
  'revealed answers should advance only through the Continue control');
assert.strictEqual((answerPaths.match(/commandMissReasonHtml\(\)/g) || []).length, 2,
  'wrong taps and timeouts should offer miss diagnosis');
assert.strictEqual((answerPaths.match(/bindCommandMissReason\(entry\)/g) || []).length, 2,
  'both incorrect paths should persist an optional selected reason');
const correctPath = answerPaths.slice(answerPaths.indexOf('if (right){'), answerPaths.indexOf('} else {'));
assert(!correctPath.includes('commandMissReasonHtml()'),
  'correct selections must not ask for a miss reason');

const cardStart = html.indexOf('function renderDrillCard(');
const cardEnd = html.indexOf('\nfunction answerCmd(', cardStart);
const cardPath = html.slice(cardStart, cardEnd);
assert(cardPath.includes('id="dr-show-es">Mostrar español</button>'),
  'the card should offer a Spanish-only hint before answering');
assert(cardPath.includes("$('dr-hint').textContent = cmd.es;"),
  'the hint should reveal the written Spanish command');
assert(!cardPath.includes("$('dr-hint').textContent = cmd.en;"),
  'the pre-answer hint must not reveal English');
assert(cardPath.includes('drillMissed.add(card.id);'),
  'using the hint must remove the attempt from unaided first-attempt accuracy');
assert(cardPath.includes("optionsHtml = precheckSVG(cmd.cat, opts);"),
  'prechecks should use the Yaris manual-based SVG response surfaces');
assert(html.includes('equipamiento del coche y las expectativas del instructor siguen sin confirmar'),
  'the drill must disclose the limitations of the manual baseline');

const nextStart = answerEnd;
const nextEnd = html.indexOf('/* ============================================================\n   PROGRESO', nextStart);
assert(html.slice(nextStart, nextEnd).includes('commandAttemptSchedules(drillMode, drillTimed)'),
  'only authoritative sessions should receive the due reward');

console.log('drill.test.js: all tests passed');
