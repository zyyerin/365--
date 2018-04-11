// start fresh

float xstart = random(10);
float xnoise = xstart;
float ynoise = random(10);

void setup() {
  size(600, 600);
  smooth();
}


void draw() {
  background(0);

  for (int y=0; y<=height; y += 10) {
    ynoise += 0.1;
    xnoise = xstart;
    for (int x=0; x<=width; x += 10) {
      xnoise += 0.1;
      drawPoint(x, y, noise(xnoise, ynoise));
    }
  }
  //noLoop();
}


void drawPoint(int x, int y, float noiseFactor) {
  pushMatrix();
  translate(x, y);
  rotate(noiseFactor * radians(mouseX));
  noFill();
  float alph = noiseFactor*255;
  stroke(255, alph);
  strokeWeight(5*noiseFactor);
  float len = map(mouseY, 0, height, 0, 50);
  ellipse(0, 0, len, len);  
  popMatrix();
}