// 500 chained vehicles seeking each other in 2D

let attractor;
let vehicles = [];
const numOfVehicle = 500;

function setup() {
  createCanvas(600, 600);
  rectMode(CENTER);
  noStroke();
  background(255);

  for (let i = 0; i < numOfVehicle; i++) {
    vehicles.push(new Vehicle(random(width), random(height)));
  }
}

function draw() {
  background(255);
  attractor = createVector(width / 2, height / 2);

  for (let i = 0; i < numOfVehicle; i++) {
    if (i === 0) {
      vehicles[i].seek(attractor);
    } else {
      vehicles[i].seek(vehicles[i - 1].location);
    }
    vehicles[i].update();
    vehicles[i].display();
  }
}

class Vehicle {
  constructor(x, y) {
    this.location = createVector(x, y);
    this.velocity = createVector(0, -2);
    this.acceleration = createVector(0, 0);
    this.targetBuffer = width / 4;
    this.r = 2;
    this.maxSpeed = 2;
    this.maxForce = 0.05;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }

  applyForce(f) {
    this.acceleration.add(f);
  }

  seek(target) {
    const desired = p5.Vector.sub(target, this.location);
    const d = desired.mag();
    const spd = map(d, 0, this.targetBuffer, 0, this.maxSpeed);
    desired.setMag(spd);
    const steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);
    this.applyForce(steer);
  }

  display() {
    fill(0);
    const theta = this.velocity.heading() + PI / 2;
    push();
    translate(this.location.x, this.location.y);
    rotate(theta);
    triangle(0, -this.r * 2, -this.r, this.r * 2, this.r, this.r * 2);
    pop();
  }
}
