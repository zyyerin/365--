float a = 0;
float theta_s = 0;



import processing.sound.*;
AudioIn in;
Amplitude amp;


float scale = 5;
float smooth_factor = 0.1;
float sum;


void setup() {
  size(600, 600, P3D);
  pixelDensity(2);
  noFill();
  stroke(0);
  strokeWeight(0.01);

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
  float s = sum * (width/10) * scale;

  
  
  rotateX(a);
  rotateY(a);
  a += 0.005;
  float beta = 0;
  theta_s += 0.01;
  while (beta<PI) {

    float r = 100*s + 1.6 * sin (6*beta);
    float theta = theta_s * beta;
    float phi = 0.6 * PI * sin(12 * beta);

    float x = r * cos (phi) * cos(theta);
    float y = r * cos (phi) * sin(theta);
    float z = r * cos (theta);

    beta += 0.001;
    box(x, y, z);
  }
}