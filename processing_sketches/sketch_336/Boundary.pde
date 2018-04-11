class Boundary {

  Body body;

  float w, h;

  Boundary() {
    w = 200;
    h = 10;

    // body
    BodyDef bd = new BodyDef();
    bd.type = BodyType.STATIC;
    bd.position.set(box2d.coordPixelsToWorld(width/2, height/2));
    body = box2d.createBody(bd);

    // shape
    PolygonShape ps = new PolygonShape();
    float box2dW = box2d.scalarPixelsToWorld(w/2);
    float box2dH = box2d.scalarPixelsToWorld(h/2);
    ps.setAsBox(box2dW, box2dH);

    // fixture
    FixtureDef fd = new FixtureDef();
    fd.shape = ps;
    fd.density = 1;
    fd.friction = 0;
    fd.restitution = 0;

    // attach
    body.createFixture(fd);
  }

  void display() {
    Vec2 pos = box2d.getBodyPixelCoord(body);
    float a = body.getAngle();

    pushMatrix();
    translate(pos.x, pos.y);
    rotate(-a);

    fill(0);
    noStroke();
    rectMode(CENTER);
    rect(0, 0, w, h);
    popMatrix();
  }
}