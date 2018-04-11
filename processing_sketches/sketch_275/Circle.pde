class Circle {
  float x, y;
  float radius;
  float baseFill;
  float xmove, ymove;
  float sw;
  int fstep;


  Circle() {
    x = random(width);
    y = random(height);
    radius = random(200);
    baseFill = 0;
    xmove = random(10)-5;
    ymove = random(10)-5;
    fstep = 10;
  }

  void drawMe() {
    fill(baseFill);
    noStroke();
    ellipse(x, y, radius*2, radius*2);
  }

  void updateMe() {
    x += xmove;
    y += ymove;

    if (x > (width+radius)) {
      x = 0 - radius;
    }

    if (x < (0-radius)) {
      x = width+radius;
    }
    if (y > (height+radius)) {
      y = 0 - radius;
    }
    if (y < (0 - radius)) {
      y = height+radius;
    }

    // collision handling

    boolean touching = false;
    for (int i=0; i<circleArr.length; i++) {
      Circle otherCirc = circleArr[i];
      if (otherCirc != this) {
        float dis = dist(x, y, otherCirc.x, otherCirc.y);
        float overlap = dis - radius - otherCirc.radius;
        if (overlap < 0) {
          float midx, midy;
          midx = (x + otherCirc.x)/2;
          midy = (y + otherCirc.y)/2;
          fill(255);
          overlap *= -1;
          rectMode(CENTER);
          pushMatrix();
          rotate(radians(midx/10));
          rect(midx, midy, overlap*0.5, overlap*3);
          popMatrix();
        }
      }
    }
    drawMe();
  }
}