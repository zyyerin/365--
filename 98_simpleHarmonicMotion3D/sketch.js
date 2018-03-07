// NOC 3.3 - simple harmonica motion
let cam;

const AMP_MIN = 30;
const PADDING = 100;
let amplitude = AMP_MIN;
let a = 0, a2 = 0;
let astep = 0.0003, astep2 = 0.0005;

let r = 3; // radius of the ndoe
let intervalScale = .5;
let total;

function setup() {
  createCanvas(600, 600, WEBGL);
  pixelDensity(1);
  setAttributes('antialias', true);
  noStroke();
  fill(0);

  let state = {
    distance : 600,
    // rotation : Dw.Rotation.create({angles_xyz:[0, 0, 0]})
  };
  cam = new Dw.EasyCam(this._renderer, state);

  total = Math.round((width-PADDING*2)/r)/intervalScale-1;
}

function draw() {
  // projection
  let cam_dist = cam.getDistance();
  let oscale = cam_dist * 0.001;
  let ox = width  / 2 * oscale;
  let oy = height / 2 * oscale;
  ortho(-ox, +ox, -oy, +oy, -10000, 10000);
  cam.setPanScale(0.001 / sqrt(cam_dist));

  // background setup
  background(255);

  translate(0, PADDING-height/2);

  a += astep;
  a2 += astep2;

  // astep = map(mouseX, 0, width, 0, 0.0001);
  // astep2 = map(mouseY, 0, height, 0, 0.0001);

  for (let i=1; i<total; i++) {
    let interval = i * r * intervalScale;
    let x = amplitude * sin(a*i);
    let x2 = amplitude * sin(a2*i);
    let size = map(i, 0, total, 0, 4);
    push();
    translate(x, interval, x2);
    // sphere(r, 4, 4);
    sphere(size);
    pop();
    push();
    translate(x+x2, interval, x);
    sphere(4-size);
    pop();
  }
}
