class Bubble {
  Bubble() {
  }

  void display(float x, float y, float alpha, float strokeCol, String title, float sw) {
    noFill();
    stroke(strokeCol);

    stroke(alpha);
    strokeWeight(sw);
    line(x, 0, x, height);
    
    
    fill(alpha);
    text(title, x, y);
  }
}