// 3 particles + 3 springs — mouse moves the locked head; gravity, no bg clear
// (Original used toxiclibs — re-implemented with verlet constraints.)

let p1, p2, p3;

function setup() {
  createCanvas(600, 600);
  background(255);

  p1 = new Particle(width / 2, 20, true);
  p2 = new Particle(width / 2 + 160, 20);
  p3 = new Particle(width / 2 - 160, 20);
}

function draw() {
  // no bg clear — accumulating
  step();

  noStroke();
  fill(0);
  triangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);

  for (const p of [p1, p2, p3]) {
    fill(0);
    ellipse(p.x, p.y, 2, 2);
  }
}

function mouseMoved() {
  p1.x = mouseX;
  p1.y = mouseY;
  p1.px = mouseX;
  p1.py = mouseY;
}

class Particle {
  constructor(x, y, locked) {
    this.x = x;
    this.y = y;
    this.px = x;
    this.py = y;
    this.locked = !!locked;
  }
}

function step() {
  const gravity = 0.5;
  const damping = 0.99;
  const restLen = 10;
  const springs = [
    [p1, p2, 0.001],
    [p2, p3, 0.01],
    [p1, p3, 0.1],
  ];

  // verlet integration
  for (const p of [p1, p2, p3]) {
    if (p.locked) continue;
    const vx = (p.x - p.px) * damping;
    const vy = (p.y - p.py) * damping;
    p.px = p.x;
    p.py = p.y;
    p.x += vx;
    p.y += vy + gravity;
  }
  // spring constraints
  for (let iter = 0; iter < 6; iter++) {
    for (const [a, b, k] of springs) {
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d === 0) continue;
      const diff = (d - restLen) / d * k;
      const ax = dx * diff;
      const ay = dy * diff;
      if (!a.locked) { a.x += ax; a.y += ay; }
      if (!b.locked) { b.x -= ax; b.y -= ay; }
    }
  }
  // bounds
  for (const p of [p1, p2, p3]) {
    if (p.locked) continue;
    p.x = constrain(p.x, 0, width);
    p.y = constrain(p.y, 0, height);
  }
}
