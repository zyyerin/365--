import peasy.*;
import peasy.org.apache.commons.math.*;
import peasy.org.apache.commons.math.geometry.*;

PeasyCam cam;

float x = 5;
float y = 0;
float z = 0;

float a = 28;
float b = 46.92;
float c = 4;


ArrayList<PVector> points = new ArrayList<PVector>();

void setup() {
  size(600, 600, P3D);
  pixelDensity(2);
  stroke(0);
  strokeWeight(1);
  noFill();

  cam = new PeasyCam(this, 100);

  b = 10;
}

void draw() {
  background(255);
  if (b<48) {
    b+=0.05;
  } else {
    b = 10; 
  }

  float dt = 0.01;

  float dx = (a * (y-x))       * dt;
  float dy = (x * (b-z) - y)   * dt;
  float dz = (x * y     - c*z) * dt;

  x += dx;
  y += dy;
  z += dz;

  points.add(new PVector(x, y, z));

  beginShape();
  for (PVector v : points) {
    curveVertex(v.x, v.y, v.z);
  }
  endShape();
}