// generative art 8.1

int maxLevels = 3;
int numChildren = 3;
Branch trunk;

void setup() {
  size(750, 500);
  background(255);
  noFill();
  newTree();
}

void newTree() {
 trunk = new Branch(1, 0, width/2, 50);
 trunk.drawMe();
}


//void draw() {
  
//}