class SoftParticle extends Particle {

  SoftParticle (float x, float y, int plevel) {
    super(x, y, plevel);
  }

  void display(int plevel) {
    // info from box2d
    Vec2 pos = box2d.getBodyPixelCoord(body);
    float a = body.getAngle();

    pushMatrix();
    translate(pos.x, pos.y);
    rotate(a);
    noStroke();
    fill(255, lifespan/2);
    ellipse(0, 0, plevel*7, plevel*7);
    popMatrix();
    lifespan -=5;
  }

  void makeBody(Vec2 center, int plevel_) {
    int r = plevel_;
    // body
    BodyDef bd = new BodyDef();      
    bd.type = BodyType.DYNAMIC;
    bd.position.set(box2d.coordPixelsToWorld(center));
    body = box2d.createBody(bd);

    // create fixture
    FixtureDef fd = new FixtureDef();
    fd.density = 1;
    fd.friction = 0.3;
    fd.restitution = 0.5;

    // shape
    CircleShape cs = new CircleShape();
    float box2dR = box2d.scalarPixelsToWorld(r);
    cs.m_radius = box2dR;

    fd.shape = cs;


    // put together
    body.createFixture(fd);
  }
}