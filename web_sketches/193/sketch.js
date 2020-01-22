let capture;
const STEP_SIZE = 10;


function setup() {
  createCanvas(400, 400);
    capture = createCapture(VIDEO);
    capture.size(400, 400);
    capture.hide();
    noStroke();

}

function draw() {
  background(255);
  capture.loadPixels();

  fill(0, 5);
  for (let y=0; y<height; y+=STEP_SIZE) {
    for (let x=0; x<width; x+=STEP_SIZE) {
      let i = (y * width + x)*4;
      let darkness = (255 - capture.pixels[i]) / 255;
      let radius = STEP_SIZE * darkness * 19;

      ellipse(x, y, radius, radius);
    }
  }

}
