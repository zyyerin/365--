// two fixed-size meshes layered (sizes 10 + 14), red + white on black

const noc_x = 20;
const noc_y = 20;

function setup() {
  createCanvas(600, 600);
  noLoop();
}

function draw() {
  background(0);
  drawMesh(10, 1, color(255, 0, 0), color(255, 150));
  drawMesh(14, 1, color(255), color(255, 150));
}

function drawMesh(cubeSize, sw, cubeClr, connClr) {
  const xstep = width / (noc_x - 1);
  const ystep = height / (noc_y - 1);
  const cubes = [];
  let posX = 0;
  let posY = 0;
  for (let i = 0; i < noc_x * noc_y; i++) {
    cubes.push([
      { x: posX, y: posY },
      { x: cubeSize + posX, y: posY },
      { x: cubeSize + posX, y: cubeSize + posY },
      { x: posX, y: cubeSize + posY },
    ]);
    posX += xstep;
    if (i % noc_x === noc_x - 1) {
      posY += ystep;
      posX = 0;
    }
  }

  noFill();
  stroke(cubeClr);
  strokeWeight(sw);
  for (const c of cubes) {
    beginShape();
    vertex(c[0].x, c[0].y);
    vertex(c[1].x, c[1].y);
    vertex(c[2].x, c[2].y);
    vertex(c[3].x, c[3].y);
    endShape(CLOSE);
  }

  stroke(connClr);
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
