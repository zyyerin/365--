#!/usr/bin/env node
// Heuristic Java(Processing) → JavaScript(p5) translator.
// Best-effort: emits to _ported/<id>/ for human review before promotion.
// Usage: node scripts/port-processing.js <id> [<id> ...]
//        node scripts/port-processing.js --easy   (port everything tagged 'easy')
//        node scripts/port-processing.js --all    (port everything; flags hard/unportable in NOTES)

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const PROCESSING_DIR = path.join(ROOT, 'processing_sketches');
const STAGING_DIR = path.join(ROOT, '_ported');
const TRIAGE = path.join(PROCESSING_DIR, '_triage.json');

// --- core transforms ----------------------------------------------------

const PRIMITIVE_TYPES = ['int', 'float', 'boolean', 'String', 'char', 'byte', 'long', 'short', 'double', 'color'];

// regex helpers
const reList = (arr) => arr.join('|');

const TYPE_GROUP = `(?:${reList([...PRIMITIVE_TYPES, 'PVector', 'PImage', 'PShape', 'PFont', 'PGraphics'])})`;

function fixForLoopInit(line) {
  // for (int i = 0; ...) → for (let i = 0; ...) — must run BEFORE param-type-strip
  return line.replace(
    new RegExp(`for\\s*\\(\\s*${TYPE_GROUP}\\s+`, 'g'),
    'for (let '
  );
}

function stripParamTypes(line) {
  // strip `Type ` and `Type[] ` from each param inside (...).
  // Skip for(...) — already handled by fixForLoopInit.
  return line.replace(/\(([^)]*)\)/g, (match, params, offset, full) => {
    const before = full.slice(0, offset).trimEnd();
    if (/\bfor\s*$/.test(before)) return match;
    const transformed = params
      .split(',')
      .map((p) =>
        p.replace(new RegExp(`^(\\s*)${TYPE_GROUP}\\s*(?:\\[\\])?\\s+`), '$1')
      )
      .join(',');
    return `(${transformed})`;
  });
}

function applyCommonReplacements(line) {
  let out = line;
  // PVector / array helpers / println
  out = out.replace(/\bnew\s+PVector\s*\(/g, 'createVector(');
  out = out.replace(/\bPVector\./g, 'p5.Vector.');
  out = out.replace(/\bArrayList\s*<[^>]*>\s*/g, '');
  out = out.replace(/\bnew\s+ArrayList\s*<[^>]*>\s*\(\s*\)/g, '[]');
  out = out.replace(/\bnew\s+ArrayList\s*\(\s*\)/g, '[]');
  out = out.replace(/\.add\s*\(/g, '.push(');
  out = out.replace(/\.size\s*\(\s*\)/g, '.length');
  out = out.replace(/\.get\s*\(\s*([^)]+?)\s*\)/g, '[$1]');
  out = out.replace(/\.remove\s*\(\s*([^)]+?)\s*\)/g, '.splice($1, 1)');
  out = out.replace(/\bprintln\s*\(/g, 'console.log(');
  out = out.replace(/\bprint\s*\(/g, 'console.log(');
  return out;
}

function transformLineTopLevel(line) {
  let out = fixForLoopInit(line);
  out = stripParamTypes(out);
  // void name(...) → function name(...)
  out = out.replace(/^(\s*)void\s+([A-Za-z_]\w*)\s*\(/, '$1function $2(');
  // <Type> name = value;  → let name = value; (must come AFTER stripParamTypes)
  out = out.replace(
    new RegExp(`\\b(final\\s+)?${TYPE_GROUP}\\s*(?:\\[\\])?\\s+([A-Za-z_]\\w*)\\s*([=;,])`, 'g'),
    (_, fin, name, after) => `${fin ? 'const' : 'let'} ${name}${after}`
  );
  return applyCommonReplacements(out);
}

function transformLineInClass(line, className) {
  let out = fixForLoopInit(line);
  out = stripParamTypes(out);
  // constructor: ClassName(...) {
  if (className) {
    const ctorRe = new RegExp(`^(\\s*)${className}\\s*\\(`);
    if (ctorRe.test(out) && !/\bnew\b/.test(out)) {
      out = out.replace(ctorRe, '$1constructor(');
    }
  }
  // method: void name(...) → name(...)
  out = out.replace(/^(\s*)void\s+([A-Za-z_]\w*)\s*\(/, '$1$2(');
  // method with explicit return type: `<Type> name(...) {` → `name(...) {`
  out = out.replace(
    new RegExp(`^(\\s*)${TYPE_GROUP}\\s*(?:\\[\\])?\\s+([A-Za-z_]\\w*)\\s*\\(`),
    '$1$2('
  );
  // class field: `<Type> name;` → `name;`,  `<Type> name = v;` → `name = v;`
  out = out.replace(
    new RegExp(`^(\\s*)(?:final\\s+)?${TYPE_GROUP}\\s*(?:\\[\\])?\\s+([A-Za-z_]\\w*)\\s*([=;,])`),
    '$1$2$3'
  );
  return applyCommonReplacements(out);
}

function transformPde(src) {
  const lines = src.split('\n');
  let depth = 0;
  let className = null;
  let classDepth = -1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // detect class start (must be at brace depth 0 and not nested)
    if (className === null) {
      const m = line.match(/^(\s*)class\s+([A-Za-z_]\w*)\s*(?:extends\s+\w+\s*)?\{?\s*$/);
      if (m) {
        className = m[2];
        classDepth = depth;
      }
    }

    // transform line based on context
    if (className !== null && depth > classDepth) {
      lines[i] = transformLineInClass(line, className);
    } else if (className !== null && depth === classDepth) {
      // the `class Foo {` line itself — only common replacements
      lines[i] = applyCommonReplacements(line);
    } else {
      lines[i] = transformLineTopLevel(line);
    }

    // update brace depth after transforms (transforms don't add/remove braces)
    const opens = (line.match(/\{/g) || []).length;
    const closes = (line.match(/\}/g) || []).length;
    depth += opens - closes;
    if (className !== null && depth <= classDepth) {
      className = null;
      classDepth = -1;
    }
  }
  return lines.join('\n');
}

function detectFlags(src) {
  const flags = [];
  // user-defined type declarations (e.g. `Bubble bubbles;`) — won't be auto-stripped
  const userClasses = [...src.matchAll(/^\s*class\s+([A-Za-z_]\w*)/gm)].map((m) => m[1]);
  if (userClasses.length) {
    const usedAsType = new RegExp(`\\b(${userClasses.join('|')})\\s+[a-z_]\\w*\\s*[=;,]`);
    if (usedAsType.test(src)) flags.push(`top-level vars typed with user class (${userClasses.join(', ')}) — replace \`Foo bar;\` with \`let bar;\``);
  }
  if (/\binterface\s+\w+/.test(src)) flags.push('Java interface — convert to mixin or duck-type');
  if (/\babstract\s+class/.test(src)) flags.push('abstract class — JS has no equivalent; rework');
  if (/\bextends\s+\w+/.test(src)) flags.push('class extends — verify parent is also ported');
  if (/\bimport\s+/.test(src)) flags.push('Java import statements present — ensure equivalents are loaded in HTML');
  if (/\bsize\s*\([^,]+,[^,]+,\s*P3D\s*\)/.test(src)) flags.push('size(w, h, P3D) → createCanvas(w, h, WEBGL)');
  if (/\bsize\s*\(/.test(src)) flags.push('size(...) → createCanvas(...)');
  if (/\bbackground\s*\([^)]*\.\w/.test(src)) flags.push('background() with object — verify p5 equivalent');
  if (/\bcolor\s*\(/.test(src)) flags.push('color() — same name in p5, but order may differ for HSB');
  if (/\b(loadImage|loadFont|loadStrings|loadJSON|loadXML)\s*\(/.test(src))
    flags.push('asset loading — move to preload() in p5');
  if (/\b(map|lerp|constrain|sin|cos)\b/.test(src)) flags.push('math fns — same in p5, but watch radians vs degrees');
  return flags;
}

function joinPdes(dirAbs, files) {
  // class-defining .pde files first, sketch-entry (has setup/draw) last
  const sorted = [...files].sort((a, b) => {
    const ra = fs.readFileSync(path.join(dirAbs, a), 'utf8');
    const rb = fs.readFileSync(path.join(dirAbs, b), 'utf8');
    const aIsEntry = /\bvoid\s+setup\s*\(/.test(ra);
    const bIsEntry = /\bvoid\s+setup\s*\(/.test(rb);
    if (aIsEntry && !bIsEntry) return 1;
    if (!aIsEntry && bIsEntry) return -1;
    return a.localeCompare(b);
  });
  return sorted
    .map((f) => `// === ${f} ===\n${fs.readFileSync(path.join(dirAbs, f), 'utf8')}`)
    .join('\n\n');
}

function htmlShell(id) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${id}</title>
  <script src="../libraries/p5.js"></script>
  <script src="sketch.js"></script>
  <style>html,body{margin:0;height:100%;background:#fff;display:flex;align-items:center;justify-content:center;}</style>
</head>
<body></body>
</html>
`;
}

function portSketch(id, triageEntry) {
  const srcDir = path.join(PROCESSING_DIR, id);
  const outDir = path.join(STAGING_DIR, id);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const files = fs.readdirSync(srcDir).filter((f) => f.endsWith('.pde'));
  if (files.length === 0) return { id, status: 'skip', reason: 'no .pde files' };

  const joined = joinPdes(srcDir, files);
  const js = transformPde(joined);

  fs.writeFileSync(path.join(outDir, 'sketch.js'), js);
  fs.writeFileSync(path.join(outDir, 'index.html'), htmlShell(id));

  const flags = detectFlags(joined);
  const notes = [
    `# Port notes for ${id}`,
    ``,
    `**Triage:** ${triageEntry?.complexity ?? 'unknown'}`,
    triageEntry?.reasons?.length ? `**Reasons:** ${triageEntry.reasons.join(', ')}` : '',
    ``,
    `**Source files:** ${files.join(', ')}`,
    ``,
    `## Heuristic flags`,
    ...(flags.length ? flags.map((f) => `- ${f}`) : ['- (none)']),
    ``,
    `## Manual review checklist`,
    `- [ ] \`size(...)\` calls converted to \`createCanvas(...)\` (and \`P3D\` → \`WEBGL\`).`,
    `- [ ] \`loadImage\`/\`loadFont\` etc. moved into a \`preload()\` block.`,
    `- [ ] Constructor lines for each class actually became \`constructor(...)\`.`,
    `- [ ] Generic type erasure didn't strip a real identifier (look for \`let .undefined\`).`,
    `- [ ] Class methods inside class bodies don't have a leading return type that was missed.`,
    `- [ ] Java-only library calls (Minim, PeasyCam, Serial, Video) replaced with p5/web equivalents.`,
    ``,
    `## Promotion`,
    `Once it renders correctly:`,
    `\`\`\`bash`,
    `mv _ported/${id} web_sketches/${id}`,
    `node scripts/build-manifest.js`,
    `\`\`\``,
  ]
    .filter(Boolean)
    .join('\n');
  fs.writeFileSync(path.join(outDir, 'NOTES.md'), notes + '\n');

  return { id, status: 'ported', flags: flags.length };
}

// --- CLI -----------------------------------------------------------------

function loadTriage() {
  if (!fs.existsSync(TRIAGE)) {
    console.error('No triage file found. Run: node scripts/triage-processing.js');
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(TRIAGE, 'utf8'));
}

function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.log('Usage:');
    console.log('  node scripts/port-processing.js <id> [<id> ...]');
    console.log('  node scripts/port-processing.js --easy');
    console.log('  node scripts/port-processing.js --all');
    process.exit(1);
  }

  let targets;
  if (args[0] === '--easy') {
    targets = loadTriage().filter((t) => t.complexity === 'easy').map((t) => t.id);
  } else if (args[0] === '--all') {
    targets = loadTriage().map((t) => t.id);
  } else {
    targets = args;
  }

  const triage = fs.existsSync(TRIAGE) ? JSON.parse(fs.readFileSync(TRIAGE, 'utf8')) : [];
  const triageById = Object.fromEntries(triage.map((t) => [t.id, t]));

  if (!fs.existsSync(STAGING_DIR)) fs.mkdirSync(STAGING_DIR, { recursive: true });

  const results = [];
  for (const id of targets) {
    const srcDir = path.join(PROCESSING_DIR, id);
    if (!fs.existsSync(srcDir)) {
      console.warn(`skip ${id}: not found in processing_sketches/`);
      continue;
    }
    results.push(portSketch(id, triageById[id]));
  }

  console.log(`Ported ${results.filter((r) => r.status === 'ported').length} sketches to ${path.relative(ROOT, STAGING_DIR)}/`);
  for (const r of results) {
    if (r.status === 'ported') console.log(`  ${r.id}${r.flags ? ` (${r.flags} flags — see NOTES.md)` : ''}`);
    else console.log(`  ${r.id}: ${r.status} (${r.reason})`);
  }
}

main();
