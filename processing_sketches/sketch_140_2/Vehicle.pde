class Vehicle {
  PVector location;
  PVector velocity;
  PVector acceleration;
  float r; 
  float maxSpeed;
  float maxForce;
  float targetBuffer;
  
  Vehicle(float x, float y) {
    acceleration = new PVector(0, 0);
    velocity = new PVector(0, -2);
    location = new PVector(x, y);
    targetBuffer = width/4;
    
    r = 2;
    maxSpeed = 2;
    maxForce = 0.05;
    
  }

  void update() {
   velocity.add(acceleration);
   velocity.limit(maxSpeed);
   location.add(velocity);
   acceleration.mult(0);
  }

  void applyForce(PVector force) {
    acceleration.add(force);
  }

  void seek(PVector target) {
    PVector desired = PVector.sub(target, location);
    float d = dist(target.x, target.y, location.x, location.y);
    float spd = map(d, 0, targetBuffer, 0, maxSpeed);
    
    desired.setMag(spd);
    PVector steer = PVector.sub(desired, velocity);
    steer.limit(maxForce);
    
    applyForce(steer);
  }

  void display() {
    fill(0);
    float theta = velocity.heading2D() + PI/2;
    
    pushMatrix();
    translate(location.x, location.y);
    rotate(theta);

    beginShape();
    vertex(0, -r*2);
    vertex(-r, r*2);
    vertex(r, r*2);
    endShape(CLOSE);
    
    popMatrix();
  }
}