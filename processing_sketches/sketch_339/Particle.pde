class Particle {
  Body body;
  float w, h;

  Particle(float x, float y) {
    w = 10;
    h = 100;
    makeBody(new Vec2(x, y), w, h);
  }
  void killBody() {
    box2d.destroyBody(body);
  }

  boolean done() {
    // Let's find the screen position of the particle
    Vec2 pos = box2d.getBodyPixelCoord(body);
    // Is it off the bottom of the screen?
    if (pos.y > height+w) {
      killBody();
      return true;
    }
    return false;
  }

  void display() {
    Vec2 pos = box2d.getBodyPixelCoord(body);
    float a = body.getAngle();

    pushMatrix();
    translate(pos.x, pos.y);
    rotate(-a);
    rectMode(CENTER);
    //noStroke();
    stroke(255,200);
    noFill();
    //fill(255, 100);
    rect(0, 0, w*10, h);

    popMatrix();
  }

  void makeBody(Vec2 center, float w_, float h_) {
    // define body
    BodyDef bd = new BodyDef();      
    bd.type = BodyType.DYNAMIC;
    bd.position.set(box2d.coordPixelsToWorld(center));

    // create body
    body = box2d.createBody(bd);

    // create shape
    PolygonShape ps = new PolygonShape();
    float box2dw = box2d.scalarPixelsToWorld(w_/2);
    float box2dh = box2d.scalarPixelsToWorld(h_/2);
    ps.setAsBox(box2dw, box2dh);

    // create fixture
    FixtureDef fd = new FixtureDef();
    fd.shape = ps;
    fd.density = 1;
    fd.friction = 0.3;
    fd.restitution = 0.5;

    // put together
    body.createFixture(fd);
  }
}