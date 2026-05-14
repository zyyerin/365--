// 3D noise sphere — point cloud + offset triangle strip

let cam;
const total = 100;
const radius = 100;
let loc = [];

let t1, t2, t3;
let theta = 0;

function setup() {
  createCanvas(600, 600, WEBGL);
  cam = createEasyCam({ distance: 250 });

  noFill();
  stroke(0);
  strokeWeight(1);

  for (let i = 0; i <= total; i++) loc[i] = [];

  t1 = random(10);
  t2 = random(10);
  t3 = random(10);
}

function draw() {
  background(255);

  t1 += 0.0005;
  t2 += 0.0004;
  t3 += 0.0003;
  theta += 0.01;

  for (let i = 0; i <= total; i += 3) {
    const latitude = map(i, 0, total, 0, PI);
    for (let j = 0; j <= total; j++) {
      const longitude = map(j, 0, total, 0, TWO_PI);
      const x = sin(latitude) * cos(longitude) * radius;
      const y = sin(latitude) * sin(longitude) * radius;
      const z = cos(latitude) * radius;
      const off = createVector(
        noise(t1 * x, t1 * y, t1 * z),
        noise(t2 * y, t2 * x, t2 * z),
        noise(t3 * x, t3 * y, t3 * z)
      );
      loc[i][j] = createVector(x + off.x, y + off.y, z + off.z);
    }
  }

  push();
  rotateX(-theta / 5);
  rotateY(-theta / 5);
  rotateZ(-theta / 5);
  strokeWeight(3);
  for (let i = 0; i < total; i += 3) {
    for (let j = 0; j <= total; j++) {
      const v1 = loc[i][j];
      point(v1.x, v1.y, v1.z);
    }
  }
  pop();

  push();
  rotateX(theta);
  for (let i = 0; i < total - 3; i += 3) {
    strokeWeight(1);
    beginShape(TRIANGLE_STRIP);
    for (let j = 0; j <= total; j += 20) {
      const v1 = loc[i][j];
      const v2 = loc[i + 3][j];
      vertex(v1.x * 0.3, v1.y * 0.3, v1.z * 0.3);
      vertex(v2.x * 0.3, v2.y * 0.3, v2.z * 0.3);
    }
    endShape(CLOSE);
  }
  pop();
}
