class Particle_eye extends Particle {
  Particle_eye (PVector l) {
    super(l);
    velocity = new PVector(random(-0.1, 0.1), random(-0.5, 0.1));
    acceleration = new PVector(random(-0.1, 0.1), random(-0.5, 0.1));

  }

  void display() {
    //fill(0, lifespan/2);
    //float ew = map(lifespan, 0, 255, 0, 30); 

    //ellipse(location.x/2, location.y/2+200, ew, ew);

    imageMode(CENTER);
    tint(0, lifespan/5);
    float ey = map(lifespan, 0, 255, 0, 44); 
    image(img, location.x/2-44, location.y/2+204, ey*random(0.9,1), ey*random(0.9,1));
    image(img, location.x/2+39, location.y/2+200, ey*random(0.9,1), ey*random(0.9,1));

  }
}