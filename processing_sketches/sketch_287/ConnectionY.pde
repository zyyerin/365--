class ConnectionY {
  Cube ca, cb;
  color connectionC;


  ConnectionY(Cube ca_, Cube cb_, color connectionC_) {
    ca = ca_;
    cb = cb_;

    connectY();

    connectionC = connectionC_;
    noFill();
    stroke(connectionC);
  }  
  void connectY() {

    beginShape(QUADS);
    vertex(ca.a4.x, ca.a4.y);
    vertex(ca.a3.x, ca.a3.y);
    vertex(cb.a2.x, cb.a2.y);
    vertex(cb.a1.x, cb.a1.y);
    endShape();
  }
}