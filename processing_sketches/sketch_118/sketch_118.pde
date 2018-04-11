float x = 50;
float y = 0;
float z = 0;

float a = 10;
float b = 18;
float c = 8/3;

float angle = 0;

ArrayList<PVector> points = new ArrayList<PVector>();

void setup() {
  size(600, 600, P3D);
  pixelDensity(2);
  stroke(0);
  strokeWeight(0.1);
  noFill();
}

void draw() {
  background(255);

  float dt = 0.01;

  float dx = (a * (y-x)) * dt;
  float dy = (x * (b-z) - y) * dt;
  float dz = (x*y - c*z) * dt;

  x += dx;
  y += dy;
  z += dz;

  points.add(new PVector(x, y, z));


  translate(width/2, height/2);
  rotateX(angle);
  angle += random(0.002);

  scale(15);
  strokeWeight(x/10);


  beginShape();
  for (PVector v : points) {
    curveVertex(v.x, v.y, v.z);
  }
  endShape();

  strokeWeight(y/10);

  beginShape();
  for (PVector v : points) {
    curveVertex(v.y, v.z, v.x);
  }
  endShape();

  strokeWeight(z/10);

  beginShape();
  for (PVector v : points) {
    curveVertex(v.z, v.x, v.y);
  }
  endShape();
}