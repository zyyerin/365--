let angle;
let astep = 0.001;
let aswitch = true;
let slider;

function setup() {
  createCanvas(windowWidth, windowHeight);
  stroke(0, 60);
  angle = PI/15;
  // slider = createSlider(0, TWO_PI, PI/2, 0.01);
}

function draw() {
  background(255);
  // angle = slider.value();
  translate(width / 2, height / 2);
  branch(1);
  if (angle > PI / 12 || angle < PI/15) {
    astep = -astep;
  }
  angle += astep;
}

function branch(len) {
  line(0, 0, 0, -len);
  translate(0, -len);

  if (len < height / 12) {
    push();
    rotate(angle);
    branch(len * 1.3);
    pop();

    push();
    rotate(-angle);
    branch(len * 1.65);
    pop();
  }
}
