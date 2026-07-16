const fs = require('fs');
const path = require('path');
const assert = require('assert');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const block = html.match(/const COMMANDS = \[([\s\S]*?)\n\];/);
assert(block, 'COMMANDS block not found');

const commands = Function(`return [${block[1]}];`)();
const byId = Object.fromEntries(commands.map(c => [c.id, c]));

assert.strictEqual(commands.length, 30, 'all safe atomic guide-derived prompts should be present');
assert.strictEqual(new Set(commands.map(c => c.id)).size, commands.length, 'command IDs must be unique');

const expectedSpanish = {
  'c-der': 'Gire a la derecha cuando pueda',
  'c-izq': 'Gire a la izquierda cuando pueda',
  'c-rot1': 'Tome la primera salida en la glorieta',
  'c-rot2': 'Tome la segunda salida en la glorieta',
  'c-rot3': 'Tome la tercera salida en la glorieta',
  'c-rot4': 'Cuarta salida',
  'c-rot5': 'Quinta salida',
  'c-sentido': 'Cambio de sentido',
  'c-volante': 'Volante recto',
  'c-parada': 'Realice una parada',
  'c-detencion': 'Detención',
  'c-adapte': 'Adapte la velocidad a la vía',
  'c-est': 'Realice un estacionamiento',
  'c-inmov': 'Inmovilice el vehículo',
  'c-adel': 'Adelantamiento',
  'c-final': 'Finalización del examen',
  'c-pre-bateria': 'Localice la batería',
  'c-pre-aceite': 'Localice dónde se comprueba el nivel de aceite',
  'c-pre-refrigerante': 'Localice dónde se comprueba el nivel de líquido refrigerante',
  'c-pre-capo': 'Abra el capó y diga qué niveles se deben revisar',
  'c-pre-combustible': 'Indique dónde se comprueba el nivel de combustible',
  'c-pre-temperatura': 'Indique dónde se comprueba la temperatura del motor',
  'c-pre-bloquear-elevalunas': 'Active el bloqueo infantil de los elevalunas traseros',
  'c-pre-desbloquear-elevalunas': 'Desactive el bloqueo infantil de los elevalunas traseros',
  'c-pre-largo-alcance': 'Encienda las luces de largo alcance',
  'c-pre-niebla-delantera': 'Encienda las luces antiniebla delanteras',
  'c-pre-niebla-trasera': 'Encienda la luz antiniebla trasera',
  'c-pre-maletero': 'Abra el maletero',
  'c-pre-desempanar-delantera': 'Indique cómo desempañar la luna delantera',
  'c-pre-desempanar-trasera': 'Indique cómo desempañar la luna trasera'
};
assert.deepStrictEqual(
  Object.fromEntries(commands.map(c => [c.id, c.es])),
  expectedSpanish,
  'Spanish must match the complete instructions extracted from the guide'
);

for (const retired of ['c-recto', 'c-det', 'c-red', 'c-acel', 'c-cont', 'c-atras',
  'c-inc', 'c-sal', 'c-retro', 'c-cint', 'c-arr', 'c-freno', 'c-pre-ext',
  'c-pre-indicadores', 'c-pre-bloqueo', 'c-luces', 'c-pre-desempanar']) {
  assert(!byId[retired], `${retired} has no extracted guide prompt`);
}
assert(!byId['c-pre-deposito-b'], 'the disputed reservoir card must remain unseeded');

assert.deepStrictEqual(commands.filter(c => c.cat === 'dir').map(c => c.id),
  ['c-der', 'c-izq', 'c-sentido', 'c-volante']);
assert.deepStrictEqual(commands.filter(c => c.cat === 'rot').map(c => c.id),
  ['c-rot1', 'c-rot2', 'c-rot3', 'c-rot4', 'c-rot5']);
assert.strictEqual(commands.filter(c => c.phase === 'driving').length, 16,
  'the driving inventory should remain 16 atomic prompts');
assert.strictEqual(commands.filter(c => c.phase === 'precheck').length, 14,
  '14 safe prechecks should ship while the disputed reservoir is withheld');

for (const cmd of commands.filter(c => c.phase === 'precheck')) {
  assert(cmd.vehicle && cmd.vehicle.page && cmd.vehicle.answer,
    `${cmd.id} needs a manual-backed vehicle answer`);
  assert(['manual-baseline', 'trim-dependent'].includes(cmd.validation),
    `${cmd.id} must disclose its vehicle-validation status`);
}
assert.strictEqual(byId['c-pre-bateria'].vehicle.page, 493,
  'the Yaris 12-volt battery baseline must point to its under-seat manual page');
assert(byId['c-pre-bateria'].vehicle.answer.includes('asiento trasero derecho'),
  'the battery must not be taught as an engine-bay component');

for (const cmd of commands) {
  assert(['driving', 'precheck'].includes(cmd.phase), `${cmd.id} needs a valid phase`);
  assert(cmd.type, `${cmd.id} needs a response type`);
  assert(['verbatim', 'source-derived'].includes(cmd.wording), `${cmd.id} needs a wording status`);
  assert(cmd.validation, `${cmd.id} needs an instructor-validation status`);
  assert([3, 4, 5, 6].includes(cmd.page), `${cmd.id} needs a source page`);
  assert(cmd.source, `${cmd.id} needs exact source text`);
}

for (const cat of new Set(commands.map(c => c.cat))) {
  const icons = commands.filter(c => c.cat === cat).map(c => c.icon);
  assert.strictEqual(new Set(icons).size, icons.length,
    `answer icons must be unique within category ${cat}`);
}

const seedStart = html.indexOf('function seedCommands(){') + 'function seedCommands(){'.length;
const seedEnd = html.indexOf('\n}\nfunction cmdOf', seedStart);
assert(seedStart > 0 && seedEnd > seedStart, 'seedCommands body not found');
const migrationState = { deck: [
  { id:'c-pre-capo', kind:'cmd', due:1, reps:4, S:7 },
  { id:'c-pre-ext', kind:'cmd', due:1, reps:3, S:5 },
  { id:'sofa', kind:'obj', due:1, reps:2 }
] };
let saves = 0;
const seedCommands = Function('COMMANDS', 'S', 'save',
  `return function(){${html.slice(seedStart, seedEnd)}}`)(commands, migrationState, () => saves++);
seedCommands();
assert.strictEqual(migrationState.deck.filter(c => c.kind === 'cmd').length, 30,
  'migration should seed the complete safe command inventory');
assert(!migrationState.deck.some(c => c.id === 'c-pre-ext'),
  'migration should retire grouped precheck cards');
assert.strictEqual(migrationState.deck.find(c => c.id === 'c-pre-capo').S, 7,
  'migration should preserve FSRS history for an unchanged atomic ID');
assert(migrationState.deck.some(c => c.id === 'sofa'),
  'migration must not disturb non-command cards');
assert.strictEqual(saves, 1, 'migration should persist its deck changes once');

console.log('commands.test.js: all tests passed');
