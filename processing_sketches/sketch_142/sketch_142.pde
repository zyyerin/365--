float a=0;

void setup() {
  size(600, 600, P3D);
}

void draw() {
  background(0);
  a+=0.01;
  pushMatrix();
  translate(width/2, height/2);
  fill(255);
  noStroke();
  sphereDetail(3);
  rotateY(a);
  sphere(100);
  popMatrix();

  fill(0);

  float x = mouseX;
  float y = mouseY;
  translate(275, 275, 100);
  if (mousePressed) {
    println(x+", " + y);
  }
  sphereDetail(20);
  sphere(5);
  translate(30, 0, 0);  
  sphere(5);

}