class Cell {

  float s;  // size  
  float a;  // rotate angle
  float betaStep;
  float aStep;


  Cell (float s_, float a_, float betaStep_, float aStep_) {
    s = s_;
    a = a_;
    betaStep = betaStep_;
    aStep = aStep_;
  }

  void display() {
    //rotateX(-a*2);
    rotateY(a);
    //rotateZ(a/2);
    a += aStep;
    float beta = 0;

    theta_s += 0.001;

    //beginShape();
    while (beta<TWO_PI) {

      float r = s + 1.0 * sin (6*beta);
      float theta = theta_s * beta;
      float phi = 0.6 * PI * sin(12 * beta);

      float x = r * cos (phi) * sin(theta);
      float y = r * cos (phi) * cos(theta);
      float z = r * sin (phi);

      beta += betaStep;
      
      pushMatrix();
      translate(x, 1, 1);
      rotateX(x/500);
      rotateY(y/400);
      rotateZ(z/300);
      box(beta/x);
      popMatrix();
    }
    //endShape();
  }
}