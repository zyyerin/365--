float coff; //<>//
int gridx;
int gridy;
void setup() {
  size(600, 600, P2D);
  background(0);

  coff = 0.1;

  gridx = width;
  gridy = height;
}


void draw() {
  coff += 0.05;

  loadPixels();
  for (int x = 0; x < width; x++) {
    for (int y = 0; y < height; y++) {
      int loc = x + y * width;
      if (gridy*gridx != 0) {
        if (x % gridx == 0 || y % gridy == 0) {
          pixels[loc] = color(255);
        } else {
          pixels[loc] = color(noise(coff)*255);
        }
      }
    }
  }
  updatePixels();

  gridx -= 2;
  gridy -= 5;
}