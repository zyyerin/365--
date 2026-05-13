// nested rectangles with alternating x/y shear

let t;
let tstep;
const num = 40;

function setup() {
  createCanvas(600, 600);
  rectMode(CENTER);
  noStroke();
  t = 0.01;
  tstep = 0.01;
}

function draw() {
  background(255);
  translate(width / 2, height / 2);

  for (let i = num; i > 0; i--) {
    if (i % 2 === 0) {
      fill(0);
      shearX(t);
    } else {
      fill(255);
      shearY(t);
    }
    rect(0, 0, i * 10, i * 10);
  }

  if (t > TWO_PI) t -= TWO_PI;
  t += tstep;
}
