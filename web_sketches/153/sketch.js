// two parametric "Cells" rendered as scattered rotating boxes

let theta_s = 0;
let c, c2;

function setup() {
  createCanvas(600, 600, WEBGL);
  noFill();
  stroke(0);

  c = new Cell(200, 0, 0.08, -0.01);
  c2 = new Cell(200, TWO_PI, 0.08, 0.01);
}

function draw() {
  background(255);

  push();
  c.display();
  pop();

  push();
  c2.display();
  pop();
}

class Cell {
  constructor(s, a, betaStep, aStep) {
    this.s = s;
    this.a = a;
    this.betaStep = betaStep;
    this.aStep = aStep;
  }

  display() {
    rotateY(this.a);
    this.a += this.aStep;
    let beta = 0;
    theta_s += 0.001;

    while (beta < TWO_PI) {
      const r = this.s + 1.0 * sin(6 * beta);
      const theta = theta_s * beta;
      const phi = 0.6 * PI * sin(12 * beta);

      const x = r * cos(phi) * sin(theta);
      const y = r * cos(phi) * cos(theta);
      const z = r * sin(phi);

      beta += this.betaStep;

      if (Math.abs(x) < 0.1) continue;
      const size = constrain(beta / x, -30, 30);
      if (Math.abs(size) < 0.5) continue;

      push();
      translate(x, 1, 1);
      rotateX(x / 500);
      rotateY(y / 400);
      rotateZ(z / 300);
      box(size);
      pop();
    }
  }
}
