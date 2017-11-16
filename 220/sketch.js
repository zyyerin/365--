let w;
let dir;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  noCursor();
  w = new White();
}

function draw() {
  background(0);
  dir = new p5.Vector(mouseX, mouseY);

  w.update(dir.x, dir.y);

  push();
  translate(0, 0);
  w.display();
  pop();
  // rotateY(mouseX * 0.01);
  // rotateX(mouseY * 0.01);
  noStroke();
  fill(255, 200);

  ellipse(dir.x, dir.y, 20, 20);

}

class White {

  constructor() {
    this.xl = 0;
    this.xr = 0;
    this.yt = 0;
    this.yb = 0;
  }

  update(mx, my) {
    this.xl = map(mx, 0, width, width / 6 * 2, width / 6 * 3);
    this.xr = map(mx, 0, width, width / 6 * 3, width / 6 * 4);
    this.yt = map(my, 0, height, height / 4, height / 2);
    this.yb = map(my, 0, height, height / 2, height / 4 * 3);
  }

  display() {
    fill(255);
    noStroke();
    beginShape();
    curveVertex(width / 6, height / 2);
    curveVertex(width / 6, height / 2);
    curveVertex(this.xl, this.yt);
    curveVertex(this.xr, this.yt);
    curveVertex(width / 6 * 5, height / 2);
    curveVertex(width / 6 * 5, height / 2);
    endShape();

    beginShape();
    curveVertex(width / 6, height / 2);
    curveVertex(width / 6, height / 2);
    curveVertex(this.xl, this.yb);
    curveVertex(this.xr, this.yb);
    curveVertex(width / 6 * 5, height / 2);
    curveVertex(width / 6 * 5, height / 2);
    endShape();

    for (let i = 1; i < 40; i++) {
      if (i % 2 == 0) {
        fill(255);
      } else {
        fill(0);
      }
			push();
			translate((this.xl + this.xr) / 2,  (this.yt + this.yb) / 2);
			rotate(frameCount*i*0.001);
      ellipse(0,0,(this.yb - this.yt) / i, (this.yb - this.yt) - 5 * i);
			pop();
		}


  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
