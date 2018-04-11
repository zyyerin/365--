ParticleSystem ps;

void setup() {
  size(600, 600);
  background(255);

  ps = new ParticleSystem();
}

void draw() {
  background(255);
  ps.addParticle();
  ps.run();
}