let a = 1;
const b = 200;
const planeStep = 15;
const MARGIN = 200;
let unitSize, unitStep;

function setup() {
  createCanvas(600, 600);
  noFill();
  stroke(0);
  strokeWeight(10);
  angleMode(DEGREES);

  unitSize = 0;
  unitStep = 1;

}

function draw() {
  background(255);

  if (unitSize <= 0 || unitSize > width-MARGIN) {
    unitStep *= -1;
  }

  if (unitSize == 0) {
    unitSize += unitStep;
  }
  for (let i = 1; i <= height - MARGIN * 2; i += planeStep) {
    if(a<b){
      a += 0.05;
    }
    strokeWeight(10-i/10);

    planeDraw(width / 4 - unitSize / 2 + i % unitSize, MARGIN + i);
    planeDraw(width / 4 * 2 - unitSize / 2 + i % unitSize, MARGIN + i);
    planeDraw(width / 4 * 3 - unitSize / 2 + i % unitSize, MARGIN + i);
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

function mouseDragged() {
  a *= 0.9;
}
