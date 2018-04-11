/*
wire mesh fix y connection
clean up file
array of mesh
*/


Mesh[] mesh;


void setup() {
  size(600, 600);
  
  mesh = new Mesh[2];
  mesh[0] = new Mesh(10, width, height);
  //mesh[1] = new Mesh(14, width, height);
}


void draw() {
  background(0);
  mesh[0].display(color(255,0,0));
  //mesh[1].display(color(255));
}