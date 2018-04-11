PVector attractor;
Vehicle[] vehicles;
int numOfVehicle = 5000;

FlowField flowfield;

void setup() {
  size(600, 600, P3D);
  pixelDensity(2);

  rectMode(CENTER);
  noStroke();

  flowfield = new FlowField(10);

  vehicles = new Vehicle[numOfVehicle];
  for (int i = 0; i< numOfVehicle; i+=1) {
    vehicles[i] = new Vehicle(random(width), random(height), random(-width/2, width/2));
  }
}

void draw() {
  background(255);
  
  flowfield.display();
  
  attractor = new PVector(width/2, height/2, 0);
  //fill(255, 0, 0);
  //ellipse(attractor.x, attractor.y, 5, 5);


  for (Vehicle v : vehicles) {
   v.follow(flowfield);
   v.run();
  }
}