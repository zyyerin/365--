// cube size changable

int noc_x, noc_y, noc;

Cube[] cubes;
Connection[] connections;
ConnectionY[] cys;
float xstep, ystep;
PVector pos;
float cubeS;
PVector offset;

import processing.sound.*;
AudioIn in;

Amplitude amp;

float scale = 5;
float smooth_factor = 0.5;
float sum;



void setup() {
  size(600, 600);
  background(255);
  noStroke();

  noc_x = 14;
  noc_y = 14;
  noc = noc_x * noc_y;

  cubeS = 10;

  cubes = new Cube[noc];
  connections = new Connection[noc];
  cys = new ConnectionY[noc];

  xstep = width/(noc_x-1);
  ystep = height/(noc_y-1);


  // Create and patch the rms tracker
  amp = new Amplitude(this);

  // Create the Input stream
  in = new AudioIn(this, 0);
  in.start();

  amp.input(in);
}

void draw() {
  background(255);
  pos = new PVector(0, 0);

  float mx = map(mouseX, 0, width, -cubeS, cubeS);
  float my = map(mouseY, 0, height, -cubeS, cubeS);

  offset = new PVector(mx, my);




  for (int i = 0; i < cubes.length; i++) {



    float cubeS_ = cubeS+mx+my;
    cubes[i] = new Cube(cubeS_, offset);
    cubes[i].display(pos);

    pos.x += xstep;

    if (i%noc_x == noc_x-1) {
      pos.y += ystep; 
      pos.x = 0;
    }

    dataUpdate();
  }



  for (int i = 1; i < connections.length; i++) {
    connections[i] = new Connection(cubes[i-1], cubes[i]);
  }

  for (int i = noc_x; i < cys.length; i++) {
    cys[i] = new ConnectionY(cubes[i-noc_x], cubes[i]);
  }
}

void dataUpdate() {
  //cubeS += 0.003;
  //offset.normalize();

  
  float ampS = amp.analyze();
  sum += (ampS - sum) * smooth_factor;
  float s = sum * (width) * scale;
  xstep = s;
  ystep = s;
}