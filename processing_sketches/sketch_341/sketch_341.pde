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

  //boundaries.add(new Boundary(width/2, height/2, width/2, 2));
  //boundaries.add(new Boundary(-1, height/2, 1, height));
  boundaries.add(new Boundary(width/2, height/3*2, width, 1));

  posx = width;
  //img = loadImage("image.png");
}

void draw() {
  background(0);


  box2d.step();

  if (posx >= -50) {
    Particle p = new Particle(posx, height/3);
    particles.add(p);
    posx --;
  }

  for (Boundary wall : boundaries) {
    wall.display();
  }

  for (Particle p1 : particles) {
    p1.display();
  }
  stroke(240);
  line(posx, height/3, 0, height/3);
}