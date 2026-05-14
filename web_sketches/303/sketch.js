// single opaque-colored Unit with "303--" caption

function setup() {
  createCanvas(600, 600);
  background(255);
  noStroke();
  noLoop();
}

function draw() {
  fill(0);
  textAlign(CENTER);
  textSize(100);
  text('303--', width / 3, height / 2);

  const u = new Unit();
  u.display();
}

class Unit {
  constructor() {
    this.in0 = createVector(0, 0);
    this.in1 = createVector(50, 0);
    this.in2 = createVector(0, 50);
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
    fill(0);
    quad4(this.in0, this.in1, this.out0, this.in2);
    fill(0, 255, 255);
    quad4(this.in1, this.out1, this.out2, this.out0);
    fill(255, 0, 255);
    quad4(this.in2, this.out0, this.out4, this.out3);
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
