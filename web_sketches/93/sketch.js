// stacked vehicle separation in 3D

let cam;
let sets = [];
const numOfSet = 5;
const thickness = 200;

function setup() {
  createCanvas(600, 600, WEBGL);
  noCursor();
  rectMode(CENTER);

  cam = createEasyCam({ distance: 1200 });

  for (let i = 0; i < numOfSet; i++) {
    sets.push(new VehicleSet(120, int(pow(4, i))));
  }
}

function draw() {
  background(255);
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
    this.maxforce = 0.1;
    this.maxspeed = 2;
  }

  applyForce(f) {
    this.acceleration.add(p5.Vector.div(f, this.mass));
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
    if (count !== 0) {
      const sum = createVector(sx, sy);
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
    fill(0);
    noStroke();
    push();
    translate(this.position.x, this.position.y, this.velocity.y * 10);
    const detail = constrain(int(this.velocity.x * 20) + 3, 3, 12);
    sphere(this.r / 2, detail, detail);
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
      v.seperate(this.vehicles);
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
