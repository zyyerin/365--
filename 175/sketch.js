const a = 20;
const b = 100;
const planeStep = 7;
const MARGIN = 100;
let unitSize, unitStep;

function setup() {
  createCanvas(600, 600);
  // noFill();
  noStroke();
  angleMode(DEGREES);

  unitSize = 0;
  unitStep = 1;

}

function draw() {
  background(255);

  if (unitSize <= 0 || unitSize > width-MARGIN) {
    unitStep *= -1;
  }

  unitSize += unitStep;

  if (unitSize == 0) {
    unitSize += unitStep;
  }

  for (let i = 1; i <= height - MARGIN * 2; i += planeStep) {
    fill(0, 127);
    planeDraw(width / 2 - unitSize / 2 + i % unitSize, MARGIN + i);
    fill(255, 127);
    planeDraw(width / 2 + unitSize / 2 - i % unitSize, MARGIN + i);
  }
}

function planeDraw(x, y) {
  push();
  translate(x, y);
  beginShape();
  vertex(b, 0);
  vertex(0, a);
  vertex(-b, 0);
  vertex(0, -a);
  endShape(CLOSE);
  pop();
}
