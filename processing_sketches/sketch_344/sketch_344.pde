import org.openkinect.freenect.*;
import org.openkinect.freenect2.*;
import org.openkinect.processing.*;
import org.openkinect.tests.*;

Kinect2 kinect2;

void setup() {
  size(512, 424, P3D);
  smooth();
  kinect2 = new Kinect2(this);

  kinect2.initDepth();
  kinect2.initDevice();
}

void draw() {
  background(0);

  PImage img = kinect2.getDepthImage();
  //image(img, 0, 0);
  int skip = 20;
  for (int x = 0; x < img.width; x += skip/2) {
    for (int y = 0; y < img.height; y += skip/2) {
      int index = x + y *img.width;
      float b = brightness(img.pixels[index]);
      //fill(255,b);
      noFill();
      stroke(255, b);

      pushMatrix();
      translate(x, y, 255-b);
      float angle = map(b, 0, 255, 0, TWO_PI);
      rotate(angle);
      rect(0, 0, skip, skip);
      popMatrix();
    }
  }
}