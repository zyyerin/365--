# Port notes for sketch_365
**Triage:** easy
**Source files:** Bubble.pde, sketch_365.pde
## Heuristic flags
- top-level vars typed with user class (Bubble) — replace `Foo bar;` with `let bar;`
- size(...) → createCanvas(...)
## Manual review checklist
- [ ] `size(...)` calls converted to `createCanvas(...)` (and `P3D` → `WEBGL`).
- [ ] `loadImage`/`loadFont` etc. moved into a `preload()` block.
- [ ] Constructor lines for each class actually became `constructor(...)`.
- [ ] Generic type erasure didn't strip a real identifier (look for `let .undefined`).
- [ ] Class methods inside class bodies don't have a leading return type that was missed.
- [ ] Java-only library calls (Minim, PeasyCam, Serial, Video) replaced with p5/web equivalents.
## Promotion
Once it renders correctly:
```bash
mv _ported/sketch_365 web_sketches/sketch_365
node scripts/build-manifest.js
```
