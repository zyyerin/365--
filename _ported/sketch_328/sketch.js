// pixel grid that shrinks each frame — gridx/y decrement creates fading bands

let coff = 0.1;
let gridx, gridy;

function setup() {
  createCanvas(600, 600);
  pixelDensity(1);
  background(0);
  gridx = width;
  gridy = height;
}

function draw() {
  coff += 0.05;
  loadPixels();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const idx = 4 * (x + y * width);
      let c;
      if (gridy * gridx !== 0 && (x % gridx === 0 || y % gridy === 0)) {
        c = 255;
      } else {
        c = noise(coff) * 255;
      }
      pixels[idx] = c;
      pixels[idx + 1] = c;
      pixels[idx + 2] = c;
      pixels[idx + 3] = 255;
    }
  }
  updatePixels();

  gridx -= 2;
  gridy -= 5;
  if (gridx <= 0 || gridy <= 0) noLoop();
}
