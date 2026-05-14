// recursive branching pair — two trees animating with trails (no bg clear)

const maxLevels = 4;
const numChildren = 1;
let trunk, trunk2;

function setup() {
  createCanvas(600, 600);
  background(255);
  noFill();
  trunk = new Branch(1, 0, width / 2, height / 2);
  trunk2 = new Branch(1, 0, 0, 0);
}

function draw() {
  // no background — trails accumulate
  stroke(0);
  trunk.updateMe(width / 2, height / 2);
  trunk.drawMe();
  stroke(255);
  trunk2.updateMe(width / 2, height / 2);
  trunk2.drawMe();
}

class Branch {
  constructor(level, index, ex, why) {
    this.level = level;
    this.index = index;
    this.children = [];

    this.strokeW = (1 / level) * 100;
    this.alph = 255 / level;
    this.len = (1 / level) * random(200);
    this.rot = random(360);
    this.lenChange = random(6) - 3;
    this.rotChange = random(4) - 2;

    this.updateMe(ex, why);

    if (level <= maxLevels) {
      for (let x = 0; x < numChildren; x++) {
        this.children.push(new Branch(level + 1, x, this.endx, this.endy));
      }
    }
  }

  updateMe(ex, why) {
    this.x = ex;
    this.y = why;
    this.rot += this.rotChange;
    if (this.rot > 360) this.rot = 0;
    else if (this.rot < 0) this.rot = 360;

    this.len -= this.lenChange;
    if (this.len < 0) this.lenChange *= -1;
    else if (this.len > 200) this.lenChange *= -1;

    const radian = radians(this.rot);
    this.endx = this.x + this.len * cos(radian);
    this.endy = this.y + this.len * sin(radian);
    for (const c of this.children) c.updateMe(this.endx, this.endy);
  }

  drawMe() {
    strokeWeight(maxLevels - this.level + 1);
    line(this.x, this.y, this.endx, this.endy);
    for (const c of this.children) c.drawMe();
  }
}
