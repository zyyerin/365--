// Toxiclibs Simple Spring

import toxi.geom.*;
import toxi.physics2d.*;
import toxi.physics2d.behaviors.*;

// setup world
VerletPhysics2D physics;
Particle p1, p2, p3;

void setup() {

  size(600, 600);
  background(255);

  // initialize the physics
  physics = new VerletPhysics2D();
  physics.addBehavior(new GravityBehavior2D(new Vec2D(0, 0.5)));

  // set the world's boundry
  physics.setWorldBounds(new Rect(0, 0, width, height));

  // make two particles
  p1 = new Particle(new Vec2D(width/2, 20));
  p2 = new Particle(new Vec2D(width/2+160, 20));
  p3 = new Particle(new Vec2D(width/2-160, 20));
  // lock particle 1
  p1.lock();

  // create a spring
  VerletSpring2D spring = new VerletSpring2D(p1, p2, 10, 0.001);
  VerletSpring2D spring2 = new VerletSpring2D(p2, p3, 10, 0.01);
  VerletSpring2D spring3 = new VerletSpring2D(p1, p3, 10, 0.1);

  // add stuff into the physics world
  physics.addParticle(p1);
  physics.addParticle(p2);
  physics.addParticle(p3);
  physics.addSpring(spring);
  physics.addSpring(spring2);
  physics.addSpring(spring3);
}

void draw() {
  //background(255);

  // update the physics world
  physics.update();

  // draw the spring
  //stroke(0);
  //strokeWeight(0.1);
  //line(p1.x, p1.y, p2.x, p2.y);
  //line(p2.x, p2.y, p3.x, p3.y);
  //line(p1.x, p1.y, p3.x, p3.y);

  noStroke();
  fill(0);
  beginShape();
  vertex(p1.x, p1.y);
  vertex(p2.x, p2.y);
  vertex(p3.x, p3.y);
  endShape();

  // display the particles
  p1.display();
  p2.display();  
  p3.display();
}
void mouseMoved() {
  p1.lock();
  p1.x = mouseX;
  p1.y = mouseY;
  //p1.unlock();
}