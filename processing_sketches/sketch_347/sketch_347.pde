ParticleSystem[] ps;
StarParticle sp;

void setup() {
  size(600, 600);
  background(0);

  smooth();
  //ps = new ParticleSystem[int(random(100))];

  ps = new ParticleSystem[16];

  for (int i=0; i < ps.length; i++) {
    ps[i] = new ParticleSystem();
  }
}

void draw() {
  background(0);
  PVector gravity = new PVector(0, -0.1);

  for (int i=0; i < ps.length; i++) {
    ps[i].applyForce(gravity);
    ps[i].addParticle();
    ps[i].run();

  }
}