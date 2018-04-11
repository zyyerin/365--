class Cell {

  float s;  // size  
  float a;  // rotate angle
  float betaStep;


  Cell (float s_, float a_, float betaStep_) {
    s = s_;
    a = a_;
    betaStep = betaStep_;
  }

  void display() {
    rotateX(-a*2);
    rotateY(a);
    rotateZ(a/2);
    a += 0.001;
    float beta = 0;

    theta_s += 0.001;

    beginShape();
    while (beta<TWO_PI) {

      float r = s + 1.0 * sin (6*beta);
      float theta = theta_s * beta;
      float phi = 0.6 * PI * sin(12 * beta);

      float x = r * cos (phi) * sin(theta);
      float y = r * cos (phi) * cos(theta);
      float z = r * sin (phi);

      beta += betaStep;

      strokeWeight(beta/phi);

      vertex(x, y, z);
    }
    endShape();
  }
}