import shiffman.box2d.*;
import org.jbox2d.common.*;
import org.jbox2d.dynamics.joints.*;
import org.jbox2d.collision.shapes.*;
import org.jbox2d.collision.shapes.Shape;
import org.jbox2d.common.*;
import org.jbox2d.dynamics.*;
import org.jbox2d.dynamics.contacts.*;

// A reference to our box2d world
Box2DProcessing box2d;

// An object to describe a Bridget (a list of particles with joint connections)
Bridge bridge;

// A list for all of our rectangles

void setup() {
  size(600, 600);
   background(255);
  // Initialize box2d physics and create the world
  box2d = new Box2DProcessing(this);
  box2d.createWorld();

  box2d.setGravity(0, 0);

  // Make the bridge
  bridge = new Bridge(width, 200);

}

void draw() {
  background(255);

  // We must always step through time!
  box2d.step();


  // Draw the windmill
  bridge.display();
}