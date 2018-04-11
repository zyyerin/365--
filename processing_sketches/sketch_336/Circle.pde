class Circle {

  Body body;

  float r;
  int off;

  Circle() {

    off = int(random(1, 10));
    r = 20;

    // body
    BodyDef bd = new BodyDef();
    bd.type = BodyType.DYNAMIC;
    bd.position.set(box2d.coordPixelsToWorld(random(r, width-r), -20));
    body = box2d.createBody(bd);

    // shape
    CircleShape cs = new CircleShape();
    float box2dR = box2d.scalarPixelsToWorld(r/2);
    cs.m_radius = box2dR;

    // fixture
    FixtureDef fd = new FixtureDef();
    fd.shape = cs;
    fd.density = 1;
    fd.friction = 0;
    fd.restitution = 0.5;

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

    fill(255, 10);
    noStroke();
    ellipseMode(CENTER);

    ellipse(0, 0, r*off, r*off);
    popMatrix();
  }
}