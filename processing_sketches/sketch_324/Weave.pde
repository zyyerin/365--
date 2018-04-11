class Weave {
  float angle, astep;
  float posy, posz;
  float step;
  float sw;
  color sc;

  Weave(color sc_) {
    step = random(10,30);
    sc = sc_;
    angle = 270;
    astep = random(0.05, 0.1);
    sw = 8;
  }

  void diaplay() {
     noStroke();
     fill(sc, 100);
    //strokeWeight(sw);


    for (int posx = 0; posx <= width; posx += step) {

      posy = map(sin(radians(angle)), -1, 1, 0, height);
      posz = map(cos(radians(angle)), -1, 1, -200, 200);
      pushMatrix();
      translate(posx, posy, posz);
      sphere(sw);
      popMatrix();

      angle += astep;
      if (sw > 0.01) {
        sw += random(-0.0045, 0.004);
      }
    }
  }
}