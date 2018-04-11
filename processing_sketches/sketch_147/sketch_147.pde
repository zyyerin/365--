float a = 0;
float theta_s = 0;


import processing.sound.*;
AudioIn in;
Amplitude amp;


float scale = 600;
float smooth_factor = 0.1;
float sum;


void setup() {
  size(600, 600, P3D);
  background(255);

  pixelDensity(2);
  noFill();
  stroke(0);
  strokeWeight(0.1);

  // Create and patch the rms tracker
  amp = new Amplitude(this);

  // Create the Input stream
  in = new AudioIn(this, 0);
  in.start();

  amp.input(in);
}

void draw() {
  background(255);
  translate(width/2, height/2);
  
  
  float ampS = amp.analyze();
  sum += (ampS - sum) * smooth_factor;
  float s = sum * scale;

  rotateY(a);
  
  a += 0.005;
  float beta = 0;
  theta_s += 0.01;
  
  beginShape();
  while (beta<PI) {

    float r = 100 + 1.6 * sin (6*beta);
    float theta = theta_s * beta;
    float phi = 0.6 * PI * sin(12 * beta);

    float x = s * cos (phi) * cos(theta);
    float y = s * cos (phi) * sin(theta);
    float z = r * cos (theta);

    beta += 0.01;
    vertex(x, y, z);
    vertex(y, x, z);
    vertex(y, z, x);
    vertex(z, y, x);
    vertex(z, x, y);
    vertex(x, z, y);
  }
  endShape();
}