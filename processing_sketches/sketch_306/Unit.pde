float x, y;
float w, h;
float xoff, yoff;

class Unit {
  Unit(float x_, float y_, float w_, float h_) {

    x = x_;
    y = y_;
    w = w_;
    h = h_;

    xoff = random(-2.5, 2.5);
    yoff = random(-2.5, 2.5);
  }

  void display() {
    pushMatrix();
    translate(x, y);

    fill(150, 100);
    noStroke();

    beginShape();
    vertex(xstep + xoff, 0);
    vertex(xstep+2*w + xoff, 0);
    vertex(xstep+2*w - xoff, ystep+h);
    vertex(xstep - xoff, ystep+h);
    endShape(CLOSE);

    beginShape();
    vertex(0, ystep + yoff);
    vertex(xstep+w, ystep - yoff);
    vertex(xstep+w, ystep+2*h - yoff);
    vertex(0, ystep+2*h + yoff);
    endShape(CLOSE);

    centerShape();

    popMatrix();
  }

  void centerShape() {
    fill(230);
    ellipse(xstep+w, ystep+h, w*2, h*2);
  }
}