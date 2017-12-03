let capture;
const STEP_SIZE = 20;
const MARGIN = 50;

function setup() {
  createCanvas(400, 400);
    capture = createCapture(VIDEO);
    capture.size(400, 400);
    capture.hide();
    frameRate(48);

}

function draw() {
  fill(255, 100);
  noStroke();
  rect(0, 0, width, height);
  capture.loadPixels();

  fill(0);
  for (let y=MARGIN; y<height-MARGIN; y+=STEP_SIZE) {
    for (let x=MARGIN; x<width-MARGIN; x+=STEP_SIZE) {
      let i = (y * width + x)*4;
      let darkness = (255 - capture.pixels[i]) / 255;
      let radius = STEP_SIZE * darkness * 0.5;
      let a = map(darkness, 0, 255, -180, 180);
      push();
      translate(x, y);
      rotate(a);
      stroke(0);
      strokeWeight(2);
      line(0, -radius-20, 0, radius-20);
      pop();
    }
  }

}
