// 2D noise grid of rotating outlined circles — mouseX = rotation, mouseY = size

let xstart, xnoise, ynoise;

function setup() {
  createCanvas(600, 600);
  xstart = random(10);
  xnoise = xstart;
  ynoise = random(10);
}

function draw() {
  background(0);

  for (let y = 0; y <= height; y += 10) {
    ynoise += 0.1;
    xnoise = xstart;
    for (let x = 0; x <= width; x += 10) {
      xnoise += 0.1;
      drawPoint(x, y, noise(xnoise, ynoise));
    }
  }
}

function drawPoint(x, y, nf) {
  push();
  translate(x, y);
  rotate(nf * radians(mouseX));
  noFill();
  stroke(255, nf * 255);
  strokeWeight(5 * nf);
  const len = map(mouseY, 0, height, 0, 50);
  ellipse(0, 0, len, len);
  pop();
}
