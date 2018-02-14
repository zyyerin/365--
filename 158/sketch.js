let a = 0;

function setup() {
  createCanvas(600, 600, WEBGL);
}

function draw() {
  background(200);

  a += 0.02;
  rotateX(a);
  rotateY(a*0.5);
  noStroke();

  normalMaterial();
  // fill(255, 0, 0);
  // stroke(0);
  torus(200, 20);
}
