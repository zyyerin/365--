// 2017-03-02

float radius, bFill, alpha;
float t = 1;
float sizeO = random(400, width);
float dist1 = 942;

float bgS = 0;


Bubble[] bubbles;


void setup() {
  size(666, 666);
  smooth();
  background(255);

  bubbles = new Bubble[3];
  for (int i = 0; i < bubbles.length; i ++) {
    bubbles[i] = new Bubble();
  }
}

void draw() {
  //fade
  alpha = noise(t)*100;
  bFill = noise(t)*255;

  noFill();
  stroke(255, 125);
  filter(BLUR, .8);
  //bgS += .05;

  for (int i = 0; i < bubbles.length; i ++) {

    bubbles[i].display();
  }

  stroke(255);
  noFill();
  ellipse(width/2, height/2, bgS, bubbles[0].size);
  ellipse(width/2, height/2, bubbles[1].size, bgS);
  ellipse(width/2, height/2, bubbles[0].size, bubbles[1].size);
}