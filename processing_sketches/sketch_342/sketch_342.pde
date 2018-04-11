import shiffman.box2d.*;
import org.jbox2d.collision.shapes.*;
import org.jbox2d.common.*;
import org.jbox2d.dynamics.*;

ArrayList<Particle> particles;
ArrayList<Boundary> boundaries;

Box2DProcessing box2d;
float posx = 0;

void setup() {
  size(600, 600);
  smooth();
  background(0);

  box2d = new Box2DProcessing(this);
  box2d.createWorld();

  particles = new ArrayList<Particle>();
  boundaries = new ArrayList<Boundary>();

  boundaries.add(new Boundary(width/2, height/2, width/2, 2));
  boundaries.add(new Boundary(width+2, height/2, 2, height));

}

void draw() {
  background(0);

  box2d.step();
  Particle p = new Particle(posx, height/2);
  particles.add(p);
  posx += 1;

  for (Boundary wall : boundaries) {
    wall.display();
  }

  for (Particle p1 : particles) {
    p1.display();
  }

}