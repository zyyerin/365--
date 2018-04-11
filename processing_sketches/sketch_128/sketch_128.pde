float a = 0;
Objecta objA;

void setup() {
  size(600, 600, P3D);
  smooth();
  pixelDensity(2);
  //ortho();
  rectMode(CENTER);
  noStroke();
  fill(0);

  objA = new Objecta(1, 1, 15, 5);
}

void draw() {
  background(255);

  float newGao = map(mouseX, 0, width, 1, 40);
  float newScale = map(mouseY, 0, height, 1, 40);
  objA = new Objecta(1, 1, newGao, newScale);

  for (int i=0; i<10; i++) {
    for (int j=0; j<10; j++) {
      float unitSize = width/11;
      objA.display((1+i)*unitSize, (1+j)*unitSize, 0, a, a, a);
    }
  }

  a+=0.004;
}