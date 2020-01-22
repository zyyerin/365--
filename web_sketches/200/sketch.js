// based on 283
let xstart;
let xnoise;
let ynoise;
const num = 5;
const margin = 20;

function setup() {
  createCanvas(600, 200);
  noStroke();
  xstart = random(10);
  xnoise = xstart;
  ynoise = random(10);
}

function draw() {
  background(255);
  for (let i = 0; i <= num - 1; i++) {
    unit(noise(frameCount/400*(i+1))*width, margin, margin+i * width / num, (i + 1) * width / num, (i+1)*3, (i+1)*3, 0.0001*i, 0.0001*i);
  }
}

function unit(ybegin, yend, xbegin, xend, ystep, xstep, ynstep, xnstep) {
  for (let y = ybegin; y > yend; y -= ystep) {
    ynoise += ynstep;
    xnoise = xstart;
    for (let x = xbegin; x < xend; x += xstep) {
      xnoise += xnstep;
      drawPoint(x, y, noise(xnoise, ynoise));
    }
  }
}

function drawPoint(x, y, noiseFactor) {
  push();
  translate(x, y);
  let len = noiseFactor * 6;
  fill(0);
  ellipse(0, 0, len, len);
  pop();
}
