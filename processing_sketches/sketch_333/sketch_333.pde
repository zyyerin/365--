import shiffman.box2d.*;
import org.jbox2d.collision.shapes.*;
import org.jbox2d.common.*;
import org.jbox2d.dynamics.*;

Box2DProcessing box2d;
ArrayList<Lollipop> pops;

color[] candy;
color popColor;

PGraphics mask;
int WHITE = color(255);
int BLACK = color(0);
int maskW, maskH;


void setup() {
  size(600, 600);
  smooth();
  pixelDensity(2);
  background(255);

  box2d = new Box2DProcessing(this);
  box2d.createWorld();

  box2d.setGravity(0, 0);

  pops = new ArrayList<Lollipop>();

  candy = new color[5];
  candy[0] = color(255, 255, 0);
  candy[1] = color(255, 50, 0);
  candy[2] = color(100, 255, 150);
  candy[3] = color(255, 200, 200);
  candy[4] = color(150, 150, 250);    
  
  maskW = width;
  maskH = height;
  noCursor();
}

void draw() {
  background(255);
  box2d.step();

  Lollipop pnew = new Lollipop(random(250, 350), random(250, 350), candy[int(random(0, candy.length))]);
  pops.add(pnew);

  for (Lollipop p : pops) {
    p.display();
  }

  for (int i = pops.size()-1; i>=0; i--) {
    Lollipop p = pops.get(i);
    if (p.done()) {
      pops.remove(i);
    }
  }
  
  if (mousePressed){
      drawDemoMask();

      maskPixels();
  }
}

void drawDemoMask() {
  mask = createGraphics(width, height);
  mask.beginDraw();
  mask.background(0);
  mask.ellipse(width/2, height/2, maskW, maskH);
  mask.endDraw();
  mask.loadPixels();
  maskW *= 0.9;
  maskH *= 0.9;
  if(maskW < 1){
   noLoop(); 
  }
}

void maskPixels() {
  loadPixels();
  for (int i=0; i < mask.pixels.length; ++i) {
    int maskPixel = mask.pixels[i];
    if (maskPixel != WHITE) {
      pixels[i] = WHITE;
    }
  }
  updatePixels();
}