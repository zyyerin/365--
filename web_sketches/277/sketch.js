// noise-driven spherical box trail — mouse controls box dimensions.
// Click to reset the noise seed.

const radius = 100;
let zaoyin = 0;

function setup() {
  createCanvas(600, 600, WEBGL);
  stroke(0, 100);
  strokeWeight(2);
  noFill();
}

function draw() {
  background(255);
  rotateX(frameCount * 0.002);
  rotateY(frameCount * 0.003);

  let s = 0;
  let t = 0;
  let lastx = 0, lasty = 0, lastz = 0;

  zaoyin += 0.001;
  if (mouseIsPressed) zaoyin = 0;

  const chang = map(mouseX, 0, width, 0, 100);
  const kuan = map(mouseY, 0, height, 0, 100);

  while (t < 720) {
    s += 1;
    t += 10 * noise(zaoyin);
    const rs = radians(s);
    const rt = radians(t);
    const thisx = radius * cos(rs) * sin(rt);
    const thisy = radius * sin(rs) * sin(rt);
    const thisz = radius * cos(rt);

    if (lastx !== 0) {
      push();
      translate(thisx, thisy, thisz);
      rotateZ(thisx);
      rotateY(thisz);
      box(chang, kuan, 10);
      pop();
    }
    lastx = thisx;
    lasty = thisy;
    lastz = thisz;
  }
}
