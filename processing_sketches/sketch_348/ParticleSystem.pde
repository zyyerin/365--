class ParticleSystem {
  ArrayList<Particle> particles;
  PVector origin;

  ParticleSystem() {
    particles = new ArrayList<Particle>();
    origin = new PVector(random(300), random(300));
  }

  void addParticle() {

    //particles.add(new StarParticle(origin));
    particles.add(new Particle(origin));
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