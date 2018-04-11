float r; //<>//


void setup () {
  size(600, 600);
  background(255);
  smooth();
  //pixelDensity(2);
  r = 0;
}

void draw() {
  int cx = width/2;
  int cy = height/2;

  stroke(0, 100);
  strokeWeight(1);
  float x, y; 
  float noiseval = random(10);
  float radVariance, thisRadius, rad;

  beginShape();
  for (float ang = 0; ang <= 360; ang += random(1)) {
    float a = map(r, 0, 100, 0, 300);
    fill(255, a);
    stroke(0, 255-a);
    noiseval += 0.1;
    radVariance = customNoise(noiseval);
    thisRadius = r + radVariance;
    rad = radians(ang);
    x = cx + (thisRadius * cos(rad));
    y = cy + (thisRadius * sin(rad));
    curveVertex(x, y);
    if (r < 100) {
      r += 0.001;
    } else {
      //noLoop();
    }
    println(r);
  }
  endShape(CLOSE);
}
float customNoise(float value) {
  float retValue = pow(sin(value), 0.5);
  return retValue;
}