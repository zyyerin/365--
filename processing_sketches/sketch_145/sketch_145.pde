PVector attractor;
Vehicle[] vehicles;
int numOfVehicle = 5000;
void setup() {
  size(400, 400);
  background(255);
  vehicles = new Vehicle[numOfVehicle];
  for (int i = 0; i< numOfVehicle; i++) {
    vehicles[i] = new Vehicle(random(width), random(height));
  }
}

void draw() {
  background(255);
  attractor = new PVector(mouseX, mouseY);
  fill(255);
  noStroke();
  ellipse(attractor.x, attractor.y, 5, 5);
  
  
  for (int i = 0; i< numOfVehicle; i++) {
    vehicles[i].seek(attractor);
    vehicles[i].update();
    vehicles[i].display();
  }
    
}