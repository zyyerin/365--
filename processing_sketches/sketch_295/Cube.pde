class Cube {
  PVector a1, a2, a3, a4;
  float size;
  PVector off;

  Cube(float size_, PVector off_) {
    size = size_;
    off = off_;
  }

  void display(PVector pos_) {
    a1 = new PVector(0, 0).add(pos_).add(off);
    a2 = new PVector(size, 0).add(pos_).add(off);
    a3 = new PVector(size, size).add(pos_).add(off);
    a4 = new PVector(0, size ).add(pos_).add(off);

    fill(255);
    beginShape();
    vertex(a1.x, a1.y);
    vertex(a2.x, a2.y);
    vertex(a3.x, a3.y);
    vertex(a4.x, a4.y);
    endShape();
  }
}