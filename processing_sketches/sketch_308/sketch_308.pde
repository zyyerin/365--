float xstep, ystep;
float swidth, sheight;

void setup() {
  size(600, 600);
  background(0);
  smooth();
  xstep = 30;
  ystep = 30;
}

void draw() {
  background(0);
  fill(255);
  textSize(16);
  text("308--", 24, 36);

  fill(255, 100);
  noStroke();

  float offest = 0.7;

  for (float x = xstep/2; x < width; x += xstep) {

    if (x > width/2) {
      swidth = xstep/2;
    } else {
      swidth = xstep/4;
    }

    // verticle stripe
    pushMatrix();
    rotate(radians(random(-offest, offest)));
    rect(x, 0, swidth, height);
    popMatrix();

    // horizontal stripe
    float y = x;

    if (y < height/2) {
      sheight = ystep/2;
    } else {
      sheight = ystep/4;
    }
    pushMatrix();
    rotate(radians(random(-offest, offest)));
    rect(0, y, width, sheight);
    popMatrix();

    // ellipses in the center
    ellipseMode(CORNER);
    for (float ex = xstep/2; ex < width; ex += xstep) {

      if (ex > width/2) {
        swidth = xstep/2;
      } else {
        swidth = xstep/4;
      }
      pushMatrix();
      rotate(radians(random(-offest, offest)));
      ellipse(ex, y, swidth, sheight);
      popMatrix();
    }
  }  

  noLoop();
}