let yoff = 0;
let sw = 1;

function setup() {
  createCanvas(600, 600);
  noFill();
  strokeWeight(0.1);

}

function draw() {
  sw += 0.0001;
  // sw = map(mouseX, 0, width, 5, 1);
  // background(255);
  beginShape();

  let xoff = 0; // Option #1: 2D Noise
  // let xoff = yoff; // Option #2: 1D Noise
  stroke(0);
  for (let x = 0; x <= width; x += sw) {
    let y = map(noise(xoff, yoff), 0, 1, 200, 300);

    // Option #2: 1D Noise
    // let y = map(noise(xoff), 0, 1, 200,300);

    curveVertex(height - y * cos(x), x);
    curveVertex(y * cos(x), x);

    curveVertex(x, height - y * sin(x));
    curveVertex(x, y * sin(x));

  }

  endShape();
  // increment y dimension for noise
  yoff += 0.01;
  xoff += 10;



  beginShape();
  // let xoff = yoff; // Option #2: 1D Noise
  stroke(255);
  for (let x = 0; x <= width; x += sw) {
    let y = map(noise(xoff, yoff), 0, 1, 200, 300);

    // Option #2: 1D Noise
    // let y = map(noise(xoff), 0, 1, 200,300);

    curveVertex(x, height - y * sin(x));
    curveVertex(x, y * sin(x));
  }

  // increment y dimension for noise
  endShape();

}
