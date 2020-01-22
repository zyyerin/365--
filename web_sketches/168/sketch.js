let num = 30;
let base = 90;

function setup() {
  createCanvas(600, 600);
  noStroke();
  noFill();
  stroke(0);
}

function draw() {
  background(255);
  base += 0.003;
  for (let i = 1; i < num-1; i++) {
    push();
    translate(i*width/num, i*height/num);
    rotate(i*base);
    leaf(base);
    pop();
  }
}

function leaf(b) {
  beginShape();
  curveVertex(0, 0);
  curveVertex(0, 0);
  curveVertex(-b, b*3);
  curveVertex(0, b*4);
  curveVertex(b, b*3);
  endShape(CLOSE);
}
