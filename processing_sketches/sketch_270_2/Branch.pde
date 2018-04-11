class Branch {
  float level, index;
  float x, y;
  float endx, endy;
  Branch[] children = new Branch[0];

  Branch(float lev, float ind, float ex, float why) {
    level = lev;
    index = ind;
    updateMe(ex, why);

    if (level <= maxLevels) {
      children = new Branch[numChildren];
      for (int x = 0; x < numChildren; x++) {
        children[x] = new Branch(level+1, x, endx, endy);
      }
    }
  }

  void updateMe(float ex, float why) {
    x = ex;
    y = why;
    endx = x + 150;
    endy = y + 15;
  }

  void drawMe() {
    strokeWeight(index*3);
    line(x, y, endx, endy);
    ellipse(x, y, 5, 5);
    
    for (int i = 0; i < children.length; i++) {
     children[i].drawMe(); 
    }
    
  }
}