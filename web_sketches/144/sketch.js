// 5000 small vehicles seeking the cursor — Q1/Q3 split start

let attractor;
let vehicles = [];
const numOfVehicle = 5000;

function setup() {
  createCanvas(400, 400);
  background(255);
  for (let i = 0; i < numOfVehicle; i += 2) {
    vehicles.push(new Vehicle(random(0, width / 2), random(height / 2, height)));
    vehicles.push(new Vehicle(random(width / 2, width), random(0, height / 2)));
  }
}

function draw() {
  background(255);
  attractor = createVector(mouseX, mouseY);
  fill(255);
  noStroke();
  ellipse(attractor.x, attractor.y, 5, 5);

  for (const v of vehicles) {
    v.seek(attractor);
    v.update();
    v.display();
  }
}

class Vehicle {
  constructor(x, y) {
    this.location = createVector(x, y);
    this.velocity = createVector(0, -2);
    this.acceleration = createVector(0, 0);
    this.r = random(1);
    this.maxSpeed = random(4);
    this.maxForce = 0.05;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }

  applyForce(f) { this.acceleration.add(f); }

  seek(target) {
    const desired = p5.Vector.sub(target, this.location);
    desired.setMag(this.maxSpeed);
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
