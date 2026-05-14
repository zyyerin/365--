// nested orbital "solar system" with noise-driven ellipses, fading bg

let sun;

function setup() {
  createCanvas(600, 600);
  background(0);
  sun = new Planet(100, 0, 0);
  sun.spawnMoons(5, 1);
}

function draw() {
  fill(255, 2);
  noStroke();
  rect(0, 0, width, height);
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
    if (this.planets) for (const p of this.planets) p.orbit();
  }

  spawnMoons(total, level) {
    this.planets = [];
    for (let i = 0; i < total; i++) {
      const r = this.radius * random(0.2, 0.6);
      const d = this.radius + r;
      const o = random(-0.03, 0.03);
      const p = new Planet(r, d, o);
      if (level < 4) {
        const num = int(random(5));
        p.spawnMoons(num, level + 1);
      }
      this.planets.push(p);
    }
  }

  show() {
    push();
    strokeWeight(0.3);
    stroke(255);
    fill(0, 5);
    rotate(this.angle);
    translate(this.distance, 0);
    this.roff += 0.02;
    const s = this.radius * 2 * noise(this.roff);
    ellipse(0, 0, s, s);

    if (this.planets) for (const p of this.planets) p.show();
    pop();
  }
}
