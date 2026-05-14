// expanding noisy curve from center — radius grows slowly each frame

let r = 0;

function setup() {
  createCanvas(600, 600);
  background(255);
}

function draw() {
  const cx = width / 2;
  const cy = height / 2;

  let noiseval = random(10);

  beginShape();
  for (let ang = 0; ang <= 360; ang += random(1)) {
    const a = map(r, 0, 100, 0, 300);
    fill(255, a);
    stroke(0, 255 - a);
    strokeWeight(1);
    noiseval += 0.1;
    const radVar = customNoise(noiseval);
    const thisR = r + radVar;
    const rad = radians(ang);
    const x = cx + thisR * cos(rad);
    const y = cy + thisR * sin(rad);
    curveVertex(x, y);
    if (r < 100) r += 0.001;
  }
  endShape(CLOSE);
}

function customNoise(value) {
  return Math.pow(sin(value), 0.5);
}
