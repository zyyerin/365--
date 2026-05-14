// 2D point-weave — two layers, accumulating dots over many frames

let wx, wx2;

function setup() {
  createCanvas(600, 600);
  background(255);
  wx = new Weave(20, color(0, 200));
  wx2 = new Weave(null, color(255, 200));
}

function draw() {
  wx.display();
  wx2.display();
}

class Weave {
  constructor(step, sc) {
    this.step = step !== null ? step : random(15, 30);
    this.sc = sc;
    this.angle = 270;
    this.astep = random(0.02, 0.07);
    this.sw = 16;
  }

  display() {
    stroke(this.sc);

    for (let posx = 0; posx <= width; posx += this.step) {
      const posy = map(sin(radians(this.angle)), -1, 1, 0, height);
      strokeWeight(this.sw);
      point(posx, posy);
      this.angle += this.astep;
      if (this.sw > 0.01) this.sw += random(-0.008, 0.005);
    }
  }
}
