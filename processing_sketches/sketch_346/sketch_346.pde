ParticleSystem ps;
StarParticle sp;
PImage img;

void setup() {
  size(600, 600, P2D);
  background(0);
  img = loadImage("image.png");

  smooth();
  ps = new ParticleSystem();
}

void draw() {
  background(0);
  blendMode(ADD);

  PVector gravity = new PVector(0, 0.03);
  ps.applyForce(gravity);

  ps.addParticle();
  ps.run();
}