const a = 80;
const b = 80;
const planeStep = 7;
const MARGIN = 200;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
  stroke(0);
  strokeWeight(4);
}

function draw() {
  background(random(255));
  stroke(random(255));
  for(let i=1; i <= height-MARGIN*2; i+=planeStep){
    planeDraw(width/2-5+i%10, MARGIN+i);
  }

}

function planeDraw(x, y){
  push();
  translate(x, y);
  beginShape();
  // vertex(b, 0);
  vertex(b, 0);
  vertex(0, a);
  vertex(-b, 0);
  vertex(0, -a);
  // vertex(0, -a);
  endShape(CLOSE);
  pop();
}
