import shiffman.box2d.*;
import org.jbox2d.collision.shapes.*;
import org.jbox2d.common.*;
import org.jbox2d.dynamics.*;

Box2DProcessing box2d;

ArrayList<CustomShape> cshapes;
ArrayList<Boundary> boundaries;
Surface surface;


void setup() {
  size(640, 640);

  box2d = new Box2DProcessing(this);
  box2d.createWorld();
  //box2d.setGravity(0, 5);

  cshapes = new ArrayList<CustomShape>();
  boundaries = new ArrayList<Boundary>();
  Boundary bn = new Boundary(width/2, height-75, 5, height-100, 255);
  //Boundary bn2 = new Boundary(width/2, height-150, width, 1, 0);
  boundaries.add(bn);
  //boundaries.add(bn2);
  
    surface = new Surface();

}

void draw() {
  background(60);
  box2d.step();

  CustomShape cshape = new CustomShape(width/2, 0);
  cshapes.add(cshape);

  for (CustomShape cs : cshapes) {
    cs.display();
  }
  
  for (int i = cshapes.size()-1; i>=0; i--) {
   CustomShape cs = cshapes.get(i);
   if (cs.done()){
    cshapes.remove(i); 
   }
  }

  for (Boundary bns : boundaries) {
    bns.display();
  }
}