PVector attractor;
Vehicle[] vehicles;
int numOfVehicle = 5000;
void setup() {
  size(400, 400);
  background(255);
  vehicles = new Vehicle[numOfVehicle];
  for (int i = 0; i< numOfVehicle; i+=2) {
    vehicles[i] = new Vehicle(random(0, width/2), random(height/2, height));
    vehicles[i+1] = new Vehicle(random(width/2, width), random(0, height/2));
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