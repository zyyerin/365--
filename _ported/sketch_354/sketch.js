// NoC c3 — single long rect with accelerating rotation; flips to white after a turn

let a = 0;
let aVel = 0;
const aAcc = 0.001;

function setup() {
  createCanvas(640, 360);
  background(255);
}

function draw() {
  a += aVel;
  aVel += aAcc;

  rectMode(CENTER);
  push();
  translate(width / 2, height / 2);
  rotate(a);
  if (a >= 100) {
    noStroke();
    fill(255, 100);
  } else {
    stroke(0, 100);
    noFill();
  }
  rect(0, 0, height * 2.5, height / 16);
  pop();
}
