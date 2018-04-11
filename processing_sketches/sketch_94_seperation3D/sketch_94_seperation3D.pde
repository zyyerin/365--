import peasy.*;

// NOC 6.07

PeasyCam cam;

ArrayList<Vehicle> vehicles;
int total = 200;

void setup() {
  size(600, 600, P3D);
    pixelDensity(2);

  rectMode(CENTER);

  cam = new PeasyCam(this, 500);

  vehicles = new ArrayList<Vehicle>();
  for (int i=0; i<total; i++) {
    vehicles.add(new Vehicle(random(width), random(height)));
  }
}

void draw() {
  background(255);
  translate(-width/2, -height/2, 0);

  for (Vehicle v : vehicles) {
    v.seperate(vehicles);
    v.update();
    v.borders();
    v.display();
  }
}

void mouseDragged() {
  vehicles.add(new Vehicle(mouseX, mouseY));
}