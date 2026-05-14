// pure mouse-driven mesh — no audio, fixed grid spacing, mouseX/Y offset cubes

const noc_x = 14;
const noc_y = 14;
const cubeS = 10;
let xstep, ystep;

function setup() {
  createCanvas(600, 600);
  noStroke();
  xstep = width / (noc_x - 1);
  ystep = height / (noc_y - 1);
}

function draw() {
  background(255);
  const mx = map(mouseX, 0, width, -cubeS, cubeS);
  const my = map(mouseY, 0, height, -cubeS, cubeS);
  drawMesh(cubeS, mx, my, xstep, ystep, color(0));
}

function drawMesh(cubeS, mx, my, xstep, ystep, meshClr) {
  const s = cubeS + mx + my;
  let posX = 0;
  let posY = 0;
  const cubes = [];
  for (let i = 0; i < noc_x * noc_y; i++) {
    const a1 = { x: mx + posX, y: posY };
    const a2 = { x: s + posX + mx, y: posY + my };
    const a3 = { x: s + posX + mx, y: s + posY + my };
    const a4 = { x: mx + posX, y: s + posY + my };
    cubes.push([a1, a2, a3, a4]);
    posX += xstep;
    if (i % noc_x === noc_x - 1) {
      posY += ystep;
      posX = 0;
    }
  }

  noFill();
  stroke(meshClr);
  strokeWeight(1);
  for (const c of cubes) {
    beginShape();
    vertex(c[0].x, c[0].y);
    vertex(c[1].x, c[1].y);
    vertex(c[2].x, c[2].y);
    vertex(c[3].x, c[3].y);
    endShape(CLOSE);
  }

  for (let i = 1; i < cubes.length; i++) {
    const ca = cubes[i - 1];
    const cb = cubes[i];
    if (ca[0].y === cb[0].y) {
      beginShape();
      vertex(ca[1].x, ca[1].y);
      vertex(cb[0].x, cb[0].y);
      vertex(cb[3].x, cb[3].y);
      vertex(ca[2].x, ca[2].y);
      endShape(CLOSE);
    }
  }
  for (let i = noc_x; i < cubes.length; i++) {
    const ca = cubes[i - noc_x];
    const cb = cubes[i];
    beginShape();
    vertex(ca[3].x, ca[3].y);
    vertex(ca[2].x, ca[2].y);
    vertex(cb[1].x, cb[1].y);
    vertex(cb[0].x, cb[0].y);
    endShape(CLOSE);
  }
}
