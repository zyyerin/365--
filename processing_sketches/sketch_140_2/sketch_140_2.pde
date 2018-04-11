PVector attractor;
Vehicle[] vehicles;
int numOfVehicle = 500;

void setup() {
  size(600, 600);
  rectMode(CENTER);
  pixelDensity(2);
  noStroke();

  background(255);
  vehicles = new Vehicle[numOfVehicle];
  for (int i = 0; i< numOfVehicle; i+=1) {
    vehicles[i] = new Vehicle(random(width), random(height));
  }
  
}

void draw() {
  background(255);
  attractor = new PVector(width/2, height/2);
  //fill(255, 0, 0);
  //ellipse(attractor.x, attractor.y, 5, 5);


  for (int i = 0; i< numOfVehicle; i++) {
    if(i==0){
    vehicles[i].seek(attractor);
    } else {
     vehicles[i].seek(vehicles[i-1].location); 
    }
    vehicles[i].update();
    vehicles[i].display();
  }
    
  
}