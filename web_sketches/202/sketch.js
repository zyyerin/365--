let tree = [];
let count = 0;
let branchLim;
let angleStep;
function setup() {
  createCanvas(windowWidth, windowHeight);
  branchLim = random(10, 100);
  angleStep = random(PI/3, PI);
  let a = createVector(width / 2, height/2+5);
  let b = createVector(width / 2, height/2-5);
  let root = new Branch(a, b);

  tree[0] = root;

}

function pushTree() {
  for (let i = tree.length - 1; i >= 0; i--) {
    if (!tree[i].finished && i<200) {
      for(let j=0; j<tree[i].branching().length; j++){
        tree.push(tree[i].branching()[j]);
      }
    }
    tree[i].finished = true;
  }
}

function draw() {
  background(255);

  pushTree();

  for (let i = 1; i < tree.length; i++) {
    let sw = map(i, tree.length, 0, 0, 255);
    stroke(sw, 125);
    tree[i].show();
  }
}


class Branch {
  constructor(begin, end) {
    this.begin = begin;
    this.end = end;
    this.finished = false;
  }

  show() {
    // stroke(0);
    strokeWeight(10);
    line(this.begin.x, this.begin.y, this.end.x, this.end.y);
    this.begin.add(random(-1,1),random(-1,1));
    // this.end.add(random(-1,1));
  }

  branching(){
    let branches = [];
    let dir = p5.Vector.sub(this.end, this.begin);
    for (let a=0; a<=TWO_PI; a+=angleStep) {
      let newDir = dir.copy().rotate(a).mult(random(1, 1.4));
      let newEnd = p5.Vector.add(this.end, newDir);
      branches.push(new Branch(this.end, newEnd));
    }
    return branches;
  }
}
