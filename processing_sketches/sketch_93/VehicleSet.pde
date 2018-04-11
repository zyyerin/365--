class VehicleSet {

  ArrayList<Vehicle> vehicles;
  int total;
  int initR;

  VehicleSet(int total_, int r_) {
    total = total_;
    initR = r_;
    vehicles = new ArrayList<Vehicle>();
    for (int i=0; i<total; i++) {
      PVector init = initPosition(initR);
      vehicles.add(new Vehicle(init.x, init.y));
    }
  }

  void display() {
    for (Vehicle v : vehicles) {
      v.seperate(vehicles);
      v.update();
      v.display();
    }
  }

  PVector initPosition(float maxr) {
    float inita = random(0, TWO_PI);
    float initr = random(0, maxr);
    return new PVector(cos(inita)*initr, sin(inita)*initr);
  }
}