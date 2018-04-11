// toxiclibs soft string pendulum

import toxi.physics2d.*;
import toxi.physics2d.behaviors.*;
import toxi.geom.*;

// setup the world
VerletPhysics2D physics;

// create the object
Chain chain;

float t = 0;
float t2 = 0;

void setup() {
  size(600, 600);
  background(255);
  rectMode(CENTER);
  
  // initialize the world
  physics = new VerletPhysics2D();
  physics.addBehavior(new GravityBehavior2D(new Vec2D(0, 0.1)));
  physics.setWorldBounds(new Rect(0, 0, width, height));
  
  // initialize the chain
  chain = new Chain(height, height/5, 20, 0.2);
}

void draw() {
  //background(255);
  fill(255, 10);
  noStroke();
  ellipse(noise(t)*width, noise(t2)*height, noise(t)*600, noise(t)*600);
  t += 0.009;
  t2 += 0.01;
  noStroke();
  
  // update the world
  physics.update();
  
  // update the object
  chain.updateTail(mouseX, mouseY);
  // draw the object
  chain.display();
}