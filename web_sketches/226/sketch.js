// force-directed graph cluster — fully connected, springs at fixed rest length
// (Original used toxiclibs verlet physics — re-implemented manually.)

let cluster;

function setup() {
  createCanvas(600, 600);
  cluster = new Cluster(8, 100, createVector(width / 2, height / 2));
}

function draw() {
  background(255);
  cluster.update();
  cluster.showConnections();
  cluster.display();
}

function keyPressed() {
  if (key === 'n' || key === 'N') {
    cluster = new Cluster(int(random(2, 20)), width / 4, createVector(width / 2, height / 2));
  }
}

class Node {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.rectW = random(20);
    this.rectH = random(20);
  }
}

class Cluster {
  constructor(n, d, center) {
    this.diameter = d;
    this.nodes = [];
    for (let i = 0; i < n; i++) {
      const off = p5.Vector.random2D().mult(20);
      this.nodes.push(new Node(center.x + off.x, center.y + off.y));
    }
  }

  update() {
    const k = 0.01;
    const drag = 0.92;
    const len = this.diameter;
    for (let i = 0; i < this.nodes.length - 1; i++) {
      const ni = this.nodes[i];
      for (let j = i + 1; j < this.nodes.length; j++) {
        const nj = this.nodes[j];
        const dx = nj.pos.x - ni.pos.x;
        const dy = nj.pos.y - ni.pos.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d === 0) continue;
        const f = (d - len) * k;
        const fx = (dx / d) * f;
        const fy = (dy / d) * f;
        ni.vel.x += fx;
        ni.vel.y += fy;
        nj.vel.x -= fx;
        nj.vel.y -= fy;
      }
    }
    for (const n of this.nodes) {
      n.vel.mult(drag);
      n.pos.add(n.vel);
      n.pos.x = constrain(n.pos.x, 10, width - 10);
      n.pos.y = constrain(n.pos.y, 10, height - 10);
    }
  }

  display() {
    for (const n of this.nodes) {
      noStroke();
      fill(170);
      ellipse(n.pos.x, n.pos.y, n.rectH, n.rectW);
      fill(100, 125);
      rectMode(CENTER);
      rect(n.pos.x, n.pos.y, n.rectW, n.rectH);
    }
  }

  showConnections() {
    stroke(200, 125);
    strokeWeight(30);
    for (let i = 0; i < this.nodes.length - 1; i++) {
      for (let j = i + 1; j < this.nodes.length; j++) {
        const a = this.nodes[i].pos;
        const b = this.nodes[j].pos;
        line(a.x, a.y, b.x, b.y);
      }
    }
  }
}
