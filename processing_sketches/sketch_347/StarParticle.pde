class StarParticle extends Particle {
  float ss;
  StarParticle (PVector l, float xvel) {
    super(l, xvel);
    acceleration = new PVector(0, 0);
    velocity = new PVector(xvel, 2);
    location = l.get();
    noStroke();
    s = 1;
  }
  void applyForce(PVector f) {
    acceleration.sub(f);
  }
  void display() {
    fill(100, lifespan);
    noStroke();
    pushMatrix();
    translate(width/2, 0-s);
    rect(location.x/2, location.y/2, s*50, s*random(1,1.8));
    popMatrix();
  }
}