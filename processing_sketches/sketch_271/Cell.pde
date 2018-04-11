class Cell {
  float x, y;

  float t = 0;
  int liveCount;

  int state;
  int nextState;

  Cell[] neighbors;

  Cell(float ex, float why) {
    x = ex*cellSize;
    y = why*cellSize;

    if (random(2) > 1) {
      nextState = 1;
    } else {
      nextState = 2;
    }
    state = nextState;
    neighbors = new Cell[0];
  }

  void addNeighbor(Cell cell) {
    neighbors = (Cell[])append(neighbors, cell);
  }

  void calcNextState() {
    liveCount = 0;
    if (state == 1) { 
      liveCount++;
    }
    for (int i=0; i < neighbors.length; i++) {
      if (neighbors[i].state == 1) {
        liveCount++;
      }
    }
    if (liveCount <= 4) {
      nextState = 4 - liveCount;
    } else if (liveCount > 4) {
      nextState = 1;
    }

    if ((liveCount <= 4)) {
        nextState = liveCount;
    }
  }

  void drawMe() {

    rectMode(CENTER);
    state = nextState;
    noStroke();
    //strokeWeight(cellSize);
    if (state == 1) {
      fill(255);
    } else {
      fill(0);
    }
    ellipse(x, y, cellSize+10, cellSize+10);
  }
}