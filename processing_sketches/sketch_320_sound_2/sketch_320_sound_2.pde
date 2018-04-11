import processing.sound.*;
AudioIn in;
Amplitude amp;


Noiso[] noisos;


void setup() {
  size(700, 700);
  background(255);
  //frameRate(30);

  // Create and patch the rms tracker
  amp = new Amplitude(this);

  // Create the Input stream
  in = new AudioIn(this, 0);
  in.start();

  amp.input(in);

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
}