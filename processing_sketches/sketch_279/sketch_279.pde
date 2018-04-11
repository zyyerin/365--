float xstart, xnoise;
float ystart, ynoise;
float zstart, znoise;
float rotateX = 0;
float rotateY = 0;
float rz;
int spacing = 120;

void setup() {
  size(600, 600, P3D);
  smooth();
  sphereDetail(3);
  noStroke();
  background(0);

  xstart = random(10);
  ystart = random(10);
  zstart = random(10);
}

void draw() {
  background(255);

  xstart += 0.01;
  ystart += 0.01;
  zstart += 0.01;

  xnoise = xstart;
  ynoise = ystart;
  znoise = zstart;

  pushMatrix();
  translate(mouseX, height/2, mouseY);
  rotateY(-rotateY);
  rotateX(-rotateX);
  rotateZ(rz);
  rz += 0.001;
  rotateX = 0.01*mouseX;
  rotateY = 0.01*mouseY;

  for (int y = 0; y <= height/2; y += 50) {
    ynoise += 0.1;
    xnoise = xstart;
    for (int x = 0; x <= width/2; x += 50) {
      xnoise += 0.1;
      znoise = zstart;
      for (int z = 0; z <= 300; z += 50) {
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
  float sw = map(nf, 0, 1, 0, 10);
  stroke(0, 200);
  strokeWeight(sw);
  noFill();
  box(spacing, spacing, spacing);
  popMatrix();
}