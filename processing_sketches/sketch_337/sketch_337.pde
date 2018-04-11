import shiffman.box2d.*;
import org.jbox2d.collision.shapes.*;
import org.jbox2d.common.*;
import org.jbox2d.dynamics.*;

Box2DProcessing box2d;

ArrayList<Box> boxes;
ArrayList<Boundary> boundaries;

void setup() {
  size(640, 640);

  box2d = new Box2DProcessing(this);
  box2d.createWorld();
  box2d.setGravity(0, 5);

  boxes = new ArrayList<Box>();
  boundaries = new ArrayList<Boundary>();
  Boundary bn = new Boundary();
  boundaries.add(bn);
}

void draw() {
  background(50);
  box2d.step();

  Box b = new Box();
  boxes.add(b);

  for (Box bs : boxes) {
    bs.display();
  }

  for (Boundary bns : boundaries) {
    bns.display();
  }
}