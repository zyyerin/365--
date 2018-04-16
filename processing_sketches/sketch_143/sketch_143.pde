// Trefoil, by Andres Colubri
// A parametric surface is textured procedurally
// by drawing on an offscreen PGraphics surface.

PGraphics pg;
PShape trefoil1;
float t = 0;

void setup() {
  size(600, 600, P3D);
  pixelDensity(2);
  background(255);
  noStroke();

  // Creating offscreen surface for 3D rendering.
  pg = createGraphics(100, 100, P3D);
  pg.beginDraw();
  pg.background(255, 50);

  pg.noFill();
  pg.stroke(0);
  pg.endDraw(); 

  // Saving trefoil surface into a PShape3D object
  trefoil1 = createTrefoil(100, 3, 500, pg);
}

void draw() {
  background(255);

  pg.beginDraw();
  pg.ellipse(random(pg.width), random(pg.height), 40, 1);
  pg.endDraw();

  pushMatrix();
  translate(width/2, height/2, 0);
  rotateX(frameCount*0.01);
  rotateZ(frameCount*0.01);
  shape(trefoil1);
  popMatrix();
}