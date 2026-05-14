// fiction vs non-fiction "Greatest Books" — mouseY sets sample size,
// mouseX sweeps a timeline cursor; click-and-hold reveals titles

let fic, nonfic;
let sampleSize = 100;

function preload() {
  fic = loadTable('data/greatestBooksFic.csv', 'csv', 'header');
  nonfic = loadTable('data/greatestBooksNon.csv', 'csv', 'header');
}

function setup() {
  createCanvas(600, 600);
  textAlign(CENTER);
  noStroke();
}

function draw() {
  background(170);
  sampleSize = floor(map(mouseY, 0, height, 1, 1000));
  sampleSize = constrain(sampleSize, 1, fic.getRowCount());

  for (let i = 0; i < sampleSize; i++) {
    const r1 = fic.getRow(i);
    const r2 = nonfic.getRow(i);

    const x1 = map(r1.getNum('year'), -700, 2017, 50, width - 50);
    const y1 = map(r1.getNum('rank'), 0, sampleSize, 0, height);

    const x2 = map(r2.getNum('year'), -700, 2017, 50, width - 50);
    const y2 = map(r2.getNum('rank'), 0, sampleSize, 0, height);

    if (mouseIsPressed) {
      textSize(map(sampleSize, 1, 1000, 16, 8));
      fill(0);
      text(r1.getString('title'), x1, y1);
      fill(255);
      text(r2.getString('title'), x2, y2);
    } else {
      noStroke();
      fill(0);
      ellipse(x1, y1, 5, 5);
      fill(255);
      ellipse(x2, y2, 5, 5);
    }
  }

  fill(255);
  textSize(20);
  text('& Non-fictions', width / 2, height / 2 + 25);
  fill(0);
  text(sampleSize + ' Greatest Fictions', width / 2, height / 2);

  // timeline help cursor
  textSize(12);
  const yearR = floor(map(mouseX, 50, width - 50, -700, 2017));
  noStroke();
  fill(0);
  rect(mouseX, 0, 1, height);
  ellipse(mouseX, mouseY - 15, 45, 20);
  fill(255);
  text(yearR, mouseX, mouseY - 11);
}
