// random-step stripe + dot grid; "311--" caption

function setup() {
  createCanvas(600, 600);
  noLoop();
}

function draw() {
  background(0);
  fill(255);
  noStroke();
  textSize(16);
  text('311--', 24, 36);

  fill(255, 150);
  rectMode(CENTER);
  ellipseMode(CENTER);

  const xstep = floor(random(30, 50));
  const ystep = floor(random(30, 50));

  for (let x = 0; x < width; x += xstep) {
    const y = x;
    rect(width / 2, y, width, ystep / 2);
    const swidth = xstep / 2;
    rect(x, height / 2, swidth, height);
    ellipse(x, y, swidth, swidth);
  }
}
