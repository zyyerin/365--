// random-sized grid of noise-driven cubes — grid dimensions chosen once at
// setup (in [10, 50] to keep cube count <2500 and avoid an empty grid).

let noc_x, noc_y;
let xstep, ystep;
let offset = 0.01;

function setup() {
  createCanvas(600, 600);
  noStroke();
  noc_x = floor(random(10, 50));
  noc_y = floor(random(10, 50));
  xstep = width / (noc_x - 1);
  ystep = height / (noc_y - 1);
}

function draw() {
  background(255);
  const cubes = [];
  const total = noc_x * noc_y;
  let posX = 0;
  let posY = 0;

  for (let i = 0; i < total; i++) {
    const s = 30 * noise(offset);
    cubes.push([
      { x: posX, y: posY },
      { x: s + posX, y: posY },
      { x: s + posX, y: s + posY },
      { x: posX, y: s + posY },
    ]);
    offset += 0.0001;
    posX += xstep + random(1);
    if (i % noc_x === noc_x - 1) {
      posY += ystep + random(1);
      posX = 0;
    }
  }

  noFill();
  stroke(0);
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
