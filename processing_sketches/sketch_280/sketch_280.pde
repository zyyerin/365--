// 3 parameters
float xstart, xnoise;
float ystart, ynoise;
float zstart, znoise;
float rotateA = 0;

void setup() {
  size(300, 300, P3D);
  //smooth();
  sphereDetail(3);
  noStroke();
  background(0);

  xstart = random(10);
  ystart = random(10);
  zstart = random(10);
}

void draw() {
  background(0);

  xstart += 0.01;
  ystart += 0.01;
  zstart += 0.01;

  xnoise = xstart;
  ynoise = ystart;
  znoise = zstart;

  pushMatrix();
  rotateY(rotateA);
  rotateZ(rotateA);
  rotateA += 0.01;

  for (int y = 0; y <= height; y += 10) {
    ynoise += 0.1;
    xnoise = xstart;
    for (int x = 0; x <= width; x += 10) {
      xnoise += 0.1;
      znoise = zstart;
      for (int z = 0; z <= width; z += 10) {
        znoise += 0.1;
        drawPoint(x, y, z, noise(xnoise, ynoise, znoise));
      }
    }
  }
  popMatrix();
}

void drawPoint(float x, float y, float z, float nf) {
  pushMatrix();
  translate(x, y, z);
  float sphereS = nf*3;
  fill(255, 200);
  sphere(sphereS);
  popMatrix();
}