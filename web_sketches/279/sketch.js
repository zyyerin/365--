// 3D noise field of wireframe boxes — mouse controls the position and rotation.

let xstart, ystart, zstart;
let xnoise, ynoise, znoise;
let rotX = 0, rotY = 0, rz = 0;
const spacing = 120;

function setup() {
  createCanvas(600, 600, WEBGL);
  noFill();
  xstart = random(10);
  ystart = random(10);
  zstart = random(10);
}

function draw() {
  background(255);

  xstart += 0.01;
  ystart += 0.01;
  zstart += 0.01;

  xnoise = xstart;
  ynoise = ystart;
  znoise = zstart;

  push();
  // mouse drives position in xz plane (y locked to half-height)
  translate(mouseX - width / 2, 0, mouseY - height / 2);
  rotateY(-rotY);
  rotateX(-rotX);
  rotateZ(rz);
  rz += 0.001;
  rotX = 0.01 * mouseX;
  rotY = 0.01 * mouseY;

  for (let y = 0; y <= height / 2; y += 50) {
    ynoise += 0.1;
    xnoise = xstart;
    for (let x = 0; x <= width / 2; x += 50) {
      xnoise += 0.1;
      znoise = zstart;
      for (let z = 0; z <= 300; z += 50) {
        znoise += 0.1;
        drawPoint(x, y, z, noise(xnoise, ynoise, znoise));
      }
    }
  }
  pop();
}

function drawPoint(x, y, z, nf) {
  push();
  translate(x, y, z);
  const sw = map(nf, 0, 1, 0, 10);
  stroke(0, 200);
  strokeWeight(sw);
  noFill();
  box(spacing, spacing, spacing);
  pop();
}
