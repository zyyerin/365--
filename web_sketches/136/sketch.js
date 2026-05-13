// two lines from a fixed point — to a fixed target and to the cursor

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);

  const a = createVector(22, 222);
  const b = createVector(342, 81);
  const m = createVector(mouseX, mouseY);

  strokeWeight(2);
  stroke(0);
  line(a.x, a.y, b.x, b.y);
  line(a.x, a.y, m.x, m.y);
  fill(0);
}
