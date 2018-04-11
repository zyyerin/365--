class Metaball {
  PVector loc;
  PVector vel;
  PVector acc;
  float maxspeed;
  float maxforce;
  float r;

  Metaball(float x, float y) {
    loc = new PVector(x, y);
    vel = new PVector(0, 0);
    acc = new PVector(0, 0);
    maxspeed = random(1, 8);
    maxforce = random(0.05, 0.4);
    r = random(300, 900);
  }

  void run() {
    follow();
    update();
    //show();
  }

  void follow() {
    PVector desired = new PVector(mouseX-width/2, mouseY-height/2); 
    desired.setMag(maxspeed);
    PVector steer = PVector.sub(desired, vel);
    steer.limit(maxforce);
    applyForce(steer);
  }

  void update() {
    vel.add(acc);
    vel.limit(maxspeed);
    loc.add(vel);
    acc.mult(0);

    if (loc.x>width || loc.x<0) {
      vel.x *= -random(0.5, 1.5);
    }
    if (loc.y>height || loc.y<0) {
      vel.y *= -random(0.5, 1.5);
    }
  }

  void applyForce(PVector force) {
    acc.add(force);
  }

  void show() {
    fill(255, 0, 0, 100);
    ellipse(loc.x, loc.y, 5, 5);
  }
}