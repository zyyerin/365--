// fountain of perpendicular-reflected line particles from the top-center

let ps;

function setup() {
  createCanvas(600, 600);
  background(255);
  ps = new ParticleSystem();
}

function draw() {
  background(255);
  ps.addParticle();
  ps.run();
}

class Particle {
  constructor(loc) {
    this.acceleration = createVector(-0.05, 0.05);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.location = loc.copy();
    this.lifespan = 255;
  }
  update() {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.lifespan -= 1.2;
  }
  isDead() { return this.lifespan <= 0; }
  display() {
    push();
    translate(width / 2, height / 2);
    stroke(0, this.lifespan);
    strokeWeight(2);
    line(this.location.x, this.location.y, this.location.y, -this.location.x);
    pop();
  }
}

class ParticleSystem {
  constructor() { this.particles = []; }
  addParticle() {
    this.particles.push(new Particle(createVector(width / 2, 20)));
    if (this.particles.length > 300) this.particles.splice(0, this.particles.length - 300);
  }
  run() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.update();
      p.display();
      if (p.isDead()) this.particles.splice(i, 1);
    }
  }
}
