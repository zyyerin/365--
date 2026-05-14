// stripe + ellipse grid with accelerating step sizes; "310--" caption

function setup() {
  createCanvas(600, 600);
  noLoop();
}

function draw() {
  background(0);
  fill(255);
  noStroke();
  textSize(16);
  text('310--', 24, 36);

  fill(255, 100);
  rectMode(CENTER);
  ellipseMode(CENTER);

  let xstep = 40;
  let ystep = 20;

  for (let x = xstep / 2; x < width; x += xstep) {
    const swidth = xstep / 2;
    const sheight = ystep / 2;

    rect(x, height / 2, swidth, height);
    const y = x;
    rect(width / 2, y, width, sheight);

    for (let ey = ystep / 2; ey < height; ey += ystep) {
      ellipse(x, ey, swidth, sheight);
    }

    xstep += 1;
    ystep += 5;
  }
}
