// parametric box trail; original drove `s` via mic amplitude — here a
// synthesized noise/sine signal stands in (browser sandboxes block mic).

let a = 0;
let theta_s = 0;
const ampScale = 5;
const smooth_factor = 0.1;
let sum = 0;

function setup() {
  createCanvas(600, 600, WEBGL);
  noFill();
  stroke(0);
  strokeWeight(0.4);
}

function draw() {
  background(255);

  const fakeAmp = 0.3 + 0.25 * sin(frameCount * 0.04) + 0.15 * noise(frameCount * 0.02);
  sum += (fakeAmp - sum) * smooth_factor;
  const s = sum * (width / 10) * ampScale;

  rotateX(a);
  rotateY(a);
  a += 0.005;
  let beta = 0;
  theta_s += 0.01;

  while (beta < PI) {
    const r = 100 * s + 1.6 * sin(6 * beta);
    const theta = theta_s * beta;
    const phi = 0.6 * PI * sin(12 * beta);

    const x = r * cos(phi) * cos(theta);
    const y = r * cos(phi) * sin(theta);
    const z = r * cos(theta);

    beta += 0.005;
    box(x, y, z);
  }
}
