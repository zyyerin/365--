class Connection{
  Cube ca, cb;
  
  Connection(Cube ca_, Cube cb_){
    ca = ca_;
    cb = cb_;
    if(ca.a1.y == cb.a1.y){
      connectX();
    } 
    noFill();
    stroke(255);
  }
  
  void connectX(){
    beginShape();
    vertex(ca.a2.x, ca.a2.y);
    vertex(cb.a1.x, cb.a1.y);
    vertex(cb.a4.x, cb.a4.y);
    vertex(ca.a3.x, ca.a3.y);
    endShape();
  }
}