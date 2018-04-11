class Branch {
  float level, index;
  float x, y;
  float endx, endy;

  float strokeW, alph;
  float len, lenChange;
  float rot, rotChange;

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

    strokeW = (1/level) * 100;
    alph = 255 / level;
    len = (1/level) * random(200);
    rot = random(360);
    lenChange = random(6) - 3;
    rotChange = random(4) - 2;
  }

  void updateMe(float ex, float why) {
    x = ex;
    y = why;
    rot += rotChange; 
    if (rot > 360) { 
      rot = 0;
    } else if (rot < 0) { 
      rot = 360;
    }
    len -= lenChange; 
    if (len < 0) { 
      lenChange *= -1;
    } else if (len > 200) { 
      lenChange *= -1;
    }
    float radian = radians(rot);
    endx = x + (len * cos(radian));
    endy = y + (len * sin(radian));
    for (int i=0; i<children.length; i++) {
      children[i].updateMe(endx, endy);
    }
  }

  void drawMe() {
    strokeWeight(maxLevels-level+1);
    line(x, y, endx, endy);

    for (int i = 0; i < children.length; i++) {
      children[i].drawMe();
    }
  }
}