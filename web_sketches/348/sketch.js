// rotating cloud of fading particles + companion bars; random number of systems

let systems = [];

function setup() {
  createCanvas(600, 600);
  background(255);
  const total = floor(random(20, 60));
  for (let i = 0; i < total; i++) systems.push(new ParticleSystem());
}

function draw() {
  const gravity = createVector(0, 0.1);
  for (const ps of systems) {
    ps.applyForce(gravity);
    ps.addParticle();
    ps.run();
  }
}

class Particle {
  constructor(loc) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.location = loc.copy();
    this.lifespan = 255;
    this.s = random(1, 4);
    this.angle = 0;
    this.off = 1;
  }
  applyForce(f) { this.acceleration.add(f); }
  update() {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
    this.lifespan -= 1;
    this.off += 0.1;
  }
  isDead() { return this.lifespan <= 0; }
  display() {
    fill(0, this.lifespan);
    noStroke();
    push();
    translate(width / 2, height / 2);
    rotate(this.angle);
    ellipse(this.location.x / 2, this.location.y / 2, this.s, this.s);
    pop();
    this.s -= 0.01;
    this.angle = noise(this.off) * PI;
  }
  run() { this.update(); this.display(); }
}

class ParticleSystem {
  constructor() {
    this.particles = [];
    this.origin = createVector(random(300), random(300));
  }
  addParticle() {
    this.particles.push(new Particle(this.origin));
    if (this.particles.length > 80) this.particles.splice(0, this.particles.length - 80);
  }
  applyForce(f) { for (const p of this.particles) p.applyForce(f); }
  run() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.run();
      if (p.isDead()) this.particles.splice(i, 1);
    }
  }
}
