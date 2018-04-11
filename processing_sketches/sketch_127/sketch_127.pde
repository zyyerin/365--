import peasy.*;
import peasy.org.apache.commons.math.*;
import peasy.org.apache.commons.math.geometry.*;

float a = 0;
Objecta objA;

PeasyCam cam;

void setup() {
  size(600, 600, P3D);
  smooth();
  pixelDensity(2);
  //ortho();
  rectMode(CENTER);
  noStroke();
  fill(0);

  cam = new PeasyCam(this, width/2, height/2, 0, 600);

  objA = new Objecta(1, 1, 15, 5);
}

void draw() {
  background(255);

  float newGao = map(mouseX, 0, width, 1, 20);
  float newScale = map(mouseY, 0, height, 1, 20);
  objA = new Objecta(1, 1, newGao, newScale);

  for (int i=0; i<10; i++) {
    for (int j=0; j<10; j++) {
      for(int k=0; k<10; k++) {
        float unitSize = width/11;
        objA.display((1+i)*unitSize, (1+j)*unitSize, -(1+k)*unitSize, a, a, a);
      }
    }
  }

  a+=0.004;
}