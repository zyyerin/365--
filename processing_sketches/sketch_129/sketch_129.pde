float a = 0;
Objecta objA;

void setup() {
  size(600, 600, P3D);
  objA = new Objecta(10, 10, 10, 50, 10);
  smooth();
  pixelDensity(2);
  //ortho();
  rectMode(CENTER);
  noStroke();
  fill(0);
}

void draw() {
  background(255);

  objA.display();

  a+=0.004;
}