let num = 200;
let base = 80;
let a = 20;
function setup() {
  createCanvas(400, 400);
  noStroke();
  noFill();
  stroke(0, 10);
}

function draw() {
  background(255);
  a += 0.02;
  for (let i = 1; i < num-1; i++) {
    strokeWeight(a%i*5);
    push();
    translate(i*width/num, i*height/num);
    rotate(i*a*0.01);
    leaf(base);
    pop();
  }
}

function leaf(b) {
  beginShape();
  curveVertex(mouseY, 0);
  curveVertex(0, mouseX);
  curveVertex(-b, b*3);
  curveVertex(0, b*4);
  curveVertex(b, b*3);
  endShape(CLOSE);
}
