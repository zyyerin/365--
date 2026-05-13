// === Bubble.pde ===
class Bubble {
  size;
  x, y;
  soff= 1;

  constructor(x_, y_, size_) {
    size = random(400, width);
    x = x_;
    y = y_;
    size = size_;
  }

  display() {
    noStroke();
    fill(255, 100);
    grow();
    ellipse(x, y, size, size);
  }

  grow() {
    //soff += .1;
    //size = noise(soff)*size;
    if (size <= width*3) {
      size += noise(soff)*5;
    }
  }
  
}

// === sketch_365.pde ===
// 2017-02-27

let radius;
let t= 1;
let sizeO= random(400, width);
let bFill, alpha;
Bubble bubbles;

function setup() {
  size(666, 666);
  smooth();
  background(255);

  bubbles = new Bubble(0, height/2, 50);
  bFill = 0;
  alpha = 100;
}

function draw() {
  //fade
  fill(255, 10);
  filter(BLUR, 1);
  rect(0, 0, width, height);      

  // size
  t += .01;
  radius = noise(t) * sizeO;

  bubbles.display();
  bubbles.grow();

  //draw
  noStroke();
  fill(bFill, 200);
  ellipse(width/2, height/2, radius, radius);

  if (bubbles.size <= width + radius && bubbles.size >= width - radius) {
    bFill = random(255);
    filter(BLUR, 0);
  } else {
    bFill = 0; 
    filter(BLUR, 1);
  }
}