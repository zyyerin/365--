const scribble = new Scribble();              // global mode

let num;
let intervalX;
let bubbleR;
let sw;
let numLimit;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  stroke(255);
  frameRate(48);

  // initializing variable
  num = 0;
  bubbleR = height/6;
  numLimit = 5;
}

function draw() {
  // background(0);
  fill(0, 100);
  rect(0, 0, width, height);
  noFill();
  let sw = intervalX/4;
  intervalX = bubbleR/num;
  let offset = 0;

  if (num < numLimit){ num ++; }

  strokeWeight(sw);

  push();
  translate(mouseX, mouseY);
  rotate(map(mouseY, 0, height, 0, PI));
  for(let i=-num; i<num; i++) {
    scribble.scribbleLine(i*intervalX, sqrt(sq(bubbleR)-sq(i*intervalX)), i*intervalX-offset, -sqrt(sq(bubbleR)-sq(i*intervalX)));
  }
  rotate(map(mouseX, 0, width, 0, PI));
  for(let i=-num; i<num; i++) {
    scribble.scribbleLine(i*intervalX, sqrt(sq(bubbleR)-sq(i*intervalX)), i*intervalX-offset, -sqrt(sq(bubbleR)-sq(i*intervalX)));
  }

  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
