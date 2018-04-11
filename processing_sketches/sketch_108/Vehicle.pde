class Vehicle {
  PVector location;
  PVector velocity;
  PVector acceleration;
  float maxspeed;
  float maxforce;
  float r = 10;

  Vehicle() {
    location = new PVector(random(width), random(height), random(width));
    velocity = new PVector(0, 0, 0);
    acceleration = new PVector(0, 0, 0);
    maxspeed = random(1, 6);
    maxforce = random(0.05, 0.2);
  }

  void run() {
    update();
    borders();
    display();
  }

  void follow(Flowfield flow) {
    PVector desired = flow.lookup(location); 
    desired.setMag(maxspeed);
    PVector steer = PVector.sub(desired, velocity);
    steer.limit(maxforce);
    applyForce(steer);
  }

  void update() {
    velocity.add(acceleration);
    velocity.limit(maxspeed);
    location.add(velocity);
    acceleration.mult(0);
  }

  void applyForce(PVector force) {
    acceleration.add(force);
  }

  void display() {
    
    noStroke();
    fill(0);
    
    float r =10;
    float theta = velocity.heading() + HALF_PI;
    pushMatrix();
    translate(location.x, location.y, location.z);
    rotate(theta);
    beginShape();
    vertex(-r/2, r);
    vertex(0, -r);
    vertex(r/2, r);
    endShape(CLOSE);
    popMatrix();
  }

  void borders() {
    if (location.x < -r) location.x = width+r;
    if (location.y < -r) location.y = height+r;
    if (location.x > width+r) location.x = -r;
    if (location.y > height+r) location.y = -r;
  }
}