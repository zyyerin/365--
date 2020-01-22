let cols, rows;
const W = 30;
let grid = [];
let current;
let stack = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // frameRate(5);

  cols = floor(width / W)+1;
  rows = floor(height / W)+1;

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let cell = new Cell(i, j);
      grid.push(cell);
    };
  };

  current = grid[0];
}

function draw() {
  // background(255);
  for (let i = 0; i < grid.length; i++) {
    grid[i].show();
  }
  current.visited = true;
  current.highlight();
  let next = current.checkNeighbors();
  if (next) {
    // STEP 2
    stack.push(current);
    // STEP 3
    removeWalls(current, next);
    // STEP 4
    current = next;
  } else {
    current = stack.pop();
  }
}

function index(i, j) {
  if (i < 0 || j < 0 || i > cols || j > rows) {
    return -1;
  } else {
    return i + j * cols;
  }

}

class Cell {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true];
    this.visited = false;
  }

  checkNeighbors() {
    let neighbors = [];
    let top = grid[index(this.i, this.j - 1)];
    let right = grid[index(this.i + 1, this.j)];
    let bottom = grid[index(this.i, this.j + 1)];
    let left = grid[index(this.i - 1, this.j)];

    if (top && !top.visited) {
      neighbors.push(top);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }
    console.log(neighbors);
    if (neighbors.length > 0) {
      let idx = floor(random(0, neighbors.length));
      return neighbors[idx];
    } else {
      return undefined;
    }
  }

  show() {
    let x = this.i * W;
    let y = this.j * W;
    stroke(0);
    strokeWeight(5);

    if (this.walls[0]) {
      line(x, y, x + W, y);
    };
    if (this.walls[1]) {
      line(x + W, y, x + W, y + W);
    };
    if (this.walls[2]) {
      line(x, y + W, x + W, y + W);
    };
    if (this.walls[3]) {
      line(x, y, x, y + W);
    };

    if (this.visited) {
      noStroke();
      fill(255, 20);
      rect(x, y, W, W);
    }
  }
  highlight() {
    let x = this.i * W;
    let y = this.j * W;
    fill(0);
    noStroke();
    ellipse(x-W/2, y-W/2, W/2, W/2);
  }
}

function removeWalls(a, b){
  let x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }

  let y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}
