import peasy.*;
PeasyCam cam;

int total = 100;
int radius = 100;
PVector[][] loc;

float t1, t2, t3;

float theta = 0;

void setup() {
  size(600, 600, P3D);
  smooth();
  pixelDensity(2);
  cam = new PeasyCam(this, 400);

  noFill();
  stroke(0);

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
  theta+=0.01;

  for (int i = 0; i <= total; i+=3) {
    float latitude = map(i, 0, total, 0, PI);
    for (int j = 0; j <= total; j++) {
      float longitude = map(j, 0, total, 0, TWO_PI);

      float x = sin(latitude)*cos(longitude)*radius;
      float y = sin(latitude)*sin(longitude)*radius;
      float z = cos(latitude)*radius;

      loc[i][j] = new PVector(x, y, z);

      PVector off = new PVector(noise(t1*x, t1*y, t1*z), noise(t2*y, t2*x, t2*z), noise(t3*x, t3*y, t3*z));
      //off.setMag(10);
      loc[i][j].add(off);
    }
  }

  pushMatrix();
  rotateX(-theta/5);
  rotateY(-theta/5);
  rotateZ(-theta/5);
  strokeWeight(1);
  for (int i = 0; i < total; i+=3) {
    float col = map(i, 0, total, 1, 0);
    for (int j = 0; j <= total; j++) {
      PVector v1 = loc[i][j];
      point(v1.x, v1.y, v1.z);
    }
  }
  popMatrix();

  pushMatrix();
  rotateX(theta);
  for (int i = 0; i < total-3; i+=3) {
    float col = map(i, 0, total, 1, 0);
    strokeWeight(1);
    beginShape(TRIANGLE_STRIP);
    for (int j = 0; j <= total; j+=20) {
      PVector v1 = loc[i][j].mult(0.3);
      PVector v2 = loc[i+3][j].mult(0.3);
      vertex(v1.x, v1.y, v1.z);
      vertex(v2.x, v2.y, v2.z);
    }
    endShape(CLOSE);
  }
  popMatrix();
}