float x, y, z;
float size;
float rotate;
float xoff;

void setup() {
  size(600, 600, P3D);
  pixelDensity(2);
  smooth();
  background(255);
  x = 50;
  y = height/2;
  z = 100;
  size = 0;
  rotate = random(PI);
}

void draw() {
  translate(x, y, z);
  rectMode(CENTER);
  stroke(0, 50);
  noFill();
  rotate += noise(xoff) * 0.05;

  rotateX(rotate);
  rotateY(rotate);
  //rotateZ(rotate);

  rect(0, 0, size, height/20);


  println(x);

  if (x <= 0 || x >= width) {
    xoff *= -noise(rotate);
  } else {
    xoff = noise(rotate);
  }
  xoff += 0.01;
  x += xoff;
  z += random(-5, 0.1); 
}