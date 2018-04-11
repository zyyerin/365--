// 2D solar system - nested system

Planet sun;

void setup() {
  size(600, 600);
  smooth();
  pixelDensity(2);
  background(0);

  sun = new Planet(100, 0, 0);
  sun.spawnMoons(5, 1);
}

void draw() {
  fill(255, 2);
  rect(0, 0, width, height);
  translate(width/2, height/2);
  sun.show();
  sun.orbit();
}