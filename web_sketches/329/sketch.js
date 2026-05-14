// inverse of 328 — pixel grid lines grow over time as gridx/y increase

let coff = 0.1;
let gridx = 1;
let gridy = 1;

function setup() {
  createCanvas(600, 600);
  pixelDensity(1);
}

function draw() {
  coff += 0.05;
  background(0);
  loadPixels();
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const idx = 4 * (x + y * width);
      let c;
      if (x % gridx === 0 || y % gridy === 0) {
        c = random(noise(coff) * 255);
      } else {
        c = 255 - random(noise(coff) * 255);
      }
      pixels[idx] = c;
      pixels[idx + 1] = c;
      pixels[idx + 2] = c;
      pixels[idx + 3] = 255;
    }
  }
  updatePixels();

  gridx++;
  gridy++;
}
