float xstart, xnoise;
float ystart, ynoise;

void setup() {
  size(600, 600);
  smooth();
  background(0);
  xstart = random(10);
  xnoise = xstart;
  ystart = random(10);
  ynoise = ystart;
}

void draw() {
  background(0);

  ystart += random(-0.1, 0.1);
  ynoise = ystart;
  for (int y = 0; y <= height; y += 5) {
    ynoise += random(0.1, 0.2);
    xstart += random(-0.1, 0.1);
    xnoise = xstart;
    for (int x = 0; x <= width; x += 5) {
      xnoise += random(0.1, 0.2);
      drawPoint(x, y, noise(xnoise, ynoise));
    }
  }
  //noLoop();
}

void drawPoint(float x, float y, float noiseFactor) {
  pushMatrix();
  translate(x, y);
  rotate(noiseFactor*radians(540));
  float edgeSize = noiseFactor * x/10;
  float grey = noiseFactor * 255;
  noStroke();
  fill(grey);
  ellipse(0, 0, edgeSize, edgeSize);
  popMatrix();
}