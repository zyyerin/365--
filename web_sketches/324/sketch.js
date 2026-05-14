// 3D sphere weave — two layers, the second mirrored 90° around z

let wx, wx2;

function setup() {
  createCanvas(600, 600, WEBGL);
  wx = new Weave(color(0, 100));
  wx2 = new Weave(color(255, 100));
  noStroke();
}

function draw() {
  background(255);
  push();
  // recenter so x=0..width maps from left to right
  translate(-width / 2, -height / 2, 0);
  wx.display();
  pop();

  push();
  translate(width / 2, -height / 2, 0);
  rotateZ(PI / 2);
  wx2.display();
  pop();
}

class Weave {
  constructor(sc) {
    this.step = random(10, 30);
    this.sc = sc;
    this.angle = 270;
    this.astep = random(0.05, 0.1);
    this.sw = 8;
  }

  display() {
    fill(red(this.sc), green(this.sc), blue(this.sc), 100);
    for (let posx = 0; posx <= width; posx += this.step) {
      const posy = map(sin(radians(this.angle)), -1, 1, 0, height);
      const posz = map(cos(radians(this.angle)), -1, 1, -200, 200);
      push();
      translate(posx, posy, posz);
      sphere(this.sw, 8, 8);
      pop();
      this.angle += this.astep;
      if (this.sw > 0.01) this.sw += random(-0.0045, 0.004);
    }
  }
}
