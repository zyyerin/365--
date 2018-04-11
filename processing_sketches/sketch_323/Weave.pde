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
    astep = 0.05;
    sw = 8;
  }

  void diaplay() {
    strokeWeight(sw);
    stroke(sc);


    for (int posx = 0; posx <= width; posx += step) {
      
      float rad = radians(angle);
      posy = map(pow(sin(rad), 3)*noise(rad), -1, 1, 0, height);
      
      rotate(angle/1000);
      translate(width/2, height/2);
      point(posx, posy);

      sw = map(pow(sin(rad), 3), -1, 1, 30, 0);

      angle += astep;
      //if (sw > 0.01) {
      //  sw += random(-0.008, 0.005);
      //}
    }
  }
}