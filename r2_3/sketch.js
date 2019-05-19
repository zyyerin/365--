/*

2018-12-12
The Coding Train WebGL

Texture

*/

let camPos, canCenter, camAngle;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  // setup camera stuff
  camPos = createVector(0, 0, height/(tan(PI/6)));
  camCenter = createVector(0, 0, 0);
  camAngle = createVector(0, 1, 0);
  strokeWeight(2);
  fill(255);
}


function draw() {
  background(255);
  // ambientLight(255);
  if (camPos.z > 600) {
    camPos.z *= 0.999; // how far
  }
  console.log(camPos.z);
  camCenter.x += random(-1, 1);
  camCenter.y += random(-1, 1);
  camCenter.z += random(-1, 1);

  camCenter.x = sin(frameCount*10)*PI;
  camera(camPos.x, camPos.y, camPos.z, camCenter.x, camCenter.y, camCenter.z, camAngle.x, camAngle.y, camAngle.z);

  rotateX(frameCount*0.005);
  rotateY(frameCount*0.005);
  box(200);

  rotateX(frameCount*0.001);
  rotateZ(frameCount*0.001);
  box(210);
}
