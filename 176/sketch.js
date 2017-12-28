const a = 80;
const b = 80;
const planeStep = 7;
const MARGIN = 100;
let unitSize, unitStep;

function setup() {
  createCanvas(600, 600);
  noFill();
  stroke(0);
  strokeWeight(4);

  unitSize = 0;
  unitStep = 1;

}

function draw() {
  background(255);

  if (unitSize <= -width / 4 || unitSize > width/4) {
    unitStep *= -1;
  }

  unitSize += unitStep;

  if (unitSize == 0) {
    unitSize += unitStep;
  }

    for (let i = 1; i <= height - MARGIN * 2; i += planeStep) {
      planeDraw(width / 2 - unitSize / 2 + i % unitSize, MARGIN + i);

    }
    for (let i = 1; i <= height - MARGIN * 2; i += planeStep) {
      push();
      planeDraw(width/2 + unitSize / 2 - i % unitSize, MARGIN + i);
      pop();
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
