import org.openkinect.freenect.*; //<>//
import org.openkinect.freenect2.*;
import org.openkinect.processing.*;
float coff;

Kinect2 kinect2;

void setup() {
  size(512, 512, P2D);

  kinect2 = new Kinect2(this);
  kinect2.initDepth();
  kinect2.initDevice();
  coff = 0.1;
}


void draw() {
  coff += 0.05;
  background(0);
  //image(kinect2.getDepthImage(), 0, 0);

  loadPixels();
  for (int x = 0; x < width; x++) {
    for (int y = 0; y < height; y++) {
      int loc = x + y * width;
      if (x % 20 == 0 || y % 20 == 0) {
        pixels[loc] = color(random(noise(coff)*255));
      } else {
        pixels[loc] = color(255-random(noise(coff)*255));
      }
    }
  }
  updatePixels();
}