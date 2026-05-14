// 2D separation — NOC 6.07

let vehicles = [];
const total = 50;

function setup() {
  createCanvas(600, 600);
  rectMode(CENTER);

  for (let i = 0; i < total; i++) {
    vehicles.push(new Vehicle(random(width), random(height)));
  }
}

function draw() {
  background(255);
  for (const v of vehicles) {
    v.seperate(vehicles);
    v.update();
    v.borders();
    v.display();
  }
}

function mouseDragged() {
  vehicles.push(new Vehicle(mouseX, mouseY));
}

class Vehicle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.r = random(30);
    this.mass = this.r * 0.1;
    this.maxforce = 0.2;
    this.maxspeed = 2;
  }

  applyForce(f) {
    this.acceleration.add(p5.Vector.div(f, this.mass));
  }

  seperate(vehicles) {
    const desiredSep = this.r * 3;
    const sum = createVector();
    let count = 0;
    for (const other of vehicles) {
      const d = p5.Vector.dist(this.position, other.position);
      if (d > 0 && d < desiredSep) {
        const diff = p5.Vector.sub(this.position, other.position);
        diff.normalize();
        diff.div(d);
        sum.add(diff);
        count++;
      }
    }
    if (count !== 0) {
      sum.setMag(this.maxspeed);
      const steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxforce);
      this.applyForce(steer);
    }
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  display() {
    fill(0, 200);
    noStroke();
    push();
    translate(this.position.x, this.position.y);
    rotate(atan2(this.velocity.y, this.velocity.x));
    rect(0, 0, this.r * 2, this.r);
    pop();
  }

  borders() {
    if (this.position.x < -this.r) this.position.x = width + this.r;
    if (this.position.x > width + this.r) this.position.x = -this.r;
    if (this.position.y < -this.r) this.position.y = height + this.r;
    if (this.position.y > height + this.r) this.position.y = -this.r;
  }
}
