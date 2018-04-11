class Circle {
  float x, y;
  float r;
  boolean growing;

  Circle(float x_, float y_) {
    x = x_;
    y = y_;
    r = 1;
    growing = true;
  }

  void grow() {
    if (growing) {
      r += 1;
    }
  }

  boolean edges() {
    return (x+r >= width || x-r <= 0 || y+r >= height || y-r <= 0);
  }

  void show() {
    stroke(255);
    strokeWeight(2);
    noFill();
    ellipse(x, y, r*2, r*2);
  }
}