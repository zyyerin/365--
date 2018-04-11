float chang = 2;
float kuan = 2;
float gao = 100;
float scale = 20;

float a = 0;

void setup() {
  size(600, 600, P3D);
  
  smooth();
  pixelDensity(2);
  //ortho();
  rectMode(CENTER);
  noStroke();
  fill(0);
}

void draw() {
  background(255);

  fill(0);
  pushMatrix();
  translate(width/2, height/2);
  unita(a);
  popMatrix();

  pushMatrix();
  translate(width/2, height/2);
  rotateX(PI/2);
  unita(a);
  popMatrix();

  //fill(255, 0, 0);
  pushMatrix();
  translate(width/2, height/2);
  rotateX(PI/2);
  rotateY(PI/2);
  rotateZ(PI/2);
  unita(a);
  popMatrix();
  
  a+=0.01;
}

void unita(float a) {

  rotateX(a);
  rotateY(a);

  pushMatrix();
  translate(-scale, 0, scale);
  box(chang, gao, kuan);  
  popMatrix();

  pushMatrix();
  translate(+scale, 0, scale);
  box(chang, gao, kuan);  
  popMatrix();

  pushMatrix();
  translate(-scale, 0, -scale);
  box(chang, gao, kuan);  
  popMatrix();

  pushMatrix();
  translate(+scale, 0, -scale);
  box(chang, gao, kuan);  
  popMatrix();
}