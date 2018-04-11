import peasy.*;
import peasy.org.apache.commons.math.*;
import peasy.org.apache.commons.math.geometry.*;

float s1, s2;
float S1 = 80;
float S2 = 80;
float totalScale = 80;

PVector a0, a1, a2, a3, a4, b1, b2, b3, b4;
PVector A0, A1, A2, A3, A4, B1, B2, B3, B4;

PVector vel1, acc1;
PVector vel2, acc2;

PeasyCam cam;

void setup() {
  size(600, 600, P3D);
  pixelDensity(2);
  ortho();
  noFill();
  strokeWeight(1);
  stroke(0);


  cam = new PeasyCam(this, 500);
  cam.setMinimumDistance(50);
  cam.setMaximumDistance(500);

  acc1 = new PVector(-1, 1, 0);
  vel1 = new PVector(0, 0, 0);

  acc2 = new PVector(-1, 0, 0);
  vel2 = new PVector(0, 0, 0);
}

void draw() {
  background(255);

  strokeWeight(s1/10);

  S1 = map(mouseX, totalScale, width-totalScale, 0, totalScale);
  S2 = map(mouseY, totalScale, height-totalScale, 0, totalScale);
  s1 = totalScale - S1;
  s2 = totalScale - S2;


  a1 = new PVector(-s1, -s1, -s1);
  a2 = new PVector(s2, -s2, -s2);
  a3 = new PVector(-s1, -s1, s1);
  a4 = new PVector(s2, -s2, s2);

  b1 = new PVector(-s1, s1, -s1);
  b2 = new PVector(s2, s2, -s2);
  b3 = new PVector(-s1, s1, s1);
  b4 = new PVector(s2, s2, s2);

  A1 = new PVector(-S1, -S1, -S1);
  A2 = new PVector(S2, -S2, -S2);
  A3 = new PVector(-S1, -S1, S1);
  A4 = new PVector(S2, -S2, S2);

  B1 = new PVector(-S1, S1, -S1);
  B2 = new PVector(S2, S2, -S2);
  B3 = new PVector(-S1, S1, S1);
  B4 = new PVector(S2, S2, S2);




  // top

  line(a1.x, a1.y, a1.z, a2.x, a2.y, a2.z);
  line(a1.x, a1.y, a1.z, a3.x, a3.y, a3.z);
  line(a2.x, a2.y, a2.z, a4.x, a4.y, a4.z);
  line(a3.x, a3.y, a3.z, a4.x, a4.y, a4.z);

  // bottom
  line(b1.x, b1.y, b1.z, b2.x, b2.y, b2.z);
  line(b1.x, b1.y, b1.z, b3.x, b3.y, b3.z);
  line(b2.x, b2.y, b2.z, b4.x, b4.y, b4.z);
  line(b3.x, b3.y, b3.z, b4.x, b4.y, b4.z);

  // veticals
  line(a1.x, a1.y, a1.z, b1.x, b1.y, b1.z);
  line(a2.x, a2.y, a2.z, b2.x, b2.y, b2.z);
  line(a3.x, a3.y, a3.z, b3.x, b3.y, b3.z);
  line(a4.x, a4.y, a4.z, b4.x, b4.y, b4.z);

  /***************************
   the
   big
   cube
   ***************************/
  // top
  line(A1.x, A1.y, A1.z, A2.x, A2.y, A2.z);
  line(A1.x, A1.y, A1.z, A3.x, A3.y, A3.z);
  line(A2.x, A2.y, A2.z, A4.x, A4.y, A4.z);
  line(A3.x, A3.y, A3.z, A4.x, A4.y, A4.z);

  // Bottom
  line(B1.x, B1.y, B1.z, B2.x, B2.y, B2.z);
  line(B1.x, B1.y, B1.z, B3.x, B3.y, B3.z);
  line(B2.x, B2.y, B2.z, B4.x, B4.y, B4.z);
  line(B3.x, B3.y, B3.z, B4.x, B4.y, B4.z);

  // veticAls
  line(A1.x, A1.y, A1.z, B1.x, B1.y, B1.z);
  line(A2.x, A2.y, A2.z, B2.x, B2.y, B2.z);
  line(A3.x, A3.y, A3.z, B3.x, B3.y, B3.z);
  line(A4.x, A4.y, A4.z, B4.x, B4.y, B4.z);


  /***************************
   connections
   ***************************/

  line(a1.x, a1.y, a1.z, A1.x, A1.y, A1.z);
  line(a2.x, a2.y, a2.z, A2.x, A2.y, A2.z);
  line(a3.x, a3.y, a3.z, A3.x, A3.y, A3.z);
  line(a4.x, a4.y, a4.z, A4.x, A4.y, A4.z);

  line(b1.x, b1.y, b1.z, B1.x, B1.y, B1.z);
  line(b2.x, b2.y, b2.z, B2.x, B2.y, B2.z);
  line(b3.x, b3.y, b3.z, B3.x, B3.y, B3.z);
  line(b4.x, b4.y, b4.z, B4.x, B4.y, B4.z);
}