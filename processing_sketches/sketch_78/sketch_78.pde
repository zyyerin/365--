//slit-scan
import processing.video.*;

Movie video;
int x = 0;
int scale = 50;
float woff;


void setup() {
  size(600, 600);
  background(255);
  //pixelDensity(2);
  //smooth();
  video = new Movie(this, "80.mov");
  video.loop();
}

void movieEvent(Movie video) {
  video.read();
}

void draw() {

  woff = video.width/2;
  int w = int(woff);
  int h = 600;
  filter(BLUR, 1);

  copy(video, w, 0, scale, h, x, 0, scale, h);
  x += scale;
  if (x > width) {
    x = 0;
  }
}