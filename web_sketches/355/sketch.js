// Trefoil knot surface textured by an offscreen graphics buffer (different
// parameters from sketch_143 — bigger surface, finer mesh, directional light)

let pg;
const mesh = [];
const ny = 3;
const nx = 500;
const s = 300;

function setup() {
  createCanvas(600, 600, WEBGL);
  noStroke();
  pg = createGraphics(300, 512);
  pg.background(255, 50);
  pg.noStroke();
  pg.fill(0, 10);

  buildTrefoil();
}

function buildTrefoil() {
  for (let j = 0; j < nx; j++) {
    const u0 = j / nx;
    const u1 = (j + 1) / nx;
    for (let i = 0; i < ny; i++) {
      const v0 = i / ny;
      const v1 = (i + 1) / ny;
      const p0 = evalPoint(u0, v0);
      const p1 = evalPoint(u0, v1);
      const p2 = evalPoint(u1, v1);
      const p3 = evalPoint(u1, v0);
      mesh.push([s * p0.x, s * p0.y, s * p0.z, u0, v0]);
      mesh.push([s * p1.x, s * p1.y, s * p1.z, u0, v1]);
      mesh.push([s * p2.x, s * p2.y, s * p2.z, u1, v1]);
      mesh.push([s * p0.x, s * p0.y, s * p0.z, u0, v0]);
      mesh.push([s * p2.x, s * p2.y, s * p2.z, u1, v1]);
      mesh.push([s * p3.x, s * p3.y, s * p3.z, u1, v0]);
    }
  }
}

function draw() {
  background(255);
  pg.ellipse(random(pg.width), random(pg.height), 40, 1);

  directionalLight(255, 255, 255, 1, 0, 0);

  push();
  rotateY(frameCount * 0.01);
  texture(pg);
  beginShape(TRIANGLES);
  for (const v of mesh) vertex(v[0], v[1], v[2], v[3], v[4]);
  endShape();
  pop();
}

function evalPoint(u, v) {
  const a = 0.5, b = 0.3, c = 0.5, d = 0.1;
  const sP = TWO_PI * u;
  const t = TWO_PI * (1 - v) * 2;
  const r = a + b * cos(1.5 * t);
  const x = r * cos(t);
  const y = r * sin(t);
  const z = c * sin(1.5 * t);
  const dvx = -1.5 * b * sin(1.5 * t) * cos(t) - (a + b * cos(1.5 * t)) * sin(t);
  const dvy = -1.5 * b * sin(1.5 * t) * sin(t) + (a + b * cos(1.5 * t)) * cos(t);
  const dvz = 1.5 * c * cos(1.5 * t);
  const dv = createVector(dvx, dvy, dvz);
  dv.normalize();
  const qvn = createVector(dv.y, -dv.x, 0);
  qvn.normalize();
  const ww = dv.cross(qvn);
  return {
    x: x + d * (qvn.x * cos(sP) + ww.x * sin(sP)),
    y: y + d * (qvn.y * cos(sP) + ww.y * sin(sP)),
    z: z + d * ww.z * sin(sP),
  };
}
