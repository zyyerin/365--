// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Simple Particle System

class Particle {
  PVector position;
  PVector velocity;
  PVector acceleration;
  float lifespan;

  float r;

  Particle(float x, float y, float r_) {
    acceleration = new PVector(random(-0.1, 0.1), random(-0.1, 0.1));
    velocity = PVector.random2D();
    velocity.mult(0.5);
    position = new PVector(x, y);
    lifespan = 255;
    r = r_;
  }

  void run() {
    update();
    display();
  }

  // Method to update position
  void update() {
    velocity.add(acceleration);
    position.add(velocity);
    lifespan -= random(4);
    if (lifespan < 200){
      lifespan += 10;
    }
  }

  // Method to display 
  void display() {
    if (lifespan>0) {
      strokeWeight(lifespan);
    } else {
      strokeWeight(-lifespan+1);
    }
    fill(0);
    ellipse(position.x, position.y, r, r);
  }

  // Is the particle still useful?
  boolean isDead() {
    if (lifespan < 0.0) {
      return true;
    } else {
      return false;
    }
  }
}