// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

ParticleSystem ps;

void setup() {
  size(600,600);
  ps = new ParticleSystem(random(width), random(height), random(20));
}

void draw() {
  background(255);

  ps.display();
  ps.update();
}

void keyPressed() {
  ps.shatter(); 
}