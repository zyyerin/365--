// 20×10 grid of particles. Press any key to "shatter" — particles start
// drifting from their lattice positions. Click anywhere to reset to the lattice.

let ps;

function setup() {
  createCanvas(600, 600);
  ps = new ParticleSystem(random(width), random(height), random(20));
}

function draw() {
  background(255);
  ps.display();
  ps.update();
}

function keyPressed() {
  ps.shatter();
}

function mousePressed() {
  if (mouseX < 0 || mouseY < 0 || mouseX > width || mouseY > height) return;
  ps = new ParticleSystem(random(width), random(height), random(20));
}

class Particle {
  constructor(x, y, r) {
    this.acceleration = createVector(random(-0.1, 0.1), random(-0.1, 0.1));
    this.velocity = p5.Vector.random2D();
    this.velocity.mult(0.5);
    this.position = createVector(x, y);
    this.lifespan = 255;
    this.r = r;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= random(4);
    if (this.lifespan < 200) this.lifespan += 10;
  }

  display() {
    if (this.lifespan > 0) strokeWeight(this.lifespan);
    else strokeWeight(-this.lifespan + 1);
    fill(0);
    ellipse(this.position.x, this.position.y, this.r, this.r);
  }
}

class ParticleSystem {
  constructor(x, y, r) {
    this.particles = [];
    this.rows = 20;
    this.cols = 10;
    this.intact = true;
    for (let i = 0; i < this.rows * this.cols; i++) {
      this.particles.push(new Particle(x + (i % this.cols) * r, y + floor(i / this.rows) * r, r));
    }
  }

  display() {
    for (const p of this.particles) p.display();
  }

  shatter() {
    this.intact = false;
  }

  update() {
    if (!this.intact) for (const p of this.particles) p.update();
  }
}
