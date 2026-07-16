const assert = require('assert');
const { validateSave } = require('../tools/fit-fsrs.js');

const legacy = {
  deck: [{ id:'c-der', kind:'cmd', due:1 }],
  log: [{ t:Date.now(), id:'c-der', k:'cmd', g:3, S:2.5 }]
};
assert.deepStrictEqual(validateSave(legacy), [],
  'legacy command logs without instrumentation must remain valid');

const instrumented = JSON.parse(JSON.stringify(legacy));
instrumented.log.push({
  t:Date.now(), id:'c-der', k:'cmd', g:1, S:2.5,
  phase:'driving', mode:'practice', timed:true,
  first:true, selected:null, ms:8000, replays:1, hinted:false,
  surface:'junction-v1', scheduled:false, timeout:true
});
assert.deepStrictEqual(validateSave(instrumented), [],
  'instrumented diagnostic logs should validate and survive JSON roundtrip');

const invalid = JSON.parse(JSON.stringify(instrumented));
invalid.log[1].replays = -1;
invalid.log[1].phase = 'mixed';
invalid.log[1].hinted = 'yes';
const errors = validateSave(invalid);
assert(errors.some(e => e.includes('.replays')), 'invalid replay counts should be rejected');
assert(errors.some(e => e.includes('.phase')), 'invalid phases should be rejected');
assert(errors.some(e => e.includes('.hinted')), 'invalid hint flags should be rejected');

console.log('report.test.js: all tests passed');
