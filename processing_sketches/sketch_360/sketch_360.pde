//slit-scan
import processing.video.*;

Movie video;
int x = 0;
int x2;
int scale = 1;
float woff = 100;


void setup() {
  size(666, 666);
  background(0);
  video = new Movie(this, "d2.mov");
  video.loop();
  x2 = width/2 + scale;
}

void movieEvent(Movie video) {
  video.read();
}


void draw() {
  //image(video, 0, 0);
  woff += 1;
  woff = noise(woff)*100;
  //woff = random(video.width);
  int w = int(woff);
  int h = 666;
  fill(255,10);
  rect(0, 0, width, height);
  copy(video, w, 0, scale, h, x, 0, scale, h);
  copy(video, 0, w, scale, x, 0, x, h, scale);
  
  copy(video, w, 0, scale, h, x2, 0, scale, h);
  copy(video, 0, w, scale, x, 0, x2, h, scale);


  x += scale;
  x2 -= scale;
  if (x > width) {
    x = 0;
  }
  if (x2 < 0) {
   x2 = int(random(width/2, width)); 
  }
}