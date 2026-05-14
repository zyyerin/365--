// ring of low-poly spheres oscillating along z

let time = 600;
let tchange = 1;
let a = 0;

function setup() {
  createCanvas(600, 600, WEBGL);
  noStroke();
}

function draw() {
  background(255);

  for (let i = 360; i > 0; i -= 3) {
    const x = cos(radians(i)) * 50;
    const y = sin(radians(i)) * 100;
    const w = sin(radians(time + i)) * 200;
    fill(0, 20);
    push();
    translate(x, y, -time);
    rotateX(a);
    rotateY(-a);
    sphere(Math.abs(w), 4, 4);
    pop();
  }

  a += 0.001;
  time -= tchange;
  if (time <= -600 || time >= 600) tchange *= -1;
}
