ArrayList<Circle> circles;

void setup() {
  size(600, 600);
  circles = new ArrayList<Circle>();
}

void draw() {
  background(0);

  Circle newc = newCircle(); 
  if (newc != null) {
    circles.add(newc);  
  }
  

  for (Circle c : circles) {
    if (c.edges()) {
      c.growing = false;
    }
    c.grow();
    c.show();
  }
}

Circle newCircle() {
  float x = random(width);
  float y = random(height);

  boolean valid = true;
  for (Circle c : circles) {
    float d = dist(x, y, c.x, c.y);
    if (d < c.r) {
      valid = false; 
      break;
    }
  }
  if (valid) {
    return new Circle(x, y);
  } else {
    return null;
  }
}