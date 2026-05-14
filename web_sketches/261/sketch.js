// progressive build-up of "1000 Greatest Fictions" — each frame adds another row

let table;
let sampleSize = 0;

function preload() {
  table = loadTable('data/greatestBooksFic.csv', 'csv', 'header');
}

function setup() {
  createCanvas(600, 600);
  textAlign(CENTER);
  noStroke();
}

function draw() {
  background(255);

  if (sampleSize < table.getRowCount() - 1) sampleSize++;

  for (let i = 0; i < sampleSize; i++) {
    const row = table.getRow(i);
    const title = row.getString('title');
    const year = row.getNum('year');
    const rank = row.getNum('rank');

    const x = map(year, -700, 2017, 50, width - 50);
    const y = map(rank, 0, sampleSize, 0, height);

    const tone = map(rank, 1, 1000, 0, 255);
    const sw = map(rank, 1, 1000, 20, 0);

    stroke(0);
    strokeWeight(sw);
    fill(tone);
    ellipse(x, y, 6, 6);

    noStroke();
    fill(0);
    textSize(map(sampleSize, 1, 1000, 16, 8));
    text(title, x, y);
  }

  noStroke();
  fill(0);
  rect(42, 43, 214, 30);

  fill(255);
  textSize(18);
  text(sampleSize + ' Greatest Fictions', 149, 64);
}
