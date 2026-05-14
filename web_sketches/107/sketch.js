// 2D metaball field via pixel manipulation

let metaballs = [];

function setup() {
  createCanvas(600, 600);
  pixelDensity(1);
  noStroke();

  for (let i = 0; i < 20; i++) {
    metaballs.push(new Metaball(random(width), random(height)));
  }
}

function draw() {
  background(noise(frameCount) * 50);
  loadPixels();
  const w = width;
  for (let x = 0; x < w; x += 1) {
    for (let y = 0; y < height; y += 4) {
      let sum = 0;
      for (const mb of metaballs) {
        const dx = mb.loc.x - x;
        const dy = mb.loc.y - y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d > 0) sum += (2 * mb.r) / d;
      }
      const col = map(sum, 0, 100, 255, 100);
      const v = ((col % 125) * 2) | 0;
      // p5 pixel layout is RGBA
      const idx = 4 * (x + y * w);
      pixels[idx] = v;
      pixels[idx + 1] = v;
      pixels[idx + 2] = v;
      pixels[idx + 3] = 255;
    }
  }
  updatePixels();

  for (const mb of metaballs) mb.update();
}

class Metaball {
  constructor(x, y) {
    this.loc = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(1, 3));
    this.r = random(100, 1000);
  }

  update() {
    this.loc.add(this.vel);
    if (this.loc.x > width || this.loc.x < 0) this.vel.x *= -random(0.5, 1.5);
    if (this.loc.y > height || this.loc.y < 0) this.vel.y *= -random(0.5, 1.5);
  }
}
