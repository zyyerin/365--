float alpha;
float t;
float r;

void setup() {
  size(600, 600);
  pixelDensity(2);
  background(255);
  strokeWeight(134);

  t = random(10);
  r = width/4;
}

void draw() {

  alpha += 0.01;
  t += 0.01;

  float off = noise(t)*r;

  PVector a = new PVector(width/2, height/2);
  PVector b = new PVector(width/2 + cos(alpha), height/2 + sin(alpha));
  PVector mouse = new PVector(width/2 + sin(alpha)*off, height/2 + cos(alpha)*off);

  stroke(0, 10);
  line(a.x, a.y, b.x, b.y);
  line(a.x, a.y, mouse.x, mouse.y);
  fill(0);

  PVector norm = scalarProjection(mouse, a, b);
  stroke(255, 200);
  line(mouse.x, mouse.y, norm.x, norm.y);
}

PVector scalarProjection(PVector p, PVector a, PVector b) {
  PVector ap = PVector.sub(p, a);
  PVector ab = PVector.sub(b, a);
  ab.normalize();
  ab.mult(ap.dot(ab));
  PVector normalPoint = PVector.add(a, ab);
  return normalPoint;
}