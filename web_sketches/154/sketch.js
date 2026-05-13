// two parametric "Cells" rendered as line strips with rotating frames

let theta_s = 0;
let c, c3;

function setup() {
  createCanvas(600, 600, WEBGL);
  background(255);
  noFill();
  stroke(0);

  c = new Cell(100, random(100), random(0.001, 0.005));
  c3 = new Cell(10, random(100), random(0.1, 0.5));
}

function draw() {
  background(255);

  push();
  c.display();
  pop();

  push();
  c3.display();
  pop();
}

class Cell {
  constructor(s, a, betaStep) {
    this.s = s;
    this.a = a;
    this.betaStep = betaStep;
  }

  display() {
    rotateX(-this.a * 2);
    rotateY(this.a);
    rotateZ(this.a / 2);
    this.a += 0.001;
    let beta = 0;
    theta_s += 0.001;

    beginShape();
    while (beta < TWO_PI) {
      const r = this.s + 1.0 * sin(6 * beta);
      const theta = theta_s * beta;
      const phi = 0.6 * PI * sin(12 * beta);

      const x = r * cos(phi) * sin(theta);
      const y = r * cos(phi) * cos(theta);
      const z = r * sin(phi);

      beta += this.betaStep;

      const sw = constrain(beta / (Math.abs(phi) + 0.01), 0.1, 8);
      strokeWeight(sw);
      vertex(x, y, z);
    }
    endShape();
  }
}
