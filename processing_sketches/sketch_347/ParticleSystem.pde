class ParticleSystem {
  ArrayList<Particle> particles;
  PVector origin;
  float xvel;

  ParticleSystem() {
    particles = new ArrayList<Particle>();
    origin = new PVector(random(-width/2, width/2), 0);
    xvel = random(-9, 9);
  }

  void addParticle() {
    particles.add(new Particle(origin, xvel));
    particles.add(new StarParticle(origin, xvel));
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