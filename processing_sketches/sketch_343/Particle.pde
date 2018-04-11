class Particle {
  Body body;

  float w, h;
  /*
  *** initialize the body ***
   1. create a BodyDef
   >> initial position
   >> type (dynamic, static, kinematic)
   2. create the Body
   3. create a Shape (Polygon Shape, Circle Shape, Chain Shape, ...)
   4. create a Fixture
   >> set up density/friction/elesticity
   5. Put all together
   
   *** 3 steps ***
   a. setup the Box2D World in main tab
   b. create a Body in the class tab
   c. rewrite the display function to ask Box2D for the location of the objects
   */



  Particle(float x, float y) {
    w = random(180);
    h = random(40);
    // define body
    BodyDef bd = new BodyDef();      
    bd.type = BodyType.DYNAMIC;
    bd.position.set(box2d.coordPixelsToWorld(x, y));

    // create body
    body = box2d.createBody(bd);

    // create shape
    PolygonShape ps = new PolygonShape();
    float box2dw = box2d.scalarPixelsToWorld(w/2);
    float box2dh = box2d.scalarPixelsToWorld(h/2);
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

  void display() {
    Vec2 pos = box2d.getBodyPixelCoord(body);
    float a = body.getAngle();

    pushMatrix();
    translate(pos.x, pos.y);
    rotate(-a);
    noFill();
    stroke(255, 10);
    strokeWeight(.5);
    rectMode(CENTER);
    rect(0, 0, h, w);
    popMatrix();
  }
}