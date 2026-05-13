// Lorenz attractor with mouse-following test point

let cam;
let x, y, z;
let bx = 0, by = 0, bz = 0;
let testPoint;
const testScope = 20;

const a = 28;
const b = 46.92;
const c = 4;

const points = [];

function setup() {
  createCanvas(600, 600, WEBGL);
  cam = createEasyCam({ distance: 500 });

  stroke(0);
  strokeWeight(1);
  noFill();

  x = random(10);
  y = random(10);
  z = random(10);

  testPoint = createVector(0, 0, 0);
}

function draw() {
  background(255);

  testPoint = createVector(mouseX - width / 2, 0, 50);

  push();
  translate(testPoint.x, testPoint.y, testPoint.z);
  stroke(220);
  noFill();
  sphere(testScope, 12, 12);
  pop();

  push();
  fill(0);
  noStroke();
  translate(0, 0, 50);
  box(bx * 2, by * 2, bz * 2);
  pop();

  noFill();
  displayGraph();

  if (dist(x, y, z, testPoint.x, testPoint.y, testPoint.z) < testScope) {
    bx = x;
    by = y;
    bz = z;
  }

  stroke(255, 0, 0);
  strokeWeight(5);
  point(x, y, z);
  strokeWeight(1);

  stroke(0);
  line(-width, 0, 50, width, 0, 50);

  stroke(220);
  noFill();
  beginShape();
  for (const v of points) {
    curveVertex(v.x, v.y, v.z);
  }
  endShape();
}

function displayGraph() {
  const dt = 0.01;
  const dx = a * (y - x) * dt;
  const dy = (x * (b - z) - y) * dt;
  const dz = (x * y - c * z) * dt;
  x += dx;
  y += dy;
  z += dz;

  if (points.length < 2000) {
    points.push(createVector(x, y, z));
  }
}
