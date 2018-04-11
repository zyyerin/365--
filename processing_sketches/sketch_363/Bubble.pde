class Bubble {
  float size;
  PVector loc, vel, acc;
  float soff = 1;


  Bubble() {
    size = randomGaussian()*50-10;
    loc = new PVector(width/2, height/2);
    vel = new PVector(0, 0);
  }

  void display() {
    //noStroke();
    noFill();
    stroke(255);

    soff += .01;
    strokeWeight(.01);
    grow();
    move();
    translate(-width/2, -height/2);
    rectMode(CENTER);
    rect(loc.x, loc.y, size, size);
  }

  void move() {
    translate(width/2, height/2);
    rotate(noise(soff)*.5);
  }

  void grow() {
    if (size <= width*3) {
      size += noise(soff);
    }
  }

  void boundry() {
    if (loc.x >= width || loc.x <= 0) {
      vel.x *= -1;
    }
  }
}