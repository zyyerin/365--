/*
dynamic cube size
 */

Mesh[] mesh;


void setup() {
  size(600, 600);

  mesh = new Mesh[2];
  mesh[0] = new Mesh(width, height);
  mesh[1] = new Mesh(width, height);
}


void draw() {
  background(0);
  float cubeS1 = map(mouseX, 0, width, 0, 50);
  float cubeS2 = map(mouseY, 0, height, 0, 50);
  
  float cubeSW1 = map(mouseX, 0, width, 0, 10);
  float cubeSW2 = map(mouseY, 0, height, 0, 10);
  mesh[0].display(cubeS1, cubeSW1, color(255), color(255, 150));
  mesh[1].display(cubeS2, cubeSW2, color(255), color(255, 150));
}