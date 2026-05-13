// Floyd-Steinberg dithering with random factor

let original;
let img;
const base = 30;

function preload() {
  original = loadImage('imgs/Artboard2.png');
}

function setup() {
  createCanvas(600, 600);
  pixelDensity(1);
  background(255);
  original.filter(GRAY);
}

function index(x, y, w) {
  return 4 * (x + y * w);
}

function draw() {
  img = original.get();
  img.loadPixels();
  const w = img.width;
  const h = img.height;
  const px = img.pixels;

  for (let y = 0; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const factor = round(random(10, 20));
      const i = index(x, y, w);
      const rOld = px[i];
      const newR = round((factor * rOld) / 255) * (255 / factor);
      px[i] = newR;
      px[i + 1] = newR;
      px[i + 2] = newR;

      const errR = rOld - newR;

      const i1 = index(x + 1, y, w);
      px[i1] += (errR * 7) / base;
      px[i1 + 1] = px[i1];
      px[i1 + 2] = px[i1];

      const i2 = index(x - 1, y + 1, w);
      px[i2] += (errR * 5) / base;
      px[i2 + 1] = px[i2];
      px[i2 + 2] = px[i2];

      const i3 = index(x, y + 1, w);
      px[i3] += (errR * 3) / base;
      px[i3 + 1] = px[i3];
      px[i3 + 2] = px[i3];

      const i4 = index(x + 1, y + 1, w);
      px[i4] += (errR * 1) / base;
      px[i4 + 1] = px[i4];
      px[i4 + 2] = px[i4];
    }
  }
  img.updatePixels();
  image(img, 0, 0, width, height);
}
