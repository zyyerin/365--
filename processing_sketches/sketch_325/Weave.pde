class Weave {
  float angle, astep;
  float posy;
  float step;
  float sw;
  color sc;

  Weave(float step_, color sc_) {
    step = step_;
    sc = sc_;
    angle = 270;
    astep = random(0.02, 0.07);
    sw = 16;
  }
  
    Weave(color sc_) {
    step = random(15, 30);
    sc = sc_;
    angle = 270;
    astep = random(0.02, 0.07);
    sw = 16;
  }

  void diaplay() {
    strokeWeight(sw);
    stroke(sc);


    for (int posx = 0; posx <= width; posx += step) {

      posy = map(sin(radians(angle)), -1, 1, 0, height);
      point(posx, posy);

      angle += astep;
      if (sw > 0.01) {
        sw += random(-0.008, 0.005);
      }
    }
  }
}