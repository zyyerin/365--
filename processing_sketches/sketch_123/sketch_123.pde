PImage kitten;
float base;

void setup() {
  size(600, 600);
  background(255);
  kitten = loadImage("Artboard2.png");
  kitten.filter(GRAY);
  //image(kitten, 0, 0);
}

int index(int x, int y) {
  return x+y*kitten.width;
}

void draw() {

  base = 30;

  kitten.loadPixels();

  for (int y=0; y<height-1; y++) {

    for (int x=1; x<kitten.width-1; x++) {
      int factor = round(random(10, 20));

      color pix = kitten.pixels[index(x, y)];
      float r_old = red(pix);
      float newR = round(factor*r_old/255) * 255/factor;
      kitten.pixels[index(x, y)] = color(newR);

      float errR = r_old-newR;

      //1
      color c = kitten.pixels[index(x+1, y)];
      float r = red(c);
      r += errR * 7/base;
      kitten.pixels[index(x+1, y)] = color(r);

      //2
      c = kitten.pixels[index(x-1, y+1)];
      r = red(c);
      r += errR * 5/base;
      kitten.pixels[index(x-1, y+1)] = color(r);

      //3
      c = kitten.pixels[index(x, y+1)];
      r = red(c);
      r += errR * 3/base;
      kitten.pixels[index(x, y+1)] = color(r);

      //4
      c = kitten.pixels[index(x+1, y+1)];
      r = red(c);
      r += errR * 1/base;
      kitten.pixels[index(x+1, y+1)] = color(r);
    }
  }
  kitten.updatePixels();
  image(kitten, 0, 0);
}