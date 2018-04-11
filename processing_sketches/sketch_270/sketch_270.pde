// generative art 8.1

int maxLevels = 4;
int numChildren = 1;
Branch trunk;
Branch trunk2;

void setup() {
  size(600, 600);
  noFill();
  newTree();
}

void newTree() {
  trunk = new Branch(1, 0, width/2, height/2);
  trunk2 = new Branch(1, 0, 0, 0);
}


void draw() {
  //background(255);
  stroke(0);
  trunk.updateMe(width/2, height/2);
  trunk.drawMe();
  stroke(255);

  trunk2.updateMe(width/2, height/2);
  trunk2.drawMe();
}