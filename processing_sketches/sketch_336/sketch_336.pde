import shiffman.box2d.*;
import org.jbox2d.collision.shapes.*;
import org.jbox2d.common.*;
import org.jbox2d.dynamics.*;

Box2DProcessing box2d;

ArrayList<Circle> circles;

Surface surface;

//ArrayList<Boundary> boundaries;

void setup() {
  size(640, 640);

  box2d = new Box2DProcessing(this);
  box2d.createWorld();
  //box2d.setGravity(0, -50);

  circles = new ArrayList<Circle>();
  
  surface = new Surface();
  
  //boundaries = new ArrayList<Boundary>();
  //Boundary bn = new Boundary();
  //boundaries.add(bn);
}

void draw() {
  background(60);
  box2d.step();

  Circle c = new Circle();
  circles.add(c);

  for (Circle cs : circles) {
    cs.display();
  }

  surface.display();

  //for (Boundary bns : boundaries) {
  //  bns.display();
  //}
  
  
}