// 2D solar system - nested system

let sun;

function setup() {
  createCanvas(600, 600);
  background(255);
  fill(0);
  noStroke();

  sun = new Planet(50, 0, 0);
  sun.spawnMoons(5, 1);
  rectMode(CENTER);
}

function draw() {
  background(255);
  translate(width / 2, height / 2);
  sun.show();
  sun.orbit();
}

class Planet {
  constructor(r, d, o) {
    this.radius = r;
    this.distance = d;
    this.angle = random(TWO_PI);
    this.orbitSpeed = o;
    this.roff = random(10);
    this.planets = null;
  }

  orbit() {
    this.angle += this.orbitSpeed;
    if (this.planets) {
      for (let i = 0; i < this.planets.length; i++) {
        this.planets[i].orbit();
      }
    }
  }

  spawnMoons(total, level) {
    this.planets = [];
    for (let i = 0; i < total; i++) {
      const r = this.radius * 0.5;
      const d = this.radius + r;
      const o = random(-0.02, 0.02);
      const p = new Planet(r, d, o);
      if (level < 4) {
        const num = int(random(10));
        p.spawnMoons(num, level + 1);
      }
      this.planets.push(p);
    }
  }

  show() {
    push();
    rotate(this.angle);
    translate(this.distance, 0);
    this.roff += 0.02;
    stroke(0);
    ellipse(0, 0, this.radius * 2, this.radius * 2);
    if (this.planets) {
      noFill();
      for (let i = 0; i < this.planets.length; i++) {
        this.planets[i].show();
      }
    }
    pop();
  }
}
