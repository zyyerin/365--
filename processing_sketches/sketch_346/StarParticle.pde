class StarParticle extends Particle {
  StarParticle (PVector l) {
    super(l);
  }

  void display() {
    noStroke();

    imageMode(CENTER);
    tint(255, lifespan/2);
    image(img, location.x/2, location.y/2, height/2, lifespan);

    //fill(255, lifespan/2);
    //ellipse(location.y/2, location.x/2, lifespan, width/2);
  }
}