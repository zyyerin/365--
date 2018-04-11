class Pelo
{
  float z = random(-radio, radio);
  float phi = random(TWO_PI);
  float largo = random(1.15, 1.2);
  float theta = asin(z/radio);

  Pelo() { // what's wrong with a constructor here
    z = random(-radio, radio);
    phi = random(TWO_PI);
    largo = random(1.15, 1.2);
    theta = asin(z/radio);
  }

  void dibujar() {

    float off = (noise(millis() * 0.0005, sin(phi))-0.5) * 0.3;
    float offb = (noise(millis() * 0.0007, sin(z) * 0.01)-0.5) * 0.3;

    float thetaff = theta+off;
    float phff = phi+offb;
    float x = radio * cos(theta) * cos(phi);
    float y = radio * cos(theta) * sin(phi);
    float z = radio * sin(theta);

    float xo = radio * cos(thetaff) * cos(phff);
    float yo = radio * cos(thetaff) * sin(phff);
    float zo = radio * sin(thetaff);

    float xb = xo * largo;
    float yb = yo * largo;
    float zb = zo * largo;

    strokeWeight(1);
    beginShape(LINES);
    stroke(0,0,255);
    vertex(x, y, z);
    stroke(0,125,255, 100);
    vertex(xb, yb, zb);
    endShape();
  }
}