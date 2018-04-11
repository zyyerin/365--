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
    maxforce = .3;
    maxspeed = 10;
  }

  void applyForce(PVector f) {
    acceleration.add(f.div(mass));
  }
  
  void applyBehaviors(ArrayList<Vehicle> vehicles) {
    PVector seperateForce = seperate(vehicles);
    PVector seekForce = seek(new PVector(mouseX-width/2, mouseY));
    seperateForce.mult(2);
    seekForce.mult(1);
    
    PVector totalForce = seperateForce.add(seekForce);
    applyForce(totalForce);
    
  }
  
  PVector seek(PVector target) {
    PVector desired = target.sub(position);
    desired.setMag(maxspeed);
    PVector steer = desired.sub(velocity);
    steer.limit(maxforce);
    
    return steer;
  }

  PVector seperate(ArrayList<Vehicle> vehicles) {
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
      sum.sub(velocity);
      sum.limit(maxforce);
    }
    return sum;
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
    rotateX(velocity.x);
    rotateY(velocity.y);
    sphereDetail(3);
    sphere(r/2);
    popMatrix();
  }

}