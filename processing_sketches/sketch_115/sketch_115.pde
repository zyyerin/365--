import peasy.*;
import peasy.org.apache.commons.math.*;
import peasy.org.apache.commons.math.geometry.*;

PeasyCam cam;

float x, y, z, bx, by, bz;

PVector testPoint;
float testScope = 20;

float a = 28;
float b = 46.92;
float c = 4;


ArrayList<PVector> points = new ArrayList<PVector>();
ArrayList<PVector> objs = new ArrayList<PVector>();

void setup() {
  size(600, 600, P3D);
  pixelDensity(2);
  stroke(0);
  strokeWeight(1);
  noFill();
  ortho();

  cam = new PeasyCam(this, 500);

  x = random(10);
  y = random(10);
  z = random(10);

  testPoint = new PVector(0, 0, 0);
}

void draw() {
  background(255);

  testPoint = new PVector(mouseX-width/2, 0, 50);

  pushMatrix();
  translate(testPoint.x, testPoint.y, testPoint.z);
  stroke(220);
  sphere(testScope);


  popMatrix();

  fill(0);
  pushMatrix();
  translate(0, 0, 50);
  box(bx*2, by*2, bz*2);
  popMatrix();
  noFill();

  displayGraph();

  if (dist(x, y, z, testPoint.x, testPoint.y, testPoint.z) < testScope) {
    bx = x;
    by = y;
    bz = z;
  }



  stroke(255, 0, 0);
  strokeWeight(5);

  point(x, y, z);

  strokeWeight(1);

  line(-width, 0, 50, width, 0, 50);

  stroke(220);
  noFill();
  beginShape();
  for (PVector v : points) {
    curveVertex(v.x, v.y, v.z);
  }
  endShape();
}



void displayGraph() {
  float dt = 0.01;

  float dx = (a * (y-x))       * dt;
  float dy = (x * (b-z) - y)   * dt;
  float dz = (x * y     - c*z) * dt;

  x += dx;
  y += dy;
  z += dz;

  if (points.size() < 2000) {
    points.add(new PVector(x, y, z));
  }
}