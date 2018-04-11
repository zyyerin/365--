// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// class Spore extends the class "VerletParticle2D"
class Particle extends VerletParticle2D {

  float r;

  Particle (Vec2D loc) {
    super(loc);
    r = 1;
    physics.addParticle(this);
    physics.addBehavior(new AttractionBehavior2D(this, r*8, 0.1));
    physics.addBehavior(new AttractionBehavior2D(this, r*2, -1));
  }

  void display () {
    fill(0);
    noStroke();
    ellipse(x, y, r*2, r*2);
  }
}