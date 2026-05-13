// 100 nested rotating cube clusters

const chang = 0.01;
const kuan = 2;
const gao = 200;
const scale = 50;

let a = 0;

function setup() {
  createCanvas(600, 600, WEBGL);
  rectMode(CENTER);
  noStroke();
  fill(0);
}

function draw() {
  background(255);

  push();
  rotateX(a);
  rotateY(-a);
  for (let i = 0; i < 100; i++) {
    unitb(a * noise(i));
  }
  pop();

  a += 0.001;
}

function unita(rx, ry, rz, x, y) {
  push();
  translate(x, y);
  rotateX(rx);
  rotateY(ry);
  rotateZ(rz);

  push(); translate(-scale, 0, scale); box(chang, gao, kuan); pop();
  push(); translate(scale, 0, scale); box(chang, gao, kuan); pop();
  push(); translate(-scale, 0, -scale); box(chang, gao, kuan); pop();
  push(); translate(scale, 0, -scale); box(chang, gao, kuan); pop();

  pop();
}

function unitb(r) {
  rotate(r);
  unita(0, 0, 0, 0, 0);
  unita(0, 0, HALF_PI, 0, 0);
  unita(HALF_PI, HALF_PI, 0, 0, 0);
}
