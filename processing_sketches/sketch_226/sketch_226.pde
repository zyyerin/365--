// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Force directed graph,
// heavily based on: http://code.google.com/p/fidgen/

import toxi.geom.*;
import toxi.physics2d.*;

// Reference to physics world
VerletPhysics2D physics;

// A list of cluster objects
Cluster cluster;

// Boolean that indicates whether we draw connections or not
boolean showPhysics = true;
boolean showParticles = true;

// Font
PFont f;

void setup() {
  size(600, 600);
  f = createFont("Georgia", 12, true);

  // Initialize the physics
  physics=new VerletPhysics2D();
  physics.setWorldBounds(new Rect(10, 10, width-20, height-20));

  // Spawn a new random graph
  cluster = new Cluster(8, 100, new Vec2D(width/2, height/2));
}

void draw() {

  // Update the physics world
  physics.update();

  background(255);
  if (showPhysics) {
    cluster.showConnections();
  }
  // Display all points
  if (showParticles) {
    cluster.display();
  }
}

// Key press commands
void keyPressed() {
  if (key == 'n') {
    physics.clear();
    cluster = new Cluster(int(random(2, 20)), width/4, new Vec2D(width/2, height/2));
  }
}