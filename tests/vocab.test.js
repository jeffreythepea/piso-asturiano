const fs = require('fs');
const path = require('path');
const assert = require('assert');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const helpersStart = html.indexOf('function escapeHTML(');
const helpersEnd = html.indexOf('function refreshHUD(', helpersStart);
assert(helpersStart >= 0 && helpersEnd > helpersStart, 'personal vocabulary helpers not found');
const helpers = Function(
  `${html.slice(helpersStart, helpersEnd)}; return {normalizePersonalVocabText, personalVocabSpanish, buildPersonalVocabItem};`
)();

const first = helpers.buildPersonalVocabItem([], {
  term:'  El   perro ', g:'', en:' dog ', em:'🐕'
}, 123456, 0.5);
assert.strictEqual(first.error, undefined);
assert.deepStrictEqual(
  { term:first.item.term, en:first.item.en, g:first.item.g, em:first.item.em, createdAt:first.item.createdAt },
  { term:'perro', en:'dog', g:'el', em:'🐕', createdAt:123456 }
);
assert(first.item.id.startsWith('pv-'), 'personal words need stable namespaced IDs');
assert.strictEqual(helpers.personalVocabSpanish(first.item), 'el perro');

const duplicate = helpers.buildPersonalVocabItem([first.item], {
  term:'PERRO', g:'el', en:'DOG', em:'🐶'
}, 123457, 0.6);
assert(duplicate.error && duplicate.error.includes('ya están'), 'case-insensitive duplicates should be rejected');

const collision = helpers.buildPersonalVocabItem([first.item], {
  term:'can', g:'el', en:'hound', em:'🐶'
}, 123456, 0.5);
assert.strictEqual(collision.item.id, first.item.id + '-2', 'ID collisions should receive a stable suffix');

const conflict = helpers.buildPersonalVocabItem([], {
  term:'la casa', g:'el', en:'house', em:'🏠'
}, 1, 0);
assert(conflict.error && conflict.error.includes('no coinciden'), 'conflicting entered articles should be rejected');
assert(helpers.buildPersonalVocabItem([], {term:'', en:'dog', em:'🐕'}).error);
assert(helpers.buildPersonalVocabItem([], {term:'perro', en:'', em:'🐕'}).error);
assert(helpers.buildPersonalVocabItem([], {term:'perro', en:'dog', em:''}).error);
assert(helpers.buildPersonalVocabItem([], {term:'perro', en:'dog', em:'dog'}).error,
  'text must not leak onto the image-first card front');

const roundtrip = JSON.parse(JSON.stringify({ personalVocab:[first.item], deck:[{id:first.item.id, kind:'vocab'}] }));
assert.deepStrictEqual(roundtrip.personalVocab[0], first.item, 'personal vocabulary should survive backup JSON exactly');

assert(html.includes('personalVocab:[]'), 'new saves must initialize personal vocabulary');
assert(html.includes("if (!Array.isArray(S.personalVocab)) S.personalVocab = [];"),
  'old saves must backfill personal vocabulary');
assert(html.includes("S.deck.push(newCard(result.item, 'vocab'));"),
  'manual intake must create a fresh scheduled card');
assert(html.includes("S.deck = S.deck.filter(card => !(card.kind === 'vocab' && card.id === item.id));"),
  'deleting a word must remove its active card');
assert(!html.includes("S.log = S.log.filter(entry => entry.id !== item.id)"),
  'deleting a word must preserve historical review logs');

console.log('vocab.test.js: all tests passed');
