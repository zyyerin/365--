// rotating rectangle traces, no background clear, x-drift with noise

let x, y, z, sz;
let rotateA;
let xoff = 0;

function setup() {
  createCanvas(600, 600, WEBGL);
  background(255);
  x = 50 - width / 2;
  y = 0;
  z = 100;
  sz = 0;
  rotateA = random(PI);
  noFill();
  rectMode(CENTER);
}

function draw() {
  // no bg clear — strokes accumulate
  push();
  translate(x, y, z);
  rotateA += noise(xoff) * 0.05;
  rotateX(rotateA);
  rotateY(rotateA);

  stroke(0, 50);
  noFill();
  sz = (sz + 0.5) % (height / 2);
  rect(0, 0, sz, height / 20);
  pop();

  if (x <= -width / 2 || x >= width / 2) {
    xoff *= -noise(rotateA);
  } else {
    xoff = noise(rotateA);
  }
  xoff += 0.01;
  x += xoff;
  z += random(-5, 0.1);
}
