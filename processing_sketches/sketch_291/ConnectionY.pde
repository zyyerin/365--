class ConnectionY{
  Cube ca, cb;
  
  ConnectionY(Cube ca_, Cube cb_){
    ca = ca_;
    cb = cb_;

      connectY();

  }  
    void connectY(){
    float cFill = map(ca.a4.y, 0, width, 100, 200);
    fill(cFill);
    beginShape();
    vertex(ca.a4.x, ca.a4.y);
    vertex(ca.a3.x, ca.a3.y);
    vertex(cb.a2.x, cb.a2.y);
    vertex(cb.a1.x, cb.a1.y);
    endShape();
  }
}