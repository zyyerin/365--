// 1000-star warp field — stars rush toward the camera

const stars = [];
const N = 1000;

function setup() {
  createCanvas(400, 400);
  for (let i = 0; i < N; i++) stars.push(new Star());
}

function draw() {
  background(255);
  translate(width / 2, height / 2);
  for (const s of stars) {
    s.update();
    s.show();
  }
}

class Star {
  constructor() {
    this.x = random(-width / 2, width / 2);
    this.y = random(-height / 2, height / 2);
    this.z = random(width);
    this.pz = this.z;
  }

  update() {
    this.z -= 10;
    if (this.z < 1) {
      this.x = random(-width, width);
      this.y = random(-height, height);
      this.z = width;
      this.pz = this.z;
    }
  }

  show() {
    const sx = map(this.x / this.z, 0, 1, 0, width);
    const sy = map(this.y / this.z, 0, 1, 0, height);
    const px = map(this.x / this.pz, 0, 1, 0, width);
    const py = map(this.y / this.pz, 0, 1, 0, height);
    this.pz = this.z;

    const sw = map(this.z, 0, width, 4, 0.1);
    stroke(0);
    strokeWeight(sw);
    line(px, py, sx, sy);
  }
}
