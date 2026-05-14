// NoC c3 polar coordinates — rotating rect spiraling around a wandering center

let recs = 20;
let r = 50, roff = 1;
let a = 0, aVel = 0;
const aAcc = 0.0001;
let loc;

function setup() {
  createCanvas(640, 360);
  background(255);
  loc = createVector(0, height / 2);
}

function draw() {
  stroke(255);
  r = noise(roff) * 100;
  roff += 0.01;
  a += aVel;
  aVel += aAcc;

  const lxoff = noise(roff) * 5;
  loc.x += lxoff;
  if (loc.x > width) loc.x = 0;

  push();
  translate(loc.x, loc.y);
  const x = r * cos(a);
  const y = r * sin(a);
  rotate(a);
  if (recs >= height) fill(255, 20);
  else fill(0);
  rect(x, y, recs, recs);
  pop();

  recs += 0.5;
}
