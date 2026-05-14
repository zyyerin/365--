// 3 rotating box clusters at orthogonal orientations

const chang = 2;
const kuan = 2;
const gao = 100;
const scale = 20;

let a = 0;

function setup() {
  createCanvas(600, 600, WEBGL);
  rectMode(CENTER);
  noStroke();
  fill(0);
}

function draw() {
  background(255);
  fill(0);

  push();
  unita(a);
  pop();

  push();
  rotateX(PI / 2);
  unita(a);
  pop();

  push();
  rotateX(PI / 2);
  rotateY(PI / 2);
  rotateZ(PI / 2);
  unita(a);
  pop();

  a += 0.01;
}

function unita(r) {
  rotateX(r);
  rotateY(r);

  push(); translate(-scale, 0, scale); box(chang, gao, kuan); pop();
  push(); translate(scale, 0, scale); box(chang, gao, kuan); pop();
  push(); translate(-scale, 0, -scale); box(chang, gao, kuan); pop();
  push(); translate(scale, 0, -scale); box(chang, gao, kuan); pop();
}
