// 2D solar system - nested system

Planet sun;

void setup() {
  size(600, 600);
  //smooth();
  //pixelDensity(2);
  background(255);
  fill(0);
  noStroke();

  sun = new Planet(50, 0, 0);
  sun.spawnMoons(5, 1);
  rectMode(CENTER);
}

void draw() {
  background(255);
  translate(width/2, height/2);
  sun.show();
  sun.orbit();
}