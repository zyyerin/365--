class ConnectionY {
  Cube ca, cb;

  ConnectionY(Cube ca_, Cube cb_) {
    ca = ca_;
    cb = cb_;

    connectY();

    noFill();
    stroke(255);
  }  
  void connectY() {

    beginShape();
    vertex(ca.a4.x, ca.a4.y);
    vertex(ca.a3.x, ca.a3.y);
    vertex(cb.a2.x, cb.a2.y);
    vertex(cb.a1.x, cb.a1.y);
    endShape();
  }
}