// noise-displaced sphere mesh

let cam;
const total = 100;
const radius = 100;
let loc = [];
let t = 0;

function setup() {
  createCanvas(600, 600, WEBGL);
  cam = createEasyCam({ distance: 500 });

  stroke(0);
  strokeWeight(0.5);
  fill(240);

  for (let i = 0; i <= total; i++) loc[i] = [];
}

function draw() {
  background(255);
  ambientLight(80);
  directionalLight(200, 200, 200, 0.5, 0.5, -1);
  directionalLight(120, 120, 120, -0.5, -0.5, 1);

  t += 0.0005;

  for (let i = 0; i <= total; i++) {
    const latitude = map(i, 0, total, 0, PI);
    for (let j = 0; j <= total; j++) {
      const longitude = map(j, 0, total, 0, TWO_PI);
      const x = sin(latitude) * cos(longitude) * radius;
      const y = sin(latitude) * sin(longitude) * radius;
      const z = cos(latitude) * radius;
      const ox = noise(t * x) * 20;
      const oy = noise(t * y) * 20;
      const oz = noise(t * z) * 20;
      loc[i][j] = createVector(x + ox, y + oy, z + oz);
    }
  }

  for (let i = 0; i < total; i++) {
    beginShape(TRIANGLE_STRIP);
    for (let j = 0; j <= total; j++) {
      const v1 = loc[i][j];
      const v2 = loc[i + 1][j];
      vertex(v1.x, v1.y, v1.z);
      vertex(v2.x, v2.y, v2.z);
    }
    endShape();
  }
}
