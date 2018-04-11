// metaball & isosurface

Metaball[] metaballs;

void setup() {
  size(600, 600);
  smooth();
  noStroke();

  metaballs = new Metaball[20];
  for (int i=0; i<metaballs.length; i++) {
    metaballs[i] = new Metaball(random(width), random(height));
  }
}

void draw() {
  background(noise(frameCount)*50);
  loadPixels();
  for (int x = 0; x < width; x+=1) {
    for (int y = 0; y < height; y+=4) {
      int index  = x + y * width;
      float sum = 0;
      for (Metaball mb : metaballs) {
        sum += 2 * mb.r / dist(mb.loc.x, mb.loc.y, x, y);
      }
      float col = map(sum, 0, 100, 255, 100);
      pixels[index] = color(col%125*2);
    }
  }
  updatePixels();

  for (Metaball mb : metaballs) {
    mb.update();
    //mb.show();
  }
}