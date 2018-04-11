float a;
float t = 0;
Eye[] eyes = new Eye[40];

void setup() {
  size(600, 600);
  background(0);

  pixelDensity(2);
  noStroke();
  noCursor();
}

void draw() {
  //background(0);
  fill(0, 10);
  rect(0, 0, width, height);
  fill(255);
  float xl = map(mouseX, 0, width, width/6*2-50, width/6*3+50);
  float xr = map(mouseX, 0, width, width/6*3-50, width/6*4+50);
  float y_upper = map(mouseY, 0, height, height/4, height/2);
  float y_lower = map(mouseY, 0, height, height/2, height/4*3);

  beginShape();
  curveVertex(width/6, height/2);
  curveVertex(width/6, height/2);
  curveVertex(xl, y_upper);
  curveVertex(xr, y_upper);
  curveVertex(width/6*5, height/2);
  curveVertex(width/6*5, height/2);

  endShape();

  beginShape();
  curveVertex(width/6, height/2);
  curveVertex(width/6, height/2);
  curveVertex(xl, y_lower);
  curveVertex(xr, y_lower);
  curveVertex(width/6*5, height/2);
  curveVertex(width/6*5, height/2);
  endShape();

  for (int i=0; i<eyes.length; i++) {
    if (i==0) {
      eyes[i] = new Eye((xl+xr)/2, (y_upper+y_lower)/2, y_lower-y_upper);
    } else {
      eyes[i] = new Eye(sin(a/i)*eyes[i-1].er/20+eyes[i-1].ex, cos(a/i)*eyes[i-1].er/20+eyes[i-1].ey, eyes[i-1].er*0.9);
    }

    if (i%2==0) {
      eyes[i].display(0);
    } else {
      eyes[i].display(255);
    }
  }

  t += 0.005;
  a += noise(t)*0.4;

  fill(255, 0, 0);
  noStroke();
  ellipse(mouseX, mouseY, 2, 2);
}