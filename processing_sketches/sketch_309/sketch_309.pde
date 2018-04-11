float xstep, ystep;
float swidth, sheight;

void setup() {
  size(600, 600);
  background(0);
  smooth();
  xstep = random(10, 30);
  ystep = random(10, 30);
}

void draw() {
  background(0);
  fill(255);
  textSize(16);
  text("309--", 24, 36);

  fill(255, 100);
  noStroke();



  for (float x = 0; x < width; x += xstep) {

    swidth = xstep/2;
    sheight = ystep/2;

    // verticle stripe
    rect(x, 0, swidth, height);

    // horizontal stripe
    float y = x;
    rect(0, y, width, sheight);

    // ellipses in the center
    ellipseMode(CORNER);
    for (float ex = 0; ex < width; ex += xstep) {
      ellipse(ex, y, swidth, sheight);
    }

    // update step
    //xstep += 5;
    ystep += 5;
  }  

  noLoop();
}