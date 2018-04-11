import peasy.*;
PeasyCam cam;
int step = 64;
// metaball & isosurface

Metaball[] metaballs;

void setup() {
  size(600, 600, P3D);
  smooth();
  pixelDensity(2);
  noStroke();
  fill(0);

  cam = new PeasyCam(this, 500);

  metaballs = new Metaball[5];
  for (int i=0; i<metaballs.length; i++) {
    metaballs[i] = new Metaball(random(width), random(height), random(width));
  }
}

void draw() {
  background(255);

  for (int x = -width/2; x < width; x+=step) {
    for (int y = -height/2; y < height; y+=step) {
      for (int z = -width/2; z < width; z+=step) {

        float sum = 0;
        for (Metaball mb : metaballs) {
          sum += 5 * mb.r / dist(mb.loc.x, mb.loc.y, mb.loc.z, x, y, z);
        }
        float col = map(sum, 0, 100, 0, 20);
        pushMatrix();
        translate(x, y, z);
        sphereDetail(int(col));
        sphere(col);
        popMatrix();
      }
    }
  }

  for (Metaball mb : metaballs) {
    mb.update();
    //mb.show();
  }
}