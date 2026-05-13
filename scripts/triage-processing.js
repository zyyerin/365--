#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const PROCESSING_DIR = path.join(ROOT, 'processing_sketches');
const OUT = path.join(PROCESSING_DIR, '_triage.json');

// ordered: more severe first; first match wins
const SIGNALS = [
  { tag: 'unportable.serial', pattern: /\bprocessing\.serial\.|\bSerial\s+\w/i, complexity: 'unportable' },
  { tag: 'unportable.video',  pattern: /\bprocessing\.video\.|\bMovie\s+\w/i,   complexity: 'unportable' },
  { tag: 'hard.peasycam',     pattern: /\bpeasy\./i,                            complexity: 'hard' },
  { tag: 'hard.shader',       pattern: /\bPShader\b|\bloadShader\s*\(/i,         complexity: 'hard' },
  { tag: 'medium.audio',      pattern: /\bddf\.minim\.|\bMinim\s+\w|\bAudioPlayer\b/i, complexity: 'medium' },
  { tag: 'medium.svg',        pattern: /\bloadShape\s*\(/i,                      complexity: 'medium' },
  { tag: 'medium.p3d',        pattern: /\b(P3D|OPENGL)\b/i,                      complexity: 'medium' },
  { tag: 'medium.thread',     pattern: /\bthread\s*\(/i,                         complexity: 'medium' },
];

function rank(level) {
  return { easy: 0, medium: 1, hard: 2, unportable: 3 }[level] ?? 0;
}

function compareIds(a, b) {
  const stripA = a.replace(/^sketch_/, '');
  const stripB = b.replace(/^sketch_/, '');
  const na = parseInt(stripA, 10);
  const nb = parseInt(stripB, 10);
  if (!Number.isNaN(na) && !Number.isNaN(nb) && na !== nb) return na - nb;
  return a.localeCompare(b);
}

function triageSketch(dirAbs) {
  const files = fs.readdirSync(dirAbs).filter((f) => f.endsWith('.pde'));
  const reasons = new Set();
  let complexity = 'easy';
  let alreadyPorted = fs.existsSync(path.join(dirAbs, 'index.html'));

  for (const f of files) {
    const src = fs.readFileSync(path.join(dirAbs, f), 'utf8');
    for (const sig of SIGNALS) {
      if (sig.pattern.test(src)) {
        reasons.add(sig.tag);
        if (rank(sig.complexity) > rank(complexity)) complexity = sig.complexity;
      }
    }
  }

  return {
    files: files.length,
    pdes: files,
    complexity,
    alreadyPorted,
    reasons: [...reasons].sort(),
  };
}

const ids = fs
  .readdirSync(PROCESSING_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort(compareIds);

const triage = [];
const empty = [];

for (const id of ids) {
  const abs = path.join(PROCESSING_DIR, id);
  const t = triageSketch(abs);
  if (t.files === 0) {
    empty.push(id);
    continue;
  }
  triage.push({ id, ...t });
}

fs.writeFileSync(OUT, JSON.stringify(triage, null, 2) + '\n');

const counts = triage.reduce((acc, t) => ((acc[t.complexity] = (acc[t.complexity] || 0) + 1), acc), {});
const ported = triage.filter((t) => t.alreadyPorted).length;

console.log(`Wrote ${triage.length} entries to ${path.relative(ROOT, OUT)}`);
console.log(`  easy: ${counts.easy || 0}, medium: ${counts.medium || 0}, hard: ${counts.hard || 0}, unportable: ${counts.unportable || 0}`);
console.log(`  already ported (have index.html): ${ported}`);
if (empty.length) console.log(`  no .pde files (skipped): ${empty.length} — ${empty.slice(0, 5).join(', ')}${empty.length > 5 ? '…' : ''}`);
