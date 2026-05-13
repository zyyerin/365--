// Lorenz attractor with sweeping b parameter

let cam;
let x = 5, y = 0, z = 0;
const a = 28;
let b = 10;
const c = 4;

const points = [];

function setup() {
  createCanvas(600, 600, WEBGL);
  cam = createEasyCam({ distance: 100 });
  stroke(0);
  strokeWeight(1);
  noFill();
}

function draw() {
  background(255);
  if (b < 48) {
    b += 0.05;
  } else {
    b = 10;
  }

  const dt = 0.01;
  const dx = a * (y - x) * dt;
  const dy = (x * (b - z) - y) * dt;
  const dz = (x * y - c * z) * dt;
  x += dx;
  y += dy;
  z += dz;

  points.push(createVector(x, y, z));

  beginShape();
  for (const v of points) {
    curveVertex(v.x, v.y, v.z);
  }
  endShape();
}
