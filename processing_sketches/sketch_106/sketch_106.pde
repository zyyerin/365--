// metaball & isosurface

Metaball[] metaballs;

void setup() {
  size(600, 600);
  smooth();
  noStroke();
  noCursor();

  metaballs = new Metaball[10];
  for (int i=0; i<metaballs.length; i++) {
    metaballs[i] = new Metaball(random(width), random(height));
  }
}

void draw() {
  background(0);
  for (int x = 0; x <= width; x+=8) {
    for (int y = 0; y <= height; y+=8) {
      float sum = 0;
      for (Metaball mb : metaballs) {
        sum += 2 * mb.r / dist(mb.loc.x, mb.loc.y, x, y);
      }
      float col = map(sum, 0, 100, 0, 255);
      fill(col);
      float r = 8;

      if (dist(mouseX, mouseY, x, y)<10) {
        fill(255-col);
        r *= 0.5;
      }
      ellipse(x, y, r, r);
    }
  }

  for (Metaball mb : metaballs) {
    mb.run();
  }
}