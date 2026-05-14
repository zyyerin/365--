// drifting black circles with white "spark" rectangles drawn at overlap midpoints.
// Click to add another batch; capped at MAX_CIRCLES (O(n²) collision becomes
// painful past ~120).

const BATCH = 20;
const MAX_CIRCLES = 120;
const circles = [];

function setup() {
  createCanvas(600, 600);
  background(255);
  drawCircles();
}

function draw() {
  background(255);
  for (const c of circles) c.updateMe();
}

function mouseReleased() {
  if (mouseX < 0 || mouseY < 0 || mouseX > width || mouseY > height) return;
  if (circles.length >= MAX_CIRCLES) {
    // wrap back to fresh batch
    circles.length = 0;
  }
  drawCircles();
}

function drawCircles() {
  for (let i = 0; i <= BATCH; i++) circles.push(new Circle());
}

class Circle {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.radius = random(200);
    this.xmove = random(10) - 5;
    this.ymove = random(10) - 5;
  }

  draw() {
    fill(0);
    noStroke();
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }

  updateMe() {
    this.x += this.xmove;
    this.y += this.ymove;
    if (this.x > width + this.radius) this.x = -this.radius;
    if (this.x < -this.radius) this.x = width + this.radius;
    if (this.y > height + this.radius) this.y = -this.radius;
    if (this.y < -this.radius) this.y = height + this.radius;

    for (const o of circles) {
      if (o === this) continue;
      const dx = this.x - o.x;
      const dy = this.y - o.y;
      const dSq = dx * dx + dy * dy;
      const rSum = this.radius + o.radius;
      if (dSq < rSum * rSum && dSq > 0) {
        const d = Math.sqrt(dSq);
        const overlap = -(d - rSum);
        const midx = (this.x + o.x) / 2;
        const midy = (this.y + o.y) / 2;
        fill(255);
        rectMode(CENTER);
        push();
        translate(midx, midy);
        rotate(radians(midx / 10));
        rect(0, 0, overlap * 0.5, overlap * 3);
        pop();
      }
    }
    this.draw();
  }
}
