class Cell {
  float x, y;
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
    int liveCount = 0;
    for (int i=0; i<neighbors.length; i++) {
      if (neighbors[i].state == true) {
        liveCount ++;
      }
    }

    if (state == true) {
      if ((liveCount == 3) || (liveCount == 2)) {
        nextState = true;
      } else {
        nextState = false;
      }
    } else {
      if (liveCount == 3) {
        nextState = true;
      } else {
        nextState = false;
      }
    }
  }

    void drawMe() {
      state = nextState;
      stroke(0);
      if (state == true) {
        fill(255);
      } else {
        fill(0);
      }
      rectMode(CENTER);
      rect(x, y, cellSize, cellSize);
      
    }
  }