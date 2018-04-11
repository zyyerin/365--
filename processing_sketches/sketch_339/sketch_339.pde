import org.openkinect.processing.*;

/*-----------------
 
 particle stuff
 
 -----------------*/
import shiffman.box2d.*;
import org.jbox2d.collision.shapes.*;
import org.jbox2d.common.*;
import org.jbox2d.dynamics.*;

ArrayList<Particle> particles;
Box2DProcessing box2d;

// The kinect stuff is happening in another class
KinectTracker tracker;


void setup() {
  size(640, 424);
  tracker = new KinectTracker(this);

  /*-----------------
   
   particle stuff
   
   -----------------*/
  box2d = new Box2DProcessing(this);
  box2d.createWorld();

  particles = new ArrayList<Particle>();
}

void draw() {
  background(0);

  // Run the tracking analysis
  tracker.track();
  // Show the image
  tracker.display();

  //// raw location
  //PVector v1 = tracker.getPos();
  //fill(255);
  //noStroke();
  //ellipse(v1.x, v1.y, 20, 20);

  //// "lerped" location
  PVector v2 = tracker.getLerpedPos();
  //fill(255, 0, 0);
  //noStroke();
  //ellipse(v2.x, v2.y, 20, 20);

  /*-----------------
   
   particle stuff
   
   -----------------*/
  box2d.step();

  Particle p = new Particle(v2.x, v2.y);
  particles.add(p);

  for (Particle p1 : particles) {
    p1.display();
  }
  
  for (int i = particles.size()-1; i >= 0; i--) {
    Particle p2 = particles.get(i);
    if (p2.done()) {
      particles.remove(i);
    }
  }
}