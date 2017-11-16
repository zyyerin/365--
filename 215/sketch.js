let num;
let intervalX;
let bubbleR;
let sw;
let numLimit;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  stroke(255);
  frameRate(24);

  // initializing variable
  num = 0;
  bubbleR = 200;
  numLimit = random(10, 20);
}

function draw() {
  background(0);
  let sw = intervalX/3;
  intervalX = bubbleR/num;
  let offset = frameCount*0.07;


  if (num < numLimit){ num ++; }

  strokeWeight(sw);

  push();
  translate(width/2, height/2);
  rotate(map(mouseY, 0, width, 0, PI));
  for(let i=0; i<num; i++) {
    line(i*intervalX, 0, i*intervalX-offset, sqrt(sq(bubbleR)-sq(i*intervalX)));
  }
  for(let i=0; i<num; i++) {
    line(i*intervalX, 0, i*intervalX-offset, -sqrt(sq(bubbleR)-sq(i*intervalX)));
  }
  for(let i=0; i<num; i++) {
    line(-i*intervalX, 0, -i*intervalX-offset, sqrt(sq(bubbleR)-sq(i*intervalX)));
  }
  for(let i=0; i<num; i++) {
    line(-i*intervalX, 0, -i*intervalX-offset, -sqrt(sq(bubbleR)-sq(i*intervalX)));
  }


  rotate(map(mouseX, 0, width, 0, PI));
  for(let i=0; i<num; i++) {
    line(i*intervalX, 0, i*intervalX+offset, sqrt(sq(bubbleR)-sq(i*intervalX)));
  }
  for(let i=0; i<num; i++) {
    line(i*intervalX, 0, i*intervalX+offset, -sqrt(sq(bubbleR)-sq(i*intervalX)));
  }
  for(let i=0; i<num; i++) {
    line(-i*intervalX, 0, -i*intervalX+offset, sqrt(sq(bubbleR)-sq(i*intervalX)));
  }
  for(let i=0; i<num; i++) {
    line(-i*intervalX, 0, -i*intervalX+offset, -sqrt(sq(bubbleR)-sq(i*intervalX)));
  }
  pop();


}
