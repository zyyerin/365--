let cells = [];
const CELL_NUM = 5;
const CELL_W = 80;
const CELL_H = 80;
const CELL_R = 80;

function setup() {
  createCanvas(600, 600);
  noStroke();
  rectMode(CENTER);
  frameRate(12);

  for (let i = 0; i <= CELL_NUM; i++){
    cells.push(new Cell(CELL_R*random(0.8, 1.2), CELL_W, (CELL_NUM+1) * CELL_W, random(0.01, 0.08), random(0.01, 0.04)));
  }
}

function draw() {
  background(255);
  for (let i = 0; i <= CELL_NUM; i++){
      cells[i].display((i+1) * cells[i].w, height/2);
  }
  // noLoop();
}

class Cell {
  constructor(r, w, h, txs, tys) {
    this.r = r;
    this.w = w;
    this.h = h;
    this.txs = txs;
    this.tys = tys;
    this.tx = 1;
    this.ty = 1;
  }

  display(x, y) {
    push();
    translate(x, y);
    noFill();
    stroke(0);
    strokeWeight(40);
    rect(0, 0, this.w, this.h);
    noStroke();
    fill(255);
    ellipse(noise(this.tx)*this.w-this.w/2, noise(this.ty)*this.h-this.h/2, this.r, this.r);
    pop();

    this.update();
  }

  update() {
    this.tx += this.txs;
    this.ty += this.tys;
  }

}
