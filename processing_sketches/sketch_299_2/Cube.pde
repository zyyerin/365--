class Cube {
  PVector a1, a2, a3, a4;
  float size;

  Cube(float size_) {
        size = size_;

  }

  void display(PVector pos_) {
    a1 = new PVector(0, 0).add(pos_);
    a2 = new PVector(size + random(-5.5), 0).add(pos_);
    a3 = new PVector(size + random(-5.5), size + random(-5.5)).add(pos_);
    a4 = new PVector(0, size + random(-5.5)).add(pos_);
    
    fill(0, 150);
    beginShape();
    vertex(a1.x, a1.y);
    vertex(a2.x, a2.y);
    vertex(a3.x, a3.y);
    vertex(a4.x, a4.y);
    endShape();
  }
}