float chang = 0.01;
float kuan = 2;
float gao = 200;
float scale = 50;

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
  
  pushMatrix();
  translate(width/2, height/2);
  rotateX(a);
  rotateY(-a);
  for (int i=0; i<100; i++) {
    unitb(a*noise(i));  
  }
  popMatrix();
  

  a+=0.001;
}

void unita(float rx, float ry, float rz, float x, float y) {
  pushMatrix();
  translate(x, y);

  rotateX(rx);
  rotateY(ry);
  rotateZ(rz);

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

  popMatrix();
}

void unitb(float r) {
  rotate(r);

  //unita(0, 0, 0, width/2, height/2);
  //unita(0, 0, HALF_PI, width/2, height/2);
  //unita(HALF_PI, HALF_PI, 0, width/2, height/2);
  
  
  unita(0, 0, 0, 0, 0);
  unita(0, 0, HALF_PI, 0, 0);
  unita(HALF_PI, HALF_PI, 0, 0, 0);
}