import shiffman.box2d.*;
import org.jbox2d.collision.shapes.*;
import org.jbox2d.common.*;
import org.jbox2d.dynamics.*;

ArrayList<Particle> particles;
ArrayList<Boundary> boundaries;

Box2DProcessing box2d;
float posx;

//PImage img;

void setup() {
  size(600, 600);
  smooth();
  pixelDensity(2);
  background(0);

  box2d = new Box2DProcessing(this);
  box2d.createWorld();

  particles = new ArrayList<Particle>();
  boundaries = new ArrayList<Boundary>();

  int bnum = 50;
  for (int i = 0; i < bnum; i++) {
    boundaries.add(new Boundary(width/bnum*i, height-height/bnum*i, width/bnum, 1));
    boundaries.add(new Boundary(width/bnum*i, height/bnum*i, width/bnum, 1));
  }

  posx = width;
  //img = loadImage("image.png");
}

void draw() {
  background(0);

  box2d.step();

  if (posx >= -50) {
    Particle p = new Particle(posx, 0);
    particles.add(p);
    posx -= 1;
  }

  for (Boundary wall : boundaries) {
    wall.display();
  }

  for (Particle p1 : particles) {
    p1.display();
  }
  
  stroke(240);
  line(posx, 0, 0, 0);
}