class Star {
  float x;
  float y;
  float z;
  float pz;

  Star() {
    x = random(-width/2, width/2);
    y = random(-height/2, height/2);
    z = random(width);
    pz = z;
  }

  void update() {
    if (z < width) {
      z += 10;
    } else {
      x = random(-width, width);
      y = random(-height, height);
      z = random(width);
    }
  }

  void show() {
    float alpha = map(z, 0, width, 255, 0);
    float sw = map(z, 0, width*2, 1, 0);

    //fill(0, alpha);
    //noStroke();
    
    stroke(0,00);
    strokeWeight(sw);
    noFill();

    float sx = map(x/z, 0, 1, 0, width);
    float sy = map(y/z, 0, 1, 0, height);
    float s = map(z, 0, width, 0, 200);
    //ellipse(sx, sy, s, s);

    float px = map(x/z, 0, 1, 0, width);
    float py = map(y/z, 0, 1, 0, height);

    stroke(0);
    line(px, py, sx, y);
  }
}