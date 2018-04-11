class Bubble {
  float size;
  float x, y;
  float soff = 1;

  Bubble(float x_, float y_, float size_) {
    size = random(400, width);
    x = x_;
    y = y_;
    size = size_;
  }

  void display() {
    noStroke();
    fill(255, 100);
    grow();
    ellipse(x, y, size, size);
  }

  void grow() {
    //soff += .1;
    //size = noise(soff)*size;
    if (size <= width*3) {
      size += noise(soff)*5;
    }
  }
  
}