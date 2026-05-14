// two banks of pendulums (200 short + 20 long) — phases create interference patterns

let p = [];
let p2 = [];

function setup() {
  createCanvas(600, 600);
  background(255);

  for (let i = 0; i < 200; i++) {
    p.push(new Pendulum(createVector((width / 2) / 200 * i, 0), height / 4, i));
  }
  for (let i = 0; i < 20; i++) {
    p2.push(new Pendulum(createVector((width / 2) / 20 * i, height / 4), height / 4 * 3, i * 2));
  }
}

function draw() {
  for (const x of p) {
    x.update();
    x.display(color(0, 10));
  }
  for (const x of p2) {
    x.update();
    x.display(color(255, 1));
  }
}

class Pendulum {
  constructor(origin, len, angle) {
    this.origin = origin;
    this.len = len;
    this.angle = angle;
    this.aVel = 0;
    this.aAcc = 0;
    this.bob = createVector(0, 0);
  }

  update() {
    this.aAcc = -1 * sin(this.angle) / this.len;
    this.angle += this.aVel;
    this.aVel += this.aAcc;
    this.aVel *= 0.98;
  }

  display(c) {
    this.bob.x = this.origin.x + this.len * sin(this.angle);
    this.bob.y = this.origin.y + this.len * cos(this.angle);
    stroke(c);
    noFill();
    line(this.origin.x, this.origin.y, this.bob.x, this.bob.y);
    ellipse(this.bob.x, this.bob.y, 3, 3);
  }
}
