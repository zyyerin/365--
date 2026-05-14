// thick semi-transparent curveVertex strokes

let a = 0;
let theta_s = 0;

function setup() {
  createCanvas(600, 600, WEBGL);
  noFill();
  stroke(0, 125);
  strokeWeight(100);
}

function draw() {
  background(255);
  rotateX(a);
  rotateY(a / 3);
  rotateZ(a / 2);
  a += 0.002;
  let beta = 0;
  theta_s += 0.01;

  beginShape();
  while (beta < PI) {
    const r = 100 + 1.0 * sin(6 * beta);
    const theta = theta_s * beta;
    const phi = 0.6 * PI * sin(12 * beta);

    const x = r * cos(phi) * cos(theta);
    const y = r * cos(phi) * sin(theta);
    const z = r * sin(phi);

    beta += 0.005;
    curveVertex(x, y, z);
  }
  endShape();
}
