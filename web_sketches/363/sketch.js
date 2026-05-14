// 50 slowly-growing wireframe boxes rotating around the canvas center

let bubbles = [];

function setup() {
  createCanvas(666, 666);
  background(0);
  for (let i = 0; i < 50; i++) bubbles.push(new Bubble());
}

function draw() {
  fill(0, 10);
  noStroke();
  filter(BLUR, 1);
  rect(0, height / 2, width, height);

  for (const b of bubbles) b.display();
}

class Bubble {
  constructor() {
    this.size = randomGaussian() * 50 - 10;
    this.soff = 1;
  }
  display() {
    noFill();
    stroke(255);
    this.soff += 0.01;
    strokeWeight(0.01);
    if (this.size <= width * 3) this.size += noise(this.soff);

    push();
    translate(width / 2, height / 2);
    rotate(noise(this.soff) * 0.5);
    translate(-width / 2, -height / 2);
    rectMode(CENTER);
    rect(width / 2, height / 2, this.size, this.size);
    pop();
  }
}
