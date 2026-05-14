// face with mouse-driven mouth curves and a chain of nested eyes

let a = 0;
let t = 0;
let eyes = new Array(40);

function setup() {
  createCanvas(600, 600);
  background(0);
  noStroke();
  noCursor();
}

function draw() {
  // soft fade instead of clear, matching the original's `rect(0,0,w,h)` with fill(0,10)
  noStroke();
  fill(0, 10);
  rect(0, 0, width, height);

  fill(255);
  const xl = map(mouseX, 0, width, width / 6 * 2 - 50, width / 6 * 3 + 50);
  const xr = map(mouseX, 0, width, width / 6 * 3 - 50, width / 6 * 4 + 50);
  const yU = map(mouseY, 0, height, height / 4, height / 2);
  const yL = map(mouseY, 0, height, height / 2, height / 4 * 3);

  noFill();
  stroke(255);
  beginShape();
  curveVertex(width / 6, height / 2);
  curveVertex(width / 6, height / 2);
  curveVertex(xl, yU);
  curveVertex(xr, yU);
  curveVertex(width / 6 * 5, height / 2);
  curveVertex(width / 6 * 5, height / 2);
  endShape();

  beginShape();
  curveVertex(width / 6, height / 2);
  curveVertex(width / 6, height / 2);
  curveVertex(xl, yL);
  curveVertex(xr, yL);
  curveVertex(width / 6 * 5, height / 2);
  curveVertex(width / 6 * 5, height / 2);
  endShape();

  for (let i = 0; i < eyes.length; i++) {
    if (i === 0) {
      eyes[i] = new Eye((xl + xr) / 2, (yU + yL) / 2, yL - yU);
    } else {
      eyes[i] = new Eye(
        sin(a / i) * eyes[i - 1].er / 20 + eyes[i - 1].ex,
        cos(a / i) * eyes[i - 1].er / 20 + eyes[i - 1].ey,
        eyes[i - 1].er * 0.9
      );
    }
    eyes[i].display(i % 2 === 0 ? 0 : 255);
  }

  t += 0.005;
  a += noise(t) * 0.4;

  fill(255, 0, 0);
  noStroke();
  ellipse(mouseX, mouseY, 2, 2);
}

class Eye {
  constructor(ex, ey, er) {
    this.ex = ex;
    this.ey = ey;
    this.er = er;
  }

  display(col) {
    fill(0);
    stroke(255);
    ellipse(this.ex, this.ey, this.er, this.er);
  }
}
