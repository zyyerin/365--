// noise-modulated colored ellipses drifting across a large canvas.
// Click to add another batch; capped at MAX_CIRCLES (each batch is BATCH).

const BATCH = 400;
const MAX_CIRCLES = 800;
const circles = [];

function setup() {
  createCanvas(800, 800);
  background(255);
  drawCircles();
}

function draw() {
  background(255);
  for (const c of circles) c.updateMe();
}

function mouseReleased() {
  if (mouseX < 0 || mouseY < 0 || mouseX > width || mouseY > height) return;
  if (circles.length >= MAX_CIRCLES) circles.length = 0;
  drawCircles();
}

function drawCircles() {
  for (let i = 0; i <= BATCH; i++) circles.push(new Circle());
}

class Circle {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.radius = random(100) + 10;
    this.fillcol = color(random(255), random(255), random(255));
    this.alph = random(100);
    this.xmove = random(-4, 4);
    this.ymove = random(-2, 2);
  }

  draw() {
    stroke(this.fillcol);
    strokeWeight(this.alph);
    noFill();
    ellipse(
      this.x,
      this.y,
      this.radius * 2 * noise(this.y / 100),
      this.radius * 2 * noise(this.x / 100)
    );
  }

  updateMe() {
    this.x += this.xmove;
    this.y += this.ymove;
    if (this.x > width + this.radius) this.x = -this.radius;
    if (this.x < -this.radius) this.x = width + this.radius;
    if (this.y > height + this.radius) this.y = -this.radius;
    if (this.y < -this.radius) this.y = height + this.radius;
    this.draw();
  }
}
