class StarParticle extends Particle {
  StarParticle (PVector l) {
    super(l);
  }

  void display() {
    noStroke();

    imageMode(CENTER);
    tint(255, lifespan/2);
    float pw = map(lifespan, 0, 255, 0, height/3); 
    image(img, location.x/2, location.y/2+200, pw, lifespan);
  }
}