// Sierpinski-style box variant — click toggles between 1-box and 19-box state.
// Original cycled through subdivisions; capped here to avoid GPU stalls
// (iter 2 = 361 boxes, iter 3 = 6859 — both crash the gallery iframe).

const STATES = [];
let stateIdx = 0;
let sponge = [];
let a = 0;

function setup() {
  createCanvas(600, 600, WEBGL);
  stroke(0);
  strokeWeight(0.5);
  noFill();

  const root = new SBox(0, 0, 0, 100);
  STATES.push([root]);
  STATES.push(root.generate());

  sponge = STATES[0];
}

function mousePressed() {
  if (mouseX < 0 || mouseY < 0 || mouseX > width || mouseY > height) return;
  stateIdx = (stateIdx + 1) % STATES.length;
  sponge = STATES[stateIdx];
}

function draw() {
  background(255);
  rotateX(a * 0.6);
  rotateY(a);
  for (const b of sponge) b.show();
  a += 0.005;
}

class SBox {
  constructor(x, y, z, r) { this.x = x; this.y = y; this.z = z; this.r = r; }
  generate() {
    const out = [];
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        for (let dz = -1; dz <= 1; dz++) {
          if (dx + dy === 0 || dy + dz === 0 || dx + dz === 0) {
            const nr = this.r / 2;
            out.push(new SBox(this.x + dx * nr, this.y + dy * nr, this.z + dz * nr, nr));
          }
        }
      }
    }
    return out;
  }
  show() {
    push();
    translate(this.x, this.y, this.z);
    box(this.r);
    pop();
  }
}
