class CustomShape {

  Body body;
  float alpha;

  CustomShape(float x, float y) {
    makeBody(new Vec2(x, y));
    alpha = 0;
  }

  // This function removes the particle from the box2d world
  void killBody() {
    box2d.destroyBody(body);
  }

  boolean done() {
    Vec2 pos = box2d.getBodyPixelCoord(body);
    if (pos.x > width || pos.x < 0 || alpha > 254) {
      killBody();
      return true;
    }
    return false;
  }

  // Drawing the box
  void display() {
    Vec2 pos = box2d.getBodyPixelCoord(body);
    float a = body.getAngle();

    Fixture f = body.getFixtureList();
    PolygonShape ps = (PolygonShape) f.getShape();

    rectMode(CENTER);
    pushMatrix();
    translate(pos.x, pos.y);
    rotate(-a);
    fill(255, alpha);
    //noStroke();
    stroke(0);
    strokeWeight(8);
    beginShape();
    //println(vertices.length);
    // For every vertex, convert to pixel vector
    for (int i = 0; i < ps.getVertexCount(); i++) {
      Vec2 v = box2d.vectorWorldToPixels(ps.getVertex(i));
      vertex(v.x, v.y);
    }
    endShape(CLOSE);
    popMatrix();

    alpha += 0.3;
  }

  // This function adds the rectangle to the box2d world
  void makeBody(Vec2 center) {
    float s = 24;
    Vec2[] vertices = new Vec2[3];
    vertices[0] = box2d.vectorPixelsToWorld(new Vec2(0, s));
    vertices[1] = box2d.vectorPixelsToWorld(new Vec2(-s, -s));
    vertices[2] = box2d.vectorPixelsToWorld(new Vec2(s, -s));

    // Define a polygon (this is what we use for a rectangle)
    PolygonShape ps = new PolygonShape();
    ps.set(vertices, vertices.length);
    
    PolygonShape ps2 = new PolygonShape();
    float box2dW = box2d.scalarPixelsToWorld(16/2);
    float box2dH = box2d.scalarPixelsToWorld(16/2);
    ps2.setAsBox(box2dW, box2dH);

    // Define the body and make it from the shape
    BodyDef bd = new BodyDef();
    bd.type = BodyType.DYNAMIC;
    bd.position.set(box2d.coordPixelsToWorld(center));
    body = box2d.createBody(bd);

    body.createFixture(ps, 1.0);
    //body.createFixture(ps2, 1.0);
  }
}