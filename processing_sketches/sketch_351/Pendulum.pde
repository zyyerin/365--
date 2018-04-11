class Pendulum {
  PVector origin;
  PVector bob;
  float len;
  float angle;

  float aVel = 0;
  float aAcc = 0;

  Pendulum(PVector origin_, float len_, float angle_) {
    origin = origin_;
    len = len_;  
    angle = angle_;
    bob = new PVector(0, 0);
  }

  void update() {
    aAcc = -1 * sin(angle) / len;

    angle += aVel;
    aVel += aAcc;

    aVel *= 0.98;
  }

  void display() {
    bob.x = origin.x + len * sin(angle);
    bob.y = origin.y + len * cos(angle);
stroke(0,10);
    line(origin.x, origin.y, bob.x, bob.y);
    ellipse(bob.x, bob.y, 3, 3);
  }
}