/***
 * Simple Real-Time Slit-Scan Program. 
 * By Golan Levin.
 ***/
 
 
import processing.video.*;

Capture video;

int videoSliceX;
int drawPositionX;

void setup() {
  size(320, 480);
  //frameRate(1);
  
  video = new Capture(this, 640, 480);
  video.start();  
  
  videoSliceX = video.width / 2;
  drawPositionX = 0;
  background(0);
}


void draw() {
  if (video.available()) {
    video.read();
    video.loadPixels();
    
    // Copy a column of pixels from the middle of the video 
    // To a location moving slowly across the canvas.
    loadPixels();
    for (int y = 0; y < video.height; y++){
      int setPixelIndex = y*width + drawPositionX;
      int getPixelIndex = y*video.width  + videoSliceX;
      pixels[setPixelIndex] = video.pixels[getPixelIndex];
    }
    updatePixels();
    
    drawPositionX++;
    // Wrap the position back to the beginning if necessary.
    if (drawPositionX >= width) {
      drawPositionX = 0;
    }
  }
  filter(THRESHOLD, map(mouseY, 0, height, 0, 1));
}