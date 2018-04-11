int time = 600;
float x, y, w, col;
int tchange = 1;
float a = 0;

void setup() {
  size(600, 600, P3D);
  noFill();
  noStroke();
}

void draw() {
  background(255);
  //lights();

  for (int i = 360; i > 0; i-=3) {
    x = cos(radians(i)) * 50 + width / 2;
    y = sin(radians(i)) *100 + height / 2;
    w = sin(radians(time+i)) * 200;
    col = map(time, -660, 660, 255, 0);
    fill(0, 20);
    //fill(0, 50);
    //stroke(255-col);
    pushMatrix();
    translate(x, y, -time);
    rotateX(a);
    rotateY(-a);
    sphereDetail(2);

    sphere(w);
    popMatrix();
  }

  a+=0.001;
  time -= tchange;

    if (time <= -600 || time >=600) {
      tchange *= -1;
    }
}