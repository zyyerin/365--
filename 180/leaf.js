function Leaf(x, y) {
  this.pos = createVector(x, y);
  this.reached = false;

  this.show = function() {
    noFill();
    strokeWeight(0.2);
    stroke(0);
    rect(this.pos.x, this.pos.y, (height - this.pos.y)/2, 20);
  }

}
