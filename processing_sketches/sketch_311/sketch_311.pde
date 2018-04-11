void setup() {
  size(600, 600);
  background(0);
  smooth();
}

void draw() {
  background(0);
  fill(255);
  textSize(16);
  text("311--", 24, 36);

  fill(255, 150);
  noStroke();
  rectMode(CENTER);
  ellipseMode(CENTER);

  int xstep = int(random(30, 50));
  int ystep = int(random(30, 50));

  for (int x = 0; x < width; x += xstep) {
    // verticle stripe
    int y = x;
    rect(width/2, y, width, ystep/2);
    
    // horizontal stripe
    float swidth = xstep/2;
    rect(x, height/2, swidth, height);
    ellipse(x, y, swidth, swidth);
  }  



  noLoop();
}