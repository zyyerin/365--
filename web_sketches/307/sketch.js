// fine-grained units with gray center ellipse

const units = [];
let posx, posy;
const xstep = 20;
const ystep = 20;
let unitw, unith;

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
  text('307--', 24, 36);

  unitw = posx <= width / 2 ? 3 : 6;
  unith = posy >= height / 2 ? 3 : 6;

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
    fill(220);
    ellipse(xstep + this.w, ystep + this.h, this.w * 2, this.h * 2);
    pop();
  }
}
