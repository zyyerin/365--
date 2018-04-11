PVector inA, inB, inC;

Unit u;

void setup() {
  size(600, 600);
  background(255);
  noStroke();

  PVector inA = new PVector(0, 0);
  PVector inB = new PVector(50, 0);
  PVector inC = new PVector(0, 50);

  u = new Unit();
}

void draw() {
    fill(0);
  textAlign(CENTER);
  textSize(100);
  text("303--", width/3, height/2);
  u.display();

  noLoop();
}