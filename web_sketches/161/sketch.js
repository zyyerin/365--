let cells = [];
let t1, t2;
const CELL_NUM = 10;

function setup() {
  createCanvas(600, 600);
  noStroke();
  rectMode(CENTER);
  frameRate(12);

  let cellS = width/(CELL_NUM*2+1);
  let coreS = cellS/2;

  for (let i = 0; i <= CELL_NUM; i++){
    cells.push(new Cell(coreS, cellS));
  }
}

function draw() {
  background(255);
  for (let i = 0; i <= CELL_NUM; i++){
    cells[i].display((i+1) * cells[i].s * 2, height/2);
  }
  // noLoop();
}

class Cell {
  constructor(r, s) {
    this.r = r;
    this.s = s;
  }

  display(x, y) {
    push();
    translate(x, y);
    fill(0);
    rect(0, 0, this.s, this.s);
    fill(255);
    ellipse(random(this.s), random(this.s), this.r, this.r);
    pop();
  }

}
