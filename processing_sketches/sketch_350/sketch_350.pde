// motion detection

import processing.video.*;

Capture video;

/*----------------
 
 motion detection
 
 ----------------*/
PImage prev;
float threshold = 100;

float motionX = 0;
float motionY = 0;

float lerpX = 0;
float lerpY = 0;

/*----------------
 
 Esfera
 
 ----------------*/
int cuantos = 50;
Pelo[] lista;
float radio = 200;
float rx = 0;
float ry =0;

void setup() {
  size(640, 480, P3D);
  background (255);

  /*----------------
   
   motion detection
   
   ----------------*/
  String[] cameras = Capture.list();
  //printArray(cameras);
  video = new Capture(this, 640, 480);
  video.start();
  prev = createImage(640, 480, RGB);

  /*----------------
   
   Esfera
   
   ----------------*/
  radio = height/3.5;

  lista = new Pelo[cuantos];
  for (int i = 0; i < lista.length; i++) {
    lista[i] = new Pelo();
  }
  noiseDetail(3);
}

void captureEvent(Capture video) {
  prev.copy(video, 0, 0, video.width, video.height, 0, 0, video.width, video.height);
  prev.updatePixels();
  video.read();
}

void draw() {

  /*----------------
   
   motion detection
   
   ----------------*/
  video.loadPixels();
  prev.loadPixels();

  int count = 0;

  float avgX = 0;
  float avgY = 0;

  loadPixels();
  for (int x = 0; x < video.width; x++) {
    for (int y = 0; y < video.height; y++) {
      int loc = x + y *video.width;
      //current color
      float r1, g1, b1, r2, g2, b2;
      color currentColor = video.pixels[loc];
      r1 = red(currentColor);
      g1 = green(currentColor);
      b1 = blue(currentColor);
      color prevColor = prev.pixels[loc];
      r2 = red(prevColor);
      g2 = green(prevColor);
      b2 = blue(prevColor);

      float d = distSq(r1, g1, b1, r2, g2, b2);

      if (d > threshold*threshold) {
        avgX += x;
        avgY += y;
        count ++;
        //pixels[loc] = color(0);
      } else {
        //pixels[loc] = color(255);
      }
    }
  }
  updatePixels();

  // threshold of the movement
  if (count > 200) { 
    motionX = avgX / count;
    motionY = avgY / count;
  }
  //println(count);

  // easying
  lerpX = lerp(lerpX, motionX, 0.05); 
  lerpY = lerp(lerpY, motionY, 0.05); 

  float lerpX_ = map(lerpX, 0, width, width, 0);

  fill(255,0,255);
  noStroke();
  ellipse(lerpX_, lerpY, 6, 6);

  /*----------------
   
   Esfera
   
   ----------------*/
  float rxp = lerpX_ * 0.005;
  float ryp = lerpY * 0.005;
  rx = rx*0.9 + rxp*0.1;
  ry = ry*0.9 + ryp*0.1;
  translate(lerpX_, lerpY, -450);
  rotateY(rx);
  rotateX(ry);
  fill(255, 50);
  noStroke();
  sphere(radio);

  for (int i = 0; i < lista.length; i++) {
    lista[i].dibujar();
  }
}

// for motiondetection effciency
float distSq(float x1, float y1, float z1, float x2, float y2, float z2) {
  float d = (x2-x1)*(x2-x1) + (y2-y1)*(y2-y1) + (z2-z1)*(z2-z1);
  return d;
}