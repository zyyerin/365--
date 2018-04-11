// The Nature of Code
// <http://www.shiffman.net/teaching/nature>
// Spring 2010
// Toxiclibs example: http://toxiclibs.org/

// Force directed graph
// Heavily based on: http://code.google.com/p/fidgen/

// Notice how we are using inheritance here!
// We could have just stored a reference to a VerletParticle object
// inside the Node class, but inheritance is a nice alternative

class Node extends VerletParticle2D {
float rectW, rectH;
  Node(Vec2D pos) {
    super(pos);
    rectW = random(20);
    rectH = random(20);
}
  

  // All we're doing really is adding a display() function to a VerletParticle
  void display() {
    fill(170);
    noStroke();
    ellipse(x,y,rectH,rectW);
    
    fill(100,125);

    rectMode(CENTER);
    rect(x,y,rectW,rectH);
  }
}