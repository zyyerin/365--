class Cell {
  float x, y;
  float size;

  float t = 0;
  int liveCount;

  int state;
  int nextState;
  
  float animate = 3;


  Cell[] neighbors;

  Cell(float ex, float why) {
    x = ex*cellSize;
    y = why*cellSize;
    int init = round(random(10));
    //if (init < 10) {
    nextState = init;
    //} else {
    //  nextState = 2;
    //}
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
    if (liveCount >= state) {
      nextState = state + liveCount;
    } else if (liveCount < state) {
      nextState = state - liveCount;
    }

    size += (nextState-state)/4;
  }

  void drawMe() {

    rectMode(CENTER);
    state = nextState;
    noStroke();
    if (state == 0) {
      fill(255);
    } else {
      fill(0, map(state, 0, 100,0,255));
    }
    
    ellipse(x, y, size*animate, size*animate);
    //animate ++;
  }
}