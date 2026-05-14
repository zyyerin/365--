// image particles streaming from the top-right corner; additive blend

let ps;
let img;

function preload() {
  img = loadImage('imgs/image.png');
}

function setup() {
  createCanvas(600, 600);
  background(0);
  ps = new ParticleSystem();
}

function draw() {
  background(0);
  blendMode(ADD);
  const gravity = createVector(0, 0.03);
  ps.applyForce(gravity);
  ps.addParticle();
  ps.run();
  // matter.js-style cap to keep particle count bounded
  if (ps.particles.length > 600) ps.particles.splice(0, ps.particles.length - 600);
}

class Particle {
  constructor(loc) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.location = loc.copy();
    this.lifespan = 255;
  }
  applyForce(f) { this.acceleration.add(f); }
  update() {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
    this.lifespan -= 1;
  }
  isDead() { return this.lifespan <= 0; }
  display() {
    noStroke();
    fill(0, this.lifespan);
    ellipse(this.location.y / 2, this.location.x / 2, 100, 100);
  }
  run() { this.update(); this.display(); }
}

class StarParticle extends Particle {
  display() {
    noStroke();
    imageMode(CENTER);
    tint(255, this.lifespan / 2);
    image(img, this.location.x / 2, this.location.y / 2, height / 2, this.lifespan);
  }
}

class ParticleSystem {
  constructor() {
    this.particles = [];
    this.origin = createVector(width, 0);
  }
  addParticle() { this.particles.push(new StarParticle(this.origin)); }
  applyForce(f) { for (const p of this.particles) p.applyForce(f); }
  run() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.run();
      if (p.isDead()) this.particles.splice(i, 1);
    }
  }
}
