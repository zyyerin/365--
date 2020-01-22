// NOC 3.3 - simple harmonica motion

const AMP_MIN = 30;
const PADDING = 60;
let amplitude = AMP_MIN;
let a = 0, a2 = 0;
let astep = 0.0003, astep2 = 0.0003;

let r = 3; // radius of the ndoe
let intervalScale = .1;
let total;

function setup() {
  createCanvas(600, 600);
  total = Math.round((width-PADDING*2)/r)/intervalScale-1;
}

function draw() {
  // background setup
  background(255);
  gridDisplay(10);

  translate(width/2, PADDING);

  a += astep;
  a2 += astep2;

  astep = map(mouseX, 0, width, 0, 0.0003);
  astep2 = map(mouseY, 0, height, 0, 0.0003);

  fill(0);
  strokeWeight(.5);
  // noStroke();

  for(let i=1; i<total; i++) {
    let interval = i * r * intervalScale;
    let x = amplitude * sin(a*i);
    let x2 = amplitude * sin(a2*i);

    ellipse(x, interval, r, r);
    ellipse(x2, interval, r, r);
    ellipse(x+x2, interval, r, r);
  }


}


function gridDisplay(gridSize) {
  stroke(0);
  strokeWeight(0.1);
  for(let x=gridSize/2; x<width; x+=gridSize) {
    line(x, 0, x, height);
  }
  for(let y=gridSize/2; y<height; y+=gridSize) {
    line(0, y, width, y);
  }
}
