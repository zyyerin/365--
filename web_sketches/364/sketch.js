// two growing bubble circles (top + bottom) + center ellipse with shifting fill

let bubbles, bubbles2;
let radius = 0;
let t = 1;
let sizeO;
let bFill = 0;
const dist1 = 942;

function setup() {
  createCanvas(666, 666);
  background(0);
  sizeO = random(400, 666);
  const bubbleS = random(40, 80);
  bubbles = new Bubble(width / 2, 0, bubbleS);
  bubbles2 = new Bubble(width / 2, height, bubbleS);
}

function draw() {
  const val = randomGaussian();
  const sd = 5;
  const x = val * sd + 100;

  fill(0, 5);
  filter(BLUR, 1);
  rect(0, 0, width, height);

  t += 0.01;
  radius = noise(t) * sizeO;

  bubbles.display();
  bubbles.grow();
  bubbles2.display();
  bubbles2.grow();

  noStroke();
  fill(bFill, 200);
  ellipse(width / 2, height / 2, radius, radius);

  if (bubbles.size <= dist1 + radius && bubbles.size >= dist1 - radius) bFill = 0;
  else if (bubbles.size >= dist1 + radius) bFill = 0;
  else bFill = x;
}

class Bubble {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.soff = 1;
  }
  display() {
    strokeWeight(1);
    stroke(255);
    noFill();
    this.grow();
    ellipse(this.x, this.y, this.size, this.size);
  }
  grow() {
    if (this.size <= width * 3) this.size += noise(this.soff) * 5;
  }
}
