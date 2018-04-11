class Eye {
  float ex, ey, er;
  Eye(float ex_, float ey_, float er_) {
    ex = ex_;
    ey = ey_;
    er = er_;
  }

  void display(float col) {
    //fill(col);
    fill(0);
    //noFill();
    stroke(255);
    ellipse(ex, ey, er, er);
  }
}