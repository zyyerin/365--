// space-filling grid of skewed-quad Units — same idea as 304, smaller caption

const units = [];
let posx, posy;
const xstep = 100;
const ystep = 100;
const sunit = 30;
const bunit = 60;

function setup() {
  createCanvas(600, 600);
  background(0);
  noFill();
  posx = width;
  posy = height;
}

function draw() {
  // caption stays in the corner each frame
  fill(255);
  noStroke();
  textSize(16);
  text('305--', 24, 36);

  const unitw = posx < width / 2 - xstep ? sunit : bunit;
  const unith = posy > height / 2 - ystep ? sunit : bunit;

  units.push(new Unit(posx, posy, unitw, unith));

  posx -= xstep + unitw;
  if (posx < -20) {
    posy -= ystep + unitw;
    posx = width;
  }
  if (posy < -50) noLoop();

  for (const u of units) u.display();
}

class Unit {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.xoff = random(-2.5, 2.5);
    this.yoff = random(-2.5, 2.5);
  }

  display() {
    push();
    translate(this.x, this.y);
    noFill();
    stroke(255, 255, 0);
    beginShape();
    vertex(xstep + this.xoff, 0);
    vertex(xstep + 2 * this.w + this.xoff, 0);
    vertex(xstep + 2 * this.w - this.xoff, ystep + this.h);
    vertex(xstep - this.xoff, ystep + this.h);
    endShape(CLOSE);

    stroke(255);
    beginShape();
    vertex(0, ystep + this.yoff);
    vertex(xstep + this.w, ystep - this.yoff);
    vertex(xstep + this.w, ystep + 2 * this.h - this.yoff);
    vertex(0, ystep + 2 * this.h + this.yoff);
    endShape(CLOSE);

    stroke(255, 0, 255);
    beginShape();
    vertex(xstep - this.xoff, ystep - this.yoff);
    vertex(xstep + this.w * 2 - this.xoff, ystep - this.yoff);
    vertex(xstep + this.w * 2 + this.xoff, ystep + this.h * 2 + this.xoff);
    vertex(xstep + this.xoff, ystep + this.h * 2 + this.yoff);
    endShape(CLOSE);
    pop();
  }
}
