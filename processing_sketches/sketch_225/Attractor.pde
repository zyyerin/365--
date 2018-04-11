// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

class Attractor extends VerletParticle2D {

  float r;

  Attractor (Vec2D loc) {
    super (loc);
    r = 1;
    physics.addParticle(this);
    physics.addBehavior(new AttractionBehavior2D(this, 50, -0.5));
    physics.addBehavior(new AttractionBehavior2D(this, width, 0.1));
  }

  void display () {
    fill(0);
    noFill();
    noStroke();
    ellipse (x, y, r*2, r*2);
  }
}