class Flowfield {
  PVector[][][] field;
  int cols;
  int rows;
  int layers;
  int resolution;

  Flowfield() {
    resolution = 30;
    cols = width/resolution;
    rows = height/resolution;
    layers = width/resolution;
    field = new PVector[cols][rows][layers];
  }

  void init() {
    PVector targetpos = new PVector(mouseX, mouseY);
    for (int i=0; i<cols; i++) {
      for (int j=0; j<rows; j++) {
        for (int k=0; k<layers; k++) {
          PVector current = new PVector(i, j, k);
          PVector f = PVector.sub(targetpos, current.mult(resolution));
          field[i][j][k] = f.normalize();
        }
      }
    }
  }

  void display() {
    init();

    float len = 10;

    for (int i=0; i<cols; i++) {
      for (int j=0; j<rows; j++) {
        for (int k=0; k<layers; k++) {
          drawVector(field[i][j][k], i*resolution, j*resolution, k*resolution, resolution/2);
        }
      }
    }
  }

  void drawVector(PVector v, float x, float y, float z, float scayl) {
    pushMatrix();
    translate(x, y, z);
    stroke(200);
    rotate(v.heading());
    float len = v.mag()*scayl;
    line(0, 0, 0, len, 0, 0);
    popMatrix();
  }

  PVector lookup(PVector lookup) {
    int column = int(constrain(lookup.x/resolution, 0, cols-1));
    int row = int(constrain(lookup.y/resolution, 0, rows-1));
    int layer = int(constrain(lookup.z/resolution, 0, layers-1));

    return field[column][row][layer].get();
  }
}