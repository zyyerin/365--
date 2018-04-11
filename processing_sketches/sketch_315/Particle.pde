class Particle {
  Body body;
  float lifespan;    
  float frameS;

  Particle(float x, float y, int plevel) {
    makeBody(new Vec2(x, y), plevel);
    lifespan = 255;
    frameS = 5;
  }
  void killBody() {
    box2d.destroyBody(body);
  }

  boolean done() {
    // Let's find the screen position of the particle
    Vec2 pos = box2d.getBodyPixelCoord(body);
    // Is it off the bottom of the screen?
    if (lifespan <= 0) {
      killBody();
      return true;
    }
    return false;
  }

  void display(int plevel) {
    Vec2 pos = box2d.getBodyPixelCoord(body);
    float a = body.getAngle();

    Fixture f = body.getFixtureList();
    PolygonShape ps = (PolygonShape) f.getShape();

    pushMatrix();
    translate(pos.x, pos.y);
    rotate(-a);
    ellipseMode(CENTER);
    float sw = map(lifespan, 0, 255, 0, 50);
    stroke(255-lifespan);
    strokeWeight(sw);
    //fill(0, lifespan);
    noFill();


    beginShape();
    for (int i = 0; i < ps.getVertexCount(); i++) {
      Vec2 v = box2d.vectorWorldToPixels(ps.getVertex(i));
      vertex(v.x, v.y);
    } 
    endShape(CLOSE);

    popMatrix();
    lifespan -= 5;
  }

  void makeBody(Vec2 center, int plevel_) {
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

    // Define a polygon (this is what we use for a rectangle)
    PolygonShape ps = new PolygonShape();

    float plevel = plevel_;

    Vec2[] vertices = new Vec2[3];
    vertices[0] = box2d.vectorPixelsToWorld(new Vec2(0, plevel/2));
    vertices[1] = box2d.vectorPixelsToWorld(new Vec2(-plevel, -frameCount%60/2));
    vertices[2] = box2d.vectorPixelsToWorld(new Vec2(random(plevel), -plevel));

    ps.set(vertices, vertices.length);
    fd.shape = ps;
    
    // put together
    body.createFixture(fd);
  }
}