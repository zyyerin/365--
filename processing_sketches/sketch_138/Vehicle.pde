class Vehicle {
  PVector location;
  PVector velocity;
  PVector acceleration;
  float r; 
  float maxSpeed;
  float maxForce;
  float targetBuffer;
  
  Vehicle(float x, float y, float z) {
    acceleration = new PVector(0, 0, 0);
    velocity = new PVector(0, -2, 0);
    location = new PVector(x, y, z);
    targetBuffer = width/4;
    
    r = 10;
    maxSpeed = 2;
    maxForce = 0.05;
    
  }
  
  void run() {
   update();
   borders();
   display();
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

  void follow(FlowField flow) {
    PVector desired = flow.lookup(location);
    desired.mult(maxSpeed);
    PVector steer = PVector.sub(desired, velocity);
    steer.limit(maxForce);
    applyForce(steer);
  }

  void display() {
    fill(0);
    noStroke();
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
  
  void borders() {
   if (location.x < -r) location.x = width +r;
   if (location.y < -r) location.y = height +r;
   if (location.x > width + r) location.x = -r;
   if (location.y > height + r) location.y = -r;
   
  }
}