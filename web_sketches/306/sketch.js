// finer-grained grid with square center units at the midline cross

const units = [];
let posx, posy;
const xstep = 20;
const ystep = 20;
const sunit = 3;
const bunit = 6;

function setup() {
  createCanvas(600, 600);
  background(0);
  posx = width;
  posy = height;
}

function draw() {
  fill(255);
  noStroke();
  textSize(16);
  text('306--', 24, 36);

  const unitw = posx < width / 2 - xstep ? sunit : bunit;
  const unith = posy > height / 2 - ystep ? sunit : bunit;

  const onCross = (posy > height / 2 - ystep && posy < height / 2 + ystep / 2) ||
                  (posx > width / 2 - xstep && posx < width / 2 + xstep / 2);
  units.push(onCross ? new SquareUnit(posx, posy, unitw, unith) : new Unit(posx, posy, unitw, unith));

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
    fill(150, 100);
    noStroke();
    beginShape();
    vertex(xstep + this.xoff, 0);
    vertex(xstep + 2 * this.w + this.xoff, 0);
    vertex(xstep + 2 * this.w - this.xoff, ystep + this.h);
    vertex(xstep - this.xoff, ystep + this.h);
    endShape(CLOSE);
    beginShape();
    vertex(0, ystep + this.yoff);
    vertex(xstep + this.w, ystep - this.yoff);
    vertex(xstep + this.w, ystep + 2 * this.h - this.yoff);
    vertex(0, ystep + 2 * this.h + this.yoff);
    endShape(CLOSE);
    this.centerShape();
    pop();
  }

  centerShape() {
    fill(230);
    ellipse(xstep + this.w, ystep + this.h, this.w * 2, this.h * 2);
  }
}

class SquareUnit extends Unit {
  display() {
    push();
    translate(this.x, this.y);
    fill(150, 100);
    noStroke();
    beginShape();
    vertex(xstep + this.xoff, 0);
    vertex(xstep + 2 * this.w + this.xoff, 0);
    vertex(xstep + 2 * this.w - this.xoff, ystep);
    vertex(xstep - this.xoff, ystep);
    endShape(CLOSE);
    beginShape();
    vertex(0, ystep + this.yoff);
    vertex(xstep, ystep - this.yoff);
    vertex(xstep, ystep + 2 * this.h - this.yoff);
    vertex(0, ystep + 2 * this.h + this.yoff);
    endShape(CLOSE);
    this.centerShape();
    pop();
  }

  centerShape() {
    fill(230);
    beginShape();
    vertex(xstep - this.xoff, ystep - this.yoff);
    vertex(xstep + this.w * 2 - this.xoff, ystep - this.yoff);
    vertex(xstep + this.w * 2 + this.xoff, ystep + this.h * 2 + this.xoff);
    vertex(xstep + this.xoff, ystep + this.h * 2 + this.yoff);
    endShape(CLOSE);
  }
}
