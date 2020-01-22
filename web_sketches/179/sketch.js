let a = 30;
let b = 100;
const planeStep = 5;

function setup() {
  createCanvas(600, 600);
  noFill();
  stroke(0);
  strokeWeight(3);
}

function draw() {
  background(255);

  for(let i=0; i < 300; i+=planeStep){
    planeDraw(width/2+i%50, height/4+i);
  }

}

function planeDraw(x, y){
  push();
  translate(x, y);
  beginShape();
  vertex(b, 0);
  vertex(0, a);
  vertex(-b, 0);
  vertex(0, -a);
  endShape();
  pop();
}
