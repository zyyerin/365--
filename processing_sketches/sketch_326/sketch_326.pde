float lx; //<>//
float gridx, gridy;
float a;
float h, w;
int count;
color c;
int sw;

int alpha = 0;


void setup() {
  size(600, 600, P2D);
  pixelDensity(2);
  background(255);

  a = 0;

  count = 0;
  c = color(0, 10);

  sw = 20;
  lx = 0;
}


void draw() {
  //background(255);

  a += 0.03;
  h = map(sin(a), -1, 1, 270, width-270);
  w = map(cos(a), -1, 1, 250, width-250);
  noFill();
  stroke(c);
  strokeWeight(sw);

  lx += 1;
  line(w, height/2, h, height-40);


  //if (h >= height-1) {
  //  count ++;
  //}
  //println(a);
  //println(count);

  //if (count >= 10) {
  //  alpha ++;

  //  c = color(255, alpha);
  //  sw = 5;
  //}
}