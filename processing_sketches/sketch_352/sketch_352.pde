// Pendulum simulation
import processing.video.*;



Pendulum[] p;
Pendulum[] p2;
PVector loc;

void setup() {
  size(600, 600);
  smooth();
  background(255);



  p = new Pendulum[200];
  p2 = new Pendulum[20];
  for (int i = 0; i < p.length; i++) {
    loc = new PVector((width/2)/p.length * i, 0);
    // p[i] = new Pendulum(loc, 50+5*i, i);
    p[i] = new Pendulum(loc, height/4, i);
  }  
  for (int i = 0; i < p2.length; i++) {
    loc = new PVector((width/2)/p2.length * i, height/4);
    p2[i] = new Pendulum(loc, height/4*3, i*2);
  }
}


void draw() {
  //background(255);
  for (int i = 0; i < p.length; i++) {

    p[i].update();
    p[i].display();
  }

  for (int i = 0; i < p2.length; i++) {
    stroke(255, 1);
    noFill();
    p2[i].update();
    p2[i].display();
  }
    saveFrame("frames/352_2-######.png");

}