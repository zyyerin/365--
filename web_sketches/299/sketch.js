// 3 connected three-quad "Units" — each unit has a top quad, a right quad
// (shifted), and a bottom quad. Each next unit chains off the previous unit's
// right corners. Drawn once (noLoop).

const units = [];

function setup() {
  createCanvas(600, 600);
  background(255);
  stroke(0, 255, 0);
  strokeWeight(2);

  let in1 = createVector(0, 0);
  let in2 = createVector(50, 0);
  let in4 = createVector(0, 50);

  for (let i = 0; i < 3; i++) {
    const u = new Unit(in1, in2, in4);
    u.display();
    units.push(u);
    in1 = u.b2.copy();
    in2 = createVector(u.b2.x + 50, u.b2.y);
    in4 = u.b3.copy();
  }
  noLoop();
}

class Unit {
  constructor(a1, a2, a4) {
    this.a1 = a1.copy();
    this.a2 = a2.copy();
    this.a4 = a4.copy();

    const stepS = 50;
    const stepL = 100;
    const off = 10;

    // a3 — a free corner near a2/a4
    this.a3 = createVector(
      a1.x + random(stepS - off, stepS + off),
      a1.y + random(stepS - off, stepS + off)
    );

    // right quad (b)
    this.b1 = this.a2.copy();
    this.b4 = this.a3.copy();
    this.b2 = createVector(this.a2.x + random(stepL - off, stepL + off), this.a2.y);
    this.b3 = createVector(this.a3.x + random(stepL - off, stepL + off), this.a3.y);

    // bottom quad (c)
    this.c1 = this.a4.copy();
    this.c2 = this.a3.copy();
    this.c4 = createVector(this.a4.x, this.a4.y + random(stepL - off, stepL + off));
    this.c3 = createVector(this.a3.x, this.a3.y + random(stepL - off, stepL + off));
  }

  display() {
    // top quad
    fill(0, 150);
    quadShape(this.a1, this.a2, this.a3, this.a4);
    // right quad
    fill(0, 255, 255, 150);
    quadShape(this.b1, this.b2, this.b3, this.b4);
    // bottom quad
    fill(255, 0, 255, 150);
    quadShape(this.c1, this.c2, this.c3, this.c4);
  }
}

function quadShape(p1, p2, p3, p4) {
  beginShape();
  vertex(p1.x, p1.y);
  vertex(p2.x, p2.y);
  vertex(p3.x, p3.y);
  vertex(p4.x, p4.y);
  endShape(CLOSE);
}
