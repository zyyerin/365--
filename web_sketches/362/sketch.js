// 3 rotating "bubble" rectangles + extra ellipse cross-pattern in the center

let bubbles = [];
let t = 1;

function setup() {
  createCanvas(666, 666);
  background(255);
  for (let i = 0; i < 3; i++) bubbles.push(new Bubble());
}

function draw() {
  noFill();
  stroke(255, 125);
  filter(BLUR, 0.8);

  for (const b of bubbles) b.display();

  stroke(255);
  noFill();
  ellipse(width / 2, height / 2, 0, bubbles[0].size);
  ellipse(width / 2, height / 2, bubbles[1].size, 0);
  ellipse(width / 2, height / 2, bubbles[0].size, bubbles[1].size);
}

class Bubble {
  constructor() {
    this.size = randomGaussian() * width / 3 - 10;
    this.soff = random(-2, 2);
  }
  display() {
    fill(0, 5);
    stroke(0);
    this.soff += 0.01;
    strokeWeight(0.01);
    if (this.size <= width * 3) this.size += noise(this.soff) * 5;
    push();
    translate(width / 2, height / 2);
    rotate(noise(this.soff) * 5);
    translate(-width / 2, -height / 2);
    rectMode(CENTER);
    rect(width / 2, height / 2, this.size, this.size);
    pop();
  }
}
