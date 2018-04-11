float xstart, xnoise;
float ystart, ynoise;

void setup() {
  size(600, 600, P3D);
  smooth();
  sphereDetail(3);
  noStroke();
  background(0);
  
  xstart = random(10);
  ystart = random(10);
}

void draw() {
  background(0);
  
  xstart += 0.01;
  ystart += 0.01;
  
  xnoise = xstart;
  ynoise = ystart;

  for (int y = 0; y <= height; y += 5) {
    ynoise += 0.1;
    xnoise = xstart;
    for (int x = 0; x <= width; x += 5) {
      xnoise += random(0.1, 0.2);
      drawPoint(x, y, noise(xnoise, ynoise));
    }
  }
}

void drawPoint(float x, float y, float nf) {
  pushMatrix();
  translate(x, height - 150 - y, -y);
  float sphereS = nf * 50;
  float grey = nf * 255;
  stroke(255, grey);
  noFill();
  sphere(sphereS);
  popMatrix();
}