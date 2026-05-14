// stripe + ellipse grid — ystep accumulates each iteration (expanding bands)

function setup() {
  createCanvas(600, 600);
  background(0);
  fill(255);
  noStroke();
  textSize(16);
  text('309--', 24, 36);

  let xstep = random(10, 30);
  let ystep = random(10, 30);

  fill(255, 100);

  for (let x = 0; x < width; x += xstep) {
    const swidth = xstep / 2;
    const sheight = ystep / 2;

    rect(x, 0, swidth, height);

    const y = x;
    rect(0, y, width, sheight);

    ellipseMode(CORNER);
    for (let ex = 0; ex < width; ex += xstep) {
      ellipse(ex, y, swidth, sheight);
    }

    ystep += 5;
  }

  noLoop();
}

function draw() {}
