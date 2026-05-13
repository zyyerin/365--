// Top-N word frequency comparison: Moby Dick vs Pride and Prejudice.
// mouseY sets the number of top words shown.

let mobyText, ppText;
let mobyCounts = []; // [[word, count], ...] sorted desc
let ppCounts = [];
let viewSize = 10;

function preload() {
  mobyText = loadStrings('data/mobydick.txt');
  ppText = loadStrings('data/PrideAndPrejudice.txt');
}

function setup() {
  createCanvas(400, 400);
  textAlign(CENTER);
  fill(0);
  noStroke();

  mobyCounts = countWords(mobyText.join(' '));
  ppCounts = countWords(ppText.join(' '));
}

function countWords(text) {
  const map = new Map();
  const tokens = text.toLowerCase().split(/[\s,.!?:;()*"“”‘’\-—]+/);
  for (const w of tokens) {
    if (!w) continue;
    map.set(w, (map.get(w) || 0) + 1);
  }
  const arr = [...map.entries()];
  arr.sort((a, b) => b[1] - a[1]);
  return arr;
}

function draw() {
  background(255);
  viewSize = floor(map(mouseY, 0, height, 1, 200));
  viewSize = constrain(viewSize, 1, mobyCounts.length);

  fill(0);
  textAlign(CENTER);
  textStyle(NORMAL);
  textSize(12);
  text('TOP ' + viewSize + ' WORDS IN', width / 2, 25);
  textStyle(ITALIC);
  text('MOBY DICK', width / 2, 40);
  textStyle(NORMAL);
  text('PRIDE AND PREJUDICE', width / 2, 55);

  drawSeries(mobyCounts, viewSize, true);
  drawSeries(ppCounts, viewSize, false);
}

function drawSeries(arr, n, italic) {
  let preX = 0, preY = 0;
  textStyle(italic ? ITALIC : NORMAL);
  for (let i = 0; i < n; i++) {
    const [w, count] = arr[i];
    const x = map(i, 0, n, 15, width + 10);
    const y = map(count, 1000, 14010, height - 10, 70);

    stroke(0);
    noFill();
    if (preX !== 0) line(preX, preY, x, y);
    noStroke();
    fill(0);
    text(w, x + 8, y - 5);

    preX = x; preY = y;
  }
}
