// NOC 6.07
ArrayList<Vehicle> vehicles;
int total = 50;

void setup() {
  size(600, 600);
  rectMode(CENTER);
  
  vehicles = new ArrayList<Vehicle>();
  for (int i=0; i<total; i++) {
    vehicles.add(new Vehicle(random(width), random(height)));
  }
}

void draw() {
  background(255);
  
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