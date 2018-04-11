class Particle {
  PVector location;
  PVector velocity;
  PVector acceleration;

  float lifespan = 255;

  Particle (PVector l) {
    acceleration = new PVector(0, 0);
    velocity = new PVector(random(-1, 1), random(-1, 1));
    location = l.get();
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

    // clear out the acceleration
    acceleration.mult(0);
    lifespan -= 0.8;
  }

  boolean isDead() {
    if (lifespan <= 0) {
      return true;
    } else {
      return false;
    }
  }

  void display() {
    noStroke();
    fill(0, lifespan);

    ellipse(location.y/2, location.x/2, 100, 100);
  }
}