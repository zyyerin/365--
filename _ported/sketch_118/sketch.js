// Lorenz attractor — three swapped-axis curves with rotation

let x = 50, y = 0, z = 0;
const a = 10;
const b = 18;
const c = 8 / 3;
let angle = 0;

const points = [];

function setup() {
  createCanvas(600, 600, WEBGL);
  stroke(0);
  noFill();
}

function draw() {
  background(255);

  const dt = 0.01;
  const dx = a * (y - x) * dt;
  const dy = (x * (b - z) - y) * dt;
  const dz = (x * y - c * z) * dt;
  x += dx;
  y += dy;
  z += dz;

  points.push(createVector(x, y, z));

  rotateX(angle);
  rotateY(angle * 0.7);
  angle += random(0.002);

  const sc = 15;
  scale(sc);

  strokeWeight(constrain(abs(x) / 10, 0.5, 5) / sc);
  beginShape();
  for (const v of points) {
    curveVertex(v.x, v.y, v.z);
  }
  endShape();

  strokeWeight(constrain(abs(y) / 10, 0.5, 5) / sc);
  beginShape();
  for (const v of points) {
    curveVertex(v.y, v.z, v.x);
  }
  endShape();

  strokeWeight(constrain(abs(z) / 10, 0.5, 5) / sc);
  beginShape();
  for (const v of points) {
    curveVertex(v.z, v.x, v.y);
  }
  endShape();
}
