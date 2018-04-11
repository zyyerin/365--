int num = 400;
Circle[] circleArr = {};

void setup() {
  size(800, 800);
  background(255);
  smooth();
  strokeWeight(1);
  fill(150, 50);
  drawCircles();
}

void draw() {
  background(255);
  for (int i = 0; i < circleArr.length; i++) {
    Circle thisCirc = circleArr[i];
    thisCirc.updateMe();
  }
}

void mouseReleased() {
  drawCircles();
}

void drawCircles() {
  for (int i = 0; i <= num; i += 1) {
    Circle thisCirc = new Circle();
    thisCirc.drawMe();
    circleArr = (Circle[])append(circleArr, thisCirc);
  }
}