// The Nature of Code
// <http://www.shiffman.net/teaching/nature>
// Spring 2011
// Box2DProcessing example

// A rectangular box
class CustomShape {

  // We need to keep track of a Body and a width and height
  Body body;

  // Constructor
  CustomShape(float x, float y) {
    // Add the box to the box2d world
    makeBody(new Vec2(x, y));
  }

  // This function removes the particle from the box2d world
  void killBody() {
    box2d.destroyBody(body);
  }

  // Is the particle ready for deletion?
  boolean done() {
    // Let's find the screen position of the particle
    Vec2 pos = box2d.getBodyPixelCoord(body);
    // Is it off the bottom of the screen?
    if (pos.y > height) {
      killBody();
      return true;
    }
    return false;
  }

  // Drawing the box
  void display() {
    // We look at each body and get its screen position
    Vec2 pos = box2d.getBodyPixelCoord(body);
    // Get its angle of rotation
    float a = body.getAngle();

    Fixture f = body.getFixtureList();
    PolygonShape ps = (PolygonShape) f.getShape();


    rectMode(CENTER);
    pushMatrix();
    translate(pos.x, pos.y);
    rotate(-a);
    fill(255);
    //noStroke();
    stroke(200);
    strokeWeight(3);
    beginShape();
    //println(vertices.length);
    // For every vertex, convert to pixel vector
    for (int i = 0; i < ps.getVertexCount(); i++) {
      Vec2 v = box2d.vectorWorldToPixels(ps.getVertex(i));
      vertex(v.x, v.y);
    }
    endShape(CLOSE);
    popMatrix();
  }

  // This function adds the rectangle to the box2d world
  void makeBody(Vec2 center) {

    // Define a polygon (this is what we use for a rectangle)
    PolygonShape sd = new PolygonShape();

    Vec2[] vertices = new Vec2[4];
    vertices[0] = box2d.vectorPixelsToWorld(new Vec2(random(-20, 0), random(20)));
    vertices[1] = box2d.vectorPixelsToWorld(new Vec2(random(15), 0));
    vertices[2] = box2d.vectorPixelsToWorld(new Vec2(random(20), random(-15, 0)));
    vertices[3] = box2d.vectorPixelsToWorld(new Vec2(random(-10,0), random(-10,0)));

    sd.set(vertices, vertices.length);

    // Define the body and make it from the shape
    BodyDef bd = new BodyDef();
    bd.type = BodyType.DYNAMIC;
    bd.position.set(box2d.coordPixelsToWorld(center));
    body = box2d.createBody(bd);

    body.createFixture(sd, 1.0);


    // Give it some initial random velocity
    body.setLinearVelocity(new Vec2(random(-5, 5), random(2, 5)));
    body.setAngularVelocity(random(-5, 5));
  }
}