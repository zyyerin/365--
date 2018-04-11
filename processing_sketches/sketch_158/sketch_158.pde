float a = 0;
float theta_s = 0;
void setup() {
  size(600, 600, P3D);
  pixelDensity(2);
  //noFill();
  //stroke(0);
  //strokeWeight(2);
  
  noStroke();
  fill(0);
}

void draw() {
  background(255);
  translate(width/2, height/2);
  rotateX(a);
  rotateY(a/3);
  rotateZ(a/2);
  a += 0.002;
  float beta = 0;
  theta_s += 0.01;

  
  while (beta<PI) {
    
    float r = 100 + 1.0 * sin (6*beta);
    float theta = theta_s * beta;
    float phi = 0.6 * PI * sin(12 * beta);
    
    float x = r * cos (phi) * cos(theta);
    float y = r * cos (phi) * sin(theta);
    float z = r * cos (theta);
        
    beta += 0.1;
    pushMatrix();
    translate(x, y, z);
    rotate(phi);
    box(x/y, y/z, z/x);
    popMatrix();
  }
    
}