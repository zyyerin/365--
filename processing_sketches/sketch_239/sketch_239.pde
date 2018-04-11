Star[] stars = new Star[1000];

void setup() {
 size(400, 400);
 for (int i = 0; i < stars.length; i++) {
   stars[i] = new Star();
 }
}

void draw(){
  background(255);
  translate(width/2, height/2);
  for (int i=0; i<stars.length; i++) {
   stars[i].update();
   stars[i].show();
  }
}