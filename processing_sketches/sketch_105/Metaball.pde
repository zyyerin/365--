class Metaball {
  PVector loc;
  PVector vel;
  float r;

  Metaball(float x, float y, float z) {
    loc = new PVector(x, y, z);
    vel = PVector.random3D();
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
    if (loc.z>width/2 || loc.z<-width/2) {
      vel.z *= -random(0.5, 1.5);
    }
  }

  void show() {
    noFill();
    stroke(255, 0, 0);
    strokeWeight(20);
    point(loc.x, loc.y, loc.z);
  }
}