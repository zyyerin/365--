import processing.sound.*;
AudioIn in;
Amplitude amp;

// fft
FFT fft;
AudioDevice device;
int bands = 512;
float[] sum = new float[bands];

//float[] spectrum = new float[bands];

Noiso[] noisos;


void setup() {
  size(700, 700);
  background(255);
  //frameRate(30);

  // Create and patch the rms tracker
  amp = new Amplitude(this);

  //fft
  fft = new FFT(this, bands);

  // Create the Input stream
  in = new AudioIn(this, 0);
  in.start();

  amp.input(in);
  fft.input(in);

  noisos = new Noiso[169];

  for (int i = 0; i < noisos.length; i ++) {
    noisos[i] = new Noiso();
  }
}      

void draw() {
  background(255);
  noStroke();
  fill(0);
  int step = 50;
  int posx = step;
  int posy =step;

  for (int i=0; i<noisos.length; i++) {
    noisos[i].display(amp.analyze(), posx, posy);
    posx += step;
    if (posx > width-step) {
      posx = step;
      posy += step;
    }
  }

  fft.analyze();
  println(fft.spectrum);
  stroke(0);
  strokeWeight(10);
  for (int i = 0; i < bands; i++) {
    sum[i] += (fft.spectrum[i] - sum[i]) * 0.2;
    line( i, height, i, height - sum[i]*height*5 );
  }
}