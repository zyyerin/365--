// 2017-02-27

float radius;
float t = 1;
float sizeO = random(400, width);
float bFill, alpha;
Bubble bubbles;

void setup() {
  size(666, 666);
  smooth();
  background(255);

  bubbles = new Bubble(0, height/2, 50);
  bFill = 0;
  alpha = 100;
}

void draw() {
  //fade
  fill(255, 10);
  filter(BLUR, 1);
  rect(0, 0, width, height);      

  // size
  t += .01;
  radius = noise(t) * sizeO;

  bubbles.display();
  bubbles.grow();

  //draw
  noStroke();
  fill(bFill, 200);
  ellipse(width/2, height/2, radius, radius);

  if (bubbles.size <= width + radius && bubbles.size >= width - radius) {
    bFill = random(255);
    filter(BLUR, 0);
  } else {
    bFill = 0; 
    filter(BLUR, 1);
  }
}