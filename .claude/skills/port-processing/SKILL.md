---
name: port-processing
description: Port Processing (.pde) sketches to p5.js for the **365-- / threesixfive** web gallery (repo `zyyerin/365--`, working dir `~/Desktop/1 Project/threesixfive`). TRIGGER only when ALL of the following are true: (a) the cwd is inside `threesixfive/` OR a path under it is referenced (`processing_sketches/sketch_NNN`, `web_sketches/NNN`, `_ported/`, `scripts/port-processing.js`), AND (b) the request is about porting/converting/rewriting Processing sketches to p5.js, optimizing one of those sketches, or continuing a batch that has already been established in this conversation. SKIP when the user just says "continue" or "next" without prior context about Processing porting — those phrases are generic and only count as triggers if the *current* conversation has already established that we're working on this gallery. Also SKIP for any other Processing→JS porting task that isn't this specific gallery (different repo layout, no STATUS.md, no `_ported/` staging dir).
---

# Port Processing → p5.js

A skill for the 365-- gallery (repo: `zyyerin/365--`, typical path `~/Desktop/1 Project/threesixfive`). Captures the workflow developed across many porting sessions so you don't re-discover the same gotchas.

## When to use

Triggers — any of these:
- "port the next N sketches" / "convert sketches X, Y, Z"
- "continue" / "next batch" inside an ongoing porting conversation
- "mark X done, continue" / "X is unfinished, continue"
- The user mentions `STATUS.md`, `web_sketches/`, `_ported/`, or any sketch_NNN path
- The user is reviewing or fixing a previously ported sketch

## Project layout

```
~/Desktop/1 Project/threesixfive/
├── processing_sketches/sketch_<id>[_<suffix>]/  # source .pde files (+ data/)
├── _ported/<same-name>/                          # WIP staging — preview here first
├── web_sketches/<numeric-id>/                    # promoted sketches (live gallery)
│   ├── index.html
│   ├── libraries/p5.min.js (+ matter, easyCam, p5.dom as needed)
│   ├── sketch.js
│   └── data/ or imgs/                             # assets if any
├── assets/sketches.json                          # gallery manifest (generated)
├── assets/hints.json                             # subtitle hints for interactive sketches
├── scripts/
│   ├── port-processing.js                        # Java→JS line transformer (~30% accurate)
│   ├── triage-processing.js                      # complexity heuristic
│   ├── build-manifest.js                         # scans web_sketches/ → sketches.json
│   └── build-status.js                           # regenerates STATUS.md
└── STATUS.md                                     # ✅ / [ ] checklist of all 365 days
```

## The loop

For each batch (user asks "next N", typically 5):

1. **Pick targets.** `grep -E "^\[ \].*Processing" STATUS.md | grep -v "<WIP-ids>" | head -N`. WIP IDs are sketches the user has flagged as unfinished — they stay in `_ported/` and are skipped during target selection.

2. **Run the auto-port** (optional, useful for boilerplate but plan to rewrite most of it):
   ```bash
   node scripts/port-processing.js sketch_<id> sketch_<id2> ...
   ```
   This emits `_ported/<id>/{sketch.js, index.html, NOTES.md}`. Treat the output as a rough draft — re-read each `.pde` source and rewrite cleanly.

3. **Read each `.pde` source** carefully (including any sibling class files like `Vehicle.pde`, `Boundary.pde`). Don't trust the auto-port output for anything but the easiest sketches.

4. **Write a clean `sketch.js`** applying the manual-fix list (next section). Use the `Write` tool — overwrite the auto-port output entirely if needed.

5. **Set up local `libraries/` and assets** inside the staged dir (see Library policy + Assets sections).

6. **Write the `index.html` shell** (see HTML shell template).

7. **Verify in the preview server** (`http://localhost:4365`, started via Claude Preview from `.claude/launch.json`). Navigate to each `/_ported/<id>/index.html` and check the page loads with no errors via `preview_eval` and `preview_console_logs`.

8. **Report back to the user** with a short bullet list — one line per sketch, what it does, any interaction. Note any WIP/incomplete ones explicitly.

9. **Wait for user feedback.** Common responses: "all good, continue" (promote all), "mark X unfinished, others done" (promote the rest, leave X in `_ported/`), or specific fixes ("237 is laggy, optimize").

10. **Promote good ones to `web_sketches/`** (strip `sketch_` prefix and any suffix from the dirname, delete `NOTES.md`):
    ```bash
    mv _ported/sketch_<id>[_<suffix>] web_sketches/<numeric-id>
    rm -f web_sketches/<numeric-id>/NOTES.md
    ```

11. **Rebuild manifest + STATUS** and confirm counts:
    ```bash
    node scripts/build-manifest.js
    node scripts/build-status.js
    ```

12. **Loop.** Find the next 5 (still skipping all WIP IDs).

## Manual-fix list (the ~70% the auto-port script gets wrong)

The script does naive line-by-line transforms. Every sketch needs a manual pass. Watch for these:

1. **`.add(` → `.push(` over-replace.** The script replaces every `.add(` with `.push(`. This breaks `PVector.add()`, `acceleration.add()`, etc. — rewrite vector ops by hand. Use `p5.Vector.add(a, b)` static form when you need a new vector, instance `.add()` when mutating in place.
2. **Class fields need `this.`.** Auto-port emits bare `radius;` — replace with `this.radius` in the constructor.
3. **`new ArrayList<X>()` → `new ()`** (broken in auto-port). Replace with `[]`.
4. **`new X[total]` (Java array)** stays as-is and breaks. Replace with `[]` and `.push()`.
5. **`for (X v : list)` (Java enhanced for)** is NOT translated. Replace with `for (const v of list)`.
6. **`PVector.sub/add` static calls.** Processing's instance `.sub()` mutates in place. The auto-port often leaves `target.sub(position)` which mutates `target` in p5.js too — usually you want `p5.Vector.sub(target, position)` (returns a new vec).
7. **`P3D` → `WEBGL`.** `size(w, h, P3D)` → `createCanvas(w, h, WEBGL)`. The script flags but doesn't convert.
8. **`pushMatrix/popMatrix` → `push/pop`.**
9. **WEBGL origin is centered, not top-left.** Processing P3D has origin top-left; p5 WEBGL has center. Sketches that translated by `(-width/2, -height/2)` to compensate need that translate REMOVED in WEBGL — or world coords need re-centering. Mouse coords often need `mouseX - width/2` adjustment.
10. **PeasyCam → easyCam** (when using p5 v0.x) or **drop entirely** (when using v1.x — see Library policy).
11. **`ortho()` conflicts with easyCam** — silently breaks rendering. Remove `ortho()` in 3D sketches that use easyCam.
12. **`pixelDensity(1)` for pixel-manipulation sketches.** Default is 2 on retina, so the backing buffer is 1200×1200 but loops typically write to 600×600 → only the top-left quadrant gets filled.
13. **`point()` in WEBGL needs `strokeWeight ≥ 2-3`** to be visible — strokeWeight(1) renders as sub-pixel.
14. **`heading2D()` → `heading()`.** p5.Vector merged these.
15. **`box(x, y, z)` is dimensions, not position.** A common porting bug: wrapping `box(x, y, z)` in `translate` and changing it to `box(2,2,2)` — that's wrong. `box(x, y, z)` draws a 3D box of size x×y×z at the current origin. If the original drew a layered/overlapping silhouette by varying box dimensions, preserve that.
16. **Never call p5 functions at module scope.** `const sizeO = random(400, 666);` or `let pos = createVector(0, 0);` at the top of the file (outside `setup()`) **silently breaks the entire script** — p5 attaches `random`, `createVector`, etc. to `window` only after the DOM is ready and `new p5(sketch)` runs. The top-level call throws `random is not a function`, the script never finishes parsing, and you get a blank canvas with no obvious error (the console shows `someOtherVar is not defined` further down). Fix: declare with `let foo;` at top, initialize inside `setup()`. Watch for `randomGaussian`, `noise`, `createVector`, `color`, `loadImage` (use `preload()` for that).

## Library policy

The repo has multiple p5.js versions for historical reasons. Use the right one:

- **2D sketches without WEBGL** — either v0.5.16 (the bundled `libraries/p5.min.js`) or v1.11.1 work. Default to v1.11.1 (already in `web_sketches/127/libraries/p5.min.js`).
- **3D sketches that use `box()` with chained rotations** — **must** use v1.11.1. v0.5/v0.6 has a WEBGL matrix bug: `Cannot read properties of null (reading 'transpose3x3')` after multi-step rotations.
- **easyCam** is v1.0.9 (the only version in the repo) and **only works with p5 v0.x**. With v1.x, easyCam calls `n.camera()` which doesn't exist.
- **For 3D sketches that need a camera** — use p5 v1.11.1 + `orbitControl()` (built-in mouse cam in v1.x) OR a fixed view via `rotateX/rotateY` in draw(). Most peasyCam sketches already animate via an internal angle variable, so a fixed view works fine.
- **matter.js** for Box2D-style physics: download once from `https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.20.0/matter.min.js`, copy to each sketch's `libraries/`. Use `Matter.Engine`, `Matter.World`, `Matter.Bodies`, `Matter.Body`.

Quick install commands when you need them:
```bash
# p5.js v1.11.1
curl -sLo libraries/p5.min.js https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.11.1/p5.min.js

# matter.js
curl -sLo libraries/matter.min.js https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.20.0/matter.min.js
```

Copy from a working sibling sketch when possible:
```bash
cp web_sketches/127/libraries/p5.min.js _ported/<id>/libraries/   # v1.11.1
cp web_sketches/103/libraries/easyCam.min.js _ported/<id>/libraries/  # easyCam (v0.x only)
```

## HTML shell template

```html
<html>
<head>
  <title>NN</title>
  <meta charset="UTF-8">
  <script src="libraries/p5.min.js"></script>
  <!-- add libraries/easyCam.min.js, matter.min.js, p5.dom.min.js as needed -->
  <script src="sketch.js"></script>
</head>
<style>
  html, body { height: 100%; }
  body { background-color: white; margin: 0; display: flex; justify-content: center; align-items: center; }
</style>
<body></body>
</html>
```

The auto-port's default HTML shell points at `../libraries/p5.js` which is broken — that path doesn't exist relative to a promoted sketch. Always use a local `libraries/` dir.

## Assets

The original sketches keep loose assets in `processing_sketches/<id>/data/`. Copy them into the ported sketch under a directory you reference from `sketch.js`:

```bash
# images
mkdir -p _ported/<id>/imgs && cp processing_sketches/<id>/data/*.png _ported/<id>/imgs/

# CSVs / text
mkdir -p _ported/<id>/data && cp processing_sketches/<id>/data/*.csv _ported/<id>/data/
```

Then in `sketch.js` use `loadImage('imgs/foo.png')` / `loadTable('data/foo.csv', 'csv', 'header')` / `loadStrings('data/foo.txt')` inside `preload()`.

**Filename caveat:** rename anything with spaces (e.g. `Screen Shot 2018-...png` → `source.png`) before referencing it — saves URL-encoding headaches.

## Performance / crash-prevention constraint

If a sketch's interaction (click, scroll, key) escalates the scene — adding particles, subdividing geometry, increasing iteration depth — **set a hard ceiling and wrap back to the initial state** when the user clicks past it. The pattern:

```js
const STATES = []; // precompute all reachable states
let stateIdx = 0;
function setup() { /* push states into STATES */ }
function mousePressed() {
  if (mouseX < 0 || mouseY < 0 || mouseX > width || mouseY > height) return;
  stateIdx = (stateIdx + 1) % STATES.length;
  current = STATES[stateIdx];
}
```

Rule of thumb on a 600×600 WEBGL canvas:
- ~400 box/sphere draw calls/frame → fine
- ~8000 draw calls → crashes the GPU
- ~160,000 → instant page lockup

Examples we've shipped:
- Menger sponge (232/233): cap at iter 1 (20 boxes) or iter 2 (400 boxes) — iter 3 = 6859+ crashes
- O(n²) flocking (92/93/144/145): inline squared-distance check (no `p5.Vector.sub` in hot loop), cap sphere detail at 4-8, reduce per-set vehicle count if needed
- Box2D spawners (235/236/237): cap at `MAX_BODIES = 120-150`

For O(n²) flocking specifically, the original Processing was fine with 1024 agents but JS is 5-10× slower. Sample fix:

```js
// before (slow): p5.Vector.sub per neighbor pair = ~1M allocations/frame
const d = p5.Vector.dist(this.pos, other.pos);
if (d < range) { const diff = p5.Vector.sub(this.pos, other.pos); ... }

// after (fast): inlined squared distance, no allocations
const dx = this.pos.x - other.pos.x;
const dy = this.pos.y - other.pos.y;
const dSq = dx*dx + dy*dy;
if (dSq > 0 && dSq < rangeSq) {
  const d = Math.sqrt(dSq);
  sx += dx / (d * d);
  sy += dy / (d * d);
  count++;
}
```

## When to mark a sketch WIP (skip, don't ship)

Leave the sketch in `_ported/<dir>` and don't promote when:

- **It needs the webcam** (`processing.video.Capture`, `import processing.video.*`). The gallery iframe sandbox doesn't include `allow-camera`. Mark WIP, note it needs camera access.
- **It needs the microphone** (`processing.sound.AudioIn`, `Amplitude`, `FFT`). Same sandbox issue. **Skip and mark WIP — do not substitute** with synthetic signals. The user's preference (set after a few synth-substituted ports) is to preserve the original intent; a synth-driven mesh is a different sketch. Note: sketches 147/148 and 290–292 were synth-substituted before this rule was set; new mic-driven sketches should go straight to the WIP list.
- **It hits a known v0.x WEBGL bug** that can't be fixed by switching to v1.11.1 (rare).
- **The user explicitly said "mark X incomplete"** for any reason.

After the batch, tell the user clearly: "WIP still in `_ported/`: 108, 112, 118, 232, 258, 262, 263" (or whatever the running list is).

## Interactive sketch hints

Any sketch with `mouseX/mouseY/mousePressed/mouseDragged/mouseMoved/mouseClicked/keyPressed` is interactive and should have an entry in `assets/hints.json` keyed by sketch id:

```json
{
  "94": "drag to spawn more particles",
  "236": "drag to spawn hexagons",
  "232": "click to subdivide; click again to reset"
}
```

The player UI reads this on `openPlayer()` and renders it as an italic subtitle below the iframe. No per-sketch wiring needed — just update the JSON when you ship a new interactive sketch.

## Promotion checklist

Before running `mv _ported/<dir> web_sketches/<id>`:

- [ ] `sketch.js` doesn't use any Java/Processing-only API (`PImage`, `PVector` constructor, `PShape`, `import` statements, `frameRate(5)` — wait that's fine — but no `println`, etc.)
- [ ] `index.html` references local `libraries/` (no `../libraries/` or CDN URLs in the production HTML — CDN is fine for staging if needed)
- [ ] Any assets the sketch loads live alongside it (`imgs/`, `data/`, `video/`)
- [ ] Interactive? Add a row to `assets/hints.json`
- [ ] Click-escalating? Has a `MAX_*` cap and wraps to initial state
- [ ] Verified in `localhost:4365/_ported/<dir>/index.html` — page loads, no console errors

After promoting:

```bash
node scripts/build-manifest.js   # → assets/sketches.json
node scripts/build-status.js     # → STATUS.md
```

Both are idempotent. The manifest also flags broken refs (`missing: libraries/foo.js`) which is a useful sanity check.

## Reporting style

When you finish a batch, give a compact bullet list. One line per sketch, plus a final "WIP still in `_ported/`:" line. Example:

> All 5 load with no errors. Preview them:
> - [sketch 236](http://localhost:4365/_ported/sketch_236/index.html) — Matter.js falling hexagons in a 3-sided box; drag to spawn, cap 150
> - …
>
> WIP still in `_ported/`: 108, 112, 118, 232, 258, 262, 263.

When promoting, just report the new totals from `build-status.js` and the next 5 targets. The user is moving fast — don't pad.

## Common conversation patterns

- "Next 5" / "continue" → find next 5 unported, skip all WIP, run the loop.
- "Mark X as done, continue" → promote all in current batch except those the user just flagged WIP, then find next 5.
- "X is laggy, optimize" → apply the perf rule (inline distance, reduce counts, cap detail, add MAX cap if click-escalating). Verify in browser before reporting.
- "X is blank" → most often: missing `lights()` for WEBGL `box()`, fill matches background, or coordinate origin mismatch (P3D vs WEBGL). Check console errors with `preview_console_logs`.
- "Crash without looping" → the wrap logic in `mousePressed` has a bug, OR the user clicked past the cap and you didn't reset. Use the explicit `STATES[]` array pattern, not an iter counter — it removes the off-by-one risk.

## See also

- Memory: `~/.claude/projects/-Users-zyy-Desktop-1-Project-threesixfive/memory/feedback_processing_to_p5_porting.md` (older form of this skill, kept for reference)
