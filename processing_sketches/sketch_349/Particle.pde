class Particle {
  PVector location;
  PVector velocity;
  PVector acceleration;

  float lifespan = 255;

  Particle (PVector l) {
    acceleration = new PVector(-0.05, 0.05);
    velocity = new PVector(random(-1, 1), random(-1, 1));
    location = l.get();
  }

  void update() {
    velocity.add(acceleration);
    location.add(velocity);

    lifespan -= 1.2;
  }

  boolean isDead() {
    if (lifespan <= 0) {
      return true;
    } else {
      return false;
    }
  }

  void display() {
    pushMatrix();
    translate(width/2, height/2);
    stroke(0, lifespan);
    strokeWeight(2);
    line(location.x, location.y, location.y, -location.x);
    popMatrix();
  }
}