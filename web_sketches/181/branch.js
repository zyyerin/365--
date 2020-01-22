// Coding Rainbow
// Daniel Shiffman
// http://patreon.com/codingtrain
// Code for: https://youtu.be/kKT0v3qhIQY

function Branch(parent, pos, dir) {
  this.pos = pos;
  this.parent = parent;
  this.dir = dir;
  this.origDir = this.dir.copy();
  this.count = 0;
  this.len = 2;

  this.reset = function() {
    this.dir = this.origDir.copy();
    this.count = 0;
  }


  this.next = function() {
    let nextDir = p5.Vector.mult(this.dir, this.len);
    let nextPos = p5.Vector.add(this.pos, nextDir);
    let nextBranch = new Branch(this, nextPos, this.dir.copy());
    return nextBranch;
  }

  this.show = function() {
    if (parent != null) {
      // noStroke();
      strokeWeight(0.2);
      stroke(0);
      line(this.pos.x, this.pos.y, width/2, height/2);

      stroke(255, 125);
      strokeWeight(3);
      line(this.pos.x, this.pos.y, this.parent.pos.x, this.parent.pos.y);
    }

  }
}
