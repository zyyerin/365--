// 3D flowfield steering toward cursor

let cam;
let field;
let vehicles = [];

function setup() {
  createCanvas(600, 600, WEBGL);
  cam = createEasyCam({ distance: 800 });

  field = new Flowfield();
  for (let i = 0; i < 10; i++) {
    vehicles.push(new Vehicle());
  }
}

function draw() {
  background(255);
  push();
  translate(-width / 2, -height / 2, 0);

  field.display();
  for (const v of vehicles) {
    v.follow(field);
    v.run();
  }
  pop();
}

class Flowfield {
  constructor() {
    this.resolution = 30;
    this.cols = floor(width / this.resolution);
    this.rows = floor(height / this.resolution);
    this.layers = floor(width / this.resolution);
    this.field = [];
  }

  init() {
    const target = createVector(mouseX, mouseY, 0);
    this.field = [];
    for (let i = 0; i < this.cols; i++) {
      this.field[i] = [];
      for (let j = 0; j < this.rows; j++) {
        this.field[i][j] = [];
        for (let k = 0; k < this.layers; k++) {
          const cur = createVector(i * this.resolution, j * this.resolution, k * this.resolution);
          const f = p5.Vector.sub(target, cur);
          f.normalize();
          this.field[i][j][k] = f;
        }
      }
    }
  }

  display() {
    this.init();
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        for (let k = 0; k < this.layers; k++) {
          this.drawVector(this.field[i][j][k], i * this.resolution, j * this.resolution, k * this.resolution, this.resolution / 2);
        }
      }
    }
  }

  drawVector(v, x, y, z, scayl) {
    push();
    translate(x, y, z);
    stroke(120);
    strokeWeight(1);
    rotate(v.heading());
    const len = v.mag() * scayl;
    line(0, 0, 0, len, 0, 0);
    pop();
  }

  lookup(loc) {
    const c = constrain(int(loc.x / this.resolution), 0, this.cols - 1);
    const r = constrain(int(loc.y / this.resolution), 0, this.rows - 1);
    const l = constrain(int(loc.z / this.resolution), 0, this.layers - 1);
    return this.field[c][r][l].copy();
  }
}

class Vehicle {
  constructor() {
    this.location = createVector(random(width), random(height), random(width));
    this.velocity = createVector(0, 0, 0);
    this.acceleration = createVector(0, 0, 0);
    this.maxspeed = random(1, 6);
    this.maxforce = random(0.05, 0.2);
    this.r = 10;
  }

  follow(flow) {
    const desired = flow.lookup(this.location);
    desired.setMag(this.maxspeed);
    const steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.acceleration.add(steer);
  }

  run() {
    this.update();
    this.borders();
    this.display();
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }

  display() {
    noStroke();
    fill(0);
    const r = 10;
    const theta = this.velocity.heading() + HALF_PI;
    push();
    translate(this.location.x, this.location.y, this.location.z);
    rotate(theta);
    beginShape();
    vertex(-r / 2, r);
    vertex(0, -r);
    vertex(r / 2, r);
    endShape(CLOSE);
    pop();
  }

  borders() {
    if (this.location.x < -this.r) this.location.x = width + this.r;
    if (this.location.y < -this.r) this.location.y = height + this.r;
    if (this.location.x > width + this.r) this.location.x = -this.r;
    if (this.location.y > height + this.r) this.location.y = -this.r;
  }
}
