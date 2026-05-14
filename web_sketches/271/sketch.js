// cellular automaton — int-state cells drawn as ellipses, novel update rule.
// Toroidal 8-neighbor grid; click to restart.

const cellSize = 2;
let numX, numY;
let state, next, live;

function setup() {
  createCanvas(300, 300);
  noStroke();
  numX = floor(width / cellSize);
  numY = floor(height / cellSize);
  restart();
}

function restart() {
  state = new Int16Array(numX * numY);
  next = new Int16Array(numX * numY);
  live = new Int16Array(numX * numY);
  for (let i = 0; i < state.length; i++) state[i] = random(2) > 1 ? 1 : 2;
}

function calcNext() {
  for (let x = 0; x < numX; x++) {
    for (let y = 0; y < numY; y++) {
      const idx = x * numY + y;
      const s = state[idx];
      let l = s === 1 ? 1 : 0;
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          if (dx === 0 && dy === 0) continue;
          const nx = (x + dx + numX) % numX;
          const ny = (y + dy + numY) % numY;
          if (state[nx * numY + ny] === 1) l++;
        }
      }
      // original rule from the .pde: net result of the two if-blocks
      // is `nextState = (liveCount <= 4) ? liveCount : 1`
      next[idx] = l <= 4 ? l : 1;
      live[idx] = l;
    }
  }
}

function draw() {
  background(255);
  calcNext();

  push();
  translate(cellSize / 2, cellSize / 2);
  for (let x = 0; x < numX; x++) {
    for (let y = 0; y < numY; y++) {
      const idx = x * numY + y;
      state[idx] = next[idx];
      const s = state[idx];
      fill(s === 1 ? 255 : 0);
      ellipse(x * cellSize, y * cellSize, cellSize + 10, cellSize + 10);
    }
  }
  pop();
}

function mousePressed() {
  if (mouseX < 0 || mouseY < 0 || mouseX > width || mouseY > height) return;
  restart();
}
