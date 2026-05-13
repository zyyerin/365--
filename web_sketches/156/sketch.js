// accumulating line strips with greyscale stroke

let a = 0;
let theta_s = 0;

function setup() {
  createCanvas(600, 600, WEBGL);
  background(255);
  noFill();
}

function draw() {
  rotateX(-a * 2);
  rotateY(a);
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

    beta += 0.05;
    stroke(constrain(beta * 100, 0, 255));
    vertex(x, y, z);
  }
  endShape();
}
