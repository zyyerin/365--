import processing.sound.*;
AudioIn in;

Amplitude amp;

float scale = 5;
float smooth_factor = 0.25;
float sum;


void setup() {
  size(600, 600);
  background(255);

  // Create and patch the rms tracker
  amp = new Amplitude(this);

  // Create the Input stream
  in = new AudioIn(this, 0);
  in.start();

  amp.input(in);
}      

void draw() {
  background(255);

  noStroke();
  fill(0);

  float ampS = amp.analyze();
  sum += (ampS - sum) * smooth_factor;
  println(sum);
  float s = sum * (width/2) * scale;

  ellipse(width/2, height/2, s, s);
}