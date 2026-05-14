// 13×13 grid of pulsing ellipses + spectrum bar graph. Original drove both
// amplitude and FFT from mic input — substituted with synthetic signals
// (browser sandbox blocks mic). The FFT-style spectrum here is a smoothed
// noise field per band.

const BANDS = 200;
const sum = new Float32Array(BANDS);
const noisos = [];

function setup() {
  createCanvas(700, 700);
  for (let i = 0; i < 169; i++) noisos.push(new Noiso());
}

function draw() {
  background(255);
  noStroke();
  fill(0);

  // synthetic amplitude — slow sine + perlin drift
  const fakeAmp = 0.3 + 0.25 * sin(frameCount * 0.04) + 0.15 * noise(frameCount * 0.02);

  const step = 50;
  let posx = step, posy = step;
  for (const n of noisos) {
    n.display(fakeAmp, posx, posy);
    posx += step;
    if (posx > width - step) {
      posx = step;
      posy += step;
    }
  }

  // synthetic FFT-style spectrum: noise per band, smoothed
  stroke(0);
  strokeWeight(2);
  for (let i = 0; i < BANDS; i++) {
    const target = noise(i * 0.05, frameCount * 0.02) * (1 - i / BANDS);
    sum[i] += (target - sum[i]) * 0.2;
    const x = (i / BANDS) * width;
    line(x, height, x, height - sum[i] * height * 5);
  }
}

class Noiso {
  constructor() {
    this.scale = 5;
    this.smooth_factor = 0.25;
    this.sum = 0;
  }

  display(ampIn, posx, posy) {
    this.sum += (ampIn - this.sum) * this.smooth_factor;
    const s = this.sum * (width / 2) * this.scale;
    ellipse(posx, posy, s, s);
  }
}
