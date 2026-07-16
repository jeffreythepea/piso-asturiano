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
  surface:'junction-v1', scheduled:false, timeout:true, missReason:'hearing'
});
assert.deepStrictEqual(validateSave(instrumented), [],
  'instrumented diagnostic logs should validate and survive JSON roundtrip');

const withVocabulary = JSON.parse(JSON.stringify(instrumented));
withVocabulary.personalVocab = [
  { id:'pv-test', term:'perro', en:'dog', g:'el', em:'🐕', createdAt:123 }
];
withVocabulary.deck.push({ id:'pv-test', kind:'vocab', due:1, reps:0 });
withVocabulary.log.push({ t:Date.now(), id:'pv-test', k:'vocab', g:3, S:1, el:0 });
assert.deepStrictEqual(validateSave(withVocabulary), [],
  'personal vocabulary, cards, and logs should validate after JSON roundtrip');

const invalid = JSON.parse(JSON.stringify(instrumented));
invalid.log[1].replays = -1;
invalid.log[1].phase = 'mixed';
invalid.log[1].hinted = 'yes';
invalid.log[1].missReason = 'invented';
const errors = validateSave(invalid);
assert(errors.some(e => e.includes('.replays')), 'invalid replay counts should be rejected');
assert(errors.some(e => e.includes('.phase')), 'invalid phases should be rejected');
assert(errors.some(e => e.includes('.hinted')), 'invalid hint flags should be rejected');
assert(errors.some(e => e.includes('.missReason')), 'invalid miss reasons should be rejected');

const invalidVocabulary = JSON.parse(JSON.stringify(withVocabulary));
invalidVocabulary.personalVocab[0].g = 'los';
invalidVocabulary.personalVocab.push({ ...invalidVocabulary.personalVocab[0] });
const vocabularyErrors = validateSave(invalidVocabulary);
assert(vocabularyErrors.some(e => e.includes('.g')), 'invalid personal-word gender should be rejected');
assert(vocabularyErrors.some(e => e.includes('.id must be unique')), 'duplicate personal-word IDs should be rejected');

console.log('report.test.js: all tests passed');
