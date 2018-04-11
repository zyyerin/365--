class Metaball {
  PVector loc;
  PVector vel;
  float r;

  Metaball(float x, float y) {
    loc = new PVector(x, y);
    vel = PVector.random2D();
    vel.mult(random(1, 3));
    r = random(100, 1000);
  }

  void update() {
    loc.add(vel); 

    if (loc.x>width || loc.x<0) {
      vel.x *= -random(0.5, 1.5);
    }
    if (loc.y>height || loc.y<0) {
      vel.y *= -random(0.5, 1.5);
    }
  }

  void show() {
    fill(255, 0, 0, 100);
    ellipse(loc.x, loc.y, 5, 5);
  }
}