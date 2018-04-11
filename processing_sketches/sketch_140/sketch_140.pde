float y;

void setup() {
  size(600, 600);
  pixelDensity(2);
  fill(0);
  noStroke();
  
  y = height/2;
}

void draw() {
  background(255);
} 

void mouseWheel(MouseEvent event) {
  float e = event.getCount();
  y += e;
  float r = abs(e);
  println(e);
  ellipse(width/2, y, r, r);
}