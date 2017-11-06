class Cell {

  constructor(pos, r, c) {
    if (pos) {
      this.pos = pos.copy();
    } else {
      this.pos = createVector(random(width), random(height));
    }
    this.r = r || 255;
    this.c = c || 255;



  }

  clicked(x, y) {
    let d = dist(this.pos.x, this.pos.y, x, y);
    if (d < this.r) {
      return true;
    } else {
      return false;
    }
  }
  mitosis() {
    this.pos.x += random(width)-width/2;
    this.pos.y += random(height)-height/2;

    let cell = new Cell(this.pos, this.r*0.8, this.c*0.9);
    return cell;
    // let cellB = new Cell(this.pos, this.r/2, this.c);
  }

  move() {
    this.pos.x = lerp(this.pos.x, mouseX, 1/this.r);
    this.pos.y = lerp(this.pos.y, mouseY, 1/this.r);
  }

  show() {
    noStroke();
    fill(255, this.c);
    ellipse(this.pos.x, this.pos.y, this.r, this.r);
  }


}
