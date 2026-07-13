/* FSRS-5 scheduler tests. Run: node tests/srs.test.js */
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const srs = html.match(/\/\*SRS-START\*\/([\s\S]*)\/\*SRS-END\*\//)[1];
eval(srs);
const DAY = 86400000, MIN = 60000; // consts don't escape eval; functions do

let fails = 0;
function assert(cond, msg){ if (!cond){ fails++; console.log('FAIL:', msg); } }

// retrievability is 0.9 when elapsed = stability (definitional)
assert(Math.abs(fsrsR(5, 5) - 0.9) < 1e-9, 'R(S,S)=0.9');
// harder grades -> shorter initial stability
assert(fsrsS0(1) < fsrsS0(3) && fsrsS0(3) < fsrsS0(4), 'S0 monotonic in grade');
// difficulty bounded
for (const g of [1,2,3,4]) assert(fsrsD0(g) >= 1 && fsrsD0(g) <= 10, 'D0 bounds g' + g);
assert(fsrsNextD(5, 1) > 5 && fsrsNextD(5, 4) < 5, 'Again raises D, Easy lowers D');
// success grows stability; growth is larger when R is lower (spacing effect)
const gHigh = fsrsSuccess(5, 3, 0.95, 3), gLow = fsrsSuccess(5, 3, 0.7, 3);
assert(gHigh > 3 && gLow > gHigh, 'success grows S, more when R low');
// lapse shrinks stability and never exceeds it
const l = fsrsLapse(5, 20, 0.8);
assert(l < 20 && l > 0, 'lapse shrinks S');
// integration: new card -> Good sets S/D and a future due
const card = { id:'x', kind:'obj', due:0, reps:0 };
fsrsReview(card, 3);
assert(card.S > 1 && card.D >= 1 && card.D <= 10, 'first review initializes');
assert(card.due > Date.now() + DAY, 'Good schedules > 1 day out');
// immediate re-review barely grows S (R ~ 1)
const s1 = card.S;
fsrsReview(card, 3);
assert(card.S >= s1 && card.S < s1 * 1.2, 'immediate repeat ~ no growth, got ' + (card.S/s1).toFixed(3));
// Again: learning step + lapse counted
fsrsReview(card, 1);
assert(card.lapses === 1 && card.due <= Date.now() + 2*MIN, 'Again requeues at learning step');

console.log(fails === 0 ? 'SRS TESTS: ALL PASS' : 'SRS TESTS: ' + fails + ' FAILURES');
process.exit(fails === 0 ? 0 : 1);
