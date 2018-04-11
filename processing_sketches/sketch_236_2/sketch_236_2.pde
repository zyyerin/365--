// The Nature of Code
// <http://www.shiffman.net/teaching/nature>
// Spring 2011
// Box2DProcessing example

// Basic example of falling rectangles

import shiffman.box2d.*;
import org.jbox2d.collision.shapes.*;
import org.jbox2d.common.*;
import org.jbox2d.dynamics.*;

// A reference to our box2d world
Box2DProcessing box2d;

// A list we'll use to track fixed objects
ArrayList<Boundary> boundaries;
// A list for all of our rectangles
ArrayList<CustomShape> polygons;

void setup() {
  size(400, 400);
  smooth();

  // Initialize box2d physics and create the world
  box2d = new Box2DProcessing(this);
  box2d.createWorld();
  // We are setting a custom gravity
  box2d.setGravity(0, -20);

  // Create ArrayLists	
  polygons = new ArrayList<CustomShape>();
  boundaries = new ArrayList<Boundary>();

  // Add a bunch of fixed boundaries

  int borderWidth = 10;
  boundaries.add(new Boundary(width/2, height-borderWidth/2, width, borderWidth, 0));
  //boundaries.add(new Boundary(width/2, borderWidth/2, width, borderWidth, 0));
  //vertical
  boundaries.add(new Boundary(width- borderWidth/2, height/2, borderWidth, height, 0));
  boundaries.add(new Boundary(borderWidth/2, height/2, borderWidth, height, 0));
}

void draw() {
  background(0);

  // We must always step through time!
  box2d.step();

  // Display all the boundaries
  for (Boundary wall : boundaries) {
    wall.display();
  }

  // Display all the people
  for (CustomShape cs : polygons) {
    cs.display();
  }

  // people that leave the screen, we delete them
  // (note they have to be deleted from both the box2d world and our list
  for (int i = polygons.size()-1; i >= 0; i--) {
    CustomShape cs = polygons.get(i);
    if (cs.done()) {
      polygons.remove(i);
    }
  }
}

void mouseDragged() {
  CustomShape cs = new CustomShape(mouseX, mouseY);
  polygons.add(cs);
}