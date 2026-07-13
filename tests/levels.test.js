/* Verifies every authored level map builds a valid, playable board.
   Run: node tests/levels.test.js */
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const core = html.match(/\/\*CORE-START\*\/([\s\S]*)\/\*CORE-END\*\//)[1];
eval(core);
const LEVELS = eval('[' + html.match(/const LEVELS = \[([\s\S]*?)\n\];/)[1] + ']');

let fails = 0;
LEVELS.forEach((L, i) => {
  if (L.map.length !== 9 || L.map.some(r => r.length !== 9)){
    fails++; console.log('L' + (i + 1) + ': bad map shape'); return;
  }
  const p = parseMap(L.map);
  for (let t = 0; t < 10; t++){
    const b = buildBoard(p.mask, p.statics, p.drops);
    if (analyzeMatches(b, null).clear.size !== 0){ fails++; console.log('L' + (i + 1) + ': initial match'); }
    if (!moveExists(b, p.mask)){ fails++; console.log('L' + (i + 1) + ': no valid move'); }
  }
  console.log('L' + (i + 1) + ': mask=' + p.mask.size +
    ' cajas=' + p.statics.filter(x => x.cell.ob === 'caja').length +
    ' cadenas=' + p.statics.filter(x => x.cell.ob === 'cad').length +
    ' drops=' + p.drops.length + ' jelly=' + p.jelly.length + ' OK');
});
console.log(fails === 0 ? 'LEVEL TESTS: ALL PASS' : 'LEVEL TESTS: ' + fails + ' FAILURES');
process.exit(fails === 0 ? 0 : 1);
