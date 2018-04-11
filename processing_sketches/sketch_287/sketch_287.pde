/*
fix mesh color
*/


Mesh[] mesh;


void setup() {
  size(600, 600);
  
  mesh = new Mesh[2];
  mesh[0] = new Mesh(10, width, height);
  mesh[1] = new Mesh(14, width, height);
}


void draw() {
  background(0);
  mesh[0].display(color(255,0,0), color(255, 150));
  mesh[1].display(color(255), color(255, 150));
}