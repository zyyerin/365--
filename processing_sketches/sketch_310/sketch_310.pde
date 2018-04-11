void setup() {
  size(600, 600);
  background(0);
  smooth();
}

void draw() {
  background(0);
  fill(255);
  textSize(16);
  text("310--", 24, 36);

  fill(255, 100);
  noStroke();
  rectMode(CENTER);
  ellipseMode(CENTER);

  int xstep = 40;
  int ystep = 20;

  for (int x = xstep/2; x < width; x += xstep) {

    float swidth = xstep/2;
    float sheight = ystep/2;
    
    // horizontal stripe
    rect(x, height/2, swidth, height);

    // verticle stripe
    int y = x;
    rect(width/2, y, width, sheight);

    // ellipses in the center
    for (int ey = ystep/2; ey < height; ey += ystep) {
      ellipse(x, ey, swidth, sheight);
    }
    
    // update step
    xstep ++;
    ystep += 5;
  }  

  noLoop();
}