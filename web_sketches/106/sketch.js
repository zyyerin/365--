// 2D metaballs that chase the cursor

let metaballs = [];

function setup() {
  createCanvas(600, 600);
  noStroke();
  noCursor();

  for (let i = 0; i < 10; i++) {
    metaballs.push(new Metaball(random(width), random(height)));
  }
}

function draw() {
  background(0);
  for (let x = 0; x <= width; x += 8) {
    for (let y = 0; y <= height; y += 8) {
      let sum = 0;
      for (const mb of metaballs) {
        const dx = mb.loc.x - x;
        const dy = mb.loc.y - y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d > 0) sum += (2 * mb.r) / d;
      }
      const col = map(sum, 0, 100, 0, 255);
      let r = 8;
      if (dist(mouseX, mouseY, x, y) < 10) {
        fill(255 - col);
        r *= 0.5;
      } else {
        fill(col);
      }
      ellipse(x, y, r, r);
    }
  }

  for (const mb of metaballs) mb.run();
}

class Metaball {
  constructor(x, y) {
    this.loc = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxspeed = random(1, 8);
    this.maxforce = random(0.05, 0.4);
    this.r = random(300, 900);
  }

  run() {
    this.follow();
    this.update();
  }

  follow() {
    const desired = createVector(mouseX - width / 2, mouseY - height / 2);
    desired.setMag(this.maxspeed);
    const steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    this.acc.add(steer);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.loc.add(this.vel);
    this.acc.mult(0);

    if (this.loc.x > width || this.loc.x < 0) this.vel.x *= -random(0.5, 1.5);
    if (this.loc.y > height || this.loc.y < 0) this.vel.y *= -random(0.5, 1.5);
  }
}
