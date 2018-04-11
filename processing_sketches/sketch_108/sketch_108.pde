import peasy.*;
PeasyCam cam;

Vehicle[] v1;

Flowfield field;

void setup() {
  size(600, 600, P3D);
  smooth();
  pixelDensity(2);
  ortho();
  cam = new PeasyCam(this, 600);
  field = new Flowfield();
  v1 = new Vehicle[10];
  
  for (int i=0; i<10; i++) {
   v1[i] =  new Vehicle();
  }
}

void draw() {
  background(255);
  
  translate(-width/2, -height/2);
  
  
  field.display();
  
  for(int i=0; i<v1.length; i++) {
  v1[i].follow(field);
  v1[i].run();
  v1[i].display();
  }
}