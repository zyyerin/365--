float t, tstep;
int num = 40;

void setup() {
  size(600, 600);
  background(255);
  pixelDensity(2);
  rectMode(CENTER);
  noStroke();

  t = 0.01;
  tstep = 0.01;
}

void draw() {
  background(255);
  translate(width/2, height/2);

  for (int i=num; i>0; i--) {
    if (i%2==0) {
      fill(0);
      shearX(t);
      //shearY(-t);
    } else {
      fill(255);
      //shearX(-t);
      shearY(t);
    }
    rect(0, 0, i*10, i*10);
  }

  updateT();
}

void updateT() {
  if (t>TWO_PI) {
    t -= TWO_PI;
  }

  t += tstep;
}