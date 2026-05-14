#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const SKETCHES_DIR = path.join(ROOT, 'web_sketches');
const OUT = path.join(ROOT, 'assets', 'sketches.json');

const titleRe = /<title>([^<]*)<\/title>/i;
// match script src and link href values; ignore data:/javascript:/mailto:
const refRe = /<(?:script|link)\b[^>]*?(?:src|href)\s*=\s*["']([^"']+)["'][^>]*>/gi;

function readFileSafe(p) {
  try { return fs.readFileSync(p, 'utf8'); } catch { return null; }
}

function readTitle(html, fallback) {
  if (!html) return fallback;
  const m = html.match(titleRe);
  if (m && m[1].trim()) return m[1].trim();
  return fallback;
}

function checkHealth(sketchDir, html) {
  const issues = [];
  let level = 'ok';
  if (!html) {
    return { health: 'broken', issues: ['index.html unreadable'] };
  }
  // strip HTML comments so refs inside <!-- ... --> don't count
  const stripped = html.replace(/<!--[\s\S]*?-->/g, '');
  const refs = [...stripped.matchAll(refRe)].map((m) => m[1]);
  for (const ref of refs) {
    if (/^(?:https?:|data:|javascript:|mailto:|#)/i.test(ref)) {
      // external / CDN — not a hard failure but flag it
      issues.push(`external ref: ${ref}`);
      if (level === 'ok') level = 'warn';
      continue;
    }
    // strip query/fragment, resolve relative to the sketch dir
    const clean = ref.split(/[?#]/)[0];
    if (!clean) continue;
    const resolved = path.resolve(sketchDir, clean);
    if (!fs.existsSync(resolved)) {
      issues.push(`missing: ${ref}`);
      level = 'broken';
    }
  }
  return { health: level, issues };
}

function compareIds(a, b) {
  const na = parseInt(a, 10);
  const nb = parseInt(b, 10);
  const aNum = !Number.isNaN(na);
  const bNum = !Number.isNaN(nb);
  if (aNum && bNum && na !== nb) return na - nb;
  if (aNum && !bNum) return -1;
  if (!aNum && bNum) return 1;
  return a.localeCompare(b);
}

// flat scan: top-level only. Nested sketches (e.g. r2/r2_3/) are surfaced
// as warnings on the parent.
const ids = fs
  .readdirSync(SKETCHES_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory() && d.name !== 'libraries')
  .map((d) => d.name);

const entries = [];
const skipped = [];

for (const id of ids.sort(compareIds)) {
  const dirAbs = path.join(SKETCHES_DIR, id);
  const indexAbs = path.join(dirAbs, 'index.html');
  if (!fs.existsSync(indexAbs)) {
    // check for nested sketches one level down
    const nested = fs
      .readdirSync(dirAbs, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name)
      .filter((n) => fs.existsSync(path.join(dirAbs, n, 'index.html')));
    if (nested.length) {
      skipped.push({ id, reason: 'nested', children: nested });
    } else {
      skipped.push({ id, reason: 'no-index' });
    }
    continue;
  }
  const html = readFileSafe(indexAbs);
  const { health, issues } = checkHealth(dirAbs, html);
  const entry = {
    id,
    dir: `web_sketches/${id}/`,
    title: readTitle(html, id),
    health,
  };
  if (issues.length) entry.issues = issues;
  entries.push(entry);
}

fs.writeFileSync(OUT, JSON.stringify(entries, null, 2) + '\n');

const counts = entries.reduce((acc, e) => ((acc[e.health] = (acc[e.health] || 0) + 1), acc), {});
console.log(`Wrote ${entries.length} entries to ${path.relative(ROOT, OUT)}`);
console.log(`  ok: ${counts.ok || 0}, warn: ${counts.warn || 0}, broken: ${counts.broken || 0}`);
if (skipped.length) {
  console.log(`Skipped ${skipped.length} folders:`);
  for (const s of skipped) {
    if (s.reason === 'nested') console.log(`  ${s.id}/ (nested sketches: ${s.children.join(', ')})`);
    else console.log(`  ${s.id}/ (${s.reason})`);
  }
}
