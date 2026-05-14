// 2-unit chain (refactored Unit with in/out naming), "302--" caption

function setup() {
  createCanvas(600, 600);
  background(255);
  noLoop();
}

function draw() {
  fill(0);
  noStroke();
  textAlign(CENTER);
  textSize(100);
  text('302--', width / 3, height / 2);

  const u = new Unit();
  u.display();

  // chain second unit off first's right edge
  const u2 = new Unit(u.out1.copy(), createVector(200, 0), u.out2.copy());
  u2.display();
}

class Unit {
  constructor(in0, in1, in2) {
    if (in0) {
      this.in0 = in0.copy();
      this.in1 = in1.copy();
      this.in2 = in2.copy();
    } else {
      this.in0 = createVector(0, 0);
      this.in1 = createVector(50, 0);
      this.in2 = createVector(0, 50);
    }
    const stepS = 50, stepL = 100, off = 10;
    this.out0 = createVector(
      random(stepS - off, stepS + off),
      random(stepS - off, stepS + off)
    );
    this.out1 = createVector(this.in1.x + random(stepL - off, stepL + off), this.in1.y);
    this.out2 = createVector(this.out0.x + random(stepL - off, stepL + off), this.out0.y);
    this.out3 = createVector(this.in2.x, this.in2.y + random(stepL - off, stepL + off));
    this.out4 = createVector(this.out0.x, this.out0.y + random(stepL - off, stepL + off));
  }

  display() {
    noStroke();
    fill(0, 150);
    quad4(this.in0, this.in1, this.out0, this.in2);
    fill(0, 255, 255, 150);
    quad4(this.in1, this.out1, this.out2, this.out0);
    fill(255, 0, 255, 150);
    quad4(this.in2, this.out0, this.out4, this.out3);

    stroke(255, 0, 0);
    strokeWeight(10);
    point(this.in2.x, this.in2.y);
    noStroke();
  }
}

function quad4(p1, p2, p3, p4) {
  beginShape();
  vertex(p1.x, p1.y);
  vertex(p2.x, p2.y);
  vertex(p3.x, p3.y);
  vertex(p4.x, p4.y);
  endShape(CLOSE);
}
