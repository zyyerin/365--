// nested wireframe cubes; mouse controls scaling

let cam;
let s1, s2, S1 = 80, S2 = 80;
const totalScale = 80;

let a1, a2, a3, a4, b1, b2, b3, b4;
let A1, A2, A3, A4, B1, B2, B3, B4;

function setup() {
  createCanvas(600, 600, WEBGL);
  cam = createEasyCam({ distance: 500 });
  noFill();
  strokeWeight(1);
  stroke(0);
}

function draw() {
  background(255);

  S1 = map(mouseX, totalScale, width - totalScale, 0, totalScale);
  S2 = map(mouseY, totalScale, height - totalScale, 0, totalScale);
  s1 = totalScale - S1;
  s2 = totalScale - S2;

  strokeWeight(s1 / 10 + 0.1);

  a1 = createVector(-s1, -s1, -s1);
  a2 = createVector(s2, -s2, -s2);
  a3 = createVector(-s1, -s1, s1);
  a4 = createVector(s2, -s2, s2);
  b1 = createVector(-s1, s1, -s1);
  b2 = createVector(s2, s2, -s2);
  b3 = createVector(-s1, s1, s1);
  b4 = createVector(s2, s2, s2);

  A1 = createVector(-S1, -S1, -S1);
  A2 = createVector(S2, -S2, -S2);
  A3 = createVector(-S1, -S1, S1);
  A4 = createVector(S2, -S2, S2);
  B1 = createVector(-S1, S1, -S1);
  B2 = createVector(S2, S2, -S2);
  B3 = createVector(-S1, S1, S1);
  B4 = createVector(S2, S2, S2);

  drawCube(a1, a2, a3, a4, b1, b2, b3, b4);
  drawCube(A1, A2, A3, A4, B1, B2, B3, B4);

  // connect inner to outer
  line3d(a1, A1); line3d(a2, A2); line3d(a3, A3); line3d(a4, A4);
  line3d(b1, B1); line3d(b2, B2); line3d(b3, B3); line3d(b4, B4);
}

function drawCube(p1, p2, p3, p4, q1, q2, q3, q4) {
  // top
  line3d(p1, p2); line3d(p1, p3); line3d(p2, p4); line3d(p3, p4);
  // bottom
  line3d(q1, q2); line3d(q1, q3); line3d(q2, q4); line3d(q3, q4);
  // verticals
  line3d(p1, q1); line3d(p2, q2); line3d(p3, q3); line3d(p4, q4);
}

function line3d(a, b) {
  line(a.x, a.y, a.z, b.x, b.y, b.z);
}
