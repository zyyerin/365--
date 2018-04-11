float coff; //<>//
float gridx, gridy;
float a;
float h;
int count;
color c;
int sw;

    int alpha = 0;


void setup() {
  size(600, 600, P2D);
  pixelDensity(2);
  background(255);

  coff = 0.1;
  a = 0;

  count = 0;
  c = color(0, 10);
  
  sw = 66;
}


void draw() {
  //background(255);

  coff += 0.1;
  a += 0.03;
  h = map(sin(a), -1, 1, 0, height);
  noFill();
  stroke(c);
  strokeWeight(sw);
  line(0, height/2, width, h);
  //line(0, height/2, width, height/2);

  if (h >= height-1) {
    count ++;
  }
  println(a);
  println(count);
  
  if (count >= 10) {
      alpha ++;
    
     c = color(255, alpha);
     sw = 5;
  }
}