Unit[] units;
PVector inA1, inA2, inA4;

void setup() {
  size(600, 600);
  background(255);
  stroke(0, 255, 0);
  strokeWeight(2);
  units = new Unit[3];

  inA1 = new PVector(0, 0);
  inA2 = new PVector(50, 0);
  inA4 = new PVector(0, 50);
}

void draw() {
  //// caption
  //fill(0);
  //textAlign(CENTER);
  //textSize(100);
  //text("299--", width/3, height/2);


  for (int i = 0; i < units.length; i ++) { 
    if (i == 0) {
      units[i] = new Unit(inA1, inA2, inA4);
    } else {
      units[i] = new Unit(units[i-1].b2, units[i-1].b2.add(50, 0), units[i-1].b3);
    }

    units[i].display();
    units[i].update();
  }
  noLoop();
}