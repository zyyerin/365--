// "20 Greatest Books" — bubble chart of book rank vs year

let table;
const sampleSize = 20;

function preload() {
  table = loadTable('data/greatestBooks10.csv', 'csv', 'header');
}

function setup() {
  createCanvas(600, 600);
  textAlign(CENTER);
  noLoop();
}

function draw() {
  background(255);

  for (let i = 0; i < sampleSize; i++) {
    const row = table.getRow(i);
    const title = row.getString('title');
    const author = row.getString('author');
    const year = row.getNum('year');
    const rank = row.getNum('rank');
    const wordCount = map(row.getNum('word count'), 10000, 130000, 0, 15);
    const fictional = row.getNum('fiction');

    const x = map(year, -1000, 2500, 30, width - 30);
    const y = map(rank, 0, sampleSize / 2 + 1, 80, height - 30);

    stroke(0);
    if (fictional === 1) noFill();
    else fill(0, 100);
    ellipse(x, y, wordCount, wordCount);

    fill(0);
    noStroke();
    textStyle(ITALIC);
    textSize(10);
    text(title, x, y);
    textStyle(NORMAL);
    text(author, x, y + 12);
  }

  // axes
  stroke(0);
  noFill();
  line(30, height - 30, width - 30, height - 30);
  line(30, 80, 30, height - 30);

  fill(0);
  noStroke();
  textSize(20);
  text(sampleSize + ' GREATEST BOOKS', 129, 36);

  rect(30, 66, 44, 23);
  rect(526, 547, 44, 23);

  fill(255);
  textSize(13);
  text('best', 53, 82);
  text('today', 549, 563);
}
