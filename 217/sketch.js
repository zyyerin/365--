let shapeDepth;
let dx, dy;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  shapeDepth = height / 9;
  // dx = floor(random(2, 7));
  // dy = floor(random(2, 7));
  dx = 2;
  dy = 2;
}

function draw() {


  background(0);

  // var dirY = (mouseY / height - 0.5) * 4;
  // var dirX = (mouseX / width - 0.5) * 4;
  // directionalLight(204, 204, 204, dirX, dirY, 1);
  fill(0);
  push();
  rotateX(frameCount * 0.015);
  rotateZ(frameCount * 0.008);
  // plane(width, height);
  pop();


  fill(255, 10);
  push();
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);

  for (let i = 0; i < 20; i++) {
    sphere(shapeDepth * i * 0.1, dx+i%7, dy+i%7);
  }
  pop();
}
