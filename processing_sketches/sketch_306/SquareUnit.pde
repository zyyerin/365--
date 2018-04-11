class SquareUnit extends Unit {

  SquareUnit (float x_, float y_, float w_, float h_) {
    super(x_, y_, w_, h_);
  }
  void display() {
    pushMatrix();
    translate(x, y);

    fill(150, 100);
    noStroke();

    beginShape();
    vertex(xstep + xoff, 0);
    vertex(xstep+2*w + xoff, 0);
    vertex(xstep+2*w - xoff, ystep);
    vertex(xstep - xoff, ystep);
    endShape(CLOSE);

    beginShape();
    vertex(0, ystep + yoff);
    vertex(xstep, ystep - yoff);
    vertex(xstep, ystep+2*h - yoff);
    vertex(0, ystep+2*h + yoff);
    endShape(CLOSE);

    centerShape();

    popMatrix();
  }
  
  void centerShape() {
    fill(230);

    beginShape();
    vertex(xstep - xoff, ystep - yoff);
    vertex(xstep+w*2 - xoff, ystep - yoff);
    vertex(xstep+w*2 + xoff, ystep+h*2 + xoff);
    vertex(xstep + xoff, ystep+h*2 + yoff);
    endShape(CLOSE);
  }
}