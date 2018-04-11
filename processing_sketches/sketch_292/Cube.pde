class Cube {
  PVector a1, a2, a3, a4;
  float size;
  PVector off;
  float offx, offy;

  Cube(float size_, PVector off_) {
    size = size_;
    off = off_;
    offx = off_.x;
    offy = off_.y;
  }

  void display(PVector pos_) {
    a1 = new PVector(offx, 0).add(pos_);
    a2 = new PVector(size, offy).add(pos_).add(off);
    a3 = new PVector(size, size).add(pos_).add(off);
    a4 = new PVector(offx, size ).add(pos_).add(off);

    fill(255);
    beginShape();
    vertex(a1.x, a1.y);
    vertex(a2.x, a2.y);
    vertex(a3.x, a3.y);
    vertex(a4.x, a4.y);
    endShape();
  }
}