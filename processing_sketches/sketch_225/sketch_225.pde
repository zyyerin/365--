import toxi.geom.*;
import toxi.physics2d.*;
import toxi.physics2d.behaviors.*;

ArrayList<Particle> particles;
Attractor attractor;

VerletPhysics2D physics;

void setup () {
  size (600, 600);
  background(255);
  physics = new VerletPhysics2D ();
  physics.setWorldBounds(new Rect(0, 0, width, height));

  physics.setDrag (0.01);

  particles = new ArrayList<Particle>();
  for (int i = 0; i < 500; i++) {
    particles.add(new Particle(new Vec2D(random(width), random(height))));
  }

  attractor = new Attractor(new Vec2D(width/2, height/2));
}


void draw () {
  background (255);  
  physics.update ();

  attractor.display();
  for (Particle p : particles) {
    p.display();
  }

  if (mousePressed) {
    attractor.lock();
    attractor.set(mouseX, mouseY);
  } else {
    attractor.unlock();
  }
}