// rotating parametric line strip

let a = 0;
let theta_s = 0;

function setup() {
  createCanvas(600, 600, WEBGL);
  noFill();
  stroke(0);
  strokeWeight(2);
}

function draw() {
  background(255);
  rotateY(a);
  rotateZ(a);
  a += 0.005;
  let beta = 0;
  theta_s += 0.01;

  beginShape();
  while (beta < PI) {
    const r = 150 + 1.6 * sin(6 * beta);
    const theta = theta_s * beta;
    const phi = 0.6 * PI * sin(12 * beta);

    const x = r * cos(phi) * cos(theta);
    const y = r * cos(phi) * sin(theta);
    const z = r * sin(theta);

    beta += 0.001;
    vertex(x, y, z);
  }
  endShape();
}
