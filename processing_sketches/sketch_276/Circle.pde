class Circle {
  float x, y;
  float radius;
  color linecol, fillcol;
  float alph;
  float xmove, ymove;

  Circle() {
    x = random(width);
    y = random(height);
    radius = random(100)+10;
    linecol = color(random(255), random(255), random(255));
    fillcol = color(random(255));
    alph = random(100);
    xmove = random(-4, 4);
    ymove = random(-2, 2);
  }

  void drawMe() {
    stroke(fillcol);
    strokeWeight(alph);
    noFill();
    ellipse(x, y, radius*2*noise(y/100), radius*2*noise(x/100));
    //stroke(linecol, 150);
    //noFill();
    //ellipse(x, y, 10, 10);
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
    drawMe();
  }
}