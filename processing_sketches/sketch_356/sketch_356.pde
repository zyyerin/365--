void setup() {
  size(666, 666, P3D);
  smooth();
  pixelDensity(2);
  frameRate(60);
  background(0);
}

void draw() {    
  fill(0, 5);
  rect(0, 0, width, height);
  translate(width/2, height/2, -300);
  scale(1);

  int rot = frameCount;

  //rotateZ(radians(90));
  rotateX(radians(rot/60.0f * 10));
  rotateY(radians(rot/60.0f * 10));

  for (int i = 0; i < 500; i++) {
    stroke(map(i % 10, 0, 10, 0, 100));
    fill(255, 10);
    rect(100, 100, i, 500-i);
    rotateY(radians(270.0f/50));
  }

  if (frameCount % 30 == 0) println(frameRate);
}  