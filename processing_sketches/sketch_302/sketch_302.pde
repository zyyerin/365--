ArrayList<Unit> units;
PVector inA, inB, inC;


void setup() {
  size(600, 600);
  background(255);
  noStroke();
  
  units = new ArrayList<Unit>();
}

void draw() {
  // caption
  fill(0);
  textAlign(CENTER);
  textSize(100);
  text("302--", width/3, height/2);
  
  PVector previousRU, previousRD, previousDR, previousDL;
  Unit u = new Unit();  
  units.add(u);
  
  previousRU = u.out1;
  previousRD = u.out2;  
  //previousDR = u.out3;
  //previousDL = u.out4;
   PVector previousNull = new PVector(200,0);
   
  Unit u_ = new Unit(previousRU, previousNull, previousRD);  
  units.add(u_);

  for (Unit u1 : units) {
    u1.display();
  }

  noLoop();
}