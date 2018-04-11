// NoC c3 polar coordinates

float recs = 20;
float r, roff;
float a = 0.0;
float aVel = 0.0;
float aAcc = 0.0001;
PVector loc, acc;

void setup() {
  size(640, 360);
  smooth();
  pixelDensity(2);
  background(255);

  r = 50;
  roff = 1;
  loc = new PVector(0, height/2);
}

void draw() {
  //background(255);
  stroke(255);
  //rect(0,0,width,height);

  r = noise(roff)*100;
  roff += 0.01;


  a += aVel;
  aVel += aAcc;
  //aVel = constrain(aVel, 0, 0.1);

  float lxoff = noise(roff)*5;
  acc = new PVector(lxoff, 0);
  loc.add(acc);
  if (loc.x > width) {
    acc.mult(0);
    loc.x = 0;
  }

  translate(loc.x, loc.y);


  float x = r * cos(a);
  float y = r * sin(a);

  rotate(a);
  rect(x, y, recs, recs);
  recs += .5;
  //recs = constrain(recs, 0, width);

  if (recs >= height) {
    fill(255, 20);
  } else {
    fill(0);
  }
}