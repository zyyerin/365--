Weave wx, wx2, wx3; //<>//

void setup() {
  size(600, 600);
  pixelDensity(2);
  background(255);

  wx = new Weave(20, color(0, 200));
  wx2 = new Weave(color(255, 200));
}

void draw() {
  wx.diaplay();
  wx2.diaplay();
}