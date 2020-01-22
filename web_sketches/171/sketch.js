let yoff = 0;
let sw = 1;

function setup() {
  createCanvas(600, 600);
  noFill();
}

function draw() {
  sw += 0.005;
  strokeWeight(sw);

  background(255);
  beginShape();

  let xoff = 0;       // Option #1: 2D Noise
  // let xoff = yoff; // Option #2: 1D Noise

  for (let x = 0; x <= width; x += sw) {
    let y = map(noise(xoff, yoff), 0, 1, 200,300);

    // Option #2: 1D Noise
    // let y = map(noise(xoff), 0, 1, 200,300);

    curveVertex(x, height-y*cos(x));
    curveVertex(x, y*sin(x));
    // Increment x dimension for noise
    xoff += 10;
  }
  // increment y dimension for noise
  yoff += 0.01;
  endShape();
}
