float coff; //<>//
int gridx = 1;
int gridy = 1;
void setup() {
  size(600, 600, P2D);

  coff = 0.1;
}


void draw() {
  coff += 0.05;
  background(0);

  loadPixels();
  for (int x = 0; x < width; x++) {
    for (int y = 0; y < height; y++) {
      int loc = x + y * width;
      if (x % gridx == 0 || y % gridy == 0) {
        pixels[loc] = color(random(noise(coff)*255));
      } else {
        pixels[loc] = color(255-random(noise(coff)*255));
      }
    }
  }
  updatePixels();

  gridx++;
  gridy++;
}