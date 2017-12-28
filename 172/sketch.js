let yoff = 0;

function setup() {
  createCanvas(600, 600);
  noFill();
  strokeWeight(0.1);
}

function draw() {
  beginShape();

  let xoff = 0;       // Option #1: 2D Noise
  // let xoff = yoff; // Option #2: 1D Noise

  for (let x = 0; x <= width; x += width/10) {
    let y = map(noise(xoff, yoff), 0, 1, 200,300);

    // Option #2: 1D Noise
    // let y = map(noise(xoff), 0, 1, 200,300);

    curveVertex(x, y);
    curveVertex(x, y);
    curveVertex(x, y);
    curveVertex(x, y);
    // Increment x dimension for noise
    xoff += 10;
  }
  // increment y dimension for noise
  yoff += 0.01;
  endShape();
}
