// growing translucent ellipse on the left edge + center pulse — day 1 of 365

let bubbles;
let radius = 0;
let t = 1;
let sizeO;
let bFill = 0;

function setup() {
  createCanvas(666, 666);
  background(255);
  sizeO = random(400, 666);
  bubbles = new Bubble(0, height / 2, 50);
}

function draw() {
  fill(255, 10);
  filter(BLUR, 1);
  rect(0, 0, width, height);

  t += 0.01;
  radius = noise(t) * sizeO;

  bubbles.display();
  bubbles.grow();

  noStroke();
  fill(bFill, 200);
  ellipse(width / 2, height / 2, radius, radius);

  if (bubbles.size <= width + radius && bubbles.size >= width - radius) {
    bFill = random(255);
  } else {
    bFill = 0;
  }
}

class Bubble {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.soff = 1;
  }
  display() {
    noStroke();
    fill(255, 100);
    this.grow();
    ellipse(this.x, this.y, this.size, this.size);
  }
  grow() {
    if (this.size <= width * 3) this.size += noise(this.soff) * 5;
  }
}
