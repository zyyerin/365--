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
  
  //fill(255);
  //noStroke();

  c = new Cell(200, 0, 0.08, -0.01);
  c2 = new Cell(200, TWO_PI, 0.08, 0.01);
}

void draw() {
  background(255);

  //pointLight(255, 255, 255, width/2, height/2, 0);

  pushMatrix();
  translate(width/2, height/2);


  c.display();
  popMatrix();
  
  pushMatrix();
  translate(width/2, height/2);
  
  c2.display();
  popMatrix();
}