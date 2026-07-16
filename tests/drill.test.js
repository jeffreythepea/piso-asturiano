const fs = require('fs');
const path = require('path');
const assert = require('assert');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const helpersStart = html.indexOf('function commandAttemptSchedules(');
const helpersEnd = html.indexOf('function recordCommandAttempt(', helpersStart);
assert(helpersStart >= 0 && helpersEnd > helpersStart, 'command policy helpers not found');

let fsrsCalls = 0;
const helpers = Function('fsrsReview',
  `${html.slice(helpersStart, helpersEnd)}; return {` +
  'commandAttemptSchedules, gradeCommandCard, drillSurfaceId, commandLogEntry};'
)((card, grade) => {
  fsrsCalls++;
  card.S = grade === 3 ? 2.5 : 0.5;
  card.due = 999;
});

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
assert.strictEqual(helpers.drillSurfaceId({cat:'pre-eng'}), 'icon-grid-v1');

const entry = helpers.commandLogEntry(
  { phase:'driving' }, { id:'c-der', S:2.5 }, 1,
  { now:123, mode:'practice', timed:true, first:false, selected:'c-izq',
    ms:742, replays:2, surface:'junction-v1', scheduled:false, timeout:false }
);
assert.deepStrictEqual(entry, {
  t:123, id:'c-der', k:'cmd', g:1, S:2.5,
  phase:'driving', mode:'practice', timed:true,
  first:false, selected:'c-izq', ms:742, replays:2,
  surface:'junction-v1', scheduled:false, timeout:false
});
assert.deepStrictEqual(JSON.parse(JSON.stringify({log:[entry]})).log[0], entry,
  'instrumented command logs must survive JSON backup/restore');

const answerStart = html.indexOf('function answerCmd(');
const answerEnd = html.indexOf('function nextDrill(', answerStart);
const answerPaths = html.slice(answerStart, answerEnd);
assert.strictEqual((answerPaths.match(/recordCommandAttempt\(/g) || []).length, 2,
  'tap and timeout paths must share instrumented recording');
assert(!answerPaths.includes('fsrsReview('),
  'answer paths must not bypass the command scheduling policy');

const nextStart = answerEnd;
const nextEnd = html.indexOf('/* ============================================================\n   PROGRESO', nextStart);
assert(html.slice(nextStart, nextEnd).includes('commandAttemptSchedules(drillMode, drillTimed)'),
  'only authoritative sessions should receive the due reward');

console.log('drill.test.js: all tests passed');
