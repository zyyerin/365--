// classic Conway's Game of Life — B3/S23 — on a toroidal grid. Click to restart.

const cellSize = 2;
let numX, numY;
let state, next;

function setup() {
  createCanvas(300, 300);
  numX = floor(width / cellSize);
  numY = floor(height / cellSize);
  restart();
}

function restart() {
  state = new Uint8Array(numX * numY);
  next = new Uint8Array(numX * numY);
  for (let i = 0; i < state.length; i++) state[i] = random(2) > 1 ? 1 : 0;
}

function calcNext() {
  for (let x = 0; x < numX; x++) {
    for (let y = 0; y < numY; y++) {
      const idx = x * numY + y;
      let l = 0;
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          if (dx === 0 && dy === 0) continue;
          const nx = (x + dx + numX) % numX;
          const ny = (y + dy + numY) % numY;
          if (state[nx * numY + ny] === 1) l++;
        }
      }
      const alive = state[idx] === 1;
      let n;
      if (alive) n = l === 2 || l === 3 ? 1 : 0;
      else n = l === 3 ? 1 : 0;
      next[idx] = n;
    }
  }
}

function draw() {
  background(0);
  calcNext();

  push();
  rectMode(CENTER);
  translate(cellSize / 2, cellSize / 2);
  stroke(0);
  for (let x = 0; x < numX; x++) {
    for (let y = 0; y < numY; y++) {
      const idx = x * numY + y;
      state[idx] = next[idx];
      fill(state[idx] === 1 ? 255 : 0);
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
  pop();
}

function mousePressed() {
  if (mouseX < 0 || mouseY < 0 || mouseX > width || mouseY > height) return;
  restart();
}
