// 2D flowfield with many vehicles following the noise field

let vehicles = [];
let flowfield;
const numOfVehicle = 2000;

function setup() {
  createCanvas(600, 600);
  rectMode(CENTER);
  noStroke();

  flowfield = new FlowField(10);

  for (let i = 0; i < numOfVehicle; i++) {
    vehicles.push(new Vehicle(random(width), random(height)));
  }
}

function draw() {
  background(255);
  flowfield.display();

  for (const v of vehicles) {
    v.follow(flowfield);
    v.run();
  }
}

class FlowField {
  constructor(r) {
    this.resolution = r;
    this.cols = floor(width / r);
    this.rows = floor(height / r);
    this.field = [];
    this.init();
  }

  init() {
    noiseSeed(int(random(10000)));
    let xoff = 0;
    for (let i = 0; i < this.cols; i++) {
      this.field[i] = [];
      let yoff = 0;
      for (let j = 0; j < this.rows; j++) {
        const theta = map(noise(xoff, yoff), 0, 1, 0, TWO_PI);
        this.field[i][j] = createVector(cos(theta), sin(theta));
        yoff += 0.1;
      }
      xoff += 0.1;
    }
  }

  display() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.drawVector(this.field[i][j], i * this.resolution, j * this.resolution, 5);
      }
    }
  }

  drawVector(v, x, y, scayl) {
    push();
    translate(x, y);
    stroke(220);
    strokeWeight(2);
    rotate(v.heading());
    line(0, 0, v.mag() * scayl, 0);
    pop();
  }

  lookup(loc) {
    const c = constrain(int(loc.x / this.resolution), 0, this.cols - 1);
    const r = constrain(int(loc.y / this.resolution), 0, this.rows - 1);
    return this.field[c][r].copy();
  }
}

class Vehicle {
  constructor(x, y) {
    this.location = createVector(x, y);
    this.velocity = createVector(0, -2);
    this.acceleration = createVector(0, 0);
    this.r = 4;
    this.maxSpeed = 2;
    this.maxForce = 0.05;
  }

  run() {
    this.update();
    this.borders();
    this.display();
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

  follow(flow) {
    const desired = flow.lookup(this.location);
    desired.mult(this.maxSpeed);
    const steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);
    this.applyForce(steer);
  }

  display() {
    fill(0);
    noStroke();
    const theta = this.velocity.heading() + PI / 2;
    push();
    translate(this.location.x, this.location.y);
    rotate(theta);
    triangle(0, -this.r * 2, -this.r, this.r * 2, this.r, this.r * 2);
    pop();
  }

  borders() {
    const r = this.r;
    if (this.location.x < -r) this.location.x = width + r;
    if (this.location.y < -r) this.location.y = height + r;
    if (this.location.x > width + r) this.location.x = -r;
    if (this.location.y > height + r) this.location.y = -r;
  }
}
