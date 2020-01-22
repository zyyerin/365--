let tree;
let angle;
let len = 100;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angle = PI / 4;

  tree = [];
  let a = createVector(width / 2, height/2 + len/2);
  let b = createVector(width / 2, height/2 - len/2);
  let root = new Branch(a, b);

  tree[0] = root;
}

function mousePressed() {
  for (let i = tree.length-1; i >= 0; i--) {
    print(i);
      tree.push(tree[i].branching());
      tree[i].finished = true;
  }
}


function draw() {
  background(255);
  for (let i = 0; i < tree.length; i++) {
    if(!tree[i].finished){
      tree[i].display();
      tree[i].jitter();
    }
  }
}


class Branch {
  constructor(begin, end) {
    this.begin = begin;
    this.end = end;
    this.finished = false;
  }

  display() {
    stroke(0);
    line(this.begin.x, this.begin.y, this.end.x, this.end.y);
  }

  branching() {
    let dir = p5.Vector.sub(this.end, this.begin);
    dir.rotate(random(TWO_PI));
    // dir.mult(0.67);
    let newEnd = p5.Vector.add(this.end, dir);
    let b = new Branch(this.end, newEnd);
    return b;
  }

  jitter() {
    this.end.x += random(-1,1);
    this.end.y += random(-1,1);
  }
}
