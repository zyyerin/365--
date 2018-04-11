int radius = 100;
float zaoyin = 0;

void setup() {
  size(600, 600, P3D);
  background(255);
  stroke(0, 100);
  strokeWeight(random(10));
  noFill();
}

void draw() {
  background(255);
  smooth();

  translate(width/2, height/2, 0);
  rotateX(frameCount * 0.002);
  rotateY(frameCount * 0.003);

  float s = 0;
  float t = 0;
  float lastx = 0;
  float lasty = 0;
  float lastz = 0;
  zaoyin += 0.001;
  if (mousePressed) {
    zaoyin = 0;
  }
  while (t < 720) {
    s += 1;
    t += 10 * noise(zaoyin);
    float radianS = radians(s);
    float radianT = radians(t);

    float thisx = 0 + (radius * cos(radianS) * sin(radianT));
    float thisy = 0 + (radius * sin(radianS) * sin(radianT));
    float thisz = 0 + (radius * cos(radianT));

    float chang = map(mouseX, 0, width, 0, 100);
    float kuan = map(mouseY, 0, height, 0, 100);

    if (lastx !=0) {

      //line(thisx, thisy, thisz, lastx, lasty, lastz);
      pushMatrix();
      translate(thisx, thisy, thisz);
      rotateZ(thisx);
      rotateY(thisz);
      box(chang, kuan, 10);
      popMatrix();
    }
    lastx = thisx;
    lasty = thisy;
    lastz = thisz;
  }
}