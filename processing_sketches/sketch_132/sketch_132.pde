import java.util.Arrays;
float[][] z, v, a;

void setup() {
  size(600, 600);
  background(255);
  colorMode(RGB, 2);
  z = new float[width][height];
  v = new float[width][height];
  a = new float[width][height];
  loadPixels();
}

void draw() {
  for (int x = 1; x < width-1; x++) {
    for (int y = 1; y < height-1; y++) {
      a[x][y] = (v[x-1][y] + v[x+1][y] + v[x][y-1] + v[x][y+1])/4 - v[x][y];
    }
  }
  
  for (int x = 10; x < width-10; x++) {
    for (int y = 10; y < height-10; y++) {
      v[x][y] += a[x][y];
      z[x][y] += v[x][y];
      pixels[width*y+x] = color(cos(z[x][y])*2);
    }
  }
  updatePixels();
}

void move() {
  if (mouseX > -1    &&    mouseX < width    &&    mouseY > -1    &&    mouseY < height) {
    v[mouseX][mouseY] = randomGaussian() * TAU * 1/10;
  }
}


void mouseClicked() { 
  move();
}


void mouseDragged() { 
  move();
}


void keyPressed() {
  noLoop();
  for (int x = 0; x < width; x++)    Arrays.fill(z[x], 0);
  for (int x = 0; x < width; x++)    Arrays.fill(v[x], 0);
  loop();
}