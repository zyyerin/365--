class StarParticle extends Particle {
  float ss;
  StarParticle (PVector l) {
    super(l);
    ss = 1;
  }

  void display() {
    fill(0, lifespan);
    pushMatrix();
    translate(width, height/2);
    rotate(angle);
    rect(location.y/2, location.x/2, ss, ss);
    popMatrix();
    ss += 0.1;
  }
}