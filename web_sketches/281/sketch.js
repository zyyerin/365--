// 2D noise field of wireframe spheres on a slanted plane (z = -y).
// Step coarsened from 5 to 15 to keep ~1600 draw calls (original would have
// been ~14400 — past the crash threshold).

let xstart, ystart;
const step = 15;

function setup() {
  createCanvas(600, 600, WEBGL);
  noFill();
  xstart = random(10);
  ystart = random(10);
}

function draw() {
  background(0);
  xstart += 0.01;
  ystart += 0.01;

  let xn, yn = ystart;
  for (let y = 0; y <= height; y += step) {
    yn += 0.1;
    xn = xstart;
    for (let x = 0; x <= width; x += step) {
      xn += random(0.1, 0.2);
      const nf = noise(xn, yn);
      const sphereS = nf * 50;
      const grey = nf * 255;
      push();
      // recenter to WEBGL origin
      translate(x - width / 2, height / 2 - 150 - y, -y);
      stroke(255, grey);
      noFill();
      sphere(sphereS, 4, 4);
      pop();
    }
  }
}
