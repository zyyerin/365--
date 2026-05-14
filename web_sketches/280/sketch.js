// 3D noise field of tiny spheres (step coarsened to keep draw-call count
// under the crash threshold; original 300×300 step 10 = ~30k spheres/frame).

let xstart, ystart, zstart;
let rotateA = 0;
const step = 30; // 300/30 = 10 per axis = 1000 spheres

function setup() {
  createCanvas(300, 300, WEBGL);
  noStroke();
  xstart = random(10);
  ystart = random(10);
  zstart = random(10);
}

function draw() {
  background(0);
  xstart += 0.01;
  ystart += 0.01;
  zstart += 0.01;

  rotateY(rotateA);
  rotateZ(rotateA);
  rotateA += 0.01;

  let xn, yn, zn;
  yn = ystart;
  for (let y = -150; y <= 150; y += step) {
    yn += 0.1;
    xn = xstart;
    for (let x = -150; x <= 150; x += step) {
      xn += 0.1;
      zn = zstart;
      for (let z = -150; z <= 150; z += step) {
        zn += 0.1;
        const nf = noise(xn, yn, zn);
        push();
        translate(x, y, z);
        fill(255, 200);
        sphere(nf * 6, 4, 4);
        pop();
      }
    }
  }
}
