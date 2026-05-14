// cellular automaton drawn as vertical strips — strip height scales with neighbor count.
// Click to restart.

const cellSize = 2;
let numX, numY;
let state, next, live;

function setup() {
  createCanvas(300, 300);
  numX = floor(width / cellSize);
  numY = floor(height / cellSize);
  restart();
}

function restart() {
  state = new Uint8Array(numX * numY);
  next = new Uint8Array(numX * numY);
  live = new Uint8Array(numX * numY);
  for (let i = 0; i < state.length; i++) state[i] = random(2) > 1 ? 1 : 0;
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
      let n = l <= 4 ? 0 : 1;
      if (l === 3 || l === 6) n = 1 - n;
      next[idx] = n;
      live[idx] = l;
    }
  }
}

function draw() {
  background(255);
  calcNext();

  push();
  rectMode(CENTER);
  translate(cellSize / 2, cellSize / 2);
  noStroke();
  for (let x = 0; x < numX; x++) {
    for (let y = 0; y < numY; y++) {
      const idx = x * numY + y;
      state[idx] = next[idx];
      fill(state[idx] === 1 ? 0 : 255);
      const h = 4 * cellSize * live[idx];
      rect(x * cellSize + random(-1, 1), y * cellSize, 1, h);
    }
  }
  pop();
}

function mousePressed() {
  if (mouseX < 0 || mouseY < 0 || mouseX > width || mouseY > height) return;
  restart();
}
