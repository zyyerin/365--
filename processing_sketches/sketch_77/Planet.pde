class Planet {
  float radius;
  float angle;
  float distance;
  Planet[] planets;
  float orbitSpeed;
  float roff;


  Planet(float r, float d, float o) {
    radius = r;
    distance = d;
    angle = random(TWO_PI);
    orbitSpeed = o;
    roff = random(10);
  }

  void orbit() {
    angle = angle + orbitSpeed;
    if (planets != null) {

      for (int i = 0; i < planets.length; i++) {
        planets[i].orbit();
      }
    }
  }

  void spawnMoons(int total, int level) {
    planets = new Planet[total];
    for (int i = 0; i < planets.length; i++) {
      float r = radius*.5;// * random(0.2, 0.6);
      float d = radius + r;
      float o = random(-0.02, 0.02);
      planets[i] = new Planet(r, d, o);
      if (level < 4) {
        int num = int(random(10));
        planets[i].spawnMoons(num, level + 1);
      }
    }
  }

  void show() {
    pushMatrix();
    rotate(angle);
    translate(distance, 0);
    roff += 0.02;
    stroke(0);
    ellipse(0, 0, radius*2, radius*2);
    if (planets != null) {
      noFill();
      for (int i = 0; i < planets.length; i++) {
        planets[i].show();
      }
    } else {
      noFill();
      //fill(0);
    }
    popMatrix();
  }
}