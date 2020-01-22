const BOX_H = 5;
let a;

function setup() {
  createCanvas(600, 600, WEBGL);
  background(255);
  fill(0);

  a = 0;
}

function draw() {

  for (let j = 1; j <= 10; j++) {
    for (let i = 0; i < 30; i++) {
      push();
      translate(j*i-width/3, BOX_H * 2 * i-height/3);
      rotateX(a);
      box(10*j, BOX_H, 10*j);
      pop();
    }
  }

a+=0.01;

}
