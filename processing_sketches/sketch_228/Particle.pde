class Particle extends VerletParticle2D {
 
  Particle(Vec2D loc) {
   super(loc); 
  }
  
  void display() {
    fill(0);
    noStroke();
    ellipse(x, y, 2, 2);
  }
}