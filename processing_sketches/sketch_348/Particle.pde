class Particle {
  PVector location;
  PVector velocity;
  PVector acceleration;

  float angle = 0;
  float off = 1;

  float s;

  float lifespan = 255;

  Particle (PVector l) {
    acceleration = new PVector(0, 0);
    velocity = new PVector(random(-1, 1), random(-1, 1));
    location = l.get();
    noStroke();
    s = random(1);
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
    off += .1;
  }

  boolean isDead() {
    if (lifespan <= 0) {
      return true;
    } else {
      return false;
    }
  }

  void display() {
    fill(0, lifespan);

    pushMatrix();
    translate(width/2, height/2);
    rotate(angle);
    ellipse(location.x/2, location.y/2, s, s);
    popMatrix();

    s -= 0.01;
    angle = noise(off)*PI;
  }
}