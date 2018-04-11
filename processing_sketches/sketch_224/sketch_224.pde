ParticleSystem ps;
ParticleSystem eyel;
StarParticle sp;
PImage img;
float systemX;
float t, t2;
float eyes = 20;
boolean eyeson;
PVector mouseLoc;

void setup() {
  size(600, 600, P2D);
  background(0);
  img = loadImage("image.png");

  smooth();
  ps = new ParticleSystem();
  eyel = new ParticleSystem();
noCursor();
  t = 0;
  t2 = 1;
  mouseLoc = new PVector(mouseX, mouseY);
}

void draw() {
  background(0);
  
  noStroke();
  fill(255, 200, 0);
  ellipse(mouseX, mouseY, 40, 40);
  
  PVector gravity = new PVector(0, 0.04);
  PVector gravity_less = new PVector(0, 0.01);
  blendMode(ADD);

  ps.applyForce(gravity);
  eyel.applyForce(gravity_less);

  ps.addParticle(true);
  ps.run();

  eyel.addParticle(false);

  blendMode(NORMAL);

  float off1 = noise(t)*15;
  float off2 = noise(t2)*15;
  fill(20);
  noStroke();
  
  float tx = map(mouseX, 0, width, -24, 30);
  float ty = map(mouseY, 0, height, -30, 20);
    pushMatrix();
  translate(tx, ty);
  eyel.run();

  popMatrix();
}