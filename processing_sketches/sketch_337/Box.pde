class Box {

  Body body;

  float w, h;

  Box() {
    w = 1;
    h = 1;

    // body
    BodyDef bd = new BodyDef();
    bd.type = BodyType.DYNAMIC;
    bd.position.set(box2d.coordPixelsToWorld(random(width), height));
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
    fd.restitution = 1;

    // attach
    body.createFixture(fd);
  }

  //boolean isOffScreen() {
  //  Vec2 pos = box2d.getBodyPixelCoord(body);
  //  if (pos.y < 0 || pos.y > height) {
  //    return true;
  //  } else {
  //    return false;
  //  }
  //}
  
  //void killBody() {
  //    box2d.destroyBody(body);  
  //}

  void display() {
    Vec2 pos = box2d.getBodyPixelCoord(body);
    float a = body.getAngle();

    pushMatrix();
    translate(pos.x, pos.y);
    rotate(-a);

    fill(255, 200);
    noStroke();
    rectMode(CENTER);
    rect(0, 0, w, h);
    popMatrix();
  }
}