// Stream of Moby Dick words, rotating around the page center

let lines;
let words = [];
let index = 0;
let textY = 10;

function preload() {
  lines = loadStrings('data/mobydick.txt');
}

function setup() {
  createCanvas(600, 600);
  background(255);
  fill(0);
  textAlign(CENTER);
  textStyle(ITALIC);
  textSize(10);

  const body = lines.join(' ');
  words = body.split(/[\s,.!?:;]+/).filter(Boolean);
}

function draw() {
  if (index >= words.length) {
    noLoop();
    return;
  }

  push();
  translate(width / 2, textY);
  rotate(Math.floor(words.length / 360) * index);
  text(words[index].toUpperCase(), 0, 0);
  pop();

  textY += 12;
  if (textY > height) textY = 10;

  index++;
}
