class Noiso {

  float s;

  // amplitude related
  float ampIn;
  float scale;
  float smooth_factor;
  float sum;

  Noiso() {
    scale = 5;
    smooth_factor = 0.25;
  }

  void display(float ampIn, float posx, float posy) {
    sum += (ampIn - sum) * smooth_factor;
    s = sum * (width/2) * scale;
    ellipse(posx, posy, s, s);
  }
}