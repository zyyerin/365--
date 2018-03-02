let cam;

let phi = 0;
let n = 0;
let c = 0;
let w = 10;
const total = 600;

let theta = 0;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight, WEBGL);
  angleMode(DEGREES);

  cam = createEasyCam();
  cam.setRotation([0.5, 0.5, 0.5, 0.05]);

  noStroke();
  fill(0);
}

function draw() {
  background(255);

  c = map(sin(theta), -1, 1, 9, 10);
  theta += 1;

  push();
  for (let i=1; i<=total; i++) {
    phi = i * 137.5;
    let r = c * sqrt(i);
    let x = r * cos(phi);
    let y = r * sin(phi);
    let z = sin(theta)/10;
    w = map(i, 0, total, 3, 0.5);

    translate(x, y, z);
    sphere(w);
  }
  pop();

}
