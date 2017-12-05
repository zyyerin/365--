// based on 277

let radius = 100;
let zaoyin = 0;
let shapeLimit;
let lastx, lasty, lastz;
let s;
let t;

function setup() {
  createCanvas(600, 600, WEBGL);
  background(255);
  noStroke();
  fill(0);

  shapeLimit = floor(random(160, 720));
  lastx = 0;
  lasty = 0;
  lastz = 0;

}

function draw() {
  background(255);

  rotateX(frameCount * 0.002);
  rotateY(frameCount * 0.001);

  zaoyin += 0.001;


  s = 0;
  t = 0;
  while (t < shapeLimit) {
    s += 3;
    t += noise(zaoyin);
    let radianS = radians(s);
    let radianT = radians(t);

    let thisx = radius * cos(radianS) * sin(radianT);
    let thisy = radius * sin(radianS) * sin(radianT);
    let thisz = radius * cos(radianT);

    if (lastx != 0) {
      push();
      translate(thisx, thisy, thisz);
      rotateZ(thisx);
      rotateY(thisz);
      sphere(1);
      pop();
    }

    lastx = thisx;
    lasty = thisy;
    lastz = thisz;
  }
}

function mouseDragged() {
    zaoyin *= 0.99;
}
