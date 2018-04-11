// wire
import processing.sound.*;

Mesh mesh0;

AudioIn in;
Amplitude amp;

float scale = 5;
float smooth_factor = 0.5;
float sum;


void setup() {
  size(600, 600);
  noStroke();
  mesh0 = new Mesh(width, height);
  // Create and patch the rms tracker
  amp = new Amplitude(this);

  // Create the Input stream
  in = new AudioIn(this, 0);
  in.start();

  amp.input(in);
}


void draw() {
  background(0);
  mesh0.display();

  //float ampS = amp.analyze();
  //sum += (ampS - sum) * smooth_factor;
  //float s = sum * (width/10) * scale;
  //mx = s*random(-1, 1);
  //my = s*random(-1, 1);
}