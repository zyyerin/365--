PImage myImage;

void setup() {
  size(600, 600); 
  myImage = loadImage("Screen Shot 2018-01-30 at 22.06.07.png");
  //myImage.filter(THRESHOLD, 0.7);
}

void draw() {
  background(255);
  image(myImage, 0, 0, myImage.width*14, myImage.height*14);

  loadPixels();
  for (int i = 52; i < width * height-52; i+=1) {
    pixels[i] = pixels[i+int(random(-52, 52))];
  }
  updatePixels();
}