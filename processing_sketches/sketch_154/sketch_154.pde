float theta_s = 0;
Cell c;
Cell c2;
Cell c3;

void setup() {
  size(600, 600, P3D);
  background(255);
  pixelDensity(2);
  noFill();
  stroke(0);

  c = new Cell(100, random(100), random(0.001, 0.005));
  c2 = new Cell(10, random(100), random(0.01, 0.05));
  c3 = new Cell(10, random(100), random(0.1, 0.5));
}

void draw() {
  background(255);

  pushMatrix();
  translate(width/2, height/2);

  c.display();

  popMatrix();

  //pushMatrix();
  //translate(width/4*2, height/2);

  //c2.display();

  //popMatrix();

  pushMatrix();
  translate(width/2, height/2);

  c3.display();

  popMatrix();
}