import peasy.*;
PeasyCam cam;

ArrayList<VehicleSet> v;
int numOfSet = 11;
int thickness = 600;

void setup() {
  size(600, 600, P3D);
  pixelDensity(2);
  rectMode(CENTER);
  noCursor();

  cam = new PeasyCam(this, 1200);
  //cam.setYawRotationMode();
  //cam.setPitchRotationMode();
  //cam.setRollRotationMode();
  cam.lookAt(0, 0, -thickness/2);
  cam.rotateX(-PI/4);

  v = new ArrayList<VehicleSet>();
  for (int i=0; i<numOfSet; i++) {
   v.add(new VehicleSet(int(pow(2, i)), 20)); 
  }
}

void draw() {
  background(255);
  stroke(0);
  line(mouseX-width/2, mouseY, -800, mouseX-width/2, mouseY, 400);
  noStroke();
  translate(0, 0, thickness/2);
  for (VehicleSet vs : v) {
    translate(0, 0, -thickness/numOfSet);
    vs.display();
  }
  
}