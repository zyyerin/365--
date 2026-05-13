// chain of 50 nested eyes; alternating fill colors

let a = 0;
let t = 0;
let eye_scale;
let eyes = new Array(50);

function setup() {
  createCanvas(600, 600);
  background(0);
  ellipseMode(RADIUS);
  rectMode(CENTER);
  noStroke();
  noCursor();

  eye_scale = (width / 2) / eyes.length;
  eyes[0] = new Eye(width / 2, height / 2, width / 4, eye_scale);
}

function draw() {
  background(0);
  fill(255);

  eyes[0].display(0);

  for (let i = 1; i < eyes.length; i++) {
    if (i % 2 === 0) {
      eyes[i] = new Eye(eyes[i - 1].nextx(a), eyes[i - 1].nexty(a), eyes[i - 1].nextr(), eye_scale);
      eyes[i].display(0);
    } else {
      eyes[i] = new Eye(eyes[i - 1].nextx(-t), eyes[i - 1].nexty(-a), eyes[i - 1].nextr(), eye_scale);
      eyes[i].display(i * 5);
    }
  }

  t += 0.015;
  a += 0.01;
}

class Eye {
  constructor(ex, ey, er, scale) {
    this.ex = ex;
    this.ey = ey;
    this.er = er;
    this.scale = scale;
  }

  display(col) {
    fill(col);
    ellipse(this.ex, this.ey, this.er, this.er);
  }

  nextx(angle) { return sin(angle) * (this.scale / 2) + this.ex; }
  nexty(angle) { return cos(angle) * (this.scale / 2) + this.ey; }
  nextr() { return this.er - this.scale / 2; }
}
