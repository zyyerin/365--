Weave wx, wx2; //<>//

void setup() {
  size(600, 600, P3D);
  //pixelDensity(2);
  background(255);

  wx = new Weave(color(0, 100));
  wx2 = new Weave(color(255, 100));
}

void draw() {
  wx.diaplay();
  pushMatrix();
  translate(width, 0, 0);
  rotateZ(PI/2);
  wx2.diaplay();
  popMatrix();
}