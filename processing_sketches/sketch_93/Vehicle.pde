class Vehicle {
  PVector position;
  PVector velocity;
  PVector acceleration;
  float r;
  float maxforce;
  float maxspeed;

  float mass;

  Vehicle(float x, float y) {
    position = new PVector(x, y);
    velocity = new PVector(0, 0);
    acceleration = new PVector(0, 0);
    r = random(30);
    mass = r * 0.1;
    maxforce = .1;
    maxspeed = 2;
  }

  void applyForce(PVector f) {
    // a = f/m will take mass into consideration
    acceleration.add(f.div(mass));
  }

  void seperate(ArrayList<Vehicle> vehicles) {
    float desiredseperation = r*3;
    PVector sum = new PVector();
    int count = 0;
    for (Vehicle other : vehicles) {
      float d = PVector.dist(position, other.position);
      if (d>0 && d<desiredseperation) {
        PVector diff = PVector.sub(position, other.position);
        diff.normalize();
        diff.div(d);
        sum.add(diff);
        count++;
      }
    }
    if (count!=0) {
      sum.setMag(maxspeed);
      PVector steer = sum.sub(velocity);
      steer.limit(maxforce);
      applyForce(steer);
    }
  }

  void update() {
    velocity.add(acceleration);
    velocity.limit(maxspeed);
    position.add(velocity);
    acceleration.mult(0);
  }

  void display() {
    fill(0);
    noStroke();
    pushMatrix();
    translate(position.x, position.y, velocity.y*10);
    sphereDetail(int(velocity.x*20) + 3);
    sphere(r/2);
    popMatrix();
  }

}