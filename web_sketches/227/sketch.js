// soft chain pendulum — head locked at top, tail follows mouse
// (Original used toxiclibs — re-implemented manually with verlet integration.)

let chain;
let t = 0;
let t2 = 0;

function setup() {
  createCanvas(600, 600);
  background(255);
  rectMode(CENTER);

  chain = new Chain(height, height / 5, 20, 0.4);
}

function draw() {
  // soft trail with noise-driven white ellipse fade
  fill(255, 10);
  noStroke();
  ellipse(noise(t) * width, noise(t2) * height, noise(t) * 600, noise(t) * 600);
  t += 0.009;
  t2 += 0.01;

  chain.update();
  chain.tail.set(mouseX, mouseY);
  chain.display();
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.px = x;
    this.py = y;
    this.locked = false;
  }

  set(x, y) {
    this.x = x;
    this.y = y;
    this.px = x;
    this.py = y;
  }
}

class Chain {
  constructor(totalLen, n, radius, strength) {
    this.particles = [];
    this.numPoints = n;
    this.radius = radius;
    this.strength = strength;
    const len = totalLen / n;
    this.segLen = len;
    for (let i = 0; i < n; i++) {
      this.particles.push(new Particle(width / 2, i * len));
    }
    this.particles[0].locked = true;
    this.tail = this.particles[n - 1];
  }

  update() {
    const gravity = 0.1;
    // verlet integration with light damping
    for (const p of this.particles) {
      if (p.locked) continue;
      const vx = (p.x - p.px) * 0.99;
      const vy = (p.y - p.py) * 0.99;
      p.px = p.x;
      p.py = p.y;
      p.x += vx;
      p.y += vy + gravity;
    }
    // satisfy spring constraints (a few iterations)
    const k = this.strength;
    for (let iter = 0; iter < 8; iter++) {
      for (let i = 0; i < this.particles.length - 1; i++) {
        const a = this.particles[i];
        const b = this.particles[i + 1];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d === 0) continue;
        const diff = (d - this.segLen) / d;
        const ax = dx * diff * k;
        const ay = dy * diff * k;
        if (!a.locked) { a.x += ax; a.y += ay; }
        if (!b.locked) { b.x -= ax; b.y -= ay; }
      }
    }
    // anchor head at top
    this.particles[0].x = width / 2;
    this.particles[0].y = 0;
  }

  display() {
    beginShape();
    stroke(0);
    strokeWeight(0.5);
    noFill();
    for (const p of this.particles) {
      vertex(p.x, p.y);
    }
    endShape();
  }
}
