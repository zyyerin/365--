import peasy.*;
PeasyCam cam;

int total = 200;
int radius = 100;
PVector[][] loc;

float t = 0;

void setup() {
  size(600, 600, P3D);
  smooth();
  pixelDensity(2);
  cam = new PeasyCam(this, 500);

  //stroke(0);
  //strokeWeight(1);
  //noFill();
  noStroke();
  fill(255);

  loc = new PVector[total+1][total+1];
}

void draw() {
  background(255);
  lights();

  t += 0.0005;


  for (int i = 0; i <= total; i++) {
    float latitude = map(i, 0, total, 0, PI);
    for (int j = 0; j <= total; j++) {
      float longitude = map(j, 0, total, 0, TWO_PI);

      float x = sin(latitude)*cos(longitude)*radius;
      float y = sin(latitude)*sin(longitude)*radius;
      float z = cos(latitude)*radius;

      loc[i][j] = new PVector(x, y, z);

      PVector off = new PVector(noise(t*x), noise(t*y), noise(t*z)).mult(20);
      loc[i][j].add(off);
    }
  }

  for (int i = 0; i < total; i++) {
    //float col = map(i, 0, total, 0, 255);
    //fill(col);

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