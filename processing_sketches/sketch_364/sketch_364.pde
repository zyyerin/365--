// 2017-02-28

float radius;
float t = 1;
float sizeO = random(400, width);
float bFill, alpha;
float dist1 = 942;
Bubble bubbles, bubbles2;
float bubbleS = random(40,80);


void setup() {
  size(666, 666);
  smooth();
  background(0);

  bubbles = new Bubble(width/2, 0, bubbleS);
  bubbles2 = new Bubble(width/2, height, bubbleS);
  bFill = 0;
  alpha = 100;
}

void draw() {
  // random
  float val = randomGaussian();
  float sd = 5;                  // Define a standard deviation
  float mean = width/2;           // Define a mean value (middle of the screen along the x-axis)
  float x = ( val * sd ) + 100;  


  //fade
  fill(0, 5);
  filter(BLUR, 1);
  rect(0, 0, width, height);      

  // size
  t += .01;
  radius = noise(t) * sizeO;

  bubbles.display();
  bubbles.grow();

  bubbles2.display();
  bubbles2.grow();


  //draw
  noStroke();
  fill(bFill, 200);
  ellipse(width/2, height/2, radius, radius);

  if (bubbles.size <= dist1 + radius && bubbles.size >= dist1 - radius) {
    bFill = 0;
  } else if (bubbles.size >= dist1 + radius) {
    bFill = 0;
  } else {
    bFill = x;
  }
}