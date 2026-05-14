// 16 particle systems firing rectangular streaks from random launch points
// (Particles drawn from bottom, StarParticles from top; gravity inverts on each.)

let systems = [];

function setup() {
  createCanvas(600, 600);
  background(0);
  for (let i = 0; i < 16; i++) systems.push(new ParticleSystem());
}

function draw() {
  background(0);
  const gravity = createVector(0, -0.1);
  for (const ps of systems) {
    ps.applyForce(gravity);
    ps.addParticle();
    ps.run();
  }
}

class Particle {
  constructor(loc, xvel) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(xvel, random(-2, -1.5));
    this.location = loc.copy();
    this.s = 1;
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
    fill(200, this.lifespan);
    noStroke();
    push();
    translate(width / 2, height + this.s);
    rect(this.location.x / 2, this.location.y / 2, this.s * 20, this.s * random(0.8, 2));
    pop();
  }
  run() { this.update(); this.display(); }
}

class StarParticle extends Particle {
  constructor(loc, xvel) {
    super(loc, xvel);
    this.velocity = createVector(xvel, 2);
  }
  applyForce(f) { this.acceleration.sub(f); }
  display() {
    fill(100, this.lifespan);
    noStroke();
    push();
    translate(width / 2, -this.s);
    rect(this.location.x / 2, this.location.y / 2, this.s * 50, this.s * random(1, 1.8));
    pop();
  }
}

class ParticleSystem {
  constructor() {
    this.particles = [];
    this.origin = createVector(random(-width / 2, width / 2), 0);
    this.xvel = random(-9, 9);
  }
  addParticle() {
    this.particles.push(new Particle(this.origin, this.xvel));
    this.particles.push(new StarParticle(this.origin, this.xvel));
    if (this.particles.length > 200) this.particles.splice(0, this.particles.length - 200);
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
