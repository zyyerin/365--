// thick translucent strokes painting a slowly-oscillating diagonal line

let a = 0;

function setup() {
  createCanvas(600, 600);
  background(255);
}

function draw() {
  a += 0.03;
  const h = map(sin(a), -1, 1, 270, width - 270);
  const w = map(cos(a), -1, 1, 250, width - 250);
  noFill();
  stroke(0, 10);
  strokeWeight(20);
  line(w, height / 2, h, height - 40);
}
