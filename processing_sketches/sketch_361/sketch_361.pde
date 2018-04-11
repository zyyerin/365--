//slit-scan
import processing.video.*;

Movie video;
int x = 0;
int scale = 2;
float woff = 100;


void setup() {
  size(666, 666);
  background(255);
  video = new Movie(this, "day5_720.mov");
  video.loop();
}

void movieEvent(Movie video) {
  video.read();
}


void draw() {
  //image(video, 0, 0);
  //woff += 1;
  //woff = noise(woff);
  woff = random(video.width);
  int w = int(woff);
  int h = 666;
  //tint(255, 10);
  filter(BLUR, .6);
  copy(video, w, 0, scale, h, x, 0, scale, h);
  //copy(video, 0, w, scale, x, 0, x, h, scale);


  x += scale;
  if (x > width) {
    x = 0;
  }
}