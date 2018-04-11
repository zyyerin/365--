class Eye {
  float ex, ey, er;
  float scale;
  
  Eye(float ex_, float ey_, float er_, float scale_) {
    ex = ex_;
    ey = ey_;
    er = er_;
    scale = scale_;
  }

  void display(float col) {
    fill(col);
    ellipse(ex, ey, er, er);
  }
  float nextx(float angle) {
    return sin(angle)*(scale/2)+ex;
  }
  float nexty(float angle) {
    return cos(angle)*(scale/2)+ey;
  }
  float nextr() {
    return er-scale/2;
  }
}