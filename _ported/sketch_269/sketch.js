// Game-of-Life-like cellular automaton — wrapped torus, value 0..N+

const cellSize = 4;
let numX, numY;
let cells; // flat Uint16 grid of states
let next;  // next-state buffer
let sizes; // animation size per cell

function setup() {
  createCanvas(300, 300);
  noStroke();
  numX = floor(width / cellSize);
  numY = floor(height / cellSize);
  restart();
}

function restart() {
  cells = new Int16Array(numX * numY);
  next = new Int16Array(numX * numY);
  sizes = new Float32Array(numX * numY);
  for (let i = 0; i < cells.length; i++) {
    cells[i] = Math.round(random(10));
  }
}

function draw() {
  background(255);

  // calc next state
  for (let x = 0; x < numX; x++) {
    for (let y = 0; y < numY; y++) {
      const idx = x * numY + y;
      const state = cells[idx];
      // count live neighbors (state==1) including self
      let live = state === 1 ? 1 : 0;
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          if (dx === 0 && dy === 0) continue;
          const nx = (x + dx + numX) % numX;
          const ny = (y + dy + numY) % numY;
          if (cells[nx * numY + ny] === 1) live++;
        }
      }
      let n;
      if (live >= state) n = state + live;
      else n = state - live;
      next[idx] = n;
      sizes[idx] += (n - state) / 4;
    }
  }

  // swap & render
  for (let x = 0; x < numX; x++) {
    for (let y = 0; y < numY; y++) {
      const idx = x * numY + y;
      cells[idx] = next[idx];
      const state = next[idx];
      if (state === 0) fill(255);
      else fill(0, map(state, 0, 100, 0, 255));
      const sz = sizes[idx] * 3;
      ellipse(x * cellSize + cellSize / 2, y * cellSize + cellSize / 2, sz, sz);
    }
  }
}

function mousePressed() {
  if (mouseX < 0 || mouseY < 0 || mouseX > width || mouseY > height) return;
  restart();
}
