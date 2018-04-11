import peasy.*;
import peasy.org.apache.commons.math.*;
import peasy.org.apache.commons.math.geometry.*;
PeasyCam cam;

float a = 0;
ArrayList<Box> sponge;

void setup() {
  size(600, 600, P3D);
  
  cam = new PeasyCam(this, 600);
  cam.setMinimumDistance(50);
  cam.setMaximumDistance(600);
  
  sponge = new ArrayList<Box>();
  //noFill();
  fill(0, 20);
  //stroke(0);
  noStroke();

  Box b = new Box(0, 0, 0, 100);
  sponge.add(b);
}

void mousePressed() {
  ArrayList<Box> next = new ArrayList<Box>();
  for (Box b : sponge) {
  ArrayList<Box> newBoxes = b.generate();
  next.addAll(newBoxes);
  }
  sponge = next;
}

void draw() {
  background(255);
  //lights();

  //translate(width/2, height/2);
  //rotateX(a);
  //rotateY(a*0.9);
  //rotateZ(a*1.1);
  for (Box b : sponge) {
    b.show();
  }

  a += 0.005;
}