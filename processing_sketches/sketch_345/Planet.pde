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
      float r = radius * random(0.2, 0.6);
      //float d = random(100/level, 250/level);
      float d = radius + r;
      float o = random(-0.03, 0.03);
      planets[i] = new Planet(r, d, o);
      if (level < 4) {
        int num = int(random(5));
        planets[i].spawnMoons(num, level + 1);
      }
    }
  }

  void show() {
    pushMatrix();
    strokeWeight(.3);
    stroke(255);
    fill(0, 5);
    rotate(angle);
    translate(distance, 0);
    roff += 0.02;
    ellipse(0, 0, radius*2*noise(roff), radius*2*noise(roff));

    if (planets != null) {
      for (int i = 0; i < planets.length; i++) {
        planets[i].show();
      }
    }
    popMatrix();
  }
}