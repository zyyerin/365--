float cx, cy; //<>//
float posx, posy;
float r;
float angle;
float s;

void setup() {
  size(600, 600);
  //pixelDensity(2);
  background(255);

  cx = 0;
  cy = 0;
  r = 0;
  angle = 0;
  s = 1;
}

void draw() {
  //background(255);
  fill(255, 5);
  noStroke();
  rect(0, 0, width, height);

  fill(0);
  pushMatrix();
  translate(width/2, height/2);

  posy = r * sin(angle);
  posx = r * cos(angle);
  ellipse(posx, posy, s, s);
  angle += 0.1;

  //if (r <= -400 || r >= 400) {
  r = map(noise(angle), 0, 1, -10, 10) + 100;
  println(r);

  if (s <= 10) {
    s += random(-1, 1);
  } else {
    s -= random(7);
  }

  popMatrix();
}