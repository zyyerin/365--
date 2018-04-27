PImage[] imgs;
float offset = 0;
float easing = 0.05;
float imgw, imgh;

float a = 0;

void setup() {
  size(800, 800);
  background(255);
  pixelDensity(2);

  imgs = new PImage[14];

  for (int i=0; i<13; i++) {
    imgs[i] = loadImage((i+1) + ".png");
  }
  imgw = 1860;
  imgh = imgw*0.0625*9;
  //  }

  //void draw() { 
  tint(255, 100);  // Display at half opacity
  for (int i=0; i<13; i++) {

    image(imgs[i], -10, -160, imgw, imgh);
  }

  //a += 0.1;
}
