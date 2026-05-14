// 2D noise field of rotating circles — drifting noise seeds, grayscale fill

let xstart, ystart;

function setup() {
  createCanvas(600, 600);
  background(0);
  xstart = random(10);
  ystart = random(10);
}

function draw() {
  background(0);

  ystart += random(-0.1, 0.1);
  let yn = ystart;
  for (let y = 0; y <= height; y += 5) {
    yn += random(0.1, 0.2);
    xstart += random(-0.1, 0.1);
    let xn = xstart;
    for (let x = 0; x <= width; x += 5) {
      xn += random(0.1, 0.2);
      drawPoint(x, y, noise(xn, yn));
    }
  }
}

function drawPoint(x, y, nf) {
  push();
  translate(x, y);
  rotate(nf * radians(540));
  const edge = (nf * x) / 10;
  const grey = nf * 255;
  noStroke();
  fill(grey);
  ellipse(0, 0, edge, edge);
  pop();
}
