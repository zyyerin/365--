// fatal commercial passenger plane crashes since 1993 — text positioned by fatality count, shrinking each frame

let table;
let count;

function preload() {
  table = loadTable('data/flight_simple.csv', 'csv', 'header');
}

function setup() {
  createCanvas(400, 400);
  textSize(12);
  textAlign(CENTER);
  noStroke();
  count = height;
  table.sort('date');
}

function draw() {
  background(255);
  fill(0);

  const rows = table.getRowCount();
  for (let i = 0; i < rows; i++) {
    const row = table.getRow(i);
    const d = row.getString('date');
    const f = row.getNum('fat');

    const x = map(i, 0, rows, 0, width);
    const y = map(f, 0, 2000, 0, height) * count;
    text(d, x, y);
  }

  text('fatal commercial passenger plane crashes since 1993', width / 2, height / 2);

  count *= 0.99995;
  if (count < 0.001) count = height;
}
