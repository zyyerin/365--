import peasy.*;
PeasyCam cam;

ArrayList<VehicleSet> v;
int numOfSet = 5;
int thickness = 200;

void setup() {
  size(600, 600, P3D);
  noCursor();
  //pixelDensity(2);
  rectMode(CENTER);

  cam = new PeasyCam(this, 1200);

  v = new ArrayList<VehicleSet>();
  for (int i=0; i<numOfSet; i++) {
   v.add(new VehicleSet(200, int(pow(4, i)))); 
  }
}

void draw() {
  background(255);
  translate(0, 0, thickness/2);
  for (VehicleSet vs : v) {
    translate(0, 0, -thickness/numOfSet);
    vs.display();
  }
  
}