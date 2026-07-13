/* Core test suite for El Piso Asturiano.
   Extracts the pure game core from index.html and exercises it.
   Run: node tests/core.test.js  (from repo root or tests/) */
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const core = html.match(/\/\*CORE-START\*\/([\s\S]*)\/\*CORE-END\*\//)[1];
eval(core);

let fails = 0;
function assert(cond, msg){ if (!cond){ fails++; console.log('FAIL:', msg); } }
const noMask = new Set();
function base(){
  const b = [];
  for (let r = 0; r < 9; r++){
    const row = [];
    for (let c = 0; c < 9; c++) row.push(r % 2 === 0 ? (c % 2 === 0 ? 0 : 1) : (c % 2 === 0 ? 2 : 3));
    b.push(row);
  }
  return b;
}

/* ---- match analysis & spawns ---- */
{ const b = base(); for (let c = 0; c < 4; c++) b[0][c] = 4;
  const { clear, spawns } = analyzeMatches(b, { r:0, c:1 });
  assert(clear.size === 4, '4-run clear');
  assert(spawns.length === 1 && spawns[0].piece.sp === 'R' && spawns[0].piece.dir === 'v', 'rocket spawn');
  assert(spawns[0].r === 0 && spawns[0].c === 1, 'spawn at swap pos'); }
{ const b = base(); for (let c = 0; c < 5; c++) b[0][c] = 4;
  assert(analyzeMatches(b, null).spawns[0].piece.sp === 'L', 'laser from 5'); }
{ const b = base(); b[0][0] = b[0][1] = b[0][2] = 4; b[1][0] = b[2][0] = 4;
  const { clear, spawns } = analyzeMatches(b, null);
  assert(clear.size === 5 && spawns[0].piece.sp === 'B', 'bomb from L-shape'); }
{ const b = base(); b[3][3] = b[3][4] = b[4][3] = b[4][4] = 4;
  const { clear, spawns } = analyzeMatches(b, null);
  assert(clear.size === 4 && spawns[0].piece.sp === 'P', 'plane from square'); }
{ const b = base(); b[0][0] = 4; b[0][1] = 4; b[0][2] = { ob:'cad', tile:4 };
  assert(analyzeMatches(b, null).clear.has('0,2'), 'chained tile matches'); }

/* ---- blast engine, events, chains, combos ---- */
{ const b = base(); b[2][2] = { sp:'R', dir:'h' };
  const { clear, events } = runEffects(b, [{ type:'fire', r:2, c:2 }]);
  assert(clear.size === 9, 'rocket clears row');
  assert(events.some(e => e.t === 'streak' && e.axis === 'h'), 'streak event'); }
{ const b = base(); b[2][2] = { sp:'R', dir:'h' }; b[2][5] = { sp:'B' };
  const { clear, events } = runEffects(b, [{ type:'fire', r:2, c:2 }]);
  assert(clear.size === 15, 'rocket->bomb chain');
  assert(events.findIndex(e => e.t === 'boom') > events.findIndex(e => e.t === 'streak'), 'chain event order'); }
{ const b = base(); b[0][0] = { sp:'L' }; b[0][1] = { sp:'L' };
  const { clear, events } = runEffects(b, buildSwapSeeds(b, { r:0, c:0 }, { r:0, c:1 }));
  assert(clear.size === 81, 'laser+laser board wipe');
  assert(events.some(e => e.t === 'ring' && e.big), 'board ring event'); }
{ const b = base(); b[4][4] = { sp:'B' }; b[4][5] = { sp:'B' };
  const { clear } = runEffects(b, buildSwapSeeds(b, { r:4, c:4 }, { r:4, c:5 }));
  assert(clear.size >= 25 && clear.has('2,3') && clear.has('6,7'), 'bomb+bomb 5x5'); }
{ const b = base(); b[3][3] = { sp:'R', dir:'h' }; b[3][4] = { sp:'R', dir:'h' };
  const { clear } = runEffects(b, buildSwapSeeds(b, { r:3, c:3 }, { r:3, c:4 }));
  assert(clear.size === 17 && clear.has('3,0') && clear.has('0,4'), 'rocket+rocket cross'); }
{ const b = Array.from({ length:9 }, () => Array.from({ length:9 }, () => 0));
  b[0][0] = { sp:'L' }; b[5][5] = { ob:'cad', tile:0 };
  const { clear } = runEffects(b, [{ type:'fire', r:0, c:0 }]);
  assert(!clear.has('5,5') && clear.size === 80, 'laser skips chained'); }

/* ---- planes: targeting hook + dropper immunity ---- */
{ const b = base(); b[4][4] = { sp:'P' }; b[0][0] = { dr:1 };
  const { clear, events } = runEffects(b, [{ type:'fire', r:4, c:4 }]);
  const pl = events.find(e => e.t === 'plane');
  assert(pl && !(pl.to.r === 0 && pl.to.c === 0), 'plane never targets dropper');
  assert(!clear.has('0,0'), 'dropper blast-immune'); }
{ const b = base(); b[4][4] = { sp:'P' };
  const { events } = runEffects(b, [{ type:'fire', r:4, c:4 }], cands => cands.find(p => p.r === 8 && p.c === 8) || cands[0]);
  assert(events.find(e => e.t === 'plane').to.r === 8, 'pickTarget hook honored'); }

/* ---- gravity: reachability physics ---- */
{ const b = Array.from({ length:9 }, () => new Array(9).fill(null));
  const mask = new Set(['4,0']); b[0][0] = 3;
  applyGravity(b, mask);
  assert(b[8][0] === 3 && b[4][0] === null, 'falls through hole'); }
{ const b = Array.from({ length:9 }, () => new Array(9).fill(null));
  b[4][0] = { ob:'caja', hp:1 }; b[0][0] = 2;
  applyGravity(b, noMask);
  assert(b[3][0] === 2, 'rests on caja');
  for (let r = 5; r < 9; r++) assert(b[r][0] !== null, 'single caja: no shadow, diag fill r' + r); }
{ const b = Array.from({ length:9 }, () => new Array(9).fill(null));
  b[4][0] = { ob:'caja', hp:1 }; b[4][1] = { ob:'caja', hp:1 }; b[4][2] = { ob:'caja', hp:1 };
  applyGravity(b, noMask);
  assert(b[5][0] === null && b[5][1] === null && b[6][0] === null, 'roofed shadow + taper');
  assert(b[5][2] !== null && b[6][1] !== null && b[7][0] !== null, 'diagonal wavefront'); }
{ const b = Array.from({ length:9 }, () => new Array(9).fill(null));
  b[4][0] = { ob:'caja', hp:1 }; b[4][1] = { ob:'caja', hp:1 }; b[4][2] = { ob:'caja', hp:1 };
  applyGravity(b, noMask);
  b[4][1] = null; applyGravity(b, noMask);
  assert(b[5][0] !== null && b[5][1] !== null && b[6][0] !== null, 'roof break heals shadow'); }
{ const b = Array.from({ length:9 }, () => new Array(9).fill(null));
  b[0][3] = { sp:'B' };
  applyGravity(b, noMask);
  assert(b[8][3] && b[8][3].sp === 'B', 'specials fall'); }

/* ---- droppers ---- */
{ const p = parseMap(['.D.......', '.........', '.........', '.........', '.........', '.........', '.........', '.........', '.........']);
  const b = buildBoard(p.mask, p.statics, p.drops);
  assert(isDrop(b[0][1]) && colorOf(b[0][1]) === null, 'dropper placed, colorless');
  b[5][1] = null; applyGravity(b, p.mask);
  assert(isDrop(b[1][1]), 'dropper falls'); }

/* ---- map parsing ---- */
{ const p = parseMap(['#..CCC..#', '..X...X..', '.B.....B.', '.........', '....X....', '.........', '.B.....B.', '..X...X..', '#..CCC..#']);
  assert(p.mask.size === 4, 'mask parse');
  assert(p.statics.filter(x => x.cell.ob === 'caja').length === 9, 'caja parse');
  assert(p.statics.filter(x => x.cell.hp === 2).length === 5, 'hp2 parse');
  assert(p.statics.filter(x => x.cell.ob === 'cad').length === 6, 'cadena parse'); }
{ const p = parseMap(['.D..D..D.', '.........', '...JJ....', '.........', '.........', '.........', '.........', '.........', '.........']);
  assert(p.drops.length === 3 && p.jelly.length === 2, 'D and J parse'); }

/* ---- termination stress ---- */
for (let t = 0; t < 30; t++){
  const b = Array.from({ length:9 }, () => Array.from({ length:9 }, () => Math.random() < .25 ? null : randType()));
  for (let i = 0; i < 10; i++){
    const r = (Math.random() * 9) | 0, c = (Math.random() * 9) | 0;
    b[r][c] = Math.random() < .5 ? { ob:'caja', hp:1 } : { ob:'cad', tile:randType() };
  }
  applyGravity(b, noMask);
}

console.log(fails === 0 ? 'CORE TESTS: ALL PASS' : 'CORE TESTS: ' + fails + ' FAILURES');
process.exit(fails === 0 ? 0 : 1);
