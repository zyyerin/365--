let imgs = [];
const TOTAL = 13;

function preload() {
  for (let i = 1; i <= TOTAL; i++) {
    imgs.push(loadImage(`imgs/${i}.png`));
  }
}

function setup() {
  createCanvas(800, 800);
  pixelDensity(2);
  background(255);

  const imgw = 1860;
  const imgh = imgw * 0.0625 * 9;

  tint(255, 100);
  for (let i = 0; i < TOTAL; i++) {
    image(imgs[i], -10, -160, imgw, imgh);
  }
  noLoop();
}
