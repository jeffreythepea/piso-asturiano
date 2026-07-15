const fs = require('fs');
const path = require('path');
const assert = require('assert');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const block = html.match(/const COMMANDS = \[([\s\S]*?)\n\];/);
assert(block, 'COMMANDS block not found');

const commands = Function(`return [${block[1]}];`)();
const byId = Object.fromEntries(commands.map(c => [c.id, c]));

assert.strictEqual(commands.length, 23, 'all unique guide-extracted prompts should be present');
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
  'c-pre-ext': 'Localizar: Batería, Liquido de frenos, Nivel de aceite y Nivel de líquido refrigerante',
  'c-pre-capo': 'Abrir el capo y decir qué niveles se deben revisar',
  'c-pre-indicadores': 'Dónde comprobar nivel combustible o temperatura motor',
  'c-pre-maletero': 'Abrir el maletero',
  'c-pre-bloqueo': 'Bloqueo o desbloqueo infantil de elevalunas traseros',
  'c-luces': 'Encender cualquier luz: largo alcance, niebla delantera o trasera',
  'c-pre-desempanar': 'Cómo desempañar la luna delantera o trasera'
};
assert.deepStrictEqual(
  Object.fromEntries(commands.map(c => [c.id, c.es])),
  expectedSpanish,
  'Spanish must match the complete instructions extracted from the guide'
);

for (const retired of ['c-recto', 'c-det', 'c-red', 'c-acel', 'c-cont', 'c-atras',
  'c-inc', 'c-sal', 'c-retro', 'c-cint', 'c-arr', 'c-freno']) {
  assert(!byId[retired], `${retired} has no extracted guide prompt`);
}

assert.deepStrictEqual(commands.filter(c => c.cat === 'dir').map(c => c.id),
  ['c-der', 'c-izq', 'c-sentido', 'c-volante']);
assert.deepStrictEqual(commands.filter(c => c.cat === 'rot').map(c => c.id),
  ['c-rot1', 'c-rot2', 'c-rot3', 'c-rot4', 'c-rot5']);
assert.strictEqual(commands.filter(c => c.cat.startsWith('pre')).length, 7,
  'all seven extracted precheck lines belong to the main command deck');

for (const cat of new Set(commands.map(c => c.cat))) {
  const icons = commands.filter(c => c.cat === cat).map(c => c.icon);
  assert.strictEqual(new Set(icons).size, icons.length,
    `answer icons must be unique within category ${cat}`);
}

console.log('commands.test.js: all tests passed');
