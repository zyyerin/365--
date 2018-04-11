float a = 0;
float theta_s = 0;
void setup() {
  size(600, 600, P3D);
  pixelDensity(2);
  noFill();
  stroke(0);
  strokeWeight(2);
}

void draw() {
  background(255);
  translate(width/2, height/2);
  rotateY(a);
  rotateZ(a);
  a += 0.005;
  float beta = 0;
  theta_s += 0.01;
  beginShape();
  while (beta<PI) {
    
    float r = 150 + 1.6 * sin (6*beta);
    float theta = theta_s * beta;
    float phi = 0.6 * PI * sin(12 * beta);
    
    float x = r * cos (phi) * cos(theta);
    float y = r * cos (phi) * sin(theta);
    float z = r * sin (theta);
        
    beta += 0.001;
    vertex(x, y, z);
  }
  
  endShape();
  
}