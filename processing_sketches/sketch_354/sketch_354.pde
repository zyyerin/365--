// NoC c3
float a = 0.0;
float aVel = 0.0;
float aAcc = 0.001;

void setup() {
  size(640, 360);
  smooth();
  pixelDensity(2);
  background(255);
}

void draw() {

  //aAcc = map(mouseX, 0, width, -0.001, 0.001);

  a += aVel;
  aVel += aAcc;

  rectMode(CENTER);
  translate(width/2, height/2);
  rotate(a);
  rect(0, 0, height*2.5, height/16);
  println(a);
  if (a >= 100) {
noStroke();
fill(255, 100);
  } else {
    stroke(0, 100);
    noFill();
  }
}