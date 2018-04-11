class Particle extends VerletParticle2D {

  float radius = 4;

  Particle(float x, float y) {
    super(x, y);
  }

  void display() {
    noFill();
    noStroke();


    rect(x, y, 100, 100);
  }
}