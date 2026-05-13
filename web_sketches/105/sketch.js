// metaball isosurface — sampled by sphere size on a grid

let cam;
let metaballs = [];
const step = 64;

function setup() {
  createCanvas(600, 600, WEBGL);
  noStroke();
  fill(0);
  cam = createEasyCam({ distance: 500 });

  for (let i = 0; i < 5; i++) {
    metaballs.push(new Metaball(random(width), random(height), random(width)));
  }
}

function draw() {
  background(255);

  for (let x = -width / 2; x < width; x += step) {
    for (let y = -height / 2; y < height; y += step) {
      for (let z = -width / 2; z < width; z += step) {
        let sum = 0;
        for (const mb of metaballs) {
          const dx = mb.loc.x - x;
          const dy = mb.loc.y - y;
          const dz = mb.loc.z - z;
          const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (d > 0) sum += (5 * mb.r) / d;
        }
        const col = constrain(map(sum, 0, 100, 0, 20), 0, 30);
        if (col < 1) continue;
        push();
        translate(x, y, z);
        const detail = constrain(int(col), 3, 8);
        sphere(col, detail, detail);
        pop();
      }
    }
  }

  for (const mb of metaballs) {
    mb.update();
  }
}

class Metaball {
  constructor(x, y, z) {
    this.loc = createVector(x, y, z);
    this.vel = p5.Vector.random3D();
    this.vel.mult(random(1, 3));
    this.r = random(100, 1000);
  }

  update() {
    this.loc.add(this.vel);
    if (this.loc.x > width || this.loc.x < 0) {
      this.vel.x *= -random(0.5, 1.5);
    }
    if (this.loc.y > height || this.loc.y < 0) {
      this.vel.y *= -random(0.5, 1.5);
    }
    if (this.loc.z > width / 2 || this.loc.z < -width / 2) {
      this.vel.z *= -random(0.5, 1.5);
    }
  }
}
