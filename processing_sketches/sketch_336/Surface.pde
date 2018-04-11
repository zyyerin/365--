class Surface {
  ArrayList<Vec2> surface;

  Surface() {
    surface = new ArrayList<Vec2>();

    ChainShape chain = new ChainShape();

    float theta = 0;

    for (float x = width + 10; x > -10; x -= 20) {
      float y = map(sin(theta), -1, 1, 0, height+100);
      theta += .9;

      surface.add(new Vec2(x, y));
    }

    Vec2[] vertices = new Vec2[surface.size()];

    for (int i = 0; i < vertices.length; i++) {
      vertices[i] = box2d.coordPixelsToWorld(surface.get(i));
    }

    chain.createChain(vertices, vertices.length);

    BodyDef bd = new BodyDef();
    Body body = box2d.world.createBody(bd);
    body.createFixture(chain, 1);
  }

  void display() {

    noStroke();
noFill();
beginShape();
    for (Vec2 v : surface) {
      vertex(v.x, v.y);
    }
    endShape();
  }
}