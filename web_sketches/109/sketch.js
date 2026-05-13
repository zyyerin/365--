// 3D supershape mesh

let cam;
const total = 75;
const radius = 100;
let loc = [];

const a = 1;
const b = 1;
let m, mb;
let m1, m2, m1g, m2g;
let n1, n2, n3;
let n1b, n2b, n3b;
let mStep, mStepb;

function setup() {
  createCanvas(600, 600, WEBGL);
  ortho();
  cam = createEasyCam({ distance: 500 });

  noFill();
  stroke(0);

  for (let i = 0; i <= total; i++) loc[i] = [];

  m = random(10);
  mb = random(10);
  m1g = random(20);
  m2g = random(20);
  n1 = random(10);
  n2 = random(10);
  n3 = random(10);
  n1b = random(10);
  n2b = random(10);
  n3b = random(10);
  mStep = random(-0.04, 0.04);
  mStepb = random(-0.04, 0.04);
}

function update() {
  m += mStep;
  m1 = map(sin(m), -1, 1, 0, m1g);
  mb += mStepb;
  m2 = map(sin(mb), -1, 1, 0, m2g);
}

function draw() {
  background(255);
  update();

  for (let i = 0; i <= total; i++) {
    const phi = map(i, 0, total, -HALF_PI, HALF_PI);
    for (let j = 0; j <= total; j++) {
      const theta = map(j, 0, total, -PI, PI);
      const r1 = supershape(theta, m1, n1, n2, n3);
      const r2 = supershape(phi, m2, n1b, n2b, n3b);
      const x = r1 * cos(theta) * r2 * cos(phi) * radius;
      const y = r1 * sin(theta) * r2 * cos(phi) * radius;
      const z = r2 * sin(phi) * radius;
      loc[i][j] = createVector(x, y, z);
    }
  }

  for (let i = 0; i < total; i++) {
    beginShape();
    for (let j = 0; j <= total; j++) {
      const v1 = loc[i][j];
      const v2 = loc[i + 1][j];
      vertex(v1.x, v1.y, v1.z);
      vertex(v2.x, v2.y, v2.z);
    }
    endShape();
  }
}

function supershape(theta, _m, _n1, _n2, _n3) {
  const t1 = pow(abs(cos((_m * theta) / 4) / a), _n2);
  const t2 = pow(abs(sin((_m * theta) / 4) / b), _n3);
  return pow(t1 + t2, -1 / _n1);
}
