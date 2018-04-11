ArrayList<Unit> units;
int posx, posy;
float xstep, ystep;
float unitw, unith;
float sunit, bunit;

float last2, last3, last4;

void setup() {
  size(600, 600);
  background(0);
  pixelDensity(2);
  posx = width;
  posy = height;
  units = new ArrayList<Unit>();

  xstep = 20;
  ystep = 20;

  sunit = 3;
  bunit = sunit*2;
}

void draw() {
  //background(0);
  fill(255);
  textSize(16);
  text("306--", 24, 36);

  if (posx < width/2 - xstep) {
    unitw = sunit;
  } else {
    unitw = bunit;
  }

  if (posy > height/2 - ystep) {
    unith = sunit;
  } else {
    unith = bunit;
  }

  if ((posy > height/2 - ystep && posy < height/2 + ystep/2) || 
      (posx > width/2 - xstep && posx < width/2 + xstep/2)) {
    Unit su = new SquareUnit(posx, posy, unitw, unith);  
    units.add(su);
  } 
  else {
    Unit u = new Unit(posx, posy, unitw, unith);  
    units.add(u);
  }


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