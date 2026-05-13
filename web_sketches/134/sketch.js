// vector projection — accumulating heavy brush strokes

let alpha = 0;
let t;
let r;

function setup() {
  createCanvas(600, 600);
  background(255);
  strokeWeight(134);

  t = random(10);
  r = width / 4;
}

function draw() {
  alpha += 0.01;
  t += 0.01;

  const off = noise(t) * r;

  const a = createVector(width / 2, height / 2);
  const b = createVector(width / 2 + cos(alpha), height / 2 + sin(alpha));
  const m = createVector(width / 2 + sin(alpha) * off, height / 2 + cos(alpha) * off);

  stroke(0, 10);
  line(a.x, a.y, b.x, b.y);
  line(a.x, a.y, m.x, m.y);

  const norm = scalarProjection(m, a, b);
  stroke(255, 200);
  line(m.x, m.y, norm.x, norm.y);
}

function scalarProjection(p, a, b) {
  const ap = p5.Vector.sub(p, a);
  const ab = p5.Vector.sub(b, a);
  ab.normalize();
  ab.mult(ap.dot(ab));
  return p5.Vector.add(a, ab);
}
