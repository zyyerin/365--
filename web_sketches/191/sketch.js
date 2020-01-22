let locs = [];
let t = [];
let t2 = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  fill(0);
}

function draw() {
  background(255);

  for (let i = 0; i < 4; i++) {
    t[i] = frameCount / ((i + 1) * 30);
    t2[i] = frameCount / ((i + 1) * 35);
    locs[i] = createVector(noise(t[i]) * width / 4, noise(t2[i]) * height / 4);
  }

  beginShape();
  vertex(width / 2 - locs[3].y, height / 2 + locs[3].x);
  vertex(width / 2 + locs[2].y, height / 2 + locs[2].x);
  vertex(width / 2 + locs[1].y, height / 2 - locs[1].x);
  vertex(width / 2 - locs[0].y, height / 2 - locs[0].x);
  endShape(CLOSE);

}
