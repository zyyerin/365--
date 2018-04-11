float a;
float t = 0;
float eye_scale;
Eye[] eyes = new Eye[50];

void setup() {
  size(600, 600);
  background(0);
  ellipseMode(RADIUS);
  rectMode(CENTER);
  pixelDensity(2);
  noStroke();
  noCursor();

  eye_scale =  (width/2)/eyes.length;
  eyes[0] = new Eye(width/2, height/2, width/4, eye_scale);
}

void draw() {
  background(0);
  fill(255);

  eyes[0].display(0);

  for (int i=1; i<eyes.length; i++) {
    if (i%2==0) {
      eyes[i] = new Eye(eyes[i-1].nextx(a), eyes[i-1].nexty(a), eyes[i-1].nextr(), eye_scale);
      eyes[i].display(0);
    } else {
      eyes[i] = new Eye(eyes[i-1].nextx(-t), eyes[i-1].nexty(-a), eyes[i-1].nextr(), eye_scale);
      eyes[i].display(i*5);
    }
  }

  t += 0.015;
  a += 0.01;
}