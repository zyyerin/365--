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
  size(512, 424, P2D);
  //frameRate(36);
  background(255);

  //fullScreen(P2D, 2);

  tracker = new KinectTracker(this);

  /*-----------------
   
   particle stuff
   
   -----------------*/
  box2d = new Box2DProcessing(this);
  box2d.createWorld();
  box2d.setGravity(0, 0);


  particles = new ArrayList<Particle>();
}

void draw() {
  background(255);

  tracker.track();
  //tracker.display();

  //// raw location
  //PVector v1 = tracker.getPos();
  //noStroke();
  //ellipse(v1.x, v1.y, 20, 20);

  //// "lerped" location
  PVector v2 = tracker.getLerpedPos();


  /*-----------------
   
   particle stuff
   
   -----------------*/
  box2d.step();

  // mapping the position
  float posx = map(v2.x, 0, 512, 0, width);
  float posy = map(v2.y, 0, 424, 0, height);

  // defining the level of particle shape
  int plevel = int(map(tracker.avgHeight(), 0, 4500, 1, 50));
  //println(plevel);

  if (plevel >= 10) {
    particles.add(new Particle(posx, posy, plevel));
  } else {
    particles.add(new SoftParticle(posx, posy, plevel));
  }

  for (Particle p1 : particles) {
    p1.display(plevel);
  }

  for (int i = particles.size()-1; i >= 0; i--) {
    Particle p2 = particles.get(i);

    if (p2.done()) {
      particles.remove(i);
    }
  }

  //// location indicator
  //fill(255, 0, 0);
  //ellipse(v2.x, v2.y, 20, 20);
}