import shiffman.box2d.*;
import org.jbox2d.collision.shapes.*;
import org.jbox2d.common.*;
import org.jbox2d.dynamics.*;

Box2DProcessing box2d;

ArrayList<CustomShape> cshapes;
Surface surface;


void setup() {
  size(640, 640);
  background(255);

  box2d = new Box2DProcessing(this);
  box2d.createWorld();
  box2d.setGravity(0, 5);

  cshapes = new ArrayList<CustomShape>();

 surface = new Surface();

}

void draw() {
  background(255);
  box2d.step();

  CustomShape cshape = new CustomShape(width/2, height);
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
  //surface.display();
}