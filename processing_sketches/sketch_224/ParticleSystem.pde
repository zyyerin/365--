class ParticleSystem {
  ArrayList<Particle> particles;
  PVector origin;

  ParticleSystem() {
    particles = new ArrayList<Particle>();
    origin = new PVector(width, 0);
  }

  void addParticle(boolean eyes) {
    if (eyes) { 
      particles.add(new StarParticle(origin));
    } else {
      particles.add(new Particle_eye(origin));
    }
  }

  void applyForce(PVector f) {
    for (Particle p : particles) {
      p.applyForce(f);
    }
  }

  void run() {

    for (int i = particles.size()-1; i >= 0; i--) {
      Particle p = particles.get(i);
      p.run();

      if (p.isDead()) {
        particles.remove(i);
      }
    }
  }
}