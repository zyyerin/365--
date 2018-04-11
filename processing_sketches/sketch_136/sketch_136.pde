void setup() {
  size(600, 600);
  pixelDensity(2);
  
}

void draw() {
    background(255);
    
    PVector a = new PVector(22, 222);
    PVector b = new PVector(342, 81);
    PVector mouse = new PVector(mouseX, mouseY);
    
    strokeWeight(2);
    line(a.x, a.y, b.x, b.y);
    line(a.x, a.y, mouse.x, mouse.y);
    fill(0);
    
}