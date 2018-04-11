import peasy.*;
PeasyCam cam;

int total = 75;
PVector[][] loc;
float radius = 100;

float a = 1;
float b = 1;
float m, mb;
float m1, m2, m1g, m2g;
float n1, n2, n3;
float n1b, n2b, n3b;

float mStep, mStepb;

void setup() {
  size(600, 600, P3D);
  smooth();
  pixelDensity(2);
  cam = new PeasyCam(this, 500);

  ortho();
  noFill();
  //noStroke();

  loc = new PVector[total+1][total+1];

  m = random(10);
  mb = random(10);

  m1g = random(20);
  m2g = random(20);

  n1 = random(10);
  n2 = random(10);
  n3 = random(10);

  n1b = random(10);
  n2b = random(10);
  n3b = random(10);

  mStep = random(-0.04, 0.04);
  mStepb = random(-0.04, 0.04);
}

void update() {
  m +=  mStep;
  m1 = map(sin(m), -1, 1, 0, m1g);
  mb += mStepb;
  m2 = map(sin(mb), -1, 1, 0, m2g);
}

void draw() {
  background(255);
  update();
  for (int i = 0; i <= total; i++) {
    float phi = map(i, 0, total, -HALF_PI, HALF_PI);  // latitude

    for (int j = 0; j <= total; j++) {
      float theta = map(j, 0, total, -PI, PI);  // longitude

      float r1 = supershape(theta, m1, n1, n2, n3);
      float r2 = supershape(phi, m2, n1b, n2b, n3b);

      float x = r1 * cos(theta) * r2 * cos(phi) * radius;
      float y = r1 * sin(theta) * r2* cos(phi) * radius;
      float z = r2 * sin(phi) * radius;

      loc[i][j] = new PVector(x, y, z);
    }
  }

  for (int i = 0; i < total; i++) {
    beginShape();
    for (int j = 0; j <= total; j++) {

      PVector v1 = loc[i][j];
      PVector v2 = loc[i+1][j];

      vertex(v1.x, v1.y, v1.z);
      vertex(v2.x, v2.y, v2.z);
    }
    endShape();
  }
}

float supershape(float _theta, float _m, float _n1, float _n2, float _n3) {
  float theta1 = pow(abs(cos(_m*_theta/4)/a), _n2);
  float theta2 = pow(abs(sin(_m*_theta/4)/b), _n3);
  float r = pow(theta1+theta2, -1/n1);
  return r;
}