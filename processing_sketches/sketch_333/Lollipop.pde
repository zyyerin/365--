class Lollipop {

  Body body;
  float w, h, r;
  //float popR, popG, popB;
  color popC;
  float s;

  Lollipop(float x, float y, color popC_) {
    s = random(3);
    w = 3*s;
    h = 24*s;
    r = 8*s;
    popC = popC_;
    //popR = random(255);
    //popG = random(255);
    //popB = random(255);
    makeBody(new Vec2(x, y));
  }

  // This function removes the particle from the box2d world
  void killBody() {
    box2d.destroyBody(body);
  }

  boolean done() {
    Vec2 pos = box2d.getBodyPixelCoord(body);
    if (pos.x > width || pos.x < 0 || pos.y >= height || pos.y <= 0) {
      killBody();
      return true;
    }
    return false;
  }

  // Drawing the lollipop
  void display() {
    Vec2 pos = box2d.getBodyPixelCoord(body);
    float a = body.getAngle();

    rectMode(CENTER);
    pushMatrix();
    translate(pos.x, pos.y);
    rotate(-a);
    fill(255);
    stroke(0, 0, 255);
    strokeWeight(3);

    rect(0, 0, w, h);
    //fill(popR, popG, popB);
    fill(popC);
    ellipse(0, -h/2, r*2, r*2);

    fill(255, 200);
    noStroke();
    ellipse(-w/16*12, -h/16*10, r/2, r/2);

    popMatrix();
  }

  // This function adds the rectangle to the box2d world
  void makeBody(Vec2 center) {

    BodyDef bd = new BodyDef();
    bd.type = BodyType.DYNAMIC;
    bd.position.set(box2d.coordPixelsToWorld(center));
    body = box2d.createBody(bd);

    CircleShape circle = new CircleShape();
    circle.m_radius = box2d.scalarPixelsToWorld(r);
    Vec2 offset = new Vec2(0, -h/2);
    offset = box2d.vectorPixelsToWorld(offset);
    circle.m_p.set(offset.x, offset.y);

    PolygonShape ps = new PolygonShape();
    float box2dW = box2d.scalarPixelsToWorld(16/2);
    float box2dH = box2d.scalarPixelsToWorld(16/2);
    ps.setAsBox(box2dW, box2dH);

    body.createFixture(ps, 1.0);
    body.createFixture(circle, 1.0);
  }
}