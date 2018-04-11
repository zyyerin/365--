class Box {
  PVector pos;
  float r;

  Box(float x, float y, float z, float r_) {
    pos = new PVector(x, y, z);
    r = r_;
  }

  ArrayList<Box> generate() {
    ArrayList<Box> boxes = new ArrayList<Box>();
    for (int x = -1; x < 1; x++) {
      for (int y = -1; y < 1; y++) {
        for (int z = -1; z < 1; z++) {

          if (x+y==0 || y+z==0 || x+z==0) {
            float newR = r/2;
            Box b = new Box(pos.x + x*newR, pos.y + y*newR, pos.z + z*newR, newR);
            boxes.add(b);
          }
        }
      }
    }
    return boxes;
  }

  void show() {
    pushMatrix();
    translate(pos.x, pos.y, pos.z);
    box(r);
    popMatrix();
  }
}