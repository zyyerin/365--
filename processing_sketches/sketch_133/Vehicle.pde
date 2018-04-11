class Vehicle {
  PVector location;
  PVector velocity;
  PVector acceleration;
  float r;
  float maxSpeed;
  float maxForce;

  Vehicle(PVector l, float ms, float mf) {
    location =l.get();
    maxSpeed = ms;
    maxForce = mf;
    
    acceleration = new PVector(0, 0);
    velocity = new PVector(maxSpeed, 0);
  }

  void run() {
    update();
    display();
  }


  void follow(Path p) {
    PVector predict = velocity.get();
    predict.normalize();
    predict.mult(50);
    PVector predictLoc = PVector.add(location, predict);
    
    PVector a = p.start;
    PVector b = p.end;
    
    PVector normalPoint = getNormalPoint(predictLoc, a, b);
    
    PVector dir = PVector.sub(b, a);
    dir.normalize();
    dir.mult(10);
    PVector target = PVector.add(normalPoint, dir);
    
    float distance = PVector.dist(predictLoc, normalPoint);
    if (distance > p.radius) {
       seek(target); 
    }
  }
  
  

  void update() {
    
  }
  
  void display() {
    
  }
  
  void border() {
  }
}