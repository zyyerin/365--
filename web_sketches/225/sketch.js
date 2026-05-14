// 500 particles with mutual repulsion + central attractor; mouse drag moves attractor
// (Original used toxiclibs verlet physics — re-implemented manually with simple integration.)

let particles = [];
let attractor;
const N = 500;
const drag = 0.99;
const attractorPull = 0.02;
const repelRadius = 6;
const repelStrength = 0.05;

function setup() {
  createCanvas(600, 600);
  background(255);
  for (let i = 0; i < N; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
  attractor = createVector(width / 2, height / 2);
}

function draw() {
  background(255);

  if (mouseIsPressed) {
    attractor.set(mouseX, mouseY);
  }

  // pull each particle toward the attractor
  for (const p of particles) {
    const toAttr = p5.Vector.sub(attractor, p.pos);
    toAttr.mult(attractorPull * 0.05);
    p.vel.add(toAttr);
  }

  // local repulsion using a uniform grid
  const cell = repelRadius;
  const cols = Math.ceil(width / cell);
  const rows = Math.ceil(height / cell);
  const grid = new Array(cols * rows);
  for (let i = 0; i < grid.length; i++) grid[i] = [];
  for (const p of particles) {
    const cx = constrain(Math.floor(p.pos.x / cell), 0, cols - 1);
    const cy = constrain(Math.floor(p.pos.y / cell), 0, rows - 1);
    grid[cx + cy * cols].push(p);
  }
  for (const p of particles) {
    const cx = constrain(Math.floor(p.pos.x / cell), 0, cols - 1);
    const cy = constrain(Math.floor(p.pos.y / cell), 0, rows - 1);
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        const nx = cx + dx;
        const ny = cy + dy;
        if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue;
        for (const o of grid[nx + ny * cols]) {
          if (o === p) continue;
          const ddx = p.pos.x - o.pos.x;
          const ddy = p.pos.y - o.pos.y;
          const dSq = ddx * ddx + ddy * ddy;
          if (dSq > 0 && dSq < repelRadius * repelRadius) {
            const d = Math.sqrt(dSq);
            const f = (1 - d / repelRadius) * repelStrength;
            p.vel.x += (ddx / d) * f;
            p.vel.y += (ddy / d) * f;
          }
        }
      }
    }
  }

  // integrate + render
  noStroke();
  fill(0);
  for (const p of particles) {
    p.vel.mult(drag);
    p.pos.add(p.vel);
    if (p.pos.x < 0) { p.pos.x = 0; p.vel.x *= -0.5; }
    if (p.pos.x > width) { p.pos.x = width; p.vel.x *= -0.5; }
    if (p.pos.y < 0) { p.pos.y = 0; p.vel.y *= -0.5; }
    if (p.pos.y > height) { p.pos.y = height; p.vel.y *= -0.5; }
    ellipse(p.pos.x, p.pos.y, 2, 2);
  }
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
  }
}
