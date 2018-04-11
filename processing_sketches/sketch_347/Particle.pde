class Particle {
  PVector location;
  PVector velocity;
  PVector acceleration;
  
  float s;

  float lifespan = 255;

  Particle (PVector l, float xvel) {
    acceleration = new PVector(0, 0);
    velocity = new PVector(xvel, random(-2,-1.5));
    location = l.get();
    noStroke();
    s = 1;
  }

  void run() {
    update();
    display();
  }

  void applyForce(PVector f) {
    acceleration.add(f);
  }

  void update() {
    velocity.add(acceleration);
    location.add(velocity);
    acceleration.mult(0);
    lifespan -= 1;
  }

  boolean isDead() {
    if (lifespan <= 0) {
      return true;
    } else {
      return false;
    }
  }

  void display() {
    fill(200, lifespan);
    noStroke();
    pushMatrix();
    translate(width/2, height+s);
    rect(location.x/2, location.y/2, s*20, s*random(.8,2));
    popMatrix();
  }
}