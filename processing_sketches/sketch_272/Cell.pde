class Cell {
  float x, y;

  float t = 0;
  int liveCount;

  boolean state;
  boolean nextState;
  Cell[] neighbors;

  Cell(float ex, float why) {
    x = ex*cellSize;
    y = why*cellSize;

    if (random(2) > 1) {
      nextState = true;
    } else {
      nextState = false;
    }
    state = nextState;
    neighbors = new Cell[0];
  }

  void addNeighbor(Cell cell) {
    neighbors = (Cell[])append(neighbors, cell);
  }

  void calcNextState() {
    liveCount = 0;
    if (state) { 
      liveCount++;
    }
    for (int i=0; i < neighbors.length; i++) {
      if (neighbors[i].state == true) {
        liveCount++;
      }
    }
    if (liveCount <= 4) {
      nextState = false;
    } else if (liveCount > 4) {
      nextState = true;
    }

    if ((liveCount == 3) || (liveCount == 6 )) {
      nextState = !nextState;
    }
  }

  void drawMe() {

    rectMode(CENTER);
    state = nextState;

    if (state == true) {
      fill(0);
    } else {
      fill(255);
    }
    t += 0.01;
    rect(x + random(-1,1), y, 1, 4*cellSize*liveCount);
  }
}