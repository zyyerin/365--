// 3D separation flocking — NOC 6.07

let cam;
let vehicles = [];
const total = 200;

function setup() {
  createCanvas(600, 600, WEBGL);
  rectMode(CENTER);
  cam = createEasyCam({ distance: 500 });

  for (let i = 0; i < total; i++) {
    vehicles.push(new Vehicle(random(-width / 2, width / 2), random(-height / 2, height / 2)));
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
  vehicles.push(new Vehicle(mouseX - width / 2, mouseY - height / 2));
}

class Vehicle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.r = random(30);
    this.mass = this.r * 0.1;
    this.maxforce = 0.05;
    this.maxspeed = 1;
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
    translate(this.position.x, this.position.y, this.velocity.y * 10);
    sphere(this.r / 2, 8, 8);
    pop();
  }

  borders() {
    const halfW = width / 2;
    const halfH = height / 2;
    if (this.position.x < -halfW - this.r) this.position.x = halfW + this.r;
    if (this.position.x > halfW + this.r) this.position.x = -halfW - this.r;
    if (this.position.y < -halfH - this.r) this.position.y = halfH + this.r;
    if (this.position.y > halfH + this.r) this.position.y = -halfH - this.r;
  }
}
