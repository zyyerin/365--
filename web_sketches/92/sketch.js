// 2D solar system seperation + seek with stacked vehicle sets

let cam;
let sets = [];
const numOfSet = 9;
const thickness = 600;

function setup() {
  createCanvas(600, 600, WEBGL);
  rectMode(CENTER);
  noCursor();

  cam = createEasyCam({ distance: 1200 });
  cam.setRotation([0.92, -0.38, 0, 0]);

  for (let i = 0; i < numOfSet; i++) {
    sets.push(new VehicleSet(int(pow(2, i)), 20));
  }
}

function draw() {
  background(255);
  noStroke();
  push();
  translate(0, 0, thickness / 2);
  for (const vs of sets) {
    translate(0, 0, -thickness / numOfSet);
    vs.display();
  }
  pop();
}

class Vehicle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.r = random(30);
    this.mass = this.r * 0.1;
    this.maxforce = 0.3;
    this.maxspeed = 10;
  }

  applyForce(f) {
    this.acceleration.add(p5.Vector.div(f, this.mass));
  }

  applyBehaviors(vehicles) {
    const seperateForce = this.seperate(vehicles);
    const seekForce = this.seek(createVector(mouseX - width / 2, mouseY - height / 2));
    seperateForce.mult(2);
    seekForce.mult(1);
    const total = p5.Vector.add(seperateForce, seekForce);
    this.applyForce(total);
  }

  seek(target) {
    const desired = p5.Vector.sub(target, this.position);
    desired.setMag(this.maxspeed);
    const steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    return steer;
  }

  seperate(vehicles) {
    const desiredSep = this.r * 3;
    const desiredSepSq = desiredSep * desiredSep;
    const px = this.position.x, py = this.position.y;
    let sx = 0, sy = 0, count = 0;
    for (const other of vehicles) {
      const dx = px - other.position.x;
      const dy = py - other.position.y;
      const dSq = dx * dx + dy * dy;
      if (dSq > 0 && dSq < desiredSepSq) {
        const d = Math.sqrt(dSq);
        sx += dx / (d * d);
        sy += dy / (d * d);
        count++;
      }
    }
    const sum = createVector(sx, sy);
    if (count !== 0) {
      sum.setMag(this.maxspeed);
      sum.sub(this.velocity);
      sum.limit(this.maxforce);
    }
    return sum;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  display() {
    fill(0);
    noStroke();
    push();
    translate(this.position.x, this.position.y, this.velocity.y * 10);
    rotateX(this.velocity.x);
    rotateY(this.velocity.y);
    sphere(this.r / 2, 4, 4);
    pop();
  }
}

class VehicleSet {
  constructor(total, initR) {
    this.vehicles = [];
    for (let i = 0; i < total; i++) {
      const init = this.initPosition(initR);
      this.vehicles.push(new Vehicle(init.x, init.y));
    }
  }

  display() {
    for (const v of this.vehicles) {
      v.applyBehaviors(this.vehicles);
      v.update();
      v.display();
    }
  }

  initPosition(maxr) {
    const a = random(0, TWO_PI);
    const r = random(0, maxr);
    return createVector(cos(a) * r, sin(a) * r);
  }
}
