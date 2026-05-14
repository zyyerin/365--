// dynamic mesh of cube quads with horizontal + vertical "connection" quads
// between them. mouseX = cube/conn size offset, mouseY = cube/conn weight.

const noc_x = 20;
const noc_y = 20;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);
  const cubeS1 = map(mouseX, 0, width, 0, 50);
  const cubeS2 = map(mouseY, 0, height, 0, 50);
  const sw1 = map(mouseX, 0, width, 0, 10);
  const sw2 = map(mouseY, 0, height, 0, 10);

  push();
  translate(-width / 2, 0);
  drawMesh(cubeS1, sw1, color(0), color(0, 150));
  drawMesh(cubeS2, sw2, color(0), color(0, 150));
  pop();
}

function drawMesh(cubeSize, cubeStrokeWeight, cubeClr, connClr) {
  const mx = map(mouseX, 0, width, 0, 200);
  const xstep = map(mouseX, 0, width, 50, 20);
  const ystep = map(mouseY, 0, height, 50, 20);

  // build cube corner positions for the grid (a1..a4 per cube)
  const cubes = []; // array of [a1, a2, a3, a4] where each is {x, y}
  let posX = 0;
  let posY = 0;
  for (let i = 0; i < noc_x * noc_y; i++) {
    const s = cubeSize + mx;
    const a1 = { x: mx + posX, y: posY };
    const a2 = { x: s + posX + mx, y: posY + mx };
    const a3 = { x: s + posX + mx, y: s + posY + mx };
    const a4 = { x: mx + posX, y: s + posY + mx };
    cubes.push([a1, a2, a3, a4]);

    posX += xstep;
    if (i % noc_x === noc_x - 1) {
      posY += ystep;
      posX = 0;
    }
  }

  // draw cubes
  noFill();
  stroke(cubeClr);
  strokeWeight(cubeStrokeWeight);
  for (const c of cubes) {
    beginShape();
    vertex(c[0].x, c[0].y);
    vertex(c[1].x, c[1].y);
    vertex(c[2].x, c[2].y);
    vertex(c[3].x, c[3].y);
    endShape(CLOSE);
  }

  // X connections (horizontal pairs in the same row)
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

  // Y connections (vertical pairs across rows)
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
