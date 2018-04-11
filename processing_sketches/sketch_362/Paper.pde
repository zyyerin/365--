class Paper {
  float size;
  PVector loc, vel, acc;
  float soff = 1;

  Paper() {
    size = randomGaussian()*width/3-10;
    loc = new PVector(width/2, height/2);
    vel = new PVector(0, 0);
  }

  void display() {
    fill(0,5);
    stroke(0);

    soff += .02;
    strokeWeight(.01);
    grow();
    move();
    translate(-width/2, -height/2);
    rectMode(CENTER);
    rect(loc.x, loc.y, size, size);
  }

  void move() {
    translate(width/2, height/2);
    rotate(noise(soff)*9);
  }

  void grow() {
    if (size <= width*3) {
      size += noise(soff)*5;
    }
  }

  void boundry() {
    if (loc.x >= width || loc.x <= 0) {
      vel.x *= -1;
    }
  }
}