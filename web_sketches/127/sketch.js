// 10×10×10 grid of rotating Objecta cube clusters; mouse controls dimensions

let a = 0;
let objA;

function setup() {
  createCanvas(600, 600, WEBGL);
  rectMode(CENTER);
  noStroke();
  fill(0);

  objA = new Objecta(1, 1, 15, 5);
}

function draw() {
  background(255);

  const newGao = map(mouseX, 0, width, 1, 20);
  const newScale = map(mouseY, 0, height, 1, 20);
  objA = new Objecta(1, 1, newGao, newScale);

  rotateX(-PI / 6);
  rotateY(a * 0.3);

  const unitSize = width / 11;
  push();
  translate(-width / 2, -height / 2, 270);
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      for (let k = 0; k < 10; k++) {
        objA.display((1 + i) * unitSize, (1 + j) * unitSize, -(1 + k) * unitSize, a, a, a);
      }
    }
  }
  pop();

  a += 0.004;
}

class Objecta {
  constructor(c, k, g, s) {
    this.chang = c;
    this.kuan = k;
    this.gao = g;
    this.scale = s;
  }

  unita(rx, ry, rz, x, y) {
    push();
    translate(x, y);
    rotateX(rx);
    rotateY(ry);
    rotateZ(rz);

    push(); translate(-this.scale, 0, this.scale); box(this.chang, this.gao, this.kuan); pop();
    push(); translate(this.scale, 0, this.scale); box(this.chang, this.gao, this.kuan); pop();
    push(); translate(-this.scale, 0, -this.scale); box(this.chang, this.gao, this.kuan); pop();
    push(); translate(this.scale, 0, -this.scale); box(this.chang, this.gao, this.kuan); pop();

    pop();
  }

  unitb(r) {
    rotate(r);
    this.unita(0, 0, 0, 0, 0);
    this.unita(0, 0, HALF_PI, 0, 0);
    this.unita(HALF_PI, HALF_PI, 0, 0, 0);
  }

  display(x, y, z, rx, ry, rz) {
    push();
    translate(x, y, z);
    rotateX(rx);
    rotateY(ry);
    rotateZ(rz);
    this.unitb(a);
    pop();
  }
}
