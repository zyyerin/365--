// stripe + ellipse grid — widths step at the canvas midpoint; slight rotation jitter

const xstep = 30;
const ystep = 30;

function setup() {
  createCanvas(600, 600);
  background(0);
  fill(255);
  noStroke();
  textSize(16);
  text('308--', 24, 36);

  fill(255, 100);
  const offset = 0.7;

  for (let x = xstep / 2; x < width; x += xstep) {
    const swidth = x > width / 2 ? xstep / 2 : xstep / 4;

    push();
    rotate(radians(random(-offset, offset)));
    rect(x, 0, swidth, height);
    pop();

    const y = x;
    const sheight = y < height / 2 ? ystep / 2 : ystep / 4;

    push();
    rotate(radians(random(-offset, offset)));
    rect(0, y, width, sheight);
    pop();

    ellipseMode(CORNER);
    for (let ex = xstep / 2; ex < width; ex += xstep) {
      const ew = ex > width / 2 ? xstep / 2 : xstep / 4;
      push();
      rotate(radians(random(-offset, offset)));
      ellipse(ex, y, ew, sheight);
      pop();
    }
  }

  noLoop();
}

function draw() {}
