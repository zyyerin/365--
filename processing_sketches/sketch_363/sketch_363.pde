// 2017-03-01

float radius, bFill, alpha;
float t = 1;
float sizeO = random(400, width);
float dist1 = 942;

Bubble[] bubbles;


void setup() {
  size(666, 666);
  smooth();
  background(0);

  bubbles = new Bubble[50];
  for (int i = 0; i < bubbles.length; i ++) {
    bubbles[i] = new Bubble();
  }

  bFill = 0;
  alpha = 100;
}

void draw() {
  //fade
  fill(0, 10);
  noStroke();
  filter(BLUR,1);
  rect(0, height/2, width, height);     

  for (int i = 0; i < bubbles.length; i ++) {
    bubbles[i].display();
    bubbles[i].boundry();
  }
}