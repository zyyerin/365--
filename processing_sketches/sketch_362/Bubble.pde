class Bubble {
  float size;
  PVector loc, vel, acc;
  float soff = random(-2, 2);


  Bubble() {
    size = randomGaussian()*width/3-10;
    loc = new PVector(width/2, height/2);
    vel = new PVector(0, 0);
  }

  void display() {
    //noStroke();
    //noFill();
    fill(0, 5);
    stroke(0);

    soff += .01;
    strokeWeight(.01);
    boundry();
    grow();
    move();
    translate(-width/2, -height/2);
    rectMode(CENTER);
    rect(loc.x, loc.y, size, size);
  }

  void move() {
    translate(width/2, height/2);
    rotate(noise(soff)*5);
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

    if (size >= width) {
      fill(255, .05);
    }
  }
}