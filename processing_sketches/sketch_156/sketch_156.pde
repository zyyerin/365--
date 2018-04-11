float a = 0;
float theta_s = 0;
void setup() {
  size(600, 600, P3D);
  background(255);
  pixelDensity(2);
  noFill();
  stroke(0);
  
  //noStroke();
  //fill(0);
}

void draw() {
  //background(255);
  translate(width/2, height/2);
  rotateX(-a*2);
  rotateY(a);
  rotateZ(a/2);
  a += 0.002;
  float beta = 0;

  theta_s += 0.01;

      beginShape();

  while (beta<PI) {
    
    float r = 100 + 1.0 * sin (6*beta);
    float theta = theta_s * beta;
    float phi = 0.6 * PI * sin(12 * beta);
    
    float x = r * cos (phi) * cos(theta);
    float y = r * cos (phi) * sin(theta);
    float z = r * sin (phi);
        
    beta += 0.05;
    println(beta);

    stroke(beta*100);

    vertex(x, y, z);
  }
    endShape();

}