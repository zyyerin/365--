let cells = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  cells.push(new Cell());
  noCursor();
  frameRate(48);
}

function draw() {
  background(20);

  for (let i = 0; i < cells.length; i++) {
    cells[i].move();
    cells[i].show();
  }
  fill(0);
  ellipse(mouseX, mouseY, 20, 20);
}

function mousePressed() {
  for (let i = cells.length - 1; i >= 0; i--) {
    if (cells[i].clicked(mouseX, mouseY)) {
      cells.push(cells[i].mitosis());
      cells.push(cells[i].mitosis());
      cells.splice(i, 1);
    }
  }

  if (cells.length > 7000) {
    for (let i = cells.length - 1; i >= 7000; i--) {
        cells.pop();
    }
  }
}
