// rotating parametric line strip with stroke weight tied to phi

let a = 0;
let theta_s = 0;

function setup() {
  createCanvas(600, 600, WEBGL);
  background(255);
  noFill();
  stroke(0);
}

function draw() {
  background(255);
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

    const x = r * cos(phi) * sin(theta);
    const y = r * cos(phi) * cos(theta);
    const z = r * sin(phi);

    beta += 0.05;
    strokeWeight(constrain(beta * Math.abs(phi), 0.5, 6));
    vertex(x, y, z);
  }
  endShape();
}
