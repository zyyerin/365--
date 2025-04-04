class KinectTracker {

  // Depth threshold
  int threshold = 845;

  // location
  PVector loc;
  PVector lerpedLoc;

  int[] depth;

  PImage display;
  Kinect2 kinect2;

  KinectTracker(PApplet pa) {

    //enable Kinect2
    kinect2 = new Kinect2(pa);
    kinect2.initDepth();
    kinect2.initDevice();

    // Make a blank image
    display = createImage(kinect2.depthWidth, kinect2.depthHeight, RGB);

    // Set up the vectors
    loc = new PVector(0, 0);
    lerpedLoc = new PVector(0, 0);
  }

  void track() {
    // Get the raw depth as array of integers
    depth = kinect2.getRawDepth();

    // Being overly cautious here
    if (depth == null) return;

    float sumX = 0;
    float sumY = 0;
    float count = 0;

    for (int x = 0; x < kinect2.depthWidth; x++) {
      for (int y = 0; y < kinect2.depthHeight; y++) {
        // Mirroring the image
        int offset = kinect2.depthWidth - x - 1 + y * kinect2.depthWidth;
        // Grabbing the raw depth
        int rawDepth = depth[offset];

        // Testing against threshold
        if (rawDepth > 0 && rawDepth < threshold) {
          sumX += x;
          sumY += y;
          count++;
        }
      }
    }
    // As long as we found something
    if (count != 0) {
      loc = new PVector(sumX/count, sumY/count);
    }

    // Interpolating the location, doing it arbitrarily for now
    lerpedLoc.x = PApplet.lerp(lerpedLoc.x, loc.x, 0.3f);
    lerpedLoc.y = PApplet.lerp(lerpedLoc.y, loc.y, 0.3f);
  }

  PVector getLerpedPos() {
    return lerpedLoc;
  }

  PVector getPos() {
    return loc;
  }

  float avgHeight() {
    depth = kinect2.getRawDepth();
    return depth[int(lerpedLoc.x + width*lerpedLoc.y)];
    
  }

  void display() {
    PImage img = kinect2.getDepthImage();

    // Being overly cautious here
    if (depth == null || img == null) return;

    // Going to rewrite the depth image to show which pixels are in threshold
    // A lot of this is redundant, but this is just for demonstration purposes
    display.loadPixels();
    for (int x = 0; x < kinect2.depthWidth; x++) {
      for (int y = 0; y < kinect2.depthHeight; y++) {

        // mirroring image
        int offset = (kinect2.depthWidth - x - 1) + y * kinect2.depthWidth;

        // Raw depth
        int d = depth[offset];
        int pix = x + y*display.width;
        if (d > 0 && d < threshold) {
          display.pixels[pix] = color(255, 0, 0);
        } else {
          //display.pixels[pix] = img.pixels[offset];
          display.pixels[pix] = color(255);
        }
      }
    }
    display.updatePixels();

    // Draw the image
    image(display, 0, 0);
  }

  //int getThreshold() {
  //  return threshold;
  //}

  //void setThreshold(int t) {
  //  threshold =  t;
  //}
}