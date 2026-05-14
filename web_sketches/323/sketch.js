// "Weave" — compounding rotate+translate inside the inner loop creates a
// spiraling drift of points. (The accumulating transform is intentional from
// the original .pde — not wrapped in push/pop.)

let wx;

function setup() {
  createCanvas(600, 600);
  background(255);
  wx = new Weave(1, color(0));
}

function draw() {
  background(255);
  wx.display();
}

class Weave {
  constructor(step, sc) {
    this.step = step;
    this.sc = sc;
    this.angle = 270;
    this.astep = 0.05;
    this.sw = 8;
  }

  display() {
    stroke(this.sc);

    for (let posx = 0; posx <= width; posx += this.step) {
      const rad = radians(this.angle);
      const posy = map(Math.pow(sin(rad), 3) * noise(rad), -1, 1, 0, height);

      rotate(this.angle / 1000);
      translate(width / 2, height / 2);
      strokeWeight(this.sw);
      point(posx, posy);

      this.sw = map(Math.pow(sin(rad), 3), -1, 1, 30, 0);
      this.angle += this.astep;
    }
  }
}
