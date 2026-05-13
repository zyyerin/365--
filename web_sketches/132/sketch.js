// 2D wave propagation simulation; click/drag to disturb the surface

let z, v, a;

function setup() {
  createCanvas(600, 600);
  pixelDensity(1);
  background(255);
  z = makeGrid(width, height);
  v = makeGrid(width, height);
  a = makeGrid(width, height);
  loadPixels();
}

function makeGrid(w, h) {
  const g = new Float32Array(w * h);
  return g;
}

function draw() {
  const w = width;
  const h = height;

  // compute acceleration
  for (let x = 1; x < w - 1; x++) {
    for (let y = 1; y < h - 1; y++) {
      a[x * h + y] = (v[(x - 1) * h + y] + v[(x + 1) * h + y] + v[x * h + (y - 1)] + v[x * h + (y + 1)]) / 4 - v[x * h + y];
    }
  }

  // integrate + render
  for (let x = 10; x < w - 10; x++) {
    for (let y = 10; y < h - 10; y++) {
      const idx = x * h + y;
      v[idx] += a[idx];
      z[idx] += v[idx];
      const c = Math.max(0, Math.min(255, Math.cos(z[idx]) * 255));
      const pi = 4 * (x + y * w);
      pixels[pi] = c;
      pixels[pi + 1] = c;
      pixels[pi + 2] = c;
      pixels[pi + 3] = 255;
    }
  }
  updatePixels();
}

function move() {
  if (mouseX > -1 && mouseX < width && mouseY > -1 && mouseY < height) {
    v[mouseX * height + mouseY] = randomGaussian() * TAU * 0.1;
  }
}

function mouseClicked() { move(); }
function mouseDragged() { move(); }
