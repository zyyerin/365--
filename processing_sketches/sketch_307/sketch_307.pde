ArrayList<Unit> units;
int posx, posy;
float xstep, ystep;
float unitw, unith;

void setup() {
  size(600, 600);
  background(0);
  smooth();
  pixelDensity(2);
  posx = width;
  posy = height;
  units = new ArrayList<Unit>();

  xstep = 20;
  ystep = 20;
}

void draw() {
  //background(0);
  fill(255);
  textSize(16);
  text("307--", 24, 36);

  if (posx <= width/2) {
    unitw = 3;
  } else {
    unitw = 6;
  }

  if (posy >= height/2) {
    unith = 3;
  } else {
    unith = 6;
  }
  
  Unit u = new Unit(posx, posy, unitw, unith);  
  units.add(u);


  posx -= xstep + unitw;
  if (posx < -20) {
    posy -= ystep + unitw;
    posx = width;
  }
  if (posy < -50) {
    noLoop();
  }
  for (Unit u1 : units) {
    u1.display();
  }
}