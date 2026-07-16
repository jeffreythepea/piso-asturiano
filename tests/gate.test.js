const fs = require('fs');
const path = require('path');
const assert = require('assert');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const gateStart = html.indexOf('function maybeGate(){');
const gateEnd = html.indexOf('\n/* Personal vocabulary intake', gateStart);
assert(gateStart >= 0 && gateEnd > gateStart, 'ordinary-review prompt not found');

function promptForDueCount(count) {
  let modal = null;
  const maybeGate = Function('dueCards', 'showModal',
    `${html.slice(gateStart, gateEnd)}; return maybeGate;`
  )(() => Array.from({ length: count }), value => { modal = value; });
  maybeGate();
  return modal;
}

for (const count of [1, 2, 3, 12]) {
  const prompt = promptForDueCount(count);
  assert(prompt, `${count} due cards should show a review prompt`);
  assert(prompt.includes('Repasar ahora'), `${count} due cards should offer review`);
  assert(prompt.includes("switchTab('repaso')"), `${count} due cards should open Repaso`);
  assert(prompt.includes('Jugar igual'), `${count} due cards should visibly allow play`);
  assert(prompt.includes('onclick="closeModal()"'), `${count} due cards should provide a working bypass`);
}

assert.strictEqual(promptForDueCount(0), null, 'zero due cards should not show a prompt');

console.log('gate.test.js: all tests passed');
