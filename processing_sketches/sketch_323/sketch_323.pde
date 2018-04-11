Weave wx; //<>// //<>//

void setup() {
  size(600, 600);
  //pixelDensity(2);
  background(255);

  wx = new Weave(1, color(0));
}

void draw() {
  background(255);
  fill(255, 100);
  noStroke();
  //rect(0, 0, width, height);
  wx.diaplay();
}