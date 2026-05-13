// parametric line traces; original drove `s` via mic amplitude — here a
// synthesized noise/sine signal stands in (browser sandboxes block mic).

let a = 0;
let theta_s = 0;
const scaleFactor = 600;
const smooth_factor = 0.1;
let sum = 0;

function setup() {
  createCanvas(600, 600, WEBGL);
  noFill();
  stroke(0);
  strokeWeight(0.5);
}

function draw() {
  background(255);

  const fakeAmp = 0.3 + 0.25 * sin(frameCount * 0.04) + 0.15 * noise(frameCount * 0.02);
  sum += (fakeAmp - sum) * smooth_factor;
  const s = sum * scaleFactor;

  rotateY(a);
  a += 0.005;
  let beta = 0;
  theta_s += 0.01;

  beginShape();
  while (beta < PI) {
    const r = 100 + 1.6 * sin(6 * beta);
    const theta = theta_s * beta;
    const phi = 0.6 * PI * sin(12 * beta);

    const x = s * cos(phi) * cos(theta);
    const y = s * cos(phi) * sin(theta);
    const z = r * cos(theta);

    beta += 0.01;
    vertex(x, y, z);
    vertex(y, x, z);
    vertex(y, z, x);
    vertex(z, y, x);
    vertex(z, x, y);
    vertex(x, z, y);
  }
  endShape();
}
