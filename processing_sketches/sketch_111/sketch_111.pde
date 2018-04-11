import peasy.*;
PeasyCam cam;

int total = 140;
int radius = 140;
PVector[][] loc;

float t1, t2, t3;

void setup() {
  size(600, 600, P3D);
  smooth();
  pixelDensity(2);
  cam = new PeasyCam(this, 400);

  //stroke(0);
  //strokeWeight(1);
  //noFill();
  noStroke();
  fill(255);

  loc = new PVector[total+1][total+1];
  
  t1 = random(10);
  t2 = random(10);
  t3 = random(10);
}

void draw() {
  background(255);
  lights();

  t1 += 0.0005;
  t2 += 0.0004;
  t3 += 0.0003;


  for (int i = 0; i <= total; i++) {
    float latitude = map(i, 0, total, 0, HALF_PI);
    for (int j = 0; j <= total; j++) {
      float longitude = map(j, 0, total, 0, TWO_PI);

      float x = sin(latitude)*cos(longitude)*radius;
      float y = sin(latitude)*sin(longitude)*radius;
      float z = cos(latitude)*radius;

      loc[i][j] = new PVector(x, y, z);

      PVector off = new PVector(noise(t1*x, t1*y, t1*z), noise(t2*y, t2*x, t2*z), noise(t3*x, t3*y, t3*z));
      off.setMag(50);
      loc[i][j].add(off);
    }
  }

  for (int i = 0; i < total; i++) {
    float col = map(i, 0, total, 1, 0);
    noFill();
    stroke(0);
    strokeWeight(col);

    beginShape(TRIANGLE_STRIP);
    for (int j = 0; j <= total; j++) {

      PVector v1 = loc[i][j];
      PVector v2 = loc[i+1][j];

      vertex(v1.x, v1.y, v1.z);
      vertex(v2.x, v2.y, v2.z);
    }
    endShape(CLOSE);
  }

  //saveFrame("####.png");
}