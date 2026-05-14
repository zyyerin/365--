// rotating low-poly sphere on black; cursor controls a small offset sphere

let a = 0;

function setup() {
  createCanvas(600, 600, WEBGL);
}

function draw() {
  background(0);
  a += 0.01;

  push();
  fill(255);
  noStroke();
  rotateY(a);
  sphere(100, 3, 3);
  pop();

  push();
  fill(0);
  // approximate the original's mouse-driven offset (mouseX/mouseY mapped into z)
  translate(0, 0, 100);
  sphere(5, 20, 20);
  translate(30, 0, 0);
  sphere(5, 20, 20);
  pop();
}
