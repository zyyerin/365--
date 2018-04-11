// generative art 7.1.1

Cell[][] cellArray;
int cellSize = 2;
int numX, numY;

void setup() {
  size(300, 300);
  numX = floor(width/cellSize);
  numY = floor(height/cellSize);
  noStroke();
  restart();
}

void restart() {
  cellArray = new Cell[numX][numY];
  for (int x = 0; x < numX; x += 1) {
    for (int y = 0; y < numY; y += 1) {
      Cell newCell = new Cell(x, y);
      cellArray[x][y] = newCell;
    }
  }


  for (int x = 0; x < numX; x++) {
    for (int y = 0; y < numY; y++) {
      int above = y-1;
      int below = y+1;
      int left = x-1;
      int right = x+1;

      if (above < 0) {
        above = numY-1;
      }
      if (below == numY) {
        below = 0;
      }
      if (left < 0) {
        left = numX-1;
      }
      if (right == numX) {
        right = 0;
      }

      cellArray[x][y].addNeighbor(cellArray[left][above]);
      cellArray[x][y].addNeighbor(cellArray[left][y]);
      cellArray[x][y].addNeighbor(cellArray[left][below]);
      cellArray[x][y].addNeighbor(cellArray[x][below]);
      cellArray[x][y].addNeighbor(cellArray[right][below]);
      cellArray[x][y].addNeighbor(cellArray[right][y]);
      cellArray[x][y].addNeighbor(cellArray[right][above]);
      cellArray[x][y].addNeighbor(cellArray[x][above]);
    }
  }
}

void draw() {
  background(0);
  
  for(int x = 0; x < numX; x++) {
   for(int y = 0; y < numY; y++) {
    cellArray[x][y].calcNextState();
    
   }
  }
  
  translate(cellSize/2, cellSize/2);
  
  for (int x = 0; x < numX; x++) {
   for (int y = 0; y < numY; y++) {
    cellArray[x][y].drawMe(); 
   }
  }
}