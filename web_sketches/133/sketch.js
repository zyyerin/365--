// glitch / pixel-shift effect over an upscaled screenshot

let img;

function preload() {
  img = loadImage('imgs/source.png');
}

function setup() {
  createCanvas(600, 600);
  pixelDensity(1);
  noSmooth();
}

function draw() {
  background(255);
  image(img, 0, 0, img.width * 14, img.height * 14);

  loadPixels();
  const len = pixels.length / 4;
  for (let i = 52; i < len - 52; i++) {
    const j = i + (int(random(-52, 52)));
    const a = i * 4;
    const b = j * 4;
    pixels[a] = pixels[b];
    pixels[a + 1] = pixels[b + 1];
    pixels[a + 2] = pixels[b + 2];
    pixels[a + 3] = pixels[b + 3];
  }
  updatePixels();
}
