// dual particle systems with image-based eyes; cursor offsets the inner system

let img;
let ps;     // StarParticles
let eyel;   // Particle_eye
let t = 0;
let t2 = 1;

function preload() {
  img = loadImage('imgs/image.png');
}

function setup() {
  createCanvas(600, 600);
  background(0);
  noCursor();
  imageMode(CENTER);

  ps = new ParticleSystem();
  eyel = new ParticleSystem();
}

function draw() {
  background(0);

  noStroke();
  fill(255, 200, 0);
  ellipse(mouseX, mouseY, 40, 40);

  const gravity = createVector(0, 0.04);
  const gravity_less = createVector(0, 0.01);
  blendMode(ADD);

  ps.applyForce(gravity);
  eyel.applyForce(gravity_less);

  ps.addParticle(true);
  ps.run();

  eyel.addParticle(false);

  blendMode(BLEND);

  fill(20);
  noStroke();

  const tx = map(mouseX, 0, width, -24, 30);
  const ty = map(mouseY, 0, height, -30, 20);
  push();
  translate(tx, ty);
  eyel.run();
  pop();
}

class Particle {
  constructor(loc) {
    this.location = loc.copy();
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.acceleration = createVector(0, 0);
    this.lifespan = 255;
  }

  applyForce(f) { this.acceleration.add(f); }

  update() {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
    this.lifespan -= 0.8;
  }

  isDead() { return this.lifespan <= 0; }

  run() {
    this.update();
    this.display();
  }

  display() {
    noStroke();
    fill(0, this.lifespan);
    ellipse(this.location.y / 2, this.location.x / 2, 100, 100);
  }
}

class StarParticle extends Particle {
  display() {
    noStroke();
    tint(255, this.lifespan / 2);
    const pw = map(this.lifespan, 0, 255, 0, height / 3);
    image(img, this.location.x / 2, this.location.y / 2 + 200, pw, this.lifespan);
  }
}

class ParticleEye extends Particle {
  constructor(loc) {
    super(loc);
    this.velocity = createVector(random(-0.1, 0.1), random(-0.5, 0.1));
    this.acceleration = createVector(random(-0.1, 0.1), random(-0.5, 0.1));
  }

  display() {
    tint(0, this.lifespan / 5);
    const ey = map(this.lifespan, 0, 255, 0, 44);
    image(img, this.location.x / 2 - 44, this.location.y / 2 + 204, ey * random(0.9, 1), ey * random(0.9, 1));
    image(img, this.location.x / 2 + 39, this.location.y / 2 + 200, ey * random(0.9, 1), ey * random(0.9, 1));
  }
}

class ParticleSystem {
  constructor() {
    this.particles = [];
    this.origin = createVector(width, 0);
  }

  addParticle(stars) {
    if (stars) this.particles.push(new StarParticle(this.origin));
    else this.particles.push(new ParticleEye(this.origin));
  }

  applyForce(f) {
    for (const p of this.particles) p.applyForce(f);
  }

  run() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.run();
      if (p.isDead()) this.particles.splice(i, 1);
    }
  }
}
